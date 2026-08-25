import { Routes, Route } from "react-router-dom";
import { ResortProvider } from "./context/ResortContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BookingModal from "./components/BookingModal";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import WaiterPOS from "./pages/staff/WaiterPOS";
import CashierDesk from "./pages/staff/CashierDesk";

export default function App() {
  return (
    <ResortProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/waiter" element={<WaiterPOS />} />
            <Route path="/cashier" element={<CashierDesk />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BookingModal />
      </div>
    </ResortProvider>
  );
}
