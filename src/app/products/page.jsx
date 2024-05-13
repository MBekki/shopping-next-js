import CtaPage from '@/components/Cta/cta';
import Feature from '@/components/Feature/feature';
import Product from '@/components/Product/product';

const Products = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return (
        <>
            <main className='min-h-screen max-w-7xl mx-auto px-8 xl:px-0'>
                <Feature />
                <section className='flex flex-col space-y-12'>
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {products.map(item => (
                            <Product key={item.id} product={item} />
                        ))}
                    </div>
                </section>
                <CtaPage />
            </main>
        </>
    );
};
export default Products;
