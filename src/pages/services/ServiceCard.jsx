import { useState } from "react";

export default function ServiceCard({ service, onDevisClick }) {
    const [expanded, setExpanded] = useState(false);
    const [activePack, setActivePack] = useState(0);

    return (
        <div
            className="bg-neutral-0 rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col"
            style={{
                borderColor: expanded ? service.color : "#f1f5f9",
                boxShadow: expanded ? `0 24px 56px rgba(0,0,0,0.1), 0 0 0 1px ${service.color}22` : "0 2px 16px rgba(0,0,0,0.06)",
            }}
        >
            {/* Header coloré */}
            <div className="relative p-6 pb-5 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${service.colorBg}, transparent)`, borderBottom: `1px solid ${service.colorBorder}` }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`, transform: "translate(30%,-30%)" }} />

                <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                            style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}>
                            {service.emoji}
                        </div>
                        <div>
                            <h3 className="font-bold text-h6 text-neutral-9 leading-snug">{service.title}</h3>
                            <p className="text-[13px] font-medium italic mt-0.5" style={{ color: service.colorDark }}>{service.tagline}</p>
                        </div>
                    </div>
                    {/* Expand toggle */}
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="shrink-0 w-9 h-9 rounded-full border-0 cursor-pointer flex items-center justify-center font-bold text-body transition-all duration-200"
                        style={{
                            background: expanded ? service.color : service.colorBg,
                            color: expanded ? (service.color === "#FFD700" ? "#0D0D1A" : "#fff") : service.color,
                            border: `1px solid ${service.colorBorder}`,
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    >
                        ▼
                    </button>
                </div>

                {/* Gallery emojis */}
                <div className="flex gap-2 mt-4 relative z-10">
                    {service.gallery.map((g, i) => (
                        <span key={i}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-h6"
                            style={{ background: `${service.color}12`, border: `1px solid ${service.color}20` }}>
                            {g}
                        </span>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="px-6 py-5 grow">
                <p className="text-sm text-neutral-6 leading-relaxed">{service.desc}</p>

                {/* Inclus */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.includes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[13px] text-neutral-8">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                                style={{ background: service.color, color: service.color === "#FFD700" ? "#0D0D1A" : "#fff" }}>
                                ✓
                            </span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Packs tarifaires — visible si expanded */}
            <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: expanded ? "400px" : "0", opacity: expanded ? 1 : 0 }}
            >
                <div className="px-6 pb-2">
                    <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-3">Nos formules</p>
                    <div className="flex flex-col gap-2">
                        {service.packs.map((pack, i) => (
                            <button
                                key={i}
                                onClick={() => setActivePack(i)}
                                className="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer text-left transition-all duration-150 w-full"
                                style={{
                                    background: activePack === i ? service.colorBg : "transparent",
                                    borderColor: activePack === i ? service.color : "#f1f5f9",
                                }}
                            >
                                <div>
                                    <div className="font-bold text-sm text-neutral-9">{pack.name}</div>
                                    <div className="text-[12px] text-neutral-6 mt-0.5">{pack.desc}</div>
                                </div>
                                <div className="font-extrabold text-[13px] text-right shrink-0 ml-3" style={{ color: service.color }}>
                                    {pack.price}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Occasions */}
            <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {service.occasions.map((occ) => (
                        <span key={occ}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                            style={{ background: `${service.color}10`, color: service.colorDark, border: `1px solid ${service.color}25` }}>
                            {occ}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
                <button
                    onClick={() => onDevisClick(service)}
                    className="w-full font-bold text-sm py-3.5 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                        background: `linear-gradient(135deg, ${service.color}, ${service.colorDark})`,
                        color: service.color === "#FFD700" ? "#0D0D1A" : "#fff",
                        boxShadow: `0 4px 16px ${service.color}33`,
                    }}
                >
                    📋 Demander un devis pour ce service
                </button>
            </div>
        </div>
    );
}