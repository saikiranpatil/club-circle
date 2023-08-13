import React, { useEffect, useState } from 'react'
import Loader from '../Utils/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { display } from '../Utils/utils';
import { clearErrors, createTask } from '../../redux/actions/taskAction';
import { useNavigate, useParams } from 'react-router-dom';
import { TASK_CREATE_RESET } from '../../redux/constants/taskConstants';
import MetaData from '../Layout/MetaData';

const AddTask = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, task, error, success } = useSelector((state) => state.task);
    const { club } = useSelector((state) => state.club);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: ""
    });
    const { title, description, deadline } = formData;

    const handleInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const hendleAddTaskSubmit = () => {
        dispatch(createTask(id, formData));
    }

    useEffect(() => {
        if (error) {
            display(error, "warning");
            dispatch(clearErrors);

        }

        if (success) {
            display("Task created Sucessfully", "Sucess");
            navigate("/club/" + club._id);
            dispatch({ type: TASK_CREATE_RESET });
        }
    }, [error, dispatch, club, navigate, success])

    return loading ? (
        <Loader />
    ) : (
        <>
            <MetaData title={"Add Task - Club Circle"} />
            <div className='max-w-4xl mx-auto my-12 px-6'>
                <div>
                    <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize'>Task</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <h2 className='text-sm font-semibold leading-6 text-gray-900'>Title</h2>
                            <input
                                id="title"
                                name="title"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 mt-2"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 mt-2"
                                placeholder='Task Title'
                                value={description}
                                onChange={handleInputChange}
                            />
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6 px-2"
                                    value={deadline}
                                    onChange={handleInputChange}
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 col-span-full">
                    <button
                        className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-white disabled:text-black-600 disabled:border disabled:border-black-600/50 disabled:opacity-50"
                        onClick={hendleAddTaskSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddTask
