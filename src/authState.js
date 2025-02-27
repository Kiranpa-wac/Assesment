// authState.js
import { atomWithStorage } from "jotai/utils";

export const authState = atomWithStorage(
  "authState", null, undefined,
  
  { getOnInit: true }
);
