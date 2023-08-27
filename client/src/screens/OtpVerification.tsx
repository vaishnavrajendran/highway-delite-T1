import { useState } from "react";
import loginImage from '../assets/LoginPage.png'
import { NavigateFunction, useNavigate } from 'react-router'
import { useFormik } from 'formik';
import Loading from "../components/Loading";
import { useAppSelector } from "../store/store";
import { compareOtp } from "../actions/userActions";

export interface UserInfoType {
    email: string,
    fName: string,
    lName: string,
    token: string
}

interface FormValues {
    otp: number | string
}

const OtpVerification = () => {
    const navigate: NavigateFunction = useNavigate();
    const userInfo: UserInfoType = useAppSelector(state => state.person.userInfo)
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage ] = useState<string>('');

    const formik = useFormik<FormValues>({
        initialValues: {
            otp: ''
        },
        onSubmit: (values: FormValues) => {
            setLoading(true);
            compareOtp(userInfo, values.otp).then((res) => {
                if(res.message === 'Otp Verified')
                navigate('/home')
                else if (res.message === 'Wrong Otp'){
                    setLoading(false)
                    setMessage('Wrong Otp')
                }
            })
        }
    });

    return (
        <section className="flex justify-center items-center min-h-screen">
            <img src={loginImage} alt="Login Image" className="w-1/3 p-4 hidden md:block" />
            <form className="w-1/3 px-9 py-5 border rounded-2xl border-r-2 border-gray-300 shadow-md max-md:w-full max-md:mx-10"
                onSubmit={formik.handleSubmit}
            >
                <div className="justify-between max-md:text-center">
                    <p className=" text-4xl mb-4 text-custom-primary font-bold">
                        Enter otp sended to your mail
                    </p>
                </div>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter Otp"
                    className="w-full p-2 border-b border-gray-300"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                />
                {
                    message && <div className='text-custom-secondary text-center'>{message}</div>
                }
                <button type="submit" className="w-full p-2 mt-4 bg-custom-primary text-white rounded-xl"
                >
                    {loading ? <Loading /> : 'Verify'}

                </button>
            </form>
        </section>

    )
}

export default OtpVerification