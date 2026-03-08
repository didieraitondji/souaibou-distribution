import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./components/layout/AppLayout.jsx";
import LandingPage from "./pages/home/LandingPage.jsx";
import BoissonsPage from "./pages/boissons/BoissonsPage.jsx";
import LocationPage from "./pages/location/LocationPage.jsx";
import ServicesPage from "./pages/services/ServicesPage.jsx";
import PanierPage from "./pages/panier/PanierPage.jsx";
import SuiviPage from "./pages/suivi/SuiviPage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import ComptePage from "./pages/compte/ComptePage.jsx";
import AboutPage from "./pages/about/AoutPage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import CguPage from "./pages/legal/CguPage.jsx";
import ConfidentialitePage from "./pages/legal/ConfidentialitePage.jsx";

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
          <AppLayout activePage="/panier" darkNav showFooter={false}>
            <PanierPage />
          </AppLayout>
        } />

        {/* Suivi */}
        <Route path="/suivi" element={
          <AppLayout activePage="/suivi" darkNav>
            <SuiviPage />
          </AppLayout>
        } />

        {/* Auth — sans Navbar ni Footer */}
        <Route path="/connexion" element={<AuthPage />} />
        <Route path="/inscription" element={<AuthPage />} />


        <Route path="/compte" element={
          <AppLayout activePage="/compte" darkNav><ComptePage /></AppLayout>
        } />

        <Route path="/about" element={
          <AppLayout activePage="/about" darkNav><AboutPage /></AppLayout>
        } />

        <Route path="/contact" element={
          <AppLayout activePage="/contact" darkNav><ContactPage /></AppLayout>
        } />

        <Route path="/cgu" element={
          <AppLayout activePage="/cgu" darkNav><CguPage /></AppLayout>
        } />

        <Route path="/confidentialite" element={
          <AppLayout activePage="/confidentialite" darkNav><ConfidentialitePage /></AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}