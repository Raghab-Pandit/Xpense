import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is Required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Atleast 6 characters').required('Password is required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Password Must Match').required('Confirm Your Password')
})