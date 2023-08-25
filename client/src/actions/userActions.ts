/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../config/axios';

export type UserDetailsType = {
    fName: string,
    lName: string,
    password: string,
    email: string
}

export type LoginType = {
    email: string,
    password: string
}

export const register = async (userDetails: UserDetailsType) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        return await axios.post("/auth/register", userDetails, config);
    } catch (error: any) {
        console.log("Error occured while Registering User", error.message);
    }
}

export const login = async (formData: LoginType) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      return await axios
        .post("/auth/login", formData, config)
        .catch((err:any) => {
            console.log("Error occured in fetching:", err.message);
        });
    } catch (error:any) {
        console.log("Error occured in fetching:", error.message);
    }
  };