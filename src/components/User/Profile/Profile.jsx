import { useSelector } from 'react-redux';
import Loader from '../../Utils/Loader/Loader';
import { Link } from 'react-router-dom';
import ClubCard from './ProfileClubCard';
import ProfileTaskCard from './ProfileTaskCard';
import ProfileSubtasksCard from './ProfileSubtasksCard';
import { AiOutlinePlus } from 'react-icons/ai';
import UserIcon from '../../../assets/UserIcon';
import MetaData from '../../Layout/MetaData';

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);


  return (
    <>
      {loading ? (
        <Loader />
      ) : user && (
        <>
          <MetaData title={`${user.name} - Profile`} />
          <div className="relative h-[6rem] bg-gray-300"></div>
          <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-8">
            <div className="relative pb-8 px-0 sm:px-2">
              <div className="mb-6 sm:mb-3 -mt-16">
                <div className="flex-row items-center flex-column sm:flex sm:justify-between sm:items-end">
                  <div className="inline-flex mb-1rem sm:mb-0 -mt-1 -ml-1">
                    <div className="rounded-full border-4 border-white">
                      {
                        user.avatar?.url ?
                          <img
                            className="rounded-full border-4 border-white h-[128px] w-[128px] object-cover"
                            src={user?.avatar?.url}
                            alt="Avatar"
                          /> :
                          <div className="bg-white rounded-full">
                            <UserIcon size={"[128px]"} />
                          </div>
                      }
                    </div>
                  </div>
                  <div className="flex gap-4 sm:mb-2">
                    <Link to={"/profile/edit"}>
                      <button className="rounded-md bg-primary-500 p-2 text-sm font-semibold text-white shadow-custom hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <header className="text-center mb-6 sm:text-left pb-4 border-b-2 border-gray-300">
                <div className="inline-flex flex-col mb-1 items-start">
                  <h1 className="text-gray-900 font-bold text-2xl">{user?.name}</h1>
                  <small className="text-gray-600">{user?.email}</small>
                </div>
              </header>
              <div className="my-4">
                <div className='mb-4'>
                  <div className='text-gray-600 font-semibold mb-2'>
                    About Me
                  </div>
                  <div className="text-sm leading-normal break-all">
                    {user.about}
                  </div>
                </div>
                <div className="flex justify-between mb-4 items-end">
                  <h2 className="text-gray-600 font-semibold">Clubs</h2>
                  <Link to="/club/create">
                    <button className="rounded-md bg-primary-500 p-2 text-sm font-semibold text-white shadow-custom hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex gap-1 items-center">
                      <AiOutlinePlus />
                      Add Club
                    </button>
                  </Link>
                </div>

                <ul className="grid sm:grid-cols-2 grid-cols gap-2">
                  {user?.clubs && user?.clubs.length > 0 ? (
                    user?.clubs.map((club) => <ClubCard key={club._id} club={club} user={user} />)
                  ) : (
                    <p className='text-sm text-slate-500'>No clubs to display</p>
                  )}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="mb-4">
                  <div className="mb-4">
                    <h2 className="text-gray-600 font-semibold mb-2">Tasks Assigned</h2>
                    {user.tasksAssigned && user.tasksAssigned.length > 0 ? (
                      user.tasksAssigned.map((task) => <ProfileTaskCard key={task._id} task={task} />)
                    ) : (
                      <p className='text-sm text-slate-500'>No tasks assigned</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-4">
                    <h2 className="text-gray-600 font-semibold mb-2">Sub Tasks Assigned</h2>
                    {user.subTasksAssigned && user.subTasksAssigned.length > 0 ? (
                      <div className="grid gap-2">
                        {user.subTasksAssigned.map((subtask) => (
                          <ProfileSubtasksCard key={subtask._id} subtask={subtask} />
                        ))}
                      </div>
                    ) : (
                      <p className='text-sm text-slate-500'>No sub tasks assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;