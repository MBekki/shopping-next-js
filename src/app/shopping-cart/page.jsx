'use client';

import MyImage from '@/components/Image/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ShoppingCart = () => {
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem('carts')) || []
    );

    const deleteItem = id => {
        const updateCart = products.filter(item => item.id !== id);
        localStorage.setItem('carts', JSON.stringify(updateCart));
        setProducts(updateCart);
    };
    const handleIncrement = id => {
        const updateData = products.map(item => {
            if (item.id == id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        localStorage.setItem('carts', JSON.stringify(updateData));
        setProducts(updateData);
    };
    const handleDecrement = id => {
        const findItem = products.find(item => item.id === id);

        if (findItem.quantity === 1) {
            deleteItem(findItem.id);
        } else {
            const updateData = products.map(item => {
                if (item.id == id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });
            localStorage.setItem('carts', JSON.stringify(updateData));
            setProducts(updateData);
        }
    };

    useEffect(() => {
        const total = products.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotal(total);
    }, [products]);
    return (
        <>
            {products.length ? (
                <div className='h-screen bg-gray-100 pt-20'>
                    <h1 className='mb-10 text-center text-2xl font-bold'>
                        Cart Items
                    </h1>
                    <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
                        <div className='rounded-lg md:w-2/3'>
                            {products.map(item => (
                                <div
                                    key={item.id}
                                    className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
                                >
                                    <div className='relative w-52'>
                                        <MyImage product={item} fill />
                                    </div>
                                    <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                                        <div className='mt-5 sm:mt-0'>
                                            <h2 className='text-lg font-bold text-gray-900'>
                                                {item.title}
                                            </h2>
                                            <p className='mt-1 text-xs line-clamp-2 text-gray-700'>
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                                            <div className='flex items-center border-gray-100'>
                                                <span
                                                    onClick={() => {
                                                        handleDecrement(
                                                            item.id
                                                        );
                                                    }}
                                                    className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                                                >
                                                    -
                                                </span>
                                                <input
                                                    className='h-8 w-8 border bg-white text-center text-xs outline-none'
                                                    type='number'
                                                    value={item.quantity}
                                                    min='1'
                                                />
                                                <span
                                                    onClick={() => {
                                                        handleIncrement(
                                                            item.id
                                                        );
                                                    }}
                                                    className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
                                                >
                                                    +
                                                </span>
                                            </div>
                                            <div className='flex items-center space-x-4'>
                                                <p className='text-sm font-semibold'>
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'usd',
                                                    })}
                                                </p>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    stroke-width='1.5'
                                                    stroke='currentColor'
                                                    className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                                                    onClick={() => {
                                                        deleteItem(item.id);
                                                    }}
                                                >
                                                    <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M6 18L18 6M6 6l12 12'
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
                            <div className='mb-2 flex justify-between'>
                                <p className='text-gray-700'>Subtotal</p>
                                <p className='text-gray-700'>
                                    {total.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'usd',
                                    })}
                                </p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>Shipping</p>
                                <p className='text-gray-700'>
                                    {(10).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'usd',
                                    })}
                                </p>
                            </div>
                            <hr className='my-4' />
                            <div className='flex justify-between'>
                                <p className='text-lg font-bold'>Total</p>
                                <div className=''>
                                    <p className='mb-1 text-lg font-bold'>
                                        {(total + 10).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'usd',
                                        })}
                                    </p>
                                    <p className='text-sm text-gray-700'>
                                        including VAT
                                    </p>
                                </div>
                            </div>
                            <button className='mt-6 w-full py-4 rounded-md bg-blue-500 font-medium text-blue-50 hover:bg-blue-600'>
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <section className='container px-4 mt-32 mx-auto'>
                    <div className='flex items-center mt-6 text-center  h-96 '>
                        <div className='flex flex-col w-full max-w-sm px-4 mx-auto'>
                            <div className='p-3 mx-auto text-blue-500 bg-blue-100 rounded-full '>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                                    />
                                </svg>
                            </div>
                            <h1 className='mt-3 text-lg text-gray-800 '>
                                Your cart is empty
                            </h1>
                            <p className='mt-2 text-gray-500 dark:text-gray-400'>
                                Bact to home and <br /> continue shopping
                            </p>
                            <div className='flex items-center mt-4 sm:mx-auto gap-x-3'>
                                <Link href='/products'>
                                    <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
                                        Products
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
export default ShoppingCart;
