export default function LocationHero({ search, onSearch, totalResults, dates, onDatesChange }) {
    const today = new Date().toISOString().split("T")[0];

    const handleDateFrom = (e) => {
        onDatesChange({ ...dates, from: e.target.value, to: dates.to < e.target.value ? e.target.value : dates.to });
    };
    const handleDateTo = (e) => {
        onDatesChange({ ...dates, to: e.target.value });
    };

    const nbDays = dates.from && dates.to
        ? Math.max(1, Math.round((new Date(dates.to) - new Date(dates.from)) / 86400000) + 1)
        : null;

    return (
        <section
            className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#16213E 60%,#0D0D1A 100%)" }}
        >
            {/* Orbs déco */}
            <div className="absolute top-0 right-0 w-87.5 h-87.5 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,71,171,0.15) 0%,transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute bottom-0 left-0 w-62.5 h-62.5 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)", filter: "blur(30px)" }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(0,71,171,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,71,171,0.08) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

            <div className="max-w-275 mx-auto relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] text-neutral-6 mb-6">
                    <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                    <span>/</span>
                    <span className="text-secondary-1 font-semibold">Location</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-[12px] font-semibold tracking-widest uppercase"
                            style={{ background: "rgba(0,71,171,0.2)", border: "1px solid rgba(0,71,171,0.4)", color: "#6699CC" }}>
                            🪑 Location de matériel
                        </div>
                        <h1 className="font-extrabold text-neutral-0 leading-tight mb-3" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
                            Équipez votre événement,{" "}
                            <span className="text-secondary-1">sans vous ruiner</span>
                        </h1>
                        <p className="text-[15px] text-neutral-6 leading-relaxed max-w-130">
                            Mobilier, vaisselle, décoration, structures… {totalResults} articles disponibles à la location avec livraison et reprise incluses.
                        </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                        {[
                            { icon: "🚚", label: "Livraison & reprise incluses", color: "#0047AB" },
                            { icon: "📋", label: "Inventaire remis à la livraison", color: "#008000" },
                            { icon: "💳", label: "Paiement à la confirmation", color: "#FFD700" },
                        ].map(({ icon, label, color }) => (
                            <div key={label} className="flex items-center gap-2 text-[13px] font-medium text-neutral-0 px-4 py-2 rounded-full"
                                style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                                <span>{icon}</span> {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search + Dates bar */}
                <div className="bg-neutral-0/10 backdrop-blur-sm border border-neutral-5 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4"
                    style={{ background: "rgba(255,255,255,0.06)" }}>

                    {/* Recherche */}
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-h6 pointer-events-none">🔍</span>
                        <input
                            type="text"
                            placeholder="Rechercher un article…"
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none transition-all duration-200 focus:border-secondary-1"
                        />
                        {search && (
                            <button onClick={() => onSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-6 bg-transparent border-0 cursor-pointer text-h6">×</button>
                        )}
                    </div>

                    {/* Séparateur */}
                    <div className="hidden md:block w-px bg-neutral-5" />

                    {/* Date début */}
                    <div className="flex flex-col gap-1 min-w-40">
                        <label className="text-[11px] font-semibold text-neutral-6 uppercase tracking-wider px-1">Date début</label>
                        <input
                            type="date"
                            value={dates.from}
                            min={today}
                            onChange={handleDateFrom}
                            className="px-3 py-3 rounded-xl text-sm font-medium text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none cursor-pointer focus:border-secondary-1 transition-all"
                        />
                    </div>

                    {/* Date fin */}
                    <div className="flex flex-col gap-1 min-w-40">
                        <label className="text-[11px] font-semibold text-neutral-6 uppercase tracking-wider px-1">Date fin</label>
                        <input
                            type="date"
                            value={dates.to}
                            min={dates.from || today}
                            onChange={handleDateTo}
                            className="px-3 py-3 rounded-xl text-sm font-medium text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none cursor-pointer focus:border-secondary-1 transition-all"
                        />
                    </div>

                    {/* Nb jours */}
                    {nbDays && (
                        <div className="flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm shrink-0"
                            style={{ background: "rgba(0,71,171,0.15)", border: "1px solid rgba(0,71,171,0.3)", color: "#6699CC" }}>
                            {nbDays} jour{nbDays > 1 ? "s" : ""}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}