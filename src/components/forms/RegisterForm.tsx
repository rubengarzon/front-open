import react from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../services/authService";
import { AxiosResponse } from "axios";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    age: 18,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters")
      .max(12, "Name must be less than 12 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Password confirmation is required"),
    age: Yup.number()
      .min(18, "You must be at least 18 years old")
      .max(100, "You must be less than 100 years old")
      .required("Age is required"),
  });

  return (
    <div>
      <h4>Register as a new user</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          register(values.name, values.email, values.password, values.age)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                console.log("User registered successfully " + response.data);
                alert("User registered successfully");
              } else {
                throw new Error("Error registering user");
              }
            })
            .catch((error) => {
              console.error(`[Register ERROR]: Something went wrong: ${error}`);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" placeholder="Your name" />
            {/** Display error message if name is invalid */}
            {touched.name && errors.name && (
              <ErrorMessage name="name" component="div" />
            )}
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" placeholder="example@email.com" />
            {/** Display error message if email is invalid */}
            {touched.email && errors.email && (
              <ErrorMessage name="email" component="div" />
            )}
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" placeholder="Password" />
            {/** Display error message if password is invalid */}
            {touched.password && errors.password && (
              <ErrorMessage name="password" component="div" />
            )}
            <label htmlFor="confirm">Confirm password</label>
            <Field type="password" name="confirm" placeholder="Confirm your password" />
            {/** Display error message if password confirmation is invalid */}
            {touched.confirm && errors.confirm && (
              <ErrorMessage name="confirm" component="div" />
            )}
            <label htmlFor="age">Age</label>
            <Field type="number" name="age" placeholder="18" />
            {/** Display error message if age is invalid */}
            {touched.age && errors.age && (
              <ErrorMessage name="age" component="div" />
            )}
            <button type="submit">Register</button>

            {/** Message if the form is submitting */}
            {isSubmitting ? <p>Sending data...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
