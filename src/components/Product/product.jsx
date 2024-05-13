'use client';

import Link from 'next/link';
import MyImage from '../Image/image';

const Product = ({ product }) => {
    return (
        <Link
            href={`/product/${product.id}`}
            className='bg-gray-100 h-96 flex flex-col group p-6 rounded-lg hover:scale-105 transition-transform ease-out duration-200'
        >
            <div className='relative max-h-72 h-72 flex-1'>
                <MyImage product={product} fill />
            </div>

            <h3 className='tracking-widest  h-[20px] text-indigo-500 text-xs font-medium title-font'>
                {product.category}
            </h3>
            <div className='flex  justify-between gap-4'>
                <h2 className='text-lg line-clamp-1  text-gray-900 font-medium title-font mb-4'>
                    {product.title}
                </h2>
                <h2 className='text-lg flex text-gray-900 font-bold title-font mb-4'>
                    <span>$</span> <span> {product.price}</span>
                </h2>
            </div>
            <p className='leading-relaxed text-base line-clamp-3'>
                {product.description}
            </p>
        </Link>
    );
};
export default Product;
