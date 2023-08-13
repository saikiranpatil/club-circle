import { logout } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { display } from "../Utils/utils"
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);


  const logOutClick = () => {
    dispatch(logout());
    display("Logged Out Sucessfully", "sucess");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-gray-600 sticky z-10">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between px-0 sm:px-2">
            <div className="flex flex-1 items-start justify-between">
              <div className="flex flex-shrink-0 items-center">
                <div className="relative rounded-full bg-primary-600 h-[32px] w-[32px] overflow-hidden border-2 border-primary-600">
                  <div className='rounded-full absolute top-[-1px] right-[-2px] bg-gray-600 h-[30px] w-[25px] p-0'></div>
                </div>
                <h2 className="text-gray-300 rounded-md px-3 py-2 text-lg font-medium">

                  Club Circle
                </h2>
              </div>
              {
                isAuthenticated && <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative ml-3">
                    <div className="flex space-x-4">
                      <Link to="/" className="bg-gray-900 text-white rounded-mdtext-sm font-medium" aria-current="page">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user?.avatar.url}
                          alt=""
                        />

                      </Link>
                      <button to="/" className="bg-gray-900 text-white/50 hover:text-white rounded-md text-sm font-medium" aria-current="page" onClick={logOutClick}>
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
