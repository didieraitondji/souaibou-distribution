import { useState, useEffect } from "react";

const SECTIONS = [
    {
        id: "intro",
        title: "1. Introduction",
        content: `Souaïbou Distribution accorde une importance primordiale à la protection de vos données personnelles. La présente Politique de Confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos informations lorsque vous utilisez notre plateforme.

En utilisant nos services, vous reconnaissez avoir pris connaissance de la présente politique et en acceptez les termes. Cette politique est conforme aux lois en vigueur en République du Bénin en matière de protection des données personnelles.`,
    },
    {
        id: "collecte",
        title: "2. Données collectées",
        content: `Nous collectons les types de données suivants :

Données d'identification : nom complet, numéro de téléphone, adresse email (optionnelle), ville de résidence. Ces données sont collectées lors de la création de votre compte.

Données de commande : adresses de livraison, historique des commandes, préférences de paiement. Ces données sont nécessaires à l'exécution de nos services.

Données de navigation : adresse IP, type de navigateur, pages visitées, durée de session. Ces données sont collectées automatiquement à des fins statistiques et d'amélioration du service.

Données de localisation : uniquement si vous l'autorisez explicitement, pour optimiser les livraisons.`,
    },
    {
        id: "utilisation",
        title: "3. Utilisation des données",
        content: `Vos données personnelles sont utilisées exclusivement aux fins suivantes :

— Exécution et suivi de vos commandes
— Gestion de votre compte client
— Communication relative à nos services (confirmations, mises à jour de livraison)
— Amélioration de notre plateforme et de nos services
— Envoi d'offres commerciales, uniquement avec votre consentement explicite
— Prévention de la fraude et sécurité de la plateforme

Nous n'utilisons jamais vos données à des fins non mentionnées ici sans vous en informer préalablement.`,
    },
    {
        id: "partage",
        title: "4. Partage des données",
        content: `Souaïbou Distribution ne vend jamais vos données personnelles à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :

Prestataires de services : nos partenaires logistiques et de paiement (MTN, Moov) reçoivent les données strictement nécessaires à l'exécution de leurs services. Ces partenaires sont contractuellement tenus de protéger vos données.

Obligations légales : nous pouvons être amenés à communiquer vos données aux autorités compétentes si la loi l'exige.

Aucun transfert de données vers des pays tiers n'est effectué sans garanties de protection adéquates.`,
    },
    {
        id: "conservation",
        title: "5. Conservation des données",
        content: `Vos données personnelles sont conservées pendant la durée nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, augmentée des délais légaux de prescription applicables.

Données de compte : conservées tant que votre compte est actif, puis 3 ans après sa suppression.
Données de commande : conservées 5 ans à des fins comptables et légales.
Données de navigation : conservées 13 mois maximum.

À l'expiration de ces délais, vos données sont supprimées de manière sécurisée ou anonymisées.`,
    },
    {
        id: "droits",
        title: "6. Vos droits",
        content: `Conformément à la législation applicable, vous disposez des droits suivants concernant vos données personnelles :

Droit d'accès : vous pouvez demander à consulter l'ensemble des données que nous détenons sur vous.

Droit de rectification : vous pouvez corriger vos données directement depuis votre espace compte ou en nous contactant.

Droit à l'effacement : vous pouvez demander la suppression de votre compte et de vos données personnelles, sous réserve des obligations légales de conservation.

Droit d'opposition : vous pouvez vous opposer à tout moment à l'utilisation de vos données à des fins de prospection commerciale.

Droit à la portabilité : vous pouvez demander à recevoir vos données dans un format structuré et lisible.

Pour exercer ces droits, contactez-nous à : privacy@souaibou-distribution.bj`,
    },
    {
        id: "cookies",
        title: "7. Cookies et traceurs",
        content: `Notre plateforme utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.

Cookies essentiels : nécessaires au fonctionnement de la plateforme (session, panier, préférences). Ces cookies ne peuvent pas être désactivés.

Cookies analytiques : nous permettent de comprendre comment vous utilisez notre plateforme afin de l'améliorer. Ces cookies sont anonymisés.

Cookies de préférence : mémorisent vos préférences (langue, ville) pour personnaliser votre expérience.

Vous pouvez à tout moment modifier vos préférences de cookies depuis les paramètres de votre navigateur.`,
    },
    {
        id: "securite",
        title: "8. Sécurité des données",
        content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération.

Ces mesures incluent le chiffrement des données sensibles, les contrôles d'accès stricts, les audits de sécurité réguliers et la formation de notre personnel.

En cas de violation de données susceptible d'engendrer un risque pour vos droits, nous nous engageons à vous en informer dans les meilleurs délais.`,
    },
    {
        id: "contact",
        title: "9. Nous contacter",
        content: `Pour toute question relative à cette politique de confidentialité ou à l'exercice de vos droits, vous pouvez nous contacter :

Par email : privacy@souaibou-distribution.bj
Par courrier : Souaïbou Distribution, Akpakpa, Cotonou, Bénin
Via notre formulaire de contact : souaibou-distribution.bj/contact

Nous nous engageons à répondre à toute demande dans un délai de 30 jours.

La présente politique peut être mise à jour. Toute modification substantielle vous sera notifiée par email ou via un message sur la plateforme.`,
    },
];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function ConfidentialitePage() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");

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
                style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#0D0D1A 50%,#1A0D0D 100%)" }}>
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(0,71,171,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(rgba(0,71,171,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,71,171,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

                <div className="max-w-225 mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-6">
                        <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                        <span>/</span>
                        <span className="text-secondary-1 font-semibold">Confidentialité</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(0,71,171,0.1)", border: "1px solid rgba(0,71,171,0.25)", color: "#0047AB" }}>
                        🔐 Protection des données
                    </div>
                    <h1 className="font-extrabold text-neutral-0 leading-tight mb-4"
                        style={{ fontSize: "clamp(28px,4vw,50px)", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease" }}>
                        Politique de<br />
                        <span className="text-secondary-1">Confidentialité</span>
                    </h1>
                    <p className="text-[14px] text-neutral-6" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}>
                        Dernière mise à jour : <strong className="text-neutral-4">1er janvier 2025</strong> · Version 1.1
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
                                            background: activeSection === s.id ? "rgba(0,71,171,0.08)" : "transparent",
                                            color: activeSection === s.id ? "#0047AB" : "#64748B",
                                            borderLeft: activeSection === s.id ? "2px solid #0047AB" : "2px solid transparent",
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

                        {/* Bannière résumé */}
                        <div className="flex items-start gap-4 p-5 rounded-2xl"
                            style={{ background: "rgba(0,71,171,0.06)", border: "1px solid rgba(0,71,171,0.15)" }}>
                            <span className="text-[28px] shrink-0">🛡️</span>
                            <div>
                                <p className="font-bold text-[14px] text-neutral-9 mb-1">Notre engagement</p>
                                <p className="text-[13px] text-neutral-6 leading-relaxed">
                                    Vos données ne sont jamais vendues. Elles sont utilisées uniquement pour vous offrir le meilleur service possible. Vous gardez le contrôle total sur vos informations.
                                </p>
                            </div>
                        </div>

                        {SECTIONS.map((section) => (
                            <div key={section.id} id={`section-${section.id}`} className="scroll-mt-28">
                                <h2 className="font-bold text-body text-neutral-9 mb-4 pb-3 border-b border-neutral-4">{section.title}</h2>
                                {section.content.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-[14px] text-neutral-7 leading-relaxed mb-4 last:mb-0 whitespace-pre-line">{para}</p>
                                ))}
                            </div>
                        ))}

                        {/* Footer légal */}
                        <div className="mt-4 pt-6 border-t border-neutral-4 flex flex-col gap-3">
                            <p className="text-[13px] text-neutral-6 leading-relaxed">
                                Pour exercer vos droits ou poser une question, contactez notre DPO à{" "}
                                <a href="mailto:privacy@souaibou-distribution.bj" className="text-secondary-1 font-semibold hover:underline">
                                    privacy@souaibou-distribution.bj
                                </a>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a href="/cgu" className="text-[13px] font-semibold text-primary-7 no-underline hover:underline">
                                    → Conditions d'utilisation
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