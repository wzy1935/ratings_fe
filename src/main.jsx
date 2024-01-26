import React from 'react';
import ReactDOM from 'react-dom/client';
// import './mock.js';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications></Notifications>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
