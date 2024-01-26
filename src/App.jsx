import HeadBar from './components/HeadBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className=' min-h-screen h-screen flex flex-col'>
      <HeadBar />
      <Outlet />
    </div>
  );
}

export default App;
