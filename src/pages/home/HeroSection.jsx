import { useState, useEffect } from "react";

const SLIDES = [
    {
        tag: "🍺 Boissons & Livraison",
        title: ["Vos boissons,", "livrées en un clin d'œil"],
        subtitle: "Bières, jus, sodas, eaux… Commandez maintenant et recevez à domicile ou pour votre événement.",
        cta: "Commander maintenant", ctaHref: "/boissons",
        ctaSecondary: "Voir le catalogue", ctaSecondaryHref: "/boissons",
        accent: "#FFD700", accentClass: "text-primary-1", bgGlow: "rgba(255,215,0,0.12)",
        cardItems: [["Castel Beer x24", "12 000 FCFA"], ["Jus de fruit x12", "6 000 FCFA"], ["Coca-Cola x24", "9 600 FCFA"]],
        cardTitle: "Commande boissons", cardIcon: "🍺", cardTotal: "27 600",
    },
    {
        tag: "🪑 Location de matériel",
        title: ["Tout le matériel", "pour votre événement"],
        subtitle: "Chaises, tables, bâches, vaisselle complète… Disponible à la location pour vos fêtes et cérémonies.",
        cta: "Louer du matériel", ctaHref: "/location",
        ctaSecondary: "Voir les tarifs", ctaSecondaryHref: "/location",
        accent: "#0047AB", accentClass: "text-secondary-1", bgGlow: "rgba(0,71,171,0.15)",
        cardItems: [["Chaises x50", "15 000 FCFA"], ["Tables x10", "20 000 FCFA"], ["Bâche 10m²", "8 000 FCFA"]],
        cardTitle: "Location matériel", cardIcon: "🪑", cardTotal: "43 000",
    },
    {
        tag: "🎉 Services événementiels",
        title: ["Votre événement,", "de A à Z"],
        subtitle: "Traiteur, décoration, animation, sonorisation… Confiez-nous l'organisation complète de votre fête.",
        cta: "Demander un devis", ctaHref: "/services",
        ctaSecondary: "Nos services", ctaSecondaryHref: "/services",
        accent: "#008000", accentClass: "text-accent-1", bgGlow: "rgba(0,128,0,0.12)",
        cardItems: [["Traiteur 100 pers.", "85 000 FCFA"], ["Décoration", "25 000 FCFA"], ["Sonorisation", "40 000 FCFA"]],
        cardTitle: "Pack événementiel", cardIcon: "🎉", cardTotal: "150 000",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => { setCurrent((c) => (c + 1) % SLIDES.length); setVisible(true); }, 400);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slide = SLIDES[current];
    const isDark = slide.accent === "#FFD700";

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: "#0D0D1A" }}
        >
            {/* Glow BG */}
            <div
                className="absolute inset-0 transition-all duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 70% 50%, ${slide.bgGlow} 0%, transparent 60%)` }}
            />
            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            />
            {/* Orb */}
            <div
                className="absolute top-[10%] right-0 w-75 h-75 md:w-100 md:h-100 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${slide.accent}22 0%, transparent 70%)`, filter: "blur(40px)", animation: "float 6s ease-in-out infinite", transition: "background 0.8s" }}
            />

            <div className="w-full max-w-275 mx-auto px-4 md:px-8 pt-28 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}
                    <div
                        className="transition-all duration-400"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
                    >
                        {/* Tag */}
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold mb-6"
                            style={{ background: `${slide.accent}22`, border: `1px solid ${slide.accent}44`, color: slide.accent }}
                        >
                            {slide.tag}
                        </div>

                        {/* Title */}
                        <h1 className="font-extrabold text-neutral-0 leading-tight mb-6" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
                            {slide.title[0]}<br />
                            <span style={{ color: slide.accent }}>{slide.title[1]}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-neutral-6 text-body leading-relaxed mb-10 max-w-120">{slide.subtitle}</p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={slide.ctaHref}
                                className="font-bold text-[15px] no-underline px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                                style={{ background: `linear-gradient(135deg,${slide.accent},${slide.accent}cc)`, color: isDark ? "#0D0D1A" : "#fff", boxShadow: `0 4px 20px ${slide.accent}44` }}
                            >
                                {slide.cta} →
                            </a>
                            <a
                                href={slide.ctaSecondaryHref}
                                className="font-semibold text-[15px] text-neutral-0 no-underline px-8 py-3.5 rounded-xl border border-neutral-5 transition-all duration-200 hover:bg-neutral-4 hover:border-neutral-6"
                            >
                                {slide.ctaSecondary}
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-6 mt-12">
                            {[["⚡", "Livraison express"], ["✅", "Qualité garantie"], ["📞", "Support 24h/7j"]].map(([icon, label]) => (
                                <div key={label} className="flex items-center gap-2 text-[13px] text-neutral-6 font-medium">
                                    <span>{icon}</span> {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right card — hidden on mobile */}
                    <div
                        className="hidden lg:flex justify-center items-center transition-all duration-500"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0) scale(1)" : "translateX(20px) scale(0.97)" }}
                    >
                        <div
                            className="w-full max-w-95 rounded-3xl p-8"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: `0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px ${slide.accent}22` }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${slide.accent}22`, border: `1px solid ${slide.accent}44` }}>
                                    {slide.cardIcon}
                                </div>
                                <div>
                                    <div className="font-bold text-[15px] text-neutral-0">{slide.cardTitle}</div>
                                    <div className="text-[12px] text-accent-1 font-semibold">● En cours de traitement</div>
                                </div>
                            </div>
                            {slide.cardItems.map(([name, price]) => (
                                <div key={name} className="flex justify-between items-center py-2.5 border-b border-neutral-4">
                                    <span className="text-[13px] text-neutral-6">{name}</span>
                                    <span className="text-[13px] font-bold text-neutral-0">{price}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center mt-4 px-4 py-3.5 rounded-xl" style={{ background: `${slide.accent}15`, border: `1px solid ${slide.accent}33` }}>
                                <span className="font-semibold text-sm text-neutral-0">Total</span>
                                <span className="font-extrabold text-h6" style={{ color: slide.accent }}>{slide.cardTotal} FCFA</span>
                            </div>
                            <button
                                className="w-full mt-4 font-bold text-sm py-3 rounded-xl border-0 cursor-pointer transition-all duration-200"
                                style={{ background: `linear-gradient(135deg,${slide.accent},${slide.accent}cc)`, color: isDark ? "#0D0D1A" : "#fff" }}
                            >
                                Valider la commande
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {SLIDES.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 300); }}
                        className="h-2 rounded-full border-0 cursor-pointer transition-all duration-300 p-0"
                        style={{ width: i === current ? 32 : 8, background: i === current ? s.accent : "rgba(255,255,255,0.2)" }}
                    />
                ))}
            </div>

            <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }`}</style>
        </section>
    );
}