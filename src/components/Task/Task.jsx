import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, clearErrors, updateTask } from "../../redux/actions/taskAction"
import { display, formatDateForForm } from '../Utils/utils';
import Loader from '../Utils/Loader/Loader';
import Subtasks from './Subtask/Subtasks';
import AddSubtask from './Subtask/AddSubtask';
import MetaData from '../Layout/MetaData';
import profileImg from "../../images/profile.png";

const Task = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { task, loading, isUpdated, error } = useSelector((state) => state.task);
    const { user } = useSelector((state) => state.user);

    const [taskAssignee, setTaskAssignee] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        status: '',
        assignee: '',
    });

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

    useEffect(() => {
        if (error) {
            display(error, "danger");
            dispatch(clearErrors());
        }

        if (isUpdated) {
            display("Task Updated sucessfully", "info");
            navigate("/club/" + task.club)
        }
    }, [error, dispatch, isUpdated, navigate, task]);

    useEffect(() => {
        dispatch(getSingleTask(id));
    }, [id, dispatch])


    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                deadline: formatDateForForm(task.deadline),
                status: task.status,
            });
        }
    }, [task])


    const { title, description, deadline, status, assignee } = formData;

    const handleInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSaveButtonDisabled(false);
    };

    const handleUpdateTask = async () => {
        dispatch(updateTask(id, formData));
        setSaveButtonDisabled(true);
    };

    const role = task?.clubMembers?.find((member) => member._id === user._id)?.role;

    return loading ? (
        <Loader />
    ) : task && (
        <>
            <MetaData title={`Task: ${task.title}`} />
            <div className='max-w-4xl mx-auto my-12 px-6'>
                <fieldset disabled={!role || role != "cadmin"}>
                    <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize'>Task</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <h2 className='text-sm font-semibold leading-6 text-gray-900'>Title</h2>
                            <input
                                id="title"
                                name="title"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 mt-2"
                                placeholder='Task Title'
                                value={title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-full">
                            <h2 className='text-sm font-semibold leading-6 text-gray-900'>Description</h2>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 mt-2"
                                placeholder='Task Title'
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-4 border-b border-black-900/10">
                    <fieldset className='mt-10 pb-12 overflow-y-auto'>
                        <Subtasks role={role} />
                    </fieldset>
                    <fieldset className="mt-10 flex flex-col gap-6" disabled={!role || role != "cadmin"}>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2"
                                    value={status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="assginee"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Assignee
                            </label>
                            <div className="mt-2 flex items-center justify-between gap-x-3">
                                <img className='h-8 w-8 rounded-full object-cover' src={profileImg} alt="" />
                                <select
                                    name="assignee"
                                    id="assignee"
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2'
                                    value={assignee}
                                    onChange={handleInputChange}
                                >
                                    {task?.clubMembers?.filter(member => member.role === "cadmin").map((member) =>
                                        <option key={member._id} value={member._id}>
                                            {member.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="deadline"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Deadline
                            </label>
                            <div className="mt-2">
                                <input
                                    id="deadline"
                                    name="deadline"
                                    type="datetime-local"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2"
                                    value={deadline}
                                    onChange={handleInputChange}
                                >
                                </input>
                            </div>
                        </div>
                        {
                            role && role === "cadmin" &&
                            <div className="col-span-full">
                                <AddSubtask />
                            </div>
                        }
                    </fieldset>
                </div>
                {
                    role === "cadmin" &&
                    <div className="mt-6 flex items-center justify-end gap-x-6 col-span-full">
                        <button
                            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-white disabled:text-black-600 disabled:border disabled:border-black-600/50 disabled:opacity-50"
                            onClick={handleUpdateTask}
                            disabled={saveButtonDisabled}
                        >
                            Save
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default Task
