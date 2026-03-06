import { useState, useEffect } from "react";
import SuiviHero from "./SuiviHero.jsx";
import OrderTimeline from "./OrderTimeline.jsx";
import OrderDetails from "./OrderDetails.jsx";
import { findOrder } from "./data.js";

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function SuiviPage() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    // Pré-remplir depuis l'URL si ?order=SD-XXXXXX
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("order");
        if (id) handleSearch(id);
    }, []);

    const handleSearch = (input) => {
        setQuery(input);
        setError("");
        setLoading(true);
        setOrder(null);

        // Simule un appel API (300ms)
        setTimeout(() => {
            const found = findOrder(input);
            setLoading(false);
            if (found) {
                setOrder(found);
            } else {
                setError(`Aucune commande trouvée pour « ${input} ». Vérifiez le numéro et réessayez.`);
            }
        }, 700);
    };

    return (
        <div className="min-h-screen bg-neutral-3">
            <SuiviHero onSearch={handleSearch} loading={loading} error={error} />

            {/* Résultats */}
            {order && (
                <section className="px-4 md:px-8 py-10">
                    <div className="max-w-[1100px] mx-auto">

                        {/* En-tête résultat */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                            <div>
                                <p className="text-[13px] text-neutral-6">Résultat pour</p>
                                <h2 className="font-extrabold text-[20px] text-neutral-9">{order.id}</h2>
                            </div>
                            <button
                                onClick={() => { setOrder(null); setError(""); setQuery(""); }}
                                className="font-semibold text-[13px] text-neutral-6 bg-transparent border border-neutral-4 px-4 py-2 rounded-xl cursor-pointer hover:border-neutral-6 hover:text-neutral-9 transition-all"
                            >
                                🔍 Nouvelle recherche
                            </button>
                        </div>

                        {/* Layout 2 colonnes sur desktop */}
                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                            {/* Timeline — colonne gauche */}
                            <div className="flex-1 min-w-0">
                                <OrderTimeline order={order} />
                            </div>

                            {/* Détails — colonne droite */}
                            <div className="w-full lg:w-[360px] shrink-0">
                                <OrderDetails order={order} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* État vide (avant recherche) */}
            {!order && !loading && !error && (
                <section className="px-4 md:px-8 py-16">
                    <div className="max-w-[700px] mx-auto text-center">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: "📦", title: "Commande confirmée", desc: "Dès la validation, retrouvez votre commande ici" },
                                { icon: "🚚", title: "Livraison en direct", desc: "Suivez le livreur étape par étape en temps réel" },
                                { icon: "📞", title: "Support 7j/7", desc: "Notre équipe répond à toutes vos questions" },
                            ].map((item) => (
                                <div key={item.title} className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 text-center">
                                    <div className="text-[32px] mb-3">{item.icon}</div>
                                    <h3 className="font-bold text-[14px] text-neutral-9 mb-2">{item.title}</h3>
                                    <p className="text-[12px] text-neutral-6 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Lien vers panier si pas encore commandé */}
                        <div className="mt-8 p-6 rounded-2xl"
                            style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)" }}>
                            <p className="text-[14px] text-neutral-7 mb-4">
                                Vous n'avez pas encore passé de commande ?
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { label: "🍺 Commander des boissons", href: "/boissons" },
                                    { label: "🪑 Louer du matériel", href: "/location" },
                                    { label: "🎉 Services événementiels", href: "/services" },
                                ].map((l) => (
                                    <a key={l.href} href={l.href}
                                        className="font-semibold text-[13px] no-underline px-5 py-2.5 rounded-xl border border-neutral-4 text-neutral-8 hover:border-primary-1 hover:text-primary-1 transition-all duration-200">
                                        {l.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}