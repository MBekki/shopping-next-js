import { Montserrat } from 'next/font/google';
import './globals.css';
const montserrat = Montserrat({ subsets: ['latin'] });
import Navbar from '@/components/Navbar/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer/footer';

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={montserrat.className}>
                <Navbar />
                <ToastContainer />
                <main> {children}</main>

                <Footer />
            </body>
        </html>
    );
}
