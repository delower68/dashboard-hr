"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import AuthLayout from '@/components/AuthLayout';
import { toast } from 'react-toastify';

const forgetPassword = () => {
  const [loading, setLoading] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleForgetPass = (data) => {
    setLoading(true);
    validationSchema
      .validate(data, { abortEarly: false })
      .then(async (formData) => {
        const response = await axios.get(
          `https://hr-management-1wt7.onrender.com/api/v1/forgot_password/${formData.email}`
        );
        if (response.status >= 200 && response.status < 300) {
          toast.info("Check your email to reset password");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const response = error.response;
          if (response.status === 404) {
            toast.error("Email not found");
          } 
          else if (response.status >= 500) {
            toast.error("Internal server error");
          } 
        } else if (error.request) {
          toast.error("No response from server");
        } else {
          console.log("Error", error.message);
          toast.error("An error occurred");
        }
        console.log(error.config);
      });
  };

  return (
    <AuthLayout>
      <div className="container mx-auto px-4  h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-600  border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-400 text-sm font-bold">Your Email</h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(handleForgetPass)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-400 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-2">{errors.email?.message}</p>
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
    </AuthLayout>
  );
};

export default forgetPassword;
