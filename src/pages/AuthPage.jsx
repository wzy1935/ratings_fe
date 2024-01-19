import { Card, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import userApi from '../apis/userApi';
import { useState } from 'react';
import router from '../routers/router';
import { notifications } from '@mantine/notifications';

function Login({ flipCb }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function login() {
    setLoading(true)
    userApi.login(name, password).then((resp) => {
      if (resp.code === 'SUCCESS') {
        localStorage.setItem('token', resp.data.jwt);
        router.navigate('/');
      } else {
        notifications.show({
          title: 'Login',
          color: resp.code in ['SUCCESS'] ? 'blue' : 'red',
          message: {
            'INVALID': 'Invalid input.',
            'INCORRECT': 'Incorrect username or password.'
          }[resp.code]
        })
      }
      setLoading(false)
    });
  }

  return (
    <Card className=" mt-10 m-4 flex space-y-2">
      <Text>Login</Text>

      <TextInput
        label="Username"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      ></TextInput>
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></PasswordInput>
      <div className=" flex space-x-2">
        <Button onClick={login} loading={loading}>Login</Button>
        <Button variant="light" onClick={flipCb}>
          Sign up?
        </Button>
      </div>
    </Card>
  );
}

function Signup({ flipCb }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function signup() {
    setLoading(true);
    userApi.signup(name, password).then((resp) => {
      notifications.show({
        title: 'Sign up',
        color: resp.code in ['SUCCESS'] ? 'blue' : 'red',
        message: {
          INVALID: 'Invalid input.',
          ALREADY_EXISTED: 'User already existed.',
          SUCCESS: 'Success! Now you can login.',
        }[resp.code],
      });
      setName('');
      setPassword('');
      setLoading(false);
      if (resp.code === 'SUCCESS') {
        flipCb()
      }
    });
  }

  return (
    <Card className=" mt-10 m-4 flex space-y-2">
      <Text>Sign up</Text>

      <TextInput
        label="Username"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      ></TextInput>
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></PasswordInput>
      <div className=" flex space-x-2">
        <Button onClick={signup}>Sign up</Button>
        <Button variant="light" onClick={flipCb} loading={loading}>
          Login?
        </Button>
      </div>
    </Card>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  function flipCb() {
    setIsLogin((isLogin) => !isLogin);
  }

  return (
    <div className=" flex justify-center">
      <div className=" max-w-xl w-full">
        {isLogin ? <Login flipCb={flipCb} /> : <Signup flipCb={flipCb} />}
      </div>
    </div>
  );
}
