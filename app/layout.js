import "@/app/globals.css";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from "./context/GlobalContext";
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: "Plumber Pro Services",
  keywords: 'plumber, plumbing services, pipe repair, emergency plumber, drainage',
  description: 'Expert Plumbing Services for Homes and Businesses – Fast, Reliable, Affordable',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
