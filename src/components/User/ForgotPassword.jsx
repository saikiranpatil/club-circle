import { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../redux/actions/userAction';
import { display } from '../Utils/utils';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FORGOT_PASSWORD_RESET } from '../../redux/constants/userConstants';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
            display(error, "error");
            dispatch(clearErrors());
        }

        if (message) {
            display(message);
            navigate("/login");
            dispatch({ type: FORGOT_PASSWORD_RESET });
        }
    }, [dispatch, error, message, navigate]);
    return (
        <>
            <MetaData title={"Forgot Password"} />
            <div className="isolate relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                        Reset your Password
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={forgotPasswordSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address <span className="text-danger-600">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-custom placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-custom hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                {
                                    loading ?
                                        <><AiOutlineLoading3Quarters className='animate-spin' /> Loading</>
                                        :
                                        <>Send Reset Link</>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
