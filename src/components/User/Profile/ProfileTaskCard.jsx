import React from 'react'
import { Link } from 'react-router-dom';

const ProfileTaskCard = ({ task }) => {
    const completedSubtasksCount = task.subtasks?.filter((subtask) => subtask.completed).length;
    return (
        <li
            key={task._id}
            className={`bg-white rounded-[10px] ring-[0.5px] ring-inset ring-gray-300 shadow-custom p-2 mb-4 flex flex-col justify-between ${task.status === "Completed" ? "opacity-50" : ""}`}
        >
            <div className="flex flex-col justify-between mb-2">
                <div className="flex justify-between">
                    <div className='flex justify-center'>
                        <input
                            type="checkbox"
                            className=" w-5 h-5 border-1 p-0"
                            id={`checkbox-${task._id}`}
                            checked={task.status === "Completed"}
                        />
                        <label htmlFor={`checkbox-${task._id}`} className={`text-slate-800 font-medium ml-2 capitalize ${task.status === "Completed" ? "line-through" : ""}`}>
                            {task.title}
                        </label>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <div className="flex -space-x-1 overflow-hidden">
                            <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt=""
                            />
                            <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                        {task.subtasks?.length > 0 && <div className="flex items-center ml-3 camw1 c4cuk">
                            <div className="text-sm text-slate-500">{completedSubtasksCount}/{task.subtasks.length}</div>
                        </div>}
                    </div>

                </div>
                {/* Nested checkboxes */}
                <ul className="ml-12">
                    {
                        task.subtasks?.map((subtask) => (
                            <li key={subtask._id} className='mt-2'>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded-full c6i33 cc8cl cxjrs cpvja"
                                        checked={subtask.completed}
                                    />
                                    <span className={`text-sm text-slate-800 ml-3 capitalize ${subtask.completed ? "line-through" : ""}`}>
                                        {subtask.title}
                                    </span>
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex items-center justify-end">
                <Link
                    className="text-sm text-primary-500 font-medium"
                    to={`/task/${task._id}`}
                >
                    View
                </Link>
            </div>
        </li>
    )
}

export default ProfileTaskCard
