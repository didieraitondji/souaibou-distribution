import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./components/layout/AppLayout.jsx";
import LandingPage from "./pages/home/LandingPage.jsx";
import BoissonsPage from "./pages/boissons/BoissonsPage.jsx";
import LocationPage from "./pages/location/LocationPage.jsx";
import ServicesPage from "./pages/services/ServicesPage.jsx";
import PanierPage   from "./pages/panier/PanierPage.jsx";
// import SuiviPage    from "./components/pages/suivi/SuiviPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Accueil */}
        <Route path="/" element={
          <AppLayout activePage="/">
            <LandingPage />
          </AppLayout>
        } />

        {/* Boissons */}
        <Route path="/boissons" element={
          <AppLayout activePage="/boissons" darkNav>
            <BoissonsPage />
          </AppLayout>
        } />

        {/* Location */}
        <Route path="/location" element={
          <AppLayout activePage="/location" darkNav>
            <LocationPage />
          </AppLayout>
        } />

        {/* Services */}
        <Route path="/services" element={
          <AppLayout activePage="/services" darkNav>
            <ServicesPage />
          </AppLayout>
        } />

        {/* Panier */}
        <Route path="/panier" element={
          <AppLayout activePage="" darkNav showFooter={false}>
            <PanierPage />
          </AppLayout>
        } />

        {/*
        <Route path="/suivi" element={
          <AppLayout activePage="/suivi" darkNav>
            <SuiviPage />
          </AppLayout>
        } />
        */}

      </Routes>
    </BrowserRouter>
  );
}