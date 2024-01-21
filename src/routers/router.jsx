import { createBrowserRouter } from 'react-router-dom';

import App from '../App.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import UserPage from '../pages/UserPage.jsx';
import BoardPage from '../pages/BoardPage.jsx';
import RatingPage from '../pages/RatingPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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