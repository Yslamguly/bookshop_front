import {useNavigate} from "react-router-dom";
import {Filters} from "../components/Filters";
import SortByDropdown from "../components/SortByDropdown";
import {useState} from "react";




export default function Books() {
    const navigate = useNavigate();
    const [searchBy,setSearchBy] = useState('Hello world')
    const [priceFrom,setPriceFrom] = useState(0)
    const [priceTo,setPriceTo] = useState(500)
    const products = [
        {
            id: 1,
            name: 'Earthen Bottle',
            href: '#',
            price: '$48',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Nomad Tumbler',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'Focus Paper Refill',
            href: '#',
            price: '$89',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        }
        // More products...
    ]
    return (
        <>
            <div className="bg-white">
                <div className="flex space-x-9 h-auto">
                    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
                        <Filters onApplyClick={()=>navigate("/login")}
                                 priceFrom={priceFrom} setPriceFrom={(price)=>setPriceFrom(price)}
                                 priceTo={priceTo} setPriceTo={(price)=>setPriceTo(price)}
                        />
                    </div>
                    <div>
                        <SortByDropdown/>
                        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
                            <h2 className="sr-only">Products</h2>
                            <div
                                className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                                {products.map((product) => (
                                    <a key={product.id} href={product.href} className="group">
                                        <div
                                            className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 hover:opacity-75">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                        <button
                                            className="mt-1 hover:bg-indigo-700 text-lg font-medium bg-indigo-600 text-gray-200 rounded">Add
                                            to basket
                                        </button>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
