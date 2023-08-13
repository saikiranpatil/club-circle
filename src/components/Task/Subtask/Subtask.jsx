import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteSubtask, updateSubtask } from '../../../redux/actions/subtaskAction';
import { display } from '../../Utils/utils';
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai"
import profileImg from "../../../images/profile.png";

const Subtask = ({ subtask, deleting, onDelete }) => {
    const { task, error, success } = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignee: "",
        completed: false,
    });

    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);

    const { title, description, completed, assignee } = formData;

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData({ ...formData, [name]: value });
        setUpdateButtonDisabled(false);
    };

    const handleUpdateSubtask = () => {
        dispatch(updateSubtask(subtask._id, formData));
        setUpdateButtonDisabled(true);
    };

    useEffect(() => {
        if (subtask) {
            setFormData({
                title: subtask.title,
                description: subtask.description,
                completed: subtask.completed,
                assignee: subtask.assignee
            })
        }

        if (error) {
            display(error, "warning");
            dispatch(clearErrors());
        }
    }, [dispatch, error, subtask])


    return (
        <div className="bg-white grid gap-1 border border-gray-300 rounded-lg p-2 hover:shadow-custom focus-within:shadow-custom">
            <div className="flex justify-between items-center gap-2 border-b border-b-slate-900/10 pb-1">
                <input
                    name="completed"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    checked={completed}
                    onChange={handleInputChange}
                />
                <input
                    name='title'
                    maxLength={40}
                    className="font-medium text-gray-900 capitalize w-full focus:ring-gray-300 focus:ring-1 focus:ring-inset rounded-lg pl-2 "
                    value={title}
                    onChange={handleInputChange}
                />
                <div className="flex items-center gap-x-3 min-w-[150px]">
                    <img className='h-6 w-6 rounded-full object-cover' src={profileImg} alt="" />
                    <select
                        name="assignee"
                        id="assignee"
                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-xs sm:leading-6 px-1 focus:ring-2 focus:ring-primary-600/10"
                        onChange={handleInputChange}
                        value={assignee ? assignee : ""}
                    >
                        <option value="">Select an assignee</option>
                        {task.clubMembers?.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="text-sm leading-6 pt-1">
                <div className="col-span-full">
                    <textarea
                        name='description'
                        className="text-gray-500 p-2 capitalize w-full ring-1 ring-inset ring-gray-300 rounded-sm break-all"
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    className="rounded-md border bg-primary-500 border-gray-300 px-1 py-1.5 text-xs text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:bg-white disabled:text-gray-600"
                    disabled={updateButtonDisabled}
                    onClick={handleUpdateSubtask}
                >
                    Update
                </button>
                <button className='rounded-sm px-1 py-1.5' onClick={onDelete}>
                    {
                        deleting ?
                            <div className="animate-spin">
                                <AiOutlineLoading3Quarters className='fill-black-600/50 hover:fill-black-800' />
                            </div>
                            :
                            <AiFillDelete className='fill-black-600/50 hover:fill-black-800' />
                    }

                </button>
            </div>
        </div>
    )
}

export default Subtask
