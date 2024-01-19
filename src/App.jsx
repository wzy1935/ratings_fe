import { Content } from './components/Content';
import HeadBar from './components/HeadBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className=' min-h-screen h-screen bg-slate-50 flex flex-col'>
      <HeadBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
