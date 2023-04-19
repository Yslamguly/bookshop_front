import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment, useState} from "react";

export default function CategoriesOptions(props) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [lastUsedOption,setLastUsedOption] = useState('All categories')
    return (
        <>
            <label htmlFor="categories" className="block mb-2 text-sm font-bold text-primary-gray-dark ">Categories</label>
            <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            {lastUsedOption}
                            <ChevronDownIcon
                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <button
                                    onClick={()=>{
                                        props.setCategoryId(null)
                                        setLastUsedOption('All categories')
                                    }
                                    }
                                    className={'block px-4 py-2 text-sm w-full'}
                                >
                                    All categories
                                </button>
                                {props.categories.map((option,i) => (
                                    <Menu.Item key={i}>
                                        {({ active }) => (
                                            <button
                                                onClick={()=>{
                                                    props.setCategoryId(option.id)
                                                    setLastUsedOption(option.category_name)
                                                }
                                            }
                                                className={classNames(
                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm w-full'
                                                )}
                                            >
                                                {option.category_name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                </div>
        </>

    )
}
