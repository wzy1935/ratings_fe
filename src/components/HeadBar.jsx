import { Link } from 'react-router-dom';

export default function HeadBar() {
  return (
    <div className=" bg-gray-700 text-white p-2 flex space-x-3">
      <button>
        <Link to={'/'} className="font-bold">Ratings</Link>
      </button>
      <button>
        <Link to={'/board'}>Boards</Link>
      </button>
      <button>
        <Link to={'/user'}>User</Link>
      </button>
    </div>
  );
}
