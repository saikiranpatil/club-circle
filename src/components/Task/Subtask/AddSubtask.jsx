import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { display } from '../../Utils/utils';
import { clearErrors, createSubtask } from '../../../redux/actions/subtaskAction';
import { SUBTASK_CREATE_RESET, SUBTASK_UPDATE_RESET, } from '../../../redux/constants/subtaskConstants';
import profileImg from "../../../images/Profile.png";

const AddSubtask = () => {
    const { task } = useSelector((state) => state.task);
    const { error, success, isUpdated } = useSelector((state) => state.subtask);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: '',
    });

    const { title, description, assignee } = formData;

    const handleInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setAddButtonDisabled(false);
    };

    const handleCreateSubtask = () => {
        dispatch(createSubtask(task._id, formData));
        setAddButtonDisabled(true);
    }

    const [addButtonDisabled, setAddButtonDisabled] = useState(true);

    useEffect(() => {
        if (error) {
            display(error, "warning");
            dispatch(clearErrors());
        }
        if (isUpdated) {
            display("Subtask Updated sucessfully", "info");
            dispatch({ type: SUBTASK_UPDATE_RESET });
        }
        if (success) {
            display("Subtask Created sucessfully", "info");
            setFormData({
                title: '',
                description: '',
                assignee: '',
            })
            dispatch({ type: SUBTASK_CREATE_RESET });
        }
    }, [dispatch, error, success, isUpdated])

    return (
        <div className="space-y-2">
            <h2 className='text-sm font-semibold leading-6 text-gray-900'>Add Sub Task</h2>
            <input
                id="title"
                name="title"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 break-all"
                placeholder='Sub Task Title'
                value={title}
                onChange={handleInputChange}
            />
            <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-2 break-all"
                placeholder='Sub Task Description'
                onChange={handleInputChange}
                value={description}
            />
            <div className="mt-2 flex-col items-center">
                <label
                    htmlFor="photo"
                    className="block text-sm font-normal text-gray-500"
                >
                    Assignee:
                </label>
                <div className="flex justify-between my-2">
                    <img className='h-8 w-8 rounded-full object-cover' src={profileImg} alt="" />
                    <select
                        name="assignee"
                        id="assignee"
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6 px-2'
                        onChange={handleInputChange}
                        value={assignee}
                    >
                        <option value="">Unassigned</option>
                        {task?.clubMembers?.map((member) =>
                            <option key={member._id} value={member._id}>
                                {member.name}
                            </option>
                        )}
                    </select>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    type="submit"
                    className="rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-white disabled:text-black-600 disabled:border disabled:border-black-600/50 disabled:opacity-50"
                    onClick={handleCreateSubtask}
                    disabled={addButtonDisabled}
                >
                    Add Sub Task
                </button>
            </div>
        </div>
    )
}

export default AddSubtask
