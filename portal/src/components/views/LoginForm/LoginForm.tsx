import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, SubmitButton, TextInput } from '../../layout';

type LoginFormProps = {
  loginUser: Function;
};

const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const LoginForm = ({ loginUser }: LoginFormProps): React.ReactElement => {
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
            const user = await loginUser({ variables: values });
            console.log(user);
            setSubmitting(false);
            resetForm();
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
