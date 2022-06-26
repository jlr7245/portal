import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, SubmitButton, TextInput } from '../../layout';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  login: Function;
  setAuth: Function;
};

const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = ({ login, setAuth }: LoginFormProps): React.ReactElement => {
  const navigation = useNavigate();
  return (
    <Container>
      <div className="form-holder">
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const user = await login({ variables: values });
            setSubmitting(false);
            resetForm();
            setAuth({ isLoggedIn: true, user });
            navigation('/dash');
          }}
        >
          {(props) => (
            <Form>
              <div className="form-row">
                <TextInput
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="jane33"
                />
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <SubmitButton disabled={!props.isValid} label="Log in" />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
