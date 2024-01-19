import {
  Card,
  Title,
  Text,
  Button,
  LoadingOverlay,
  PasswordInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import userApi from '../apis/userApi';
import router from '../routers/router';
import { notifications } from '@mantine/notifications';

export default function UserPage() {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [oldPs, setOldPs] = useState('');
  const [newPs, setNewPs] = useState('');
  const [psSetting, setPsSetting] = useState(false);
  const [loading, setLoading] = useState(true);

  function logout() {
    localStorage.removeItem('token');
    location.reload();
  }

  function setNewPassword() {
    setPsSetting(true);
    userApi.changePassword(oldPs, newPs).then((resp) => {
      notifications.show({
        title: 'Change Password',
        color: resp.code in ['SUCCESS'] ? 'blue' : 'red',
        message: {
          SUCCESS: 'Success!',
          WRONG_OLD_PASSWORD: 'Your old password is incorrect.',
          INVALID: 'Password format incorrect.',
        }[resp.code],
      });
      setOldPs('');
      setNewPs('');
      setPsSetting(false);
    });
  }

  useEffect(() => {
    (async () => {
      const userInfo = await userApi.userInfo();
      if (userInfo.data.role === 'BASE') {
        router.navigate('/auth');
      }
      setUserName(userInfo.data.user_name);
      setRole(userInfo.data.role);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="flex flex-col w-full items-center p-4">
      <LoadingOverlay className="" visible={loading} />
      <Card className=" w-full max-w-2xl mt-5 m-4 flex space-y-4 ">
        <Title order={2}>User Info</Title>

        <div className=" flex flex-col space-y-1">
          <hr />
          <Text>Username: {userName}</Text>
          <hr />
          <Text>Role: {role}</Text>
          <hr />
        </div>

        <div className=" flex space-x-2">
          <Button color="red.7" onClick={logout}>
            Logout
          </Button>
        </div>
      </Card>

      <Card className=" w-full max-w-2xl mt-5 flex space-y-4 ">
        <Title order={2}>Change Password</Title>

        <PasswordInput
          label="Old Password"
          onChange={(e) => setOldPs(e.currentTarget.value)}
          value={oldPs}
        ></PasswordInput>
        <PasswordInput
          label="New Password"
          onChange={(e) => setNewPs(e.currentTarget.value)}
          value={newPs}
        ></PasswordInput>

        <div className=" flex space-x-2">
          <Button onClick={setNewPassword} loading={psSetting}>Confirm</Button>
        </div>
      </Card>
    </div>
  );
}
