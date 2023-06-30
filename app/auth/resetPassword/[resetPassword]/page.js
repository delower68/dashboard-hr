"use client"
import Link from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter,usePathname } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname();
    const token = pathname.split('resetPassword/')[1] ;

    console.log(pathname.split('/resetPassword/')[1])

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Pasword must be 8 or more characters")
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])\w+/,
                "Password ahould contain at least one uppercase and lowercase character"
            )
            .matches(/\d/, "Password should contain at least one number")
            .matches(
                /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
                "Password should contain at least one special character"
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handelResetPassword = (data) => {
        setLoading(true);
        validationSchema
          .validate(data, { abortEarly: false })
          .then(async (formData) => {
            const resetFormData = {
              password: formData.password,
              token: token,
            };
            const response = await axios.post(
              `https://hr-management-1wt7.onrender.com/api/v1/reset_password`,
              resetFormData
            );
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                toast.success("Password reset successfully")
                router.push("/auth/login");
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) {
              const response = error.response;
              if (response.status === 500) {
                toast.error("Internal server error");
              }
            } 
          });
      };
      
    
    return (
        <AuthLayout>

        <div className='flex justify-center items-center md:4'>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-gray-400 text-sm font-bold">
                                        Reset Your Password
                                    </h6>
                                </div>

                                <hr className="mt-6 border-b-1 border-gray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                <form onSubmit={handleSubmit(handelResetPassword)}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-400 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            {...register("password")}
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.password?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-400 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                           Confirm Password
                                        </label>
                                        <input
                                            {...register("confirmPassword")}
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Confirm password"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.confirmPassword?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        value="Submit"
                        type="submit"
                        disabled={loading}
                      >
                        {!loading && <span className='indicator-label'> Submit</span>}
                        {loading && (
                          <span className='indicator-progress' style={{ display: 'block' }}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AuthLayout>
    )
}

export default ResetPassword