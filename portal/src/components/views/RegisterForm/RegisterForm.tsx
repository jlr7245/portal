import { Form, Formik } from 'formik';
import Autocomplete from 'react-google-autocomplete';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  AddressInput,
  Container,
  SubmitButton,
  TextInput,
  UploadImage,
} from '../../layout';
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
  email: Yup.string().email().required('Required'),
  photo: Yup.string().required('Required'),
});

const RegisterForm = ({
  registerUser,
  googleKey,
  setAuth,
}: RegisterFormProps): React.ReactElement => {
  const navigator = useNavigate();
  const [address, setAddress] = useState('');
  return (
    <Container>
      <div className="form-holder">
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            password_confirm: '',
            photo: '',
          }}
          validationSchema={RegisterFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const photo_url = localStorage.getItem('photo_url');
            const user = await registerUser({
              variables: { photo_url, address, ...values },
            });
            setAuth({ isLoggedIn: true, user });
            setSubmitting(false);
            resetForm();
            navigator('/dash');
          }}
        >
          {(props) => (
            <Form>
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
              <div className="form-row">
                <TextInput
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="jane33"
                />
                <TextInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="jane33@jmail.com"
                />
              </div>
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
              <div className="form-row">
                <UploadImage name="photo" label="Upload License" required />
              </div>
              <div className="form-row">
                <AddressInput
                  googleKey={googleKey}
                  setAddress={setAddress}
                  address={address}
                  label="Address"
                  name="address"
                />
              </div>
              <SubmitButton disabled={!props.isValid} label="Register" />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
export default RegisterForm;
