import { useState } from "react";

const SERVICES = [
    {
        icon: "🍺", title: "Boissons & Livraison",
        description: "Bières, jus, sodas, eaux minérales… Un large catalogue avec livraison express à votre porte ou sur le lieu de votre événement.",
        features: ["Livraison en 2h", "Min. 5 000 FCFA", "Mobile Money"],
        color: "#FFD700", href: "/boissons", cta: "Commander",
        items: ["Castel, Béninoise, Heineken", "Jus naturels & industriels", "Sodas & eaux pétillantes"],
    },
    {
        icon: "🪑", title: "Location de matériel",
        description: "Tout le mobilier et la vaisselle pour équiper votre réception : chaises, tables, bâches, plats, couverts, nappes et plus.",
        features: ["Tarif à la journée", "Livraison incluse", "Inventaire remis"],
        color: "#0047AB", href: "/location", cta: "Voir le matériel",
        items: ["Chaises, tables, bâches", "Plats, couverts, verres", "Nappes & déco de table"],
    },
    {
        icon: "🎉", title: "Services événementiels",
        description: "Confiez l'organisation complète de votre événement à nos professionnels : mariages, baptêmes, anniversaires, soirées d'entreprise.",
        features: ["Devis gratuit 24h", "Équipe pro", "Suivi personnalisé"],
        color: "#008000", href: "/services", cta: "Demander un devis",
        items: ["Traiteur & restauration", "Décoration & mise en scène", "Animation & sonorisation"],
    },
];

function ServiceCard({ service }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="bg-neutral-0 rounded-2xl p-8 flex flex-col transition-all duration-300"
            style={{
                border: `1.5px solid ${hovered ? service.color : "#f1f5f9"}`,
                boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.1)" : "0 2px 16px rgba(0,0,0,0.06)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
            }}
        >
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300"
                style={{ background: `${service.color}15`, border: `1px solid ${service.color}30`, transform: hovered ? "scale(1.1)" : "scale(1)" }}
            >
                {service.icon}
            </div>

            <h3 className="font-bold text-h5 text-neutral-9 mb-3">{service.title}</h3>
            <p className="text-sm text-neutral-6 leading-relaxed mb-5 grow">{service.description}</p>

            <div className="mb-5">
                {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[13px] text-neutral-8 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                        {item}
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f) => (
                    <span key={f} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: `${service.color}15`, color: service.color, border: `1px solid ${service.color}30` }}>
                        {f}
                    </span>
                ))}
            </div>

            <a
                href={service.href}
                className="font-bold text-sm no-underline py-3 px-6 rounded-xl text-center transition-all duration-200 block"
                style={{
                    background: hovered ? service.color : "transparent",
                    color: hovered ? (service.color === "#FFD700" ? "#0D0D1A" : "#fff") : service.color,
                    border: `2px solid ${service.color}`,
                }}
            >
                {service.cta} →
            </a>
        </div>
    );
}

export default function ServicesSection() {
    return (
        <section className="bg-neutral-3 py-24 px-4 md:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.75 rounded-full" style={{ background: "linear-gradient(90deg,#FFD700,#0047AB)" }} />

            <div className="max-w-275 mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block bg-primary-5 border border-primary-3 rounded-full px-5 py-1.5 mb-4 text-[12px] font-semibold text-primary-7 tracking-widest uppercase">
                        Nos pôles d'activité
                    </div>
                    <h2 className="font-extrabold text-neutral-9 leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                        Tout pour votre événement,<br />
                        <span className="text-secondary-1">sur une seule plateforme</span>
                    </h2>
                    <p className="text-body text-neutral-6 max-w-140 mx-auto leading-relaxed">
                        De la boisson à la décoration, en passant par le matériel — commandez tout en quelques clics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((s, i) => <ServiceCard key={i} service={s} />)}
                </div>

                <div className="mt-14 text-center bg-neutral-9 rounded-2xl p-8 md:p-12 border relative overflow-hidden" style={{ borderColor: "rgba(255,215,0,0.15)" }}>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)" }} />
                    <div className="relative z-10">
                        <h3 className="font-bold text-h5 md:text-[22px] text-neutral-0 mb-3">Besoin de combiner plusieurs services ?</h3>
                        <p className="text-[15px] text-neutral-6 mb-6">Créez un panier mixte : boissons + location + services en une seule commande.</p>
                        <a
                            href="/boissons"
                            className="font-bold text-[15px] text-neutral-9 no-underline px-9 py-3.5 rounded-xl inline-block transition-all duration-200 hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 20px rgba(255,215,0,0.3)" }}
                        >
                            Créer mon panier événement →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}