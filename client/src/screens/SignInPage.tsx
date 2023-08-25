/* eslint-disable @typescript-eslint/no-explicit-any */
import loginImage from '../assets/LoginPage.png'
import { NavigateFunction, useNavigate } from 'react-router'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '../store/store'; 
import { login } from '../actions/userActions';
import { addPerson } from '../store/Features/userSlice';

const SignInPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();

    const registrationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: registrationSchema,
        onSubmit: values => {
           login(values).then((response:any) => {
            localStorage.setItem("UserInfo", JSON.stringify(response.data));
            dispatch(addPerson(response.data))
            navigate('/home')
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
                        Fill what we know
                        <span className="px-1 text-custom-secondary">!</span>
                    </p>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="w-full p-2 border-b border-gray-300"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='text-custom-secondary'>{formik.errors.email}</div>
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border-b border-gray-300 mb-2"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                <button type="submit" className="w-full p-2 mt-4 bg-custom-primary text-white rounded-xl"
                >
                    Sign In
                </button>
                <button className="w-full p-2 mt-4 border-2 border-custom-primary text-custom-primary rounded-xl"
                    onClick={() => navigate('/register')}
                >
                    Sign Up
                </button>
            </form>
        </section>

    )
}

export default SignInPage