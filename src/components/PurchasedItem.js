import {
    CalendarIcon,
    CurrencyDollarIcon,
    ScaleIcon,
} from '@heroicons/react/20/solid'

export default function PurchasedItem(props) {
    const {
        first_name,
        last_name,
        order_date,
        quantity,
        title,
        total_price
    } = props.product
    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 ">
                <>
                    <h2 className="text-2xl font-bold leading-7 w-96 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                    <h4 className="text-sm  leading-7 text-gray-900 sm:truncate sm:text-sm sm:tracking-tight">
                        {first_name + ' ' + last_name}
                    </h4>
                </>

                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-nowrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ScaleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        Quantity: {quantity}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        Total price: ${total_price}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        {order_date.slice(0, 10)}
                    </div>
                </div>
            </div>
        </div>
    )
}
