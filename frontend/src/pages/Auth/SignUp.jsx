import React, { useState } from 'react'
import AuthPage from '../../components/AuthPage'
import { useFormik } from 'formik';
import { registerSchema } from '../../ValidationSchema/registerSchema';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ProfilePicSelector from '../../components/ProfilePicSelector';

const SignUp = () => {
    // STATES
    const [showPassword, setShowPassword]= useState(false);
    const [profilePic, setProfilePic]= useState('');
  
  
    const togglePassword = ()=>{
      setShowPassword(!showPassword);
    }
  
    const formik= useFormik({
      initialValues: {
        fullname:'',
        email: '',
        password: '',
        confirmpassword:''
      },
      validationSchema: registerSchema,
  
      onSubmit: (values) => {
        console.log("Login form data", values)
      }
    })

  return (
    <AuthPage>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center mx-auto">

        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-500 mt-1.25 mb-6">Join xPense and examine your finances</p>

        <form onSubmit={formik.handleSubmit} className='w-140 h-auto flex flex-col items-center space-y-3'>

          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 sm:grid-cols-2 space-x-2">
          {/* FULL NAME */}
        <div className="">
          <label className={`ml-2 ${formik.touched.fullname && formik.errors.fullname ? 'text-red-600' : 'text-slate-600'}`}>Full Name</label>
          <div className={`w-full mt-1 h-12 p-2 flex border-2 rounded-2xl bg-gray-200 ${formik.touched.fullname && formik.errors.fullname ? 'border-red-500' : 'border-blue-500'}`}>
              <input
                type='text'
                name='fullname'
                placeholder= 'Full Name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullname}
                className='w-full outline-none text-slate-800'
              />
          </div>
          <div className="h-6 w-full flex items-center justify-start p-2">
          {formik.touched.fullname && formik.errors.fullname && (
              <p className='text-[12px] text-red-500 font-semibold'>*{formik.errors.fullname}</p>
            )}
          </div>
          </div>

          {/* EMAIL */}
          <div className="">
          <label className={`ml-2 ${formik.touched.email && formik.errors.email ? 'text-red-600' : 'text-slate-600'}`}>Email</label>
          <div className={`w-full mt-1 h-12 p-2 flex border-2 rounded-2xl bg-gray-200 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-blue-500'}`}>
              <input
                type='email'
                name='email'
                placeholder= 'Enter your Email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className='w-full outline-none text-slate-800'
              />
          </div>
          <div className="h-6 w-full flex items-center justify-start p-2">
          {formik.touched.email && formik.errors.email && (
              <p className='text-[12px] text-red-500 font-semibold'>*{formik.errors.email}</p>
            )}
          </div>
          </div>

          {/* Password */}
          <div className="">
          <label className={`mt-3 ml-2 ${formik.touched.password && formik.errors.password ? 'text-red-600' : 'text-slate-600'}`}>Password</label>
          <div className={`w-full h-12 p-2 mt-1 flex border-2 rounded-2xl bg-gray-200 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-blue-500'}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                  placeholder= 'Password'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className='w-[90%] outline-none text-slate-800'
              />
              <div className="flex items-center justify-center w-[10%]">
                {formik.values.password &&
                <button type='button' className="cursor-pointer" onClick={togglePassword}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>}
              </div>
          </div>
          <div className="h-3 flex items-center justify-start p-2 mt-2">
          {formik.touched.password && formik.errors.password && (
              <p className='text-[12px] text-red-500 font-semibold'>*{formik.errors.password}</p>
            )}
          </div>
          </div>

          {/* CONFIRM Password */}
          <div className="">
          <label className={`mt-3 ml-2 ${formik.touched.confirmpassword && formik.errors.confirmpassword ? 'text-red-600' : 'text-slate-600'}`}>Confirm Password</label>
          <div className={`w-full h-12 p-2 mt-1 flex border-2 rounded-2xl bg-gray-200 ${formik.touched.confirmpassword && formik.errors.confirmpassword ? 'border-red-500' : 'border-blue-500'}`}>
              <input
                type='password'
                name='confirmpassword'
                  placeholder= 'Password'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                className='w-[90%] outline-none text-slate-800'
              />
          </div>
          <div className="h-3 w-full flex items-center justify-start p-2 mt-2">
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
              <p className='text-[12px] text-red-500 font-semibold'>*{formik.errors.confirmpassword}</p>
            )}
          </div>
          </div>
        </div>

          {/* SUBMIT BUTTON */}

          <button type='submit' className="btn-primary w-[50%]">
            Sign Up
          </button>

          <p className='text-xs'>Already have an account? <Link className='font-medium text-primary underline' to='/login'>Log In</Link></p>


        </form>

      </div>
    </AuthPage>
  )
}

export default SignUp