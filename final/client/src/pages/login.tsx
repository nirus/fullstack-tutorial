import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm } from '../components';
import { isLoggedInVar } from '../cache';
import * as LoginTypes from './__generated__/login';
import { v5 as uuidNameSpace, v4 as getNS } from 'uuid';

const RequestNameSpace = getNS();

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login.token as string);
        localStorage.setItem('userId', login.id as string);
        isLoggedInVar(true);
      },
      context:{ requestTrackerId: uuidNameSpace('LOGIN', RequestNameSpace) }
    }
  );

  return <LoginForm error={error} loading={loading} login={login} />;
}
