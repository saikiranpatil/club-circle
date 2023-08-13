import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSubtasks, clearErrors, deleteSubtask } from '../../../redux/actions/subtaskActions';
import { display } from "../../Utils/utils"
import Subtask from './Subtask';
import { SUBTASK_DELETE_RESET } from '../../../redux/constants/subtaskConstants';

const SubTasks = () => {
    const dispatch = useDispatch();
    const { task } = useSelector((state) => state.task);
    const { subtasks, error } = useSelector((state) => state.subtasks);
    const { isDeleted } = useSelector((state) => state.subtask);

    const handleDelete = (subtaskId) => {
        dispatch(deleteSubtask(subtaskId));
    }

    useEffect(() => {
        if (task && task._id) {
            dispatch(getAllSubtasks(task._id));
        }

        if (error) {
            display(error, "danger");
            dispatch(clearErrors());
        }

        if (isDeleted) {
            display("Subtask Deleted", "info");
            dispatch({ type: SUBTASK_DELETE_RESET });
        }
    }, [task, error, dispatch, isDeleted]);

    return (
        <>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
                Sub Tasks
            </legend>
            {
                subtasks?.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No Subtasks
                    </p>
                ) : <div className="mt-2 space-y-6 sm:max-h-[480px] sm:overflow-y-auto pr-0 sm:pr-4">
                    {subtasks?.map((subtask) => (
                        <Subtask
                            key={subtask._id}
                            subtask={subtask}
                            deleting={false}
                            onDelete={() => handleDelete(subtask._id)}
                        />
                    ))}
                </div >
            }
        </>
    );
};

export default SubTasks;