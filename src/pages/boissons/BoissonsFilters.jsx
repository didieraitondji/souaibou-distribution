import { useState } from "react";
import { CATEGORIES, BRANDS, CATEGORY_ICONS } from "./data.js";

export default function BoissonsFilters({ filters, onChange, onReset, totalResults }) {
    const [priceOpen, setPriceOpen] = useState(true);
    const [brandOpen, setBrandOpen] = useState(true);

    const toggle = (key, value) => {
        const current = filters[key];
        if (Array.isArray(current)) {
            onChange(key, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
        } else {
            onChange(key, current === value ? null : value);
        }
    };

    const hasActiveFilters =
        filters.category !== "Tout" ||
        filters.brands.length > 0 ||
        filters.promo ||
        filters.inStock ||
        filters.priceMax < 10000;

    return (
        <aside className="w-full lg:w-65 shrink-0">
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 overflow-hidden sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-4">
                    <span className="font-bold text-[15px] text-neutral-9">Filtres</span>
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] text-neutral-6">{totalResults} résultats</span>
                        {hasActiveFilters && (
                            <button
                                onClick={onReset}
                                className="text-[12px] font-semibold text-danger-1 bg-transparent border-0 cursor-pointer hover:underline"
                            >
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
                                        background: filters.category === cat ? "rgba(255,215,0,0.12)" : "transparent",
                                        borderLeft: filters.category === cat ? "3px solid #FFD700" : "3px solid transparent",
                                    }}
                                >
                                    <span className="text-body">{CATEGORY_ICONS[cat]}</span>
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: filters.category === cat ? "#B89800" : "#1A1A2E" }}
                                    >
                                        {cat}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Prix */}
                    <div>
                        <button
                            onClick={() => setPriceOpen(!priceOpen)}
                            className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer mb-3"
                        >
                            <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest">Prix max</p>
                            <span className="text-neutral-6 text-[12px]">{priceOpen ? "▲" : "▼"}</span>
                        </button>
                        {priceOpen && (
                            <div>
                                <div className="flex justify-between text-[13px] font-semibold text-neutral-8 mb-2">
                                    <span>0 FCFA</span>
                                    <span className="text-primary-1">{filters.priceMax.toLocaleString()} FCFA</span>
                                </div>
                                <input
                                    type="range"
                                    min={300}
                                    max={10000}
                                    step={100}
                                    value={filters.priceMax}
                                    onChange={(e) => onChange("priceMax", Number(e.target.value))}
                                    className="w-full accent-primary-1"
                                    style={{ accentColor: "#FFD700" }}
                                />
                                <div className="flex justify-between text-[11px] text-neutral-6 mt-1">
                                    <span>300</span>
                                    <span>10 000</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Marques */}
                    <div>
                        <button
                            onClick={() => setBrandOpen(!brandOpen)}
                            className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer mb-3"
                        >
                            <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest">Marques</p>
                            <span className="text-neutral-6 text-[12px]">{brandOpen ? "▲" : "▼"}</span>
                        </button>
                        {brandOpen && (
                            <div className="flex flex-col gap-1.5">
                                {BRANDS.map((brand) => (
                                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => toggle("brands", brand)}
                                            className="w-4 h-4 rounded cursor-pointer"
                                            style={{ accentColor: "#FFD700" }}
                                        />
                                        <span className="text-[13px] text-neutral-8 group-hover:text-primary-1 transition-colors">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Options rapides */}
                    <div>
                        <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-3">Options</p>
                        <div className="flex flex-col gap-2">
                            {[
                                { key: "promo", label: "🏷️ En promotion" },
                                { key: "inStock", label: "✅ En stock seulement" },
                            ].map(({ key, label }) => (
                                <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters[key]}
                                        onChange={() => onChange(key, !filters[key])}
                                        className="w-4 h-4 rounded cursor-pointer"
                                        style={{ accentColor: "#FFD700" }}
                                    />
                                    <span className="text-[13px] text-neutral-8 group-hover:text-primary-1 transition-colors">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}