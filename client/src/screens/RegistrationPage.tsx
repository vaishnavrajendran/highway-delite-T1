/* eslint-disable @typescript-eslint/no-explicit-any */
import registrationImage from '../assets/Registration.png'
import { NavigateFunction, useNavigate } from 'react-router'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '../store/store';
import { register } from '../actions/userActions';
import { addPerson } from '../store/Features/userSlice';
import { useState } from 'react';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormValues {
    fName: string;
    lName: string;
    email: string;
    password: string;
    repPassword: string;
}

const RegistrationPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepPassword, setShowRepPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleRepPasswordVisibility = () => {
        setShowRepPassword(prev => !prev);
    };

    const toggleDropdown = () => {
        setOpen(prev => !prev)
    }

    const registrationSchema = yup.object({
        fName: yup.string().min(4, 'First Name Should be mininum 4 characters').required('First name is required'),
        lName: yup.string().min(1, 'Last Name Should be mininum 1 characters').required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        repPassword: yup.string().min(8, 'Password must be at least 8 characters').oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            password: '',
            repPassword: '',
        },
        validationSchema: registrationSchema,
        onSubmit: (values: FormValues) => {
            setLoading(true);
            register(values).then((response: any) => {
                setLoading(false)
                if (typeof response.response?.data.error !== 'undefined') {
                    return setMessage(response.response.data.error)
                }
                dispatch(addPerson(response.data))
                navigate('/otp-verification')
            })
        }
    });

    return (
        <section className="flex justify-center items-center min-h-screen">
            <img src={registrationImage} alt="Login Image" className="w-1/3 p-4 hidden md:block" />
            <form
                onSubmit={formik.handleSubmit}
                className="w-1/3 px-9 py-5 border rounded-2xl border-r-2 border-gray-300 shadow-md max-md:w-full max-md:mx-10">
                <div className="md:flex justify-between max-md:text-center">
                    <p className=" text-4xl mb-4 text-custom-primary font-bold">
                        Let us know
                        <span className="px-1 text-custom-secondary">!</span>
                    </p>
                    <p className="flex text-2xl px-4 text-center cursor-pointer underline max-md:justify-center"
                        onClick={() => navigate('/')}
                    >
                        <span className="text-custom-primary underline">Sign</span>
                        <span className="text-custom-secondary underline">In</span>
                    </p>
                </div>
                <input
                    type="text"
                    name="fName"
                    placeholder="First Name"
                    required
                    className="w-full p-2 border-b border-gray-300 mb-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fName}
                />
                {formik.touched.fName && formik.errors.fName && (
                    <div className='text-custom-secondary'>{formik.errors.fName}</div>
                )}
                <input
                    type="text"
                    name="lName"
                    placeholder="Last Name"
                    className="w-full p-2 border-b border-gray-300 mb-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lName}
                />
                {formik.touched.lName && formik.errors.lName && (
                    <div className='text-custom-secondary'>{formik.errors.lName}</div>
                )}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Set Password"
                        required
                        className="w-full p-2 border-b border-gray-300 mb-2 pr-10"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-2 cursor-pointer text-custom-primary"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div className='text-custom-secondary'>{formik.errors.password}</div>
                )}
                <div className="relative">
                    <input
                        type={showRepPassword ? 'text' : 'password'}
                        name="repPassword"
                        placeholder="Retype Password"
                        required
                        className="w-full p-2 border-b border-gray-300 mb-2 pr-10"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repPassword}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-2 cursor-pointer text-custom-primary"
                        onClick={toggleRepPasswordVisibility}
                    >
                        {showRepPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {formik.touched.repPassword && formik.errors.repPassword && (
                    <div className='text-custom-secondary'>{formik.errors.repPassword}</div>
                )}
                <Dropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    className="w-full p-2 border-b border-gray-300"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='text-custom-secondary'>{formik.errors.email}</div>
                )}
                {
                    message && <div className='text-custom-secondary text-center'>{message}</div>
                }
                <button type="submit" className="w-full p-2 mt-4 bg-custom-primary text-white rounded-xl">
                    {loading ? <div className='flex w-full justify-center'><Loading /></div> : 'Sign Up'}
                </button>
            </form>
        </section>

    )
}

export default RegistrationPage