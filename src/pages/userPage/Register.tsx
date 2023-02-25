import React from 'react'
import { useFormik } from 'formik';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userService } from '../../services/userServices';
import { registerType } from '../../types/userType';
import Swal from 'sweetalert2';



const Register: React.FC = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
            name: '',
            phoneNumber: ''
        },
        onSubmit: async (value:any) => {
            try {
                const res = await userService.fetchApiRegister(value);
                navigate('/')
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    text: 'register is successfully!',
                    showConfirmButton: true,
                })
            } catch (err:any) {
                console.log(err)
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response.data.message,
                    showConfirmButton: true,
                })
            };
        },
    });


    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-14 mr-2" src={require('../../assets/Jira-Emblem.png')} alt="logo" />
                    Jira Clone
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register Jira Account
                        </h1>
                        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="passWord" onChange={formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input type="text" name="name" onChange={formik.handleChange} placeholder="Full Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input type="text" name="phone" onChange={formik.handleChange} placeholder="Your number phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <NavLink to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login now</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register