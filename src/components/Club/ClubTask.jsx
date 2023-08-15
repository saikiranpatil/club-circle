import React from 'react'
import { Link } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { MdDateRange } from "react-icons/md"
import { formatDate } from '../Utils/utils';
import { Tooltip } from 'react-tooltip';
import { AiFillDelete } from 'react-icons/ai';

const ClubTask = ({ task, handleTaskDelete }) => {
    const completedSubtasksCount = task.subtasks.filter((subtask) => subtask.completed).length;

    return (
        <div>
            <li
                key={task._id}
                className={`bg-white rounded-[10px] ring-[0.5px] ring-inset ring-gray-300 shadow-custom p-4 flex flex-col justify-between ${task.status === "Completed" ? "opacity-50" : ""}`}
            >
                <div className="flex flex-col justify-between mb-2">
                    <div className='border-b border-gray-300 pb-2'>
                        <div className="flex gap-2">
                            <div className={`text-slate-800 font-medium capitalize break-all ${task.status === "Completed" ? "line-through" : ""}`}>
                                {task.title}
                            </div>
                            <button className='delete-task-btn' onClick={() => handleTaskDelete(task._id)}>
                                <AiFillDelete className='fill-gray-300 hover:fill-black-800 my-1' />
                            </button>
                            <Tooltip anchorSelect='.delete-task-btn' place="bottom">
                                Delete Task
                            </Tooltip>
                        </div>
                        <span className="text-sm text-gray-500 leading-normal break-all">
                            {task.description}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        {/* <div className="flex -space-x-1 overflow-hidden">
                            <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div> */}
                        {task.subtasks?.length > 0 &&
                            <div className="flex items-center">
                                <div className="flex gap-1 items-center">
                                    <TbSubtask color='black' className='opacity-60' />
                                    <div className="text-sm text-slate-500">
                                        {completedSubtasksCount}/{task.subtasks.length}
                                    </div>
                                </div>
                            </div>
                        }
                        {task.deadline &&
                            <div className="flex items-center">
                                <div className="flex gap-1 items-center">
                                    <MdDateRange className='fill-warning-400' />
                                    <div className="text-sm text-slate-500">
                                        {formatDate(task.deadline)}
                                    </div>
                                </div>
                            </div>
                        }
                        <Link
                            className="text-sm text-primary-500 font-medium"
                            to={`/task/${task._id}`}
                        >
                            View
                        </Link>
                    </div>
                    <ul className="">
                        {
                            task.subtasks?.map((subtask) => (
                                <li key={subtask._id} className='mt-2 border-t pt-1 border-gray-300'>
                                    <label className="flex items-center">
                                        <span className='text-sm'>
                                            <MdOutlineDone className={`w-4 h-4 ${subtask.completed ? "fill-sucess-600" : "fill-gray-500 opacity-30"}`} />
                                        </span>
                                        <span className={`text-sm ml-3 capitalize ${subtask.completed ? "line-through text-gray-500 opacity-80" : "text-gray-600"}`}>
                                            {subtask.title}
                                        </span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </li>
        </div>
    )
}

export default ClubTask
