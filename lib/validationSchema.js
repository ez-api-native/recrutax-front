import * as Yup from 'yup';

export const AuthValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export const OfferValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  companyDescription: Yup.string().required('This field is required'),
  offerDescription: Yup.string().required('This field is required'),
  contractType: Yup.string().required('This field is required'),
  place: Yup.string().required('This field is required'),
});
