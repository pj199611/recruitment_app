import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup.string().email().required("Incorrect email or password"),
  password: yup.string().required("Incorrect email or password"),
});


export const signupFormSchema=yup.object({
    name:yup.string().required("Name is required"),
    email:yup.string().email().required("Email is required"),
    password:yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required")
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    skills:yup.string().required(),
})


export const forgotPasswordSchema=yup.object({
  resetEmail:yup.string().email().required("Reset Email is required")
})

export const resetPasswordSchema=yup.object({
  newpassword: yup.string().required("New Password is required"),
  confirmnewpassword:yup.string().required("Confirm Password is required")
  .required('Please retype your password.')
  .oneOf([yup.ref('newpassword')], 'Your passwords do not match.'),
})

export const jobPostSchema=yup.object({
  title:yup.string().required("Title is required"),
  description:yup.string().required("Description is required"),
  location:yup.string().required("Location is required")
})