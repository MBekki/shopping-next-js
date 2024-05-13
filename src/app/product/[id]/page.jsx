'use client';

import { notFound } from 'next/navigation';

import MyImage from '@/components/Image/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            setProduct(product);
        }
        getData();
    }, [id]);

    return (
        <>
            {product ? (
                <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-36 pb-10'>
                    <MyImage product={product} />
                    <div className='divide-2 '>
                        <div className='space-y-2 pb-8'>
                            <h1 className='text-2xl md:text-4xl font-bold'>
                                {product?.title}
                            </h1>
                            <h2 className='text-gray-500 font-bold text-xl md:text-3xl'>
                                ${product?.price}
                            </h2>
                            <div>
                                <p className=' text-xs md:text-sm'>
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                notFound()
            )}
        </>
    );
};
export default ProductDetail;
