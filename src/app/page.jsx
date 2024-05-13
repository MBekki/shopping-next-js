import Banner from '@/components/Banner/banner';
import CtaPage from '@/components/Cta/cta';
import Product from '@/components/Product/product';

export const metadata = {
    title: 'Home',
};

export default async function Home() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return (
        <>
            <main className='min-h-screen max-w-7xl mx-auto px-8 xl:px-0 '>
                <Banner />
                <section className='flex flex-col space-y-12'>
                    <h1 className='text-5xl font-bold text-center'>
                        Shop deals
                    </h1>
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {products.map(item => (
                            <Product key={item.id} product={item} />
                        ))}
                    </div>
                    <CtaPage />
                </section>
            </main>
        </>
    );
}
