import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment, useState} from "react";

export const SortOptions = (props) => {
    const sortOptions = [
        { name: 'Sort By', current: true },
        { name: 'Date: new to old', current: false },
        { name: 'Date: old to new', current: false },
        { name: 'A-Z', current: false },
        { name: 'Z-A', current: false },
        { name: 'Price: high to low', current: false },
        { name: 'Price: low to high', current: false },
    ]
    const [lastlyUsedOption,setLastlyUsedOption] = useState('Sort By')
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div>
            <Menu as="div" className="text-left float-right px-8 pt-4">
                <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        {lastlyUsedOption}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {sortOptions.map((option,i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <button
                                            onClick={(name)=>{
                                                props.setSortOptions(option.name)
                                                setLastlyUsedOption(option.name)
                                            }}
                                            className={classNames(
                                                option.current ? 'font-medium text-gray-900 m-0' : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm w-full'
                                            )}
                                        >
                                            {option.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {/*<div className="text-left float-right px-8 pt-4">*/}
            {/*    <select type="button"*/}
            {/*            onChange={({target}) => props.setSortOptions(target.value)}*/}
            {/*            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"*/}
            {/*            id="menu-button" aria-expanded="true" aria-haspopup="true">*/}
            {/*        {options.map((item, i) => {*/}
            {/*            return (*/}
            {/*                <option className="text-gray-700 block px-4 py-2 text-sm" key={i}*/}
            {/*                        value={item}>{item}</option>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </select>*/}
            {/*</div>*/}
        </div>
    )
}
