import {Link} from "react-router-dom";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {useEffect} from "react";

export function InternalServerError() {
    useEffect(()=>{
        document.title='Server Error';
    },[])
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 dark:text-white">500</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Internal Server Error.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Please, bear with us. We are working hard to solve this issue. </p>
                    <Link to={"/books"}
                          className="inline-flex text-gray-900 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900 my-4">
                        Go to main page <ArrowRightIcon className="pl-2 block h-6 w-6 " aria-hidden="true"/></Link>
                </div>
            </div>
        </section>
    )
}
