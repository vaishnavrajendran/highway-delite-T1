/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../config/axios';
import { UserInfoType } from '../screens/OtpVerification';

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
        return await axios.post("/auth/register", userDetails, config)
            .catch((err: any) => {
                console.log("Error occured in registering:", err.message);
                return err;
            });
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
            .catch((err: any) => {
                console.log("Error occured in fetching:", err.message);
                return err;
            });
    } catch (error: any) {
        console.log("Error occured in fetching:", error.message);
    }
};

export const compareOtp = async (userInfo: UserInfoType, otp:string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-type": "application/json",
            },
        };
        const data = {
            email:userInfo.email,
            otp
        }
        return await axios
            .post("/auth/fetch-otp", data, config)
            .then(response => response.data)
            .catch((err: any) => {
                console.log("Error occured in fetching OTP:", err.message);
                return err;
            });
    } catch (error) {
        console.log("Error finding otp", error);
    }
}