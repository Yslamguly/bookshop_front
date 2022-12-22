export const SortOptions = (props) => {
    const options = [
        "Sort By",
        "Date: new to old",
        "Date: old to new",
        "A-Z",
        "Z-A",
        "Price: high to low",
        "Price: low to high"]

    return (
        <div>
            <div className="text-left float-right px-8 pt-4">
                <select type="button"
                        onChange={({target}) => props.setSortOptions(target.value)}
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {options.map((item, i) => {
                        return (
                            <option className="text-gray-700 block px-4 py-2 text-sm" key={i}
                                    value={item}>{item}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
