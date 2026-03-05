import { CATEGORIES, CATEGORY_ICONS } from "./data.js";

export default function LocationFilters({ filters, onChange, onReset, totalResults }) {
    return (
        <aside className="w-full lg:w-65 shrink-0">
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 overflow-hidden sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-4">
                    <span className="font-bold text-[15px] text-neutral-9">Filtres</span>
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] text-neutral-6">{totalResults} articles</span>
                        {(filters.category !== "Tout" || filters.inStock || filters.priceMax < 30000) && (
                            <button onClick={onReset} className="text-[12px] font-semibold text-danger-1 bg-transparent border-0 cursor-pointer hover:underline">
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-6 max-h-[calc(100vh-160px)] overflow-y-auto">
                    {/* Catégories */}
                    <div>
                        <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-3">Catégorie</p>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onChange("category", cat)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-0 cursor-pointer transition-all duration-150 text-left w-full"
                                    style={{
                                        background: filters.category === cat ? "rgba(0,71,171,0.1)" : "transparent",
                                        borderLeft: filters.category === cat ? "3px solid #0047AB" : "3px solid transparent",
                                    }}
                                >
                                    <span className="text-body">{CATEGORY_ICONS[cat]}</span>
                                    <span className="text-sm font-medium" style={{ color: filters.category === cat ? "#0047AB" : "#1A1A2E" }}>
                                        {cat}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Prix max par jour */}
                    <div>
                        <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-3">Prix max / jour</p>
                        <div className="flex justify-between text-[13px] font-semibold text-neutral-8 mb-2">
                            <span>0 FCFA</span>
                            <span className="text-secondary-1">{filters.priceMax.toLocaleString()} FCFA</span>
                        </div>
                        <input
                            type="range" min={150} max={30000} step={150}
                            value={filters.priceMax}
                            onChange={(e) => onChange("priceMax", Number(e.target.value))}
                            className="w-full" style={{ accentColor: "#0047AB" }}
                        />
                        <div className="flex justify-between text-[11px] text-neutral-6 mt-1">
                            <span>150</span><span>30 000</span>
                        </div>
                    </div>

                    {/* Options */}
                    <div>
                        <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-3">Options</p>
                        <div className="flex flex-col gap-2">
                            {[
                                { key: "inStock", label: "✅ Disponible seulement" },
                                { key: "livraison", label: "🚚 Livraison incluse" },
                            ].map(({ key, label }) => (
                                <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters[key]}
                                        onChange={() => onChange(key, !filters[key])}
                                        className="w-4 h-4 rounded cursor-pointer"
                                        style={{ accentColor: "#0047AB" }}
                                    />
                                    <span className="text-[13px] text-neutral-8 group-hover:text-secondary-1 transition-colors">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Info livraison */}
                    <div className="p-4 rounded-xl border" style={{ background: "rgba(0,71,171,0.06)", borderColor: "rgba(0,71,171,0.2)" }}>
                        <p className="text-[12px] font-bold text-secondary-1 mb-2">📦 Inclus dans chaque location</p>
                        <ul className="text-[12px] text-neutral-6 flex flex-col gap-1.5">
                            <li>✓ Livraison sur site</li>
                            <li>✓ Reprise après l'événement</li>
                            <li>✓ Inventaire à la remise</li>
                            <li>✓ Produits nettoyés & prêts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
}