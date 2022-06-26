import { Form, Formik } from 'formik';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Container, SubmitButton, TextInput } from '../../layout';
import './RegisterForm.scss';

type RegisterFormProps = {
  registerUser: Function;
  setAuth: Function;
  googleKey: string;
};

const RegisterFormValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  username: Yup.string().min(3, 'Too short!').required('Required'),
  password: Yup.string().min(3, 'Too short!').required('Required'),
  password_confirm: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const RegisterForm = ({
  registerUser,
  googleKey,
  setAuth,
}: RegisterFormProps): React.ReactElement => {
  const navigator = useNavigate();
  return (
    <Container>
      <div className="form-holder">
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            password_confirm: '',
          }}
          validationSchema={RegisterFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const user = await registerUser({ variables: values });
            setAuth({ isLoggedIn: true, user });
            setSubmitting(false);
            resetForm();
            navigator('/dash');
          }}
        >
          {props => <Form>
            <div className="form-row">
              <TextInput
                name="first_name"
                label="First Name"
                type="text"
                placeholder="Jane"
              />
              <TextInput
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Doe"
              />
            </div>
            <TextInput
              name="username"
              label="Username"
              type="text"
              placeholder="jane33"
            />
            <div className="form-row">
              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
              />
              <TextInput
                name="password_confirm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <SubmitButton disabled={!props.isValid} label="Register" />
          </Form>}
        </Formik>
      </div>
    </Container>
  );
};
export default RegisterForm;
