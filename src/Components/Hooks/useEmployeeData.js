// useEmployeeData.js
import { useAtomValue } from "jotai";
import { authState } from "../../authState";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const useEmployeeData = ({
  page = 1,
  length = 10,
  sort_order = "asc",
  sort_by = "name",
} = {}) => {
  const auth = useAtomValue(authState);
  const token = auth?.token;

  // Build the query string using the provided page
  const queryString = `?length=${length}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`;
  const url = `${
    import.meta.env.VITE_URL
  }/employee-portal/api/v1/employee${queryString}`;

  // Optionally store the previous data as a fallback
  const [prevData, setPrevData] = useState(null);

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(
    token ? url : null,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setPrevData(data);
    }
  }, [data]);

  // Extract the array of employees and the total pages from the response
  const employees = data?.data?.rows?.data || [];
  const totalPages = data?.data?.rows?.last_page || 1;

  return { data: employees, totalPages, error, isLoading, mutate };
};
