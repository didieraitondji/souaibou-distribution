import ServiceCard from "./ServiceCard.jsx";
import { SERVICES } from "./data.js";

export default function ServicesGrid({ onDevisClick }) {
    return (
        <section className="bg-neutral-3 px-4 md:px-8 py-16">
            <div className="max-w-275 mx-auto">

                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-block rounded-full px-5 py-1.5 mb-4 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(0,128,0,0.08)", border: "1px solid rgba(0,128,0,0.25)", color: "#008000" }}>
                        Nos 4 pôles de service
                    </div>
                    <h2 className="font-extrabold text-neutral-9 leading-tight mb-4" style={{ fontSize: "clamp(24px,3.5vw,38px)" }}>
                        Choisissez vos services,{" "}
                        <span className="text-accent-1">nous faisons le reste</span>
                    </h2>
                    <p className="text-[15px] text-neutral-6 max-w-130 mx-auto leading-relaxed">
                        Cliquez sur un service pour voir les détails et les formules disponibles, puis demandez votre devis gratuit.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} onDevisClick={onDevisClick} />
                    ))}
                </div>

                {/* CTA pack complet */}
                <div
                    className="mt-12 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg,#0D0D1A,#1A2E1A)", border: "1px solid rgba(0,128,0,0.2)" }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle,rgba(0,128,0,0.1) 0%,transparent 70%)", transform: "translate(30%,-30%)" }} />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle,rgba(255,215,0,0.06) 0%,transparent 70%)", transform: "translate(-30%,30%)" }} />

                    <div className="relative z-10">
                        <div className="text-h1 mb-4">🎊</div>
                        <h3 className="font-bold text-[22px] md:text-[26px] text-neutral-0 mb-3">
                            Besoin de tout combiner ?
                        </h3>
                        <p className="text-[15px] text-neutral-6 mb-6 max-w-120 mx-auto leading-relaxed">
                            Traiteur + décoration + animation + sonorisation — demandez un devis global et bénéficiez de tarifs préférentiels pour votre pack complet.
                        </p>
                        <button
                            onClick={() => onDevisClick(null)}
                            className="font-bold text-[15px] px-10 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
                            style={{
                                background: "linear-gradient(135deg,#008000,#006600)",
                                color: "#fff",
                                boxShadow: "0 4px 20px rgba(0,128,0,0.4)",
                            }}
                        >
                            📋 Demander un devis pack complet
                        </button>
                    </div>
                </div>

                {/* Processus en 4 étapes */}
                <div className="mt-16">
                    <h3 className="font-bold text-h5 text-neutral-9 text-center mb-8">Comment ça se passe ?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { num: "01", icon: "📋", title: "Demandez un devis", desc: "Remplissez le formulaire en 2 minutes" },
                            { num: "02", icon: "📞", title: "On vous rappelle", desc: "Notre équipe vous contacte sous 24h" },
                            { num: "03", icon: "🤝", title: "Validation", desc: "Vous validez le devis et le planning" },
                            { num: "04", icon: "🎉", title: "Profitez !", desc: "Nous gérons tout le jour J" },
                        ].map((step) => (
                            <div key={step.num} className="text-center">
                                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-[28px] mx-auto mb-4"
                                    style={{ background: "rgba(0,128,0,0.1)", border: "1px solid rgba(0,128,0,0.2)" }}>
                                    {step.icon}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-neutral-9"
                                        style={{ background: "#008000", color: "#fff" }}>
                                        {step.num}
                                    </span>
                                </div>
                                <h4 className="font-bold text-sm text-neutral-9 mb-1.5">{step.title}</h4>
                                <p className="text-[12px] text-neutral-6 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}