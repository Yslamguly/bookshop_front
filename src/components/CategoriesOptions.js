export default function CategoriesOptions(props) {
    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-bold text-primary-gray-dark ">Categories</label>
            <select ref={props.categoryIdRef}
                    type={"button"}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    onChange={({target})=>props.setCategoryId(target.value)}>
                <option defaultValue={props.categories[0].id}>All categories</option>
                {props.categories.map((item,i)=>{
                    return(
                    <option key={i} value={item.id}>{item.category_name}</option>
                    )
                })}
            </select>
        </>

    )
}
