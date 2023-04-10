import {DangerAlert} from "../../components/DangerAlert";

export const VerifyEmail = () =>{

    return(
        <div>
            <DangerAlert message={'You want be able to make changes until you verify your email!'}/>
            <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Please, verify your email</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">The verification link has been sent to your email!📧</p>
                </div>
            </main>
        </div>
    )
}
