import CategoriesOptions from "./CategoriesOptions";
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import React, {useRef, useState} from "react";
import {Slider} from "./Slider";

export function Filters(props) {
    const [toggleFilter, setToggleFilter] = useState(false)
    const dateFrom = useRef();
    const dateTo = useRef()
    const categoryIdRef = useRef()
    function onResetFiltersClicked(){
        props.setPublicationYearFrom(0) //TODO
        props.setPublicationYearTo(new Date().getFullYear().toString())
        props.setPriceTo(500)
        props.setPriceFrom(0)
        props.setCategoryId()
        dateFrom.current.value = ''
        dateTo.current.value = ''
        categoryIdRef.current.value = null
    }
    return (
        <div>
            <button className="font-medium pb-2" onClick={()=>setToggleFilter(!toggleFilter)}>
                {!toggleFilter ? <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true"/>
                    : "Hide filters"}
            </button>
            {toggleFilter &&
            <div className="shadow p-5 rounded-lg bg-white">
                <div className="relative">
                    <div className="absolute flex items-center ml-2 h-full">
                        <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
    d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"/>
                        </svg>
                    </div>

                    <input type="text" placeholder="Search by listing, location, bedroom number..." onChange={e=>props.setSearchBy(e.target.value)} value={props.searchBy}
                           className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="font-medium">
                        Filters
                    </p>

                    <button
                        onClick={onResetFiltersClicked}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                        Reset Filter
                    </button>
                </div>

                <div className="mt-3">
                    <CategoriesOptions categories={props.categories} setCategoryId={props.setCategoryId} categoryIdRef={categoryIdRef}/>
                    <div className="mt-3">
                        <label className="font-bold">Price</label>
                        <Slider min={0} max={500}
                                priceFrom={props.priceFrom} setPriceFrom={props.setPriceFrom}
                                priceTo={props.priceTo} setPriceTo={props.setPriceTo}/>
                    </div>
                    <div>
                        <label className="font-bold">Publication year</label>
                        <div>
                            <label>From</label>
                            <br/>
                            <input type={"text"} placeholder={"YYYY:1785"} inputMode={"numeric"} pattern={"d*"} maxLength={4} ref={dateFrom}
                                   className={"w-full py-1 pl-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"}
                                   onChange={({target})=>props.setPublicationYearFrom(Number(target.value))}/>
                        </div>
                        <div>
                            <label>To</label>
                            <br/>
                            <input type={"text"} placeholder={"YYYY:1900"} inputMode={"numeric"} pattern={"d*"} maxLength={4} ref={dateTo}
                                   className={"w-full py-1 pl-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"}
                                   onChange={({target})=>props.setPublicationYearTo(Number(target.value))}/>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={props.onApplyClick}
                                className="px-4 py-2 my-3 bg-indigo-600 hover:bg-indigo-700 text-gray-300 text-sm font-medium rounded-md">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
