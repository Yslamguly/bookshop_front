import logo from '../assets/undraw_education_f8ru.svg'
import mastercard from '../assets/mastercard.svg'
import visa from '../assets/visa.svg'
import american_express from '../assets/american-express.svg'
import discover from '../assets/discover.svg'

export default function Footer() {
    return (
        <footer className="p-4 bg-white  shadow md:px-6 md:py-8 dark:bg-gray-700">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                    <img src={logo} className="mr-3 h-10" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>

            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <div className="flex mt-4 space-x-6 sm:justify-end sm:mt-0">
                <img src={mastercard} className="h-10 mr-1" alt="Mastercard logo"/>
                <img src={visa} className="h-10 mr-1" alt="Visa logo"/>
                <img src={american_express} className="h-10 mr-1" alt="American express logo"/>
                <img src={discover} className="h-10 mr-1" alt="Discover logo"/>
            </div>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 pt-2">© 2022 <a
                href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
            </span>

        </footer>

    )
}
