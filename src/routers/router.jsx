import { createHashRouter } from 'react-router-dom';

import App from '../App.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import UserPage from '../pages/UserPage.jsx';
import BoardPage from '../pages/BoardPage.jsx';
import RatingPage from '../pages/RatingPage.jsx';
import Content from '../pages/Content.jsx';
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Content />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: '/user',
        element: <UserPage />
      },
      {
        path: '/board',
        element: <BoardPage />
      },
      {
        path: '/rating/:board_id',
        element: <RatingPage />
      }
    ],
  },
]);

export default router