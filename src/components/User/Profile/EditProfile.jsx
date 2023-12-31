import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../Layout/MetaData';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { clearErrors, loadUser, updateProfile } from '../../../redux/actions/userAction';
import { display } from '../../Utils/utils';
import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { loading, isUpdated, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        about: "",
        avatar: ""
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    const { name, email, about, avatar } = formData;

    const handleInputChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setFormData({ ...formData, avatar: reader.result });
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("about", about);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    }

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                about: user.about,
                avatar: ""
            });

            if (user.avatar?.url) {
                setAvatarPreview(user.avatar.url);
            }
        }

        if (error) {
            display(error, "error");
            dispatch(clearErrors());
        }

        if (isUpdated) {
            display("Profile Updated successfully", "info");
            dispatch({ type: UPDATE_PROFILE_RESET });
            dispatch(loadUser());
            navigate("/");
        }
    }, [user, dispatch, error, isUpdated, navigate])


    return (
        <>
            <MetaData title={"Edit Profile"} />
            <form onSubmit={handleSubmit} className="isolate flex min-h-full bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Profile
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name <span className="text-danger-600">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address <span className="text-danger-600">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Photo <span className="text-danger-600">*</span>
                            </label>
                            <div className="mt-2 flex items-center justify-between gap-x-3">
                                <img className='h-10 w-10 rounded-full aspect-square object-cover' src={avatarPreview} alt="" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="file:rounded-md file:bg-white file:px-2.5 file:py-1.5 file:text-sm file:font-semibold file:text-gray-900 file:shadow-sm file:ring-1 file:ring-inset ring-gray-300 file:hover:bg-gray-50 file:border-none w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    About <span className="text-danger-600">*</span> <br />
                                    <small className='font-normal'>Describe about yourself in 10-100 chars</small>
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    type="text"
                                    value={about}
                                    required
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center items-center gap-4 rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-custom hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                type='submit'
                            >
                                {
                                    loading ? <>
                                        < AiOutlineLoading3Quarters className='animate-spin' />
                                        Loading
                                    </> : <>
                                        Update Profile
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditProfile
