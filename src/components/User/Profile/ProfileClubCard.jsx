import { Link } from 'react-router-dom'

const ClubCard = ({ club, user }) => {
    return (
        <li key={club._id} className="bg-white rounded-[10px] ring-[0.5px] ring-inset ring-gray-300 shadow-custom grid grid-cols-3 justify-items-center text-sm justify-between w-full p-2">
            <p className="text-sm font-semibold capitalize leading-6 text-gray-900 mr-auto">
                {club.name}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
                {club.members[user._id] == "cadmin" ? "Club Admin" : "Member"}
            </p>
            <Link
                className="text-sm text-primary-500 font-medium ml-auto"
                to={`/club/${club._id}`}
            >
                View
            </Link>
        </li>
    )
}

export default ClubCard
