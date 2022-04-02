import React, { FunctionComponent, useState, useContext } from 'react';
import { Formik, Field, Form, FormikHelpers, FormikState } from 'formik';
import { ILoginForm, submitLogin } from 'utils';
import { Button, Notification, Flex } from 'components';
import { Panel } from '../../../UI';
import styled from 'styled-components';
import * as Yup from 'yup';
import { AppContext } from 'store';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  /**
   * Email validator.
   */
  username: Yup.string().required('Username is required.'),
  /**
   * Password validator.
   */
  password: Yup.string().required('Password is required.'),
});

const FormContainer = styled(Panel)`
  width: 400px;
  max-width: 100%;
  margin: 4rem auto;
  padding: 3rem;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Input = styled(Field)`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const FieldContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginForm: FunctionComponent = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (
    values: ILoginForm,
    { setSubmitting }: FormikHelpers<ILoginForm>,
  ): void => {
    setError('');
    setSuccess(false);
    submitLogin(values)
      .then(res => {
        updateToken(res.token);
        setSubmitting(false);
        setSuccess(true);
        navigate('/home');
      })
      .catch(err => {
        setError(err.message ? err.message : 'Oops, something went wrong.');
        setSubmitting(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}>
        {({
          isSubmitting,
          errors,
          touched,
        }: FormikState<ILoginForm>): JSX.Element => (
          <FormContainer>
            <Form>
              <FieldContainer>
                <Label htmlFor="username">Username</Label>
                <Input
                  data-testid="username-input"
                  id="username"
                  name="username"
                  type="text"
                />
                {errors.username && touched.username ? (
                  <Notification data-testid="username-notification">
                    {errors.username}
                  </Notification>
                ) : null}
              </FieldContainer>

              <FieldContainer>
                <Label htmlFor="password">Password</Label>
                <Input
                  data-testid="password-input"
                  id="password"
                  type="password"
                  name="password"
                />
                {errors.password && touched.password ? (
                  <Notification data-testid="password-notification">
                    {errors.password}
                  </Notification>
                ) : null}
              </FieldContainer>

              <Button
                data-testid="submit-button"
                primary
                type="submit"
                disabled={isSubmitting}
                style={{ marginBottom: '1rem' }}>
                {!isSubmitting ? 'Login' : 'Logging in...'}
              </Button>

              {error && (
                <Notification data-testid="error-notification">
                  {error}
                </Notification>
              )}

              {success && <div data-testid="success-notification"></div>}
            </Form>
          </FormContainer>
        )}
      </Formik>

      <Flex direction="column">
        <p style={{ margin: '0' }}>Username: mor_2314</p>
        <p>Password: 83r5^_</p>
      </Flex>
    </>
  );
};
