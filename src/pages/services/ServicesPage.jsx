import { useState } from "react";
import ServicesHero from "./ServicesHero.jsx";
import ServicesGrid from "./ServicesGrid.jsx";
import DevisModal from "./DevisModal.jsx";

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function ServicesPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [preselectedService, setPreselectedService] = useState(null);

    const openDevis = (service = null) => {
        setPreselectedService(service);
        setModalOpen(true);
    };

    return (
        <>
            <ServicesHero onDevisClick={() => openDevis(null)} />
            <ServicesGrid onDevisClick={openDevis} />
            <DevisModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                preselectedService={preselectedService}
            />
        </>
    );
}