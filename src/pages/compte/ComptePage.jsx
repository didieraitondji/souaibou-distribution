import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import AccountHeader from "./AccountHeader.jsx";
import AccountSidebar from "./AccountSidebar.jsx";
import ProfileTab from "./tabs/ProfileTab.jsx";
import OrdersTab from "./tabs/OrdersTab.jsx";
import AddressesTab from "./tabs/AddressesTab.jsx";
import SecurityTab from "./tabs/SecurityTab.jsx";

// Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function ComptePage() {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");

    // Garde auth — redirige vers /connexion si non connecté
    if (!isAuthenticated) {
        window.location.href = "/connexion?redirect=/compte";
        return null;
    }

    const TAB_CONTENT = {
        profile: <ProfileTab />,
        orders: <OrdersTab />,
        addresses: <AddressesTab />,
        security: <SecurityTab />,
    };

    return (
        <div className="min-h-screen bg-neutral-3">
            {/* Page header */}
            <div className="bg-neutral-0 border-b border-neutral-4 pt-20">
                <div className="max-w-275 mx-auto px-4 md:px-8 pt-6 pb-0">
                    <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-5">
                        <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                        <span>/</span>
                        <span className="text-primary-1 font-semibold">Mon compte</span>
                    </div>
                </div>
            </div>

            <div className="max-w-275 mx-auto px-4 md:px-8 py-8">
                {/* Header profil */}
                <div className="mb-8">
                    <AccountHeader />
                </div>

                {/* Layout sidebar + contenu */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Contenu de l'onglet actif */}
                    <div className="flex-1 min-w-0">
                        {TAB_CONTENT[activeTab]}
                    </div>
                </div>
            </div>
        </div>
    );
}