import * as Yup from 'yup';

const AuthValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export default AuthValidationSchema;
