import { Link } from 'react-router-dom';

export default function HeadBar() {
  return (
    <div className=" bg-slate-800 text-white p-2 flex space-x-3">
      <div className=" font-bold">Ratings</div>
      <button>
        <Link to={'/board'}>Boards</Link>
      </button>
      <button>
        <Link to={'/user'}>User</Link>
      </button>
    </div>
  );
}
