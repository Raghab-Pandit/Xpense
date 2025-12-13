import { useState } from 'react'
import AuthPage from '../../components/AuthPage'
import { useFormik }  from 'formik'
import { loginSchema } from '../../ValidationSchema/loginSchema'
import {
  Link
} from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {

  // STATES
  const [showPassword, setShowPassword]= useState(false);


  const togglePassword = ()=>{
    setShowPassword(!showPassword);
  }

  const formik= useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,

    onSubmit: (values) => {
      console.log("Login form data", values)
    }
  })


  return (
    <AuthPage>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center mx-auto">

        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-500 mt-1.25 mb-6">Login to your account</p>

        <form onSubmit={formik.handleSubmit} className='w-70 h-auto'>

          {/* EMAIL */}
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

          {/* Password */}
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
          <div className="h-3 w-full flex items-center justify-start p-2 mt-2">
          {formik.touched.password && formik.errors.password && (
              <p className='text-[12px] text-red-500 font-semibold'>*{formik.errors.password}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}

          <button type='submit' className="btn-primary">
            LOGIN
          </button>

          <p className='text-xs'>Don't have an account? <Link className='font-medium text-primary underline' to='/register'>SignUp</Link></p>


        </form>

      </div>
    </AuthPage>
  )
}

export default Login