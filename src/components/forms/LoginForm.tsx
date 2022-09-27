import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';


// Define schema for validation with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const LoginForm = () => {
    const initialCredentials = {
        email: '',
        password: '',
    };

    return (
        <div>
          <h4>Login form</h4>
          <Formik
           initialValues={initialCredentials} validationSchema={validationSchema} onSubmit={ async (values) => {
            login(values.email, values.password).then((response: AxiosResponse) => {
              if(response.status === 200){
                if(response.data.token){
                  sessionStorage.setItem('token', response.data.token);
                }else{
                  throw new Error('Invalid token');
                }
              }else{
                throw new Error('Invalid credentials');
              }
            }).catch((error) => {
              console.error(`[LOGIN ERROR]: Something went wrong: ${error}`);
            });
           }}>

            {({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => (
              <Form>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="example@email.com" />
                {/** Display error message if email is invalid */}
                { touched.email && errors.email && (
                  <ErrorMessage name='email' component='div' />
                )}
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="example"/>
                {/** Display error message if password is invalid */}
                { touched.password && errors.password && (
                  <ErrorMessage name='password' component='div' />
                )}
                <button type="submit">Login</button>

                {/** Message if the form is submitting */}
                { isSubmitting ? (<p>Checking credentials...</p>) : null }
              </Form>
            )}

          </Formik>
        </div>
    );
};

export default LoginForm;