import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleClub, clearErrors, deleteClub } from "../../redux/actions/clubAction"
import { display } from '../Utils/utils';
import Loader from '../Utils/Loader/Loader';
import { IoMdAdd } from "react-icons/io"
import ClubTask from './ClubTask';
import { Tooltip } from 'react-tooltip';
import SetRole from './SetRole';
import { AiFillDelete } from 'react-icons/ai';
import { loadUser } from '../../redux/actions/userAction';
import { deleteTask } from '../../redux/actions/taskAction';
import { TASK_DELETE_RESET } from '../../redux/constants/taskConstants';
import MetaData from '../Layout/MetaData';
const taskTitles = [
    {
        "title": 'Not Started',
        "text": "Not Started 🖋️",
    },
    {
        "title": "In Progress",
        "text": "In Progress ✌️",
    },
    {
        "title": "Completed",
        "text": "Completed 🎉"
    }
];

const Club = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { club, loading, isDeleted } = useSelector((state) => state.club);
    const [clubUpdated, setClubUpdated] = useState(false);
    const { isDeleted: isTaskDeleted } = useSelector((state) => state.task);


    const handleDelete = () => {
        dispatch(deleteClub(club._id));
    }

    const handleTaskDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    }

    useEffect(() => {
        dispatch(getSingleClub(id));

        if (isDeleted) {
            dispatch(loadUser())
            display("Club Deleted Sucressfully", "info");
            navigate("/");
        }

        if (isTaskDeleted) {
            display("Task Deleted Sucessfully", "success");
            dispatch({ type: TASK_DELETE_RESET });
        }
    }, [id, dispatch, clubUpdated, isDeleted, navigate, isTaskDeleted]);

    return loading ? (
        <Loader />
    ) : club && (
        <>
            <MetaData title={`Club: ${club.name}`} />
            <div className="max-w-6xl mx-auto py-10 sm:py-16">
                <div className="mx-auto px-4 lg:px-8">
                    <div className="mb-10">
                        <div className="flex gap-2">
                            <h2 className="text-slate-800 font-bold text-2xl break-all capitalize">{club.name}</h2>
                            <button id='delete-club-btn' onClick={handleDelete}>
                                <AiFillDelete className='fill-gray-300 hover:fill-black-800 my-1' />
                            </button>
                            <Tooltip anchorSelect='#delete-club-btn' place="bottom">
                                Delete Club
                            </Tooltip>
                        </div>
                        <p className="text-sm text-gray-600 leading-normal break-all">
                            {club.description}
                        </p>
                    </div>
                    <div className=''>
                        <div className='mb-10'>
                            <div className="flex justify-between items-end mb-6">
                                <h4 className='text-xl font-semibold tracking-tight text-gray-600 sm:text-lg'>
                                    Members
                                </h4>
                                <button id='setroles' className="rounded-md bg-primary-500 p-2 text-sm font-semibold text-white hover:bg-primary-600 focus:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-1">
                                    <IoMdAdd /> Set Roles
                                </button>
                                <Tooltip
                                    anchorSelect="#setroles"
                                    place="bottom"
                                    events="click"
                                    variant='light'
                                    clickable
                                ><SetRole setClubUpdated={setClubUpdated} /> </Tooltip>
                            </div>
                            <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {club && club?.members?.map((member) => (
                                    <li key={member._id} className="flex items-center justify-between p-2 bg-white rounded-[10px] ring-[0.5px] ring-inset ring-gray-300 shadow-custom">
                                        <img className="h-14 w-14 rounded-full object-cover border border-gray-300" src={member?.avatar?.url} alt="" />
                                        <h3 className="text-sm font-medium leading-6 text-gray-500 break-all capitalize">{member.name}</h3>
                                        <span className="text-sm text-gray-600 font-normal leading-6 break-all capitalize">
                                            {member.role == "cadmin" ? "Club Admin" : "Member"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-6">
                                <h4 className='text-xl font-semibold tracking-tight text-gray-600 sm:text-lg'>
                                    Tasks
                                </h4>
                                <Link to={`/task/create/${club._id}`} className="rounded-md bg-primary-500 p-2 text-sm font-semibold text-white hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-1">
                                    <IoMdAdd /> Add Task
                                </Link>
                            </div>
                            <div className="flex flex-col gap-6 sm:flex-row justify-between">
                                {taskTitles.map((sectionTitle, index) => {
                                    const tasksInSection = club.tasks?.filter((task) => task.status === sectionTitle.title);
                                    return (
                                        <div className='w-full' key={club._id + index}>
                                            <h2 className="text-slate-800 font-medium text-ellipsis grow overflow-hidden whitespace-nowrap mb-4">{sectionTitle.text}</h2>
                                            <ul role="list" className="flex flex-col gap-4">
                                                {tasksInSection?.length === 0 ? (
                                                    <li className='text-gray-500 text-sm'>No Tasks Present Here</li>
                                                ) : (
                                                    tasksInSection?.map((task) => (
                                                        <ClubTask key={task._id} task={task} handleTaskDelete={handleTaskDelete} />
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Club
