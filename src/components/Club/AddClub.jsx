import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, loadUser, register } from '../../redux/actions/userAction';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { display } from '../Utils/utils';
import { createClub } from '../../redux/actions/clubAction';
import { CLUB_CREATE_RESET } from '../../redux/constants/clubConstants';
import MetaData from '../Layout/MetaData';

const AddClub = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error, success } = useSelector((state) => state.club);

  const handleSubmit = () => {
    const formData = new FormData;
    formData.set("name", name);
    formData.set("description", description);

    dispatch(createClub(formData));
  }

  useEffect(() => {
    if (error) {
      display(error, "warning");
      dispatch(clearErrors());
    }

    if (success) {
      display("Club created Sucessfully", "success");
      navigate("/");
      dispatch(loadUser());
      dispatch({ type: CLUB_CREATE_RESET });
    }
  }, [dispatch, success, error, navigate])


  return (
    <>
      <MetaData title={"Add Club - Club Circle"} />
      <div className="isolate flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Club
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name <span className="text-danger-600">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Description <span className="text-danger-600">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="desctiprion"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center items-center gap-4 rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-custom hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                onClick={handleSubmit}
              >
                {
                  loading ? <>
                    < AiOutlineLoading3Quarters className='animate-spin' />
                    Loading
                  </> : <>
                    Create Club
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddClub
