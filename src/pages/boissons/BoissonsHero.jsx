export default function BoissonsHero({ search, onSearch, totalResults }) {
    return (
        <section
            className="relative pt-24 pb-14 px-4 md:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 60%, #0D0D1A 100%)" }}
        >
            {/* Déco orbs */}
            <div
                className="absolute top-0 right-0 w-87.5 h-87.5 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)", filter: "blur(40px)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-62.5 h-62.5 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,71,171,0.1) 0%,transparent 70%)", filter: "blur(30px)" }}
            />
            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="max-w-275 mx-auto relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-6">
                    <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                    <span>/</span>
                    <span className="text-primary-1 font-semibold">Boissons</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-primary-5 border border-primary-3 rounded-full px-4 py-1.5 mb-4 text-[12px] font-semibold text-primary-7 tracking-widest uppercase">
                            🍺 Catalogue Boissons
                        </div>
                        <h1
                            className="font-extrabold text-neutral-0 leading-tight mb-3"
                            style={{ fontSize: "clamp(28px,4vw,48px)" }}
                        >
                            Vos boissons,{" "}
                            <span className="text-primary-1">livrées chez vous</span>
                        </h1>
                        <p className="text-[15px] text-neutral-6 leading-relaxed max-w-130">
                            Bières, jus naturels, sodas, eaux et spiritueux — {totalResults} produits disponibles à la livraison express.
                        </p>
                    </div>

                    {/* Delivery badge */}
                    <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                        {[
                            { icon: "⚡", label: "Livraison en 2h", color: "#FFD700" },
                            { icon: "✅", label: "Produits frais garantis", color: "#008000" },
                            { icon: "💳", label: "Mobile Money accepté", color: "#0047AB" },
                        ].map(({ icon, label, color }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 text-[13px] font-medium text-neutral-0 px-4 py-2 rounded-full"
                                style={{ background: `${color}18`, border: `1px solid ${color}33` }}
                            >
                                <span>{icon}</span> {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative mt-10 max-w-150">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-h6 pointer-events-none">🔍</span>
                    <input
                        type="text"
                        placeholder="Rechercher une boisson, une marque…"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl text-[15px] font-medium text-neutral-9 border-2 border-neutral-5 bg-neutral-0 outline-none transition-all duration-200 focus:border-primary-1"
                        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
                    />
                    {search && (
                        <button
                            onClick={() => onSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-6 hover:text-neutral-9 bg-transparent border-0 cursor-pointer text-h6"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}