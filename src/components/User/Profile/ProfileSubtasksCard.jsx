import React from 'react'
import { Link } from 'react-router-dom'

const ProfileSubtasksCard = ({subtask}) => {
        return (
            <div key={subtask._id} className="bg-white ring-gray-300 shadow-custom p-2">
                {/* Card header */}
                <div className="flex items-center text-ellipsis grow-1 overflow-hidden whitespace-nowrap mb-2">
                    <div className="flex items-center justify-center rounded-full mr-2 shrink-0 w-8 h-8 bg-slate-900">
                        <img
                            className="czb9f"
                            src="https://preview.cruip.com/mosaic/images/icon-03.svg"
                            width={14}
                            height={14}
                            alt="Icon 03"
                        />
                    </div>
                    <div className="chd3l">
                        <span className="text-sm text-slate-800 capitalize font-medium">
                            {subtask.title}
                        </span>
                    </div>
                </div>
                <div className="text-sm mb-2">
                    {subtask.description}
                </div>
                <div className="flex items-center justify-end">
                    <Link
                        className="text-sm text-primary-500 font-medium"
                        to={`/task/${subtask.task}`}
                    >
                        View
                    </Link>
                </div>
            </div>
        )
}

export default ProfileSubtasksCard
