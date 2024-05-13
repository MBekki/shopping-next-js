'use client';

import MyImage from '@/components/Image/image';
import { Dialog } from '@headlessui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [isOpen, setIsOpen] = useState(true);

    const { id } = useParams();
    const router = useRouter();

    const handleClick = () => {
        const products = JSON.parse(localStorage.getItem('carts')) || [];

        const findItem = products.find(item => item.id === product?.id);
        if (findItem) {
            const updateData = products.map(item => {
                if (item.id === product?.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            localStorage.setItem('carts', JSON.stringify(updateData));
        } else {
            const data = [...products, { ...product, quantity: 1 }];
            localStorage.setItem('carts', JSON.stringify(data));
        }
        toast('Product added your cart!!', {
            hideProgressBar: true,
            pauseOnHover: false,
            position: 'bottom-right',
        });
    };

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            setProduct(product);
            setLoading(false);
        }
        getData();
    }, [id]);

    return (
        <Dialog
            className='relative z-50'
            open={isOpen}
            onClose={() => {
                setIsOpen(false);
                router.back();
            }}
        >
            <div className='fixed inset-0 bg-black/30' aria-hidden={true} />
            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <Dialog.Panel
                        className={'mx-auto max-w-3xl rounded bg-white p-10'}
                    >
                        {loading ? (
                            <div className='h-8 w-8 rounded-full border-[6px] border-dotted  border-blue-600 animate-spin' />
                        ) : (
                            <div className='flex gap-x-8 h-96'>
                                {product?.image && (
                                    <div className='relative w-72 h-full hidden md:inline'>
                                        <MyImage product={product} fill />
                                    </div>
                                )}
                                <div className='flex-1 flex flex-col'>
                                    <div className='flex-1'>
                                        <h4 className='font-semibold'>
                                            {product?.title}
                                        </h4>
                                        <p className='font-bold text-base'>
                                            $ {product?.price}
                                        </p>
                                        <div className='flex justify-between mt-2'>
                                            <div className='flex gap-1 items-center'>
                                                {product.rating?.rate}
                                                <svg
                                                    style={{ color: 'yellow' }}
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='20'
                                                    height='20'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className='flex gap-1'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <path d='M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z' />
                                                    </svg>
                                                    {product.rating?.count}
                                                </div>
                                            </div>
                                        </div>
                                        <p className='font-medium text-sm mt-2 line-clamp-6'>
                                            {product?.description}
                                        </p>
                                        <div className='space-y-3 text-sm mt-10'>
                                            <button
                                                onClick={() => {
                                                    handleClick();
                                                }}
                                                className='inline-flex w-full py-2 transition-all border-2 justify-center items-center bg-blue-600  px-3 focus:outline-none border-blue-600 hover:bg-white
                                                rounded text-base mt-4 md:mt-0'
                                            >
                                                Add to card
                                            </button>
                                            <button
                                                onClick={() =>
                                                    window.location.reload()
                                                }
                                                className='inline-flex w-full py-2 transition-all border-2 justify-center items-center bg-white  px-3 focus:outline-none border-blue-600 hover:bg-blue-600
                                                rounded text-base mt-4 md:mt-0'
                                            >
                                                Veiw full detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};
export default ProductDetail;
