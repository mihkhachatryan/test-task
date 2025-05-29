import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import PricePlansPage from "./pages/PricePlansPage";
import PagesPage from "./pages/PagesPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navigation">
          <div className="nav-container">
            <h2 className="nav-title">Admin Dashboard</h2>
            <div className="nav-links">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Products
              </NavLink>
              <NavLink 
                to="/plans" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Price Plans
              </NavLink>
              <NavLink 
                to="/pages" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Pages
              </NavLink>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/plans" element={<PricePlansPage />} />
            <Route path="/pages" element={<PagesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}