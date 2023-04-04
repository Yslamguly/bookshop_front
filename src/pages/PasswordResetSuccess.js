import {useNavigate} from "react-router-dom";

export const PasswordResetSuccess = () => {
    const navigate = useNavigate()
    return (
        <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Password has been reset</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Your password has been successfully reset! Now, please login with your new password</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go to signin page
                    </button>
                </div>
            </div>
        </main>
    )
}
