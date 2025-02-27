<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


// import React, { useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
// import { useParams } from 'react-router-dom';
// import useSWR from 'swr';
// import { authState } from '../authState';
// import useFetchDetails from '../Components/Hooks/useFetchDetails';
// import { useFetchDropdownData } from '../Components/Hooks/useFetchDropdownData';  // Updated import
// import useFormValidation from '../Components/Hooks/useFormValidations';
// import axios from 'axios';

// const Detail = () => {
//   const auth = useRecoilValue(authState);
// //  const {designations}= useFetchDropdownData()
// // const designations=[]
// // const departments=[]
// // const employmentTypes=[]
//   const token = auth.token;
//   const { id } = useParams();

//   const { data: details, error, isLoading } = useSWR(
//     token && id ? ["employee/show", id, token] : null,
//     useFetchDetails
//   );
// //   const { data: , error, isLoading } = useSWR(
// //     token && id ? ["employee/show", id, token] : null,
// //     useFetchDetails
// //   );

 

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(details || {}); // Initialize with empty object
// //   const { designations, error: designationError, isLoading: designationLoading } = useDesignations();  // Using custom hook
// //   const { departments, error: departmentError, isLoading: departmentLoading } = useDepartments(); // Using custom hook
// //   const { employmentTypes, error: employmentError, isLoading: employmentLoading } = useEmploymentTypes(); // Using custom hook
//   const { errors, validateForm } = useFormValidation(formData);

//   // Update formData when details are fetched
//   useEffect(() => {
//     if (details) {
//       setFormData(details);
//     }
//   }, [details]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         await axios.put(
//           `https://core-skill-test.webc.in/employee-portal/api/v1/employee/update/${id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setIsEditing(false);
//       } catch (err) {
//         console.error('Error updating employee details:', err);
//       }
//     }
//   };

// //   if (isLoading || designationLoading || departmentLoading || employmentLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error || designationError || departmentError || employmentError) {
// //     return <div>Error fetching details!</div>;
// //   }
// console.log(token,"token")
// const fetcher = (url) => 
//     axios
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => res.data.data);

// const { data: designations, error: designationError } = useSWR('https://core-skill-test.webc.in/api/v1/settings/designations',
//     fetcher
//   );

//   console.log(designations,"designations-----")
//   const { data: departments, error: departmentError } = useSWR(
//     token ? ['https://core-skill-test.webc.in/api/v1/departments', token] : null,
//     fetcher
//   );    
//   const { data: employmentTypes, error: employmentTypeError } = useSWR(
//     token ? ['https://core-skill-test.webc.in/api/v1/employment-types', token] : null,
//     fetcher
//   );
//   console.log(designations,"designation")

//   return (
//     <div>
//       {details ? (
//         <div>
//           {!isEditing ? (
//             <div>
//               <h1>{details.name}</h1>
//               <p>Email: {details.email}</p>
//               <p>Phone: {details.phone}</p>
//               <p>Designation: {details.designation?.title}</p>
//               <p>Department: {details.department?.name}</p>
//               <p>Joining Date: {details.formatted_joining_date}</p>
//               <p>Salary: {details.salary}</p>
//               <button onClick={() => setIsEditing(true)}>Edit</button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//           <label>Name</label>
//           <input type="text" name="name" value={formData.name || ""} onChange={handleChange} />
//           {errors.name && <p>{errors.name}</p>}
          
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email || ""} onChange={handleChange} />
//           {errors.email && <p>{errors.email}</p>}
          
//           <label>Phone</label>
//           <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} />
//           {errors.phone && <p>{errors.phone}</p>}
          
//           <label>Designation</label>
//           <select name="designation_id" value={formData.designation_id || ""} onChange={handleChange}>
//             <option value="">Select Designation</option>
//             {designations.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
//           </select>
          
//           <label>Department</label>
//           <select name="department_id" value={formData.department_id || ""} onChange={handleChange}>
//             <option value="">Select Department</option>
//             {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
//           </select>
          
//           <label>Gender</label>
//           <input type="radio" name="gender" value="1" onChange={handleChange} /> Male
//           <input type="radio" name="gender" value="2" onChange={handleChange} /> Female
//           <input type="radio" name="gender" value="3" onChange={handleChange} /> Other
          
//           <label>Date of Birth</label>
//           <input type="date" name="date_of_birth" value={formData.date_of_birth || ""} onChange={handleChange} />
          
//           <label>Address</label>
//           <input type="text" name="address" value={formData.address || ""} onChange={handleChange} />
          
//           <label>City</label>
//           <input type="text" name="city" value={formData.city || ""} onChange={handleChange} />
          
//           <label>State</label>
//           <input type="text" name="state" value={formData.state || ""} onChange={handleChange} />
          
//           <label>Zip Code</label>
//           <input type="text" name="zip_code" value={formData.zip_code || ""} onChange={handleChange} />
          
//           <label>Country</label>
//           <input type="text" name="country" value={formData.country || ""} onChange={handleChange} />
          
//           <label>Employee Code</label>
//           <input type="text" name="employee_code" value={formData.employee_code || ""} onChange={handleChange} />
          
//           <label>Joining Date</label>
//           <input type="date" name="joining_date" value={formData.joining_date || ""} onChange={handleChange} />
          
//           <label>Salary</label>
//           <input type="number" name="salary" value={formData.salary || ""} onChange={handleChange} />
          
//           <label>Bank Account Number</label>
//           <input type="text" name="bank_account_number" value={formData.bank_account_number || ""} onChange={handleChange} />
          
//           <label>IFSC Code</label>
//           <input type="text" name="ifsc_code" value={formData.ifsc_code || ""} onChange={handleChange} />
          
//           <label>Emergency Contact</label>
//           <input type="text" name="emergency_contact" value={formData.emergency_contact || ""} onChange={handleChange} />
          
//           <label>Profile Picture</label>
//           <input type="file" name="profile_picture" accept="image/jpeg, image/png, image/jpg" />
          
//           <button type="submit">Save</button>
//         </form>
//           )}
//         </div>
//       ) : (
//         <div>No data available</div>
//       )}
//     </div>
//   );
// };

// export default Detail; -->
