import { useState, useEffect } from "react";

const SECTIONS = [
    {
        id: "objet",
        title: "1. Objet",
        content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Souaïbou Distribution, accessible via le site web et l'application mobile. En accédant à la plateforme, vous acceptez sans réserve les présentes conditions.

Souaïbou Distribution est une entreprise enregistrée en République du Bénin, spécialisée dans la vente et livraison de boissons, la location de matériel événementiel et la prestation de services pour événements.`,
    },
    {
        id: "acces",
        title: "2. Accès à la plateforme",
        content: `L'accès à la plateforme est ouvert à toute personne physique majeure ou toute personne morale légalement constituée. La création d'un compte nécessite de fournir des informations exactes, complètes et à jour.

Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute utilisation de votre compte est réputée effectuée par vous. En cas de perte ou d'utilisation frauduleuse de vos identifiants, vous devez nous en informer immédiatement via notre page contact.

Souaïbou Distribution se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU, sans préavis ni indemnité.`,
    },
    {
        id: "commandes",
        title: "3. Commandes et paiements",
        content: `Toute commande passée sur la plateforme constitue un contrat de vente entre vous et Souaïbou Distribution. Les prix affichés sont en Francs CFA (FCFA) et incluent toutes taxes applicables.

Les modes de paiement acceptés sont : MTN Mobile Money, Moov Money et paiement en espèces à la livraison. Le paiement en ligne est sécurisé. Aucune information bancaire n'est stockée sur nos serveurs.

Une commande est considérée comme confirmée dès réception d'un accusé de confirmation par SMS ou email. Souaïbou Distribution se réserve le droit d'annuler toute commande en cas de rupture de stock, d'erreur de prix manifeste ou de suspicion de fraude.`,
    },
    {
        id: "livraison",
        title: "4. Livraison",
        content: `Les livraisons sont effectuées dans les zones desservies, principalement à Cotonou et ses environs. Les délais indicatifs sont : livraison express sous 2h pour les commandes passées avant 16h en semaine, et livraison standard le lendemain pour les commandes passées après 16h.

Les frais de livraison sont indiqués au moment de la commande. La livraison est offerte pour toute commande dépassant 10 000 FCFA. En cas d'absence lors de la livraison, un second passage sera tenté. Passé ce délai, la commande pourra être annulée.

Souaïbou Distribution ne peut être tenu responsable des retards de livraison dus à des événements indépendants de sa volonté (intempéries, manifestations, coupures de réseau).`,
    },
    {
        id: "annulation",
        title: "5. Annulation et remboursement",
        content: `Vous pouvez annuler votre commande jusqu'à 1 heure avant la livraison prévue, depuis votre espace compte ou en contactant notre service client. Passé ce délai, l'annulation n'est plus possible.

En cas d'annulation dans les délais, tout paiement effectué en ligne sera remboursé dans un délai de 48 à 72 heures ouvrées sur le moyen de paiement utilisé. Pour les paiements en espèces, le remboursement sera effectué lors d'une prochaine commande ou en agence.

En cas de produit défectueux ou non conforme à la commande, contactez-nous dans les 2 heures suivant la livraison avec une photo à l'appui. Un remplacement ou remboursement sera effectué dans les meilleurs délais.`,
    },
    {
        id: "location",
        title: "6. Location de matériel",
        content: `La location de matériel est soumise à des conditions spécifiques. Tout matériel loué doit être restitué dans l'état dans lequel il a été remis, à la date et heure convenues. Tout retard de restitution entraîne des frais supplémentaires calculés par jour de retard.

Le locataire est responsable de tout dommage causé au matériel durant la période de location. Une caution pourra être exigée pour certains équipements. Cette caution sera restituée après vérification de l'état du matériel.

Souaïbou Distribution se réserve le droit de refuser toute location sans justification, notamment en cas d'antécédents de dommages.`,
    },
    {
        id: "propriete",
        title: "7. Propriété intellectuelle",
        content: `L'ensemble des contenus présents sur la plateforme (textes, images, logos, graphismes, code source) sont la propriété exclusive de Souaïbou Distribution ou de ses partenaires, et sont protégés par les lois applicables en matière de propriété intellectuelle.

Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation préalable écrite est strictement interdite. L'utilisation du nom, du logo ou de la marque Souaïbou Distribution à des fins commerciales sans autorisation est passible de poursuites.`,
    },
    {
        id: "responsabilite",
        title: "8. Limitation de responsabilité",
        content: `Souaïbou Distribution s'engage à fournir ses services avec soin et professionnalisme. Cependant, notre responsabilité ne saurait être engagée en cas de dommages indirects, pertes de données, préjudices commerciaux ou moraux résultant de l'utilisation de la plateforme.

La plateforme est fournie "en l'état". Nous ne garantissons pas une disponibilité ininterrompue du service et nous réservons le droit d'effectuer des maintenances ponctuelles.`,
    },
    {
        id: "droit",
        title: "9. Droit applicable",
        content: `Les présentes CGU sont régies par le droit béninois. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents de Cotonou seront seuls habilités à connaître du différend.

Pour toute question relative aux présentes CGU, vous pouvez nous contacter à : legal@souaibou-distribution.bj ou via notre page de contact.`,
    },
];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function CguPage() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("objet");

    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

    useEffect(() => {
        const handleScroll = () => {
            for (const section of SECTIONS) {
                const el = document.getElementById(`section-${section.id}`);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120) setActiveSection(section.id);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(`section-${id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-neutral-3">
            {/* Hero */}
            <section className="relative pt-28 pb-12 px-4 md:px-8 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#0D1A0D 50%,#0D0D1A 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(255,215,0,0.06) 0%,transparent 70%)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

                <div className="max-w-225 mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-6">
                        <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                        <span>/</span>
                        <span className="text-primary-1 font-semibold">Conditions d'utilisation</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700" }}>
                        📄 Document légal
                    </div>
                    <h1 className="font-extrabold text-neutral-0 leading-tight mb-4"
                        style={{ fontSize: "clamp(28px,4vw,50px)", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease" }}>
                        Conditions Générales<br />
                        <span className="text-primary-1">d'Utilisation</span>
                    </h1>
                    <p className="text-[14px] text-neutral-6" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}>
                        Dernière mise à jour : <strong className="text-neutral-4">1er janvier 2025</strong> · Version 1.2
                    </p>
                </div>
            </section>

            {/* Contenu */}
            <section className="px-4 md:px-8 py-10">
                <div className="max-w-275 mx-auto flex flex-col lg:flex-row gap-8 items-start">

                    {/* Sommaire sticky */}
                    <aside className="w-full lg:w-60 shrink-0">
                        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5 sticky top-24">
                            <p className="text-[12px] font-bold text-neutral-6 uppercase tracking-widest mb-4">Sommaire</p>
                            <div className="flex flex-col gap-1">
                                {SECTIONS.map((s) => (
                                    <button key={s.id} onClick={() => scrollTo(s.id)}
                                        className="text-left text-[13px] px-3 py-2 rounded-lg border-0 cursor-pointer transition-all duration-150 font-medium"
                                        style={{
                                            background: activeSection === s.id ? "rgba(255,215,0,0.08)" : "transparent",
                                            color: activeSection === s.id ? "#B89800" : "#64748B",
                                            borderLeft: activeSection === s.id ? "2px solid #FFD700" : "2px solid transparent",
                                        }}>
                                        {s.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Texte */}
                    <div className="flex-1 min-w-0 bg-neutral-0 rounded-2xl border border-neutral-4 p-6 md:p-10 flex flex-col gap-10"
                        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                        {SECTIONS.map((section) => (
                            <div key={section.id} id={`section-${section.id}`} className="scroll-mt-28">
                                <h2 className="font-bold text-h6 text-neutral-9 mb-4 pb-3 border-b border-neutral-4">{section.title}</h2>
                                {section.content.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-[14px] text-neutral-7 leading-relaxed mb-4 last:mb-0">{para}</p>
                                ))}
                            </div>
                        ))}

                        {/* Footer légal */}
                        <div className="mt-4 pt-6 border-t border-neutral-4 flex flex-col gap-3">
                            <p className="text-[13px] text-neutral-6 leading-relaxed">
                                Pour toute question concernant ces conditions, contactez-nous à{" "}
                                <a href="mailto:legal@souaibou-distribution.bj" className="text-primary-7 font-semibold hover:underline">
                                    legal@souaibou-distribution.bj
                                </a>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a href="/confidentialite" className="text-[13px] font-semibold text-secondary-1 no-underline hover:underline">
                                    → Politique de confidentialité
                                </a>
                                <a href="/contact" className="text-[13px] font-semibold text-neutral-6 no-underline hover:text-neutral-9">
                                    → Nous contacter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}