import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader/Loader';
import { getAllUsers } from '../../redux/actions/userActions';
import { clearErrors, setClubRole } from '../../redux/actions/clubActions';
import { display } from '../Utils/utils';
import { CLUB_SET_ROLE_RESET } from '../../redux/constants/clubConstants';

const SetRole = ({ setClubUpdated }) => {
    const { users, loading } = useSelector((state) => state.users);
    const { error: setError, message } = useSelector((state) => state.setRole);
    const { club } = useSelector((state) => state.club);
    const { user } = useSelector((state) => state.user);

    const [usersDetails, setUsersDetails] = useState(users);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());

        if (setError) {
            display(setError, "warning");
            dispatch(clearErrors);
        }
    }, [dispatch, setError])

    useEffect(() => {
        if (message) {
            display(message, "info");
            dispatch({ type: CLUB_SET_ROLE_RESET });
            setClubUpdated((val) => !val);
        }
    }, [message, dispatch, setClubUpdated])


    useEffect(() => {
        if (club.members && users && users?.length > 0) {
            const updatedUsers = users.map(usersDetails => {
                if (usersDetails._id === user._id) {
                    return null; 
                }
                const clubMember = club.members.find(member => member._id === usersDetails._id);
                return clubMember ? { ...usersDetails, role: clubMember.role } : usersDetails;
            });
            setUsersDetails(updatedUsers);
        }
    }, [club, users, user, loading]);

    const handleInputChange = (userId, role) => {

        const myForm = new FormData();
        myForm.set("userId", userId);
        myForm.set("role", role);

        dispatch(setClubRole(club._id, myForm));

        const updatedUsers = usersDetails.map(user =>
            user._id === userId ? { ...user, role } : user
        );
        setUsersDetails(updatedUsers);
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <ul className='custom-shadow border border-black-900/20 rounded-lg p-2 max-h-[15rem] overflow-y-auto'>
                    {usersDetails && usersDetails.length > 0 ? (
                        usersDetails.map((user) => user && (
                            <ul
                                key={"user" + user._id}
                                className='grid grid-cols-5 gap-2 justify-center p-1 m-1 border-b border-black-900/20'
                            >
                                <li>
                                    <img
                                        className='h-6 w-6 rounded-full'
                                        src={user.avatar.url}
                                        alt=''
                                    />
                                </li>
                                <li className='text-slate-600 font-bold text-sm break-all'>
                                    {user.name}
                                </li>
                                <li className='flex justify-center gap-1 col-span-3'>
                                    <div className='flex justify-center gap-1'>
                                        <input
                                            type='radio'
                                            name={"user" + user._id}
                                            id={"user" + user._id + "cadmin"}
                                            value='cadmin'
                                            onClick={() => setClubRole(user._id, 'cadmin')}
                                            checked={user.role === "cadmin"}
                                            onChange={(e) => handleInputChange(user._id, "cadmin")}
                                        />
                                        <label htmlFor={user._id + "cadmin"}>
                                            Admin
                                        </label>
                                    </div>
                                    <div className='flex justify-center gap-1'>
                                        <input
                                            type='radio'
                                            name={"user" + user._id}
                                            value='member'
                                            id={user._id + "member"}
                                            checked={user.role === "member"}
                                            onChange={() => handleInputChange(user._id, "member")}
                                        />
                                        <label htmlFor={user._id + "member"}>
                                            Member
                                        </label>
                                    </div>
                                    <div className='flex justify-center gap-1'>
                                        <input
                                            type='radio'
                                            name={"user" + user._id}
                                            value=''
                                            id={user._id + "none"}
                                            checked={!user.role || (user.role !== "member" && user.role !== "cadmin")}
                                            onChange={() => handleInputChange(user._id, "")}
                                        />
                                        <label htmlFor={user._id + "none"}>
                                            None
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <p>No users available</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SetRole;