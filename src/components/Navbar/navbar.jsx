import Link from 'next/link';

const Navbar = () => {
    return (
        <header className='text-gray-600 body-font'>
            <div className=' fixed shadow-md top-0 bg-white z-50 w-full mx-auto flex flex-wrap p-5 md:px-12 flex-col md:flex-row justify-between items-center'>
                <Link
                    href='/'
                    className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
                        viewBox='0 0 24 24'
                    >
                        <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                    </svg>
                    <span className='ml-3 text-xl'>Tailblocks</span>
                </Link>
                <div className=''>
                    <nav className='flex gap-4  items-center text-base justify-center'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/products'}>Product</Link>
                        <Link href={'/contact'}>Contact</Link>
                        <Link href={'/shopping-cart'}>
                            <button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
                                Cart
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
