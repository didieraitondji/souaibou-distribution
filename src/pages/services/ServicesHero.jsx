export default function ServicesHero({ onDevisClick }) {
    return (
        <section
            className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#0A1A0A 50%,#0D0D1A 100%)" }}
        >
            {/* Orbs */}
            <div className="absolute top-0 right-0 w-100 h-100 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,128,0,0.15) 0%,transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 left-0 w-75 h-75 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(255,215,0,0.07) 0%,transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,128,0,0.04) 0%,transparent 70%)", filter: "blur(60px)" }} />

            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(0,128,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,128,0,0.06) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="max-w-275 mx-auto relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-6">
                    <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                    <span>/</span>
                    <span className="text-accent-1 font-semibold">Services événementiels</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                            style={{ background: "rgba(0,128,0,0.15)", border: "1px solid rgba(0,128,0,0.35)", color: "#4CAF50" }}>
                            🎉 Services événementiels
                        </div>
                        <h1 className="font-extrabold text-neutral-0 leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                            Votre événement,{" "}
                            <span className="text-accent-1">orchestré à la perfection</span>
                        </h1>
                        <p className="text-body text-neutral-6 leading-relaxed mb-8 max-w-125">
                            Traiteur, décoration, animation, sonorisation — confiez-nous l'organisation complète. Nous gérons chaque détail pour que vous profitiez pleinement de votre événement.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onDevisClick}
                                className="font-bold text-[15px] text-neutral-9 px-8 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                                style={{ background: "linear-gradient(135deg,#008000,#006600)", color: "#fff", boxShadow: "0 4px 20px rgba(0,128,0,0.4)" }}
                            >
                                📋 Demander un devis gratuit
                            </button>
                            <a href="tel:+22997000000"
                                className="font-semibold text-[15px] text-neutral-0 no-underline px-8 py-4 rounded-xl border border-neutral-5 transition-all duration-200 hover:border-accent-1 hover:text-accent-1 flex items-center gap-2">
                                📞 Nous appeler
                            </a>
                        </div>

                        {/* Garanties */}
                        <div className="flex flex-wrap gap-6 mt-10">
                            {[
                                { icon: "⚡", label: "Réponse en 24h" },
                                { icon: "✅", label: "Devis gratuit" },
                                { icon: "🤝", label: "Suivi personnalisé" },
                            ].map(({ icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-[13px] text-neutral-6 font-medium">
                                    <span>{icon}</span> {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Stats visuelles */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: "300+", label: "Événements réalisés", icon: "🎉", color: "#008000" },
                            { value: "98%", label: "Clients satisfaits", icon: "⭐", color: "#FFD700" },
                            { value: "4", label: "Services disponibles", icon: "🛎️", color: "#0047AB" },
                            { value: "24h", label: "Délai de réponse", icon: "⚡", color: "#008000" },
                        ].map((stat) => (
                            <div key={stat.label}
                                className="p-5 rounded-2xl flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}25` }}>
                                <span className="text-h4">{stat.icon}</span>
                                <div className="font-extrabold text-[28px] leading-none" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-[12px] text-neutral-6 font-medium leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Occasions strip */}
                <div className="mt-12 pt-8 border-t border-neutral-4">
                    <p className="text-[12px] text-neutral-6 font-semibold uppercase tracking-widest mb-4">Occasions couvertes</p>
                    <div className="flex flex-wrap gap-2">
                        {["💍 Mariage", "🍼 Baptême", "🎂 Anniversaire", "🏢 Entreprise", "🎓 Remise de diplômes", "💼 Conférence", "🎭 Gala", "🎊 Fête familiale"].map((occ) => (
                            <span key={occ}
                                className="text-[13px] font-medium px-4 py-1.5 rounded-full text-neutral-0"
                                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                                {occ}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}