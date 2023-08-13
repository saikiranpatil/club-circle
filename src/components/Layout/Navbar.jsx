import { logOut } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { display } from "../Utils/utils"
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);


  const logOutClick = () => {
    navigate("/login");
    display("Logged Out Sucessfully", "sucess");
    dispatch(logOut());
  };

  return (
    <div>
      <nav className="bg-gray-600 sticky z-10">
        <div className="mx-auto max-w-5xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between px-0 sm:px-2">
            <div className="flex flex-1 items-start justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
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
                      <button to="/" className="bg-gray-900 text-white rounded-md text-sm font-medium" aria-current="page" onClick={logOutClick}>
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
