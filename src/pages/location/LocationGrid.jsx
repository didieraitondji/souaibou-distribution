import { useState } from "react";
import LocationCard from "./LocationCard.jsx";
import LocationFilters from "./LocationFilters.jsx";

const SORT_OPTIONS = [
    { value: "default", label: "Pertinence" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "name", label: "Nom A→Z" },
    { value: "stock", label: "Disponibilité" },
];

export default function LocationGrid({ products, filters, onFilterChange, onFilterReset, onAddToCart, nbDays }) {
    const [sort, setSort] = useState("default");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [view, setView] = useState("grid");

    const sorted = [...products].sort((a, b) => {
        if (sort === "price-asc") return a.pricePerDay - b.pricePerDay;
        if (sort === "price-desc") return b.pricePerDay - a.pricePerDay;
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "stock") return b.stock - a.stock;
        return 0;
    });

    return (
        <section className="bg-neutral-3 px-4 md:px-8 py-10">
            <div className="max-w-275 mx-auto">
                <div className="flex gap-8 items-start">

                    {/* Sidebar desktop */}
                    <div className="hidden lg:block">
                        <LocationFilters
                            filters={filters}
                            onChange={onFilterChange}
                            onReset={onFilterReset}
                            totalResults={products.length}
                        />
                    </div>

                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="lg:hidden flex items-center gap-2 font-semibold text-[13px] text-neutral-8 px-4 py-2.5 rounded-xl bg-neutral-0 border border-neutral-4 cursor-pointer"
                                >
                                    ⚙️ Filtres
                                </button>
                                <span className="text-sm text-neutral-6">
                                    <span className="font-bold text-neutral-9">{products.length}</span> article{products.length > 1 ? "s" : ""}
                                    {nbDays ? <span className="ml-1 text-secondary-1 font-semibold">· {nbDays} jour{nbDays > 1 ? "s" : ""}</span> : ""}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex border border-neutral-4 rounded-xl overflow-hidden bg-neutral-0">
                                    {["grid", "list"].map((v) => (
                                        <button key={v} onClick={() => setView(v)}
                                            className="px-3 py-2 border-0 cursor-pointer transition-all text-sm"
                                            style={{ background: view === v ? "#0047AB" : "transparent", color: view === v ? "#fff" : "#A9A9A9" }}>
                                            {v === "grid" ? "⊞" : "☰"}
                                        </button>
                                    ))}
                                </div>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="text-[13px] font-medium text-neutral-8 bg-neutral-0 border border-neutral-4 rounded-xl px-3 py-2.5 cursor-pointer outline-none"
                                    style={{ accentColor: "#0047AB" }}
                                >
                                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Bannière durée sélectionnée */}
                        {nbDays && (
                            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl"
                                style={{ background: "rgba(0,71,171,0.08)", border: "1px solid rgba(0,71,171,0.2)" }}>
                                <span className="text-h6">📅</span>
                                <p className="text-[13px] text-neutral-8">
                                    Les prix affichés incluent <span className="font-bold text-secondary-1">{nbDays} jour{nbDays > 1 ? "s" : ""} de location</span>. Les totaux sont calculés automatiquement.
                                </p>
                            </div>
                        )}

                        {/* Grille ou liste */}
                        {sorted.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-neutral-0 rounded-2xl border border-neutral-4">
                                <span className="text-[56px]">🔍</span>
                                <p className="font-bold text-h6 text-neutral-9">Aucun article trouvé</p>
                                <p className="text-sm text-neutral-6">Modifiez vos filtres ou votre recherche</p>
                                <button onClick={onFilterReset}
                                    className="font-bold text-sm text-neutral-0 px-6 py-3 rounded-xl border-0 cursor-pointer"
                                    style={{ background: "linear-gradient(135deg,#0047AB,#003A8C)" }}>
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : view === "grid" ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {sorted.map((p) => (
                                    <LocationCard key={p.id} product={p} nbDays={nbDays} onAddToCart={onAddToCart} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {sorted.map((p) => <LocationListRow key={p.id} product={p} nbDays={nbDays} onAddToCart={onAddToCart} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Drawer filtres mobile */}
            <>
                <div
                    onClick={() => setMobileFiltersOpen(false)}
                    className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
                    style={{ background: "rgba(0,0,0,0.5)", opacity: mobileFiltersOpen ? 1 : 0, pointerEvents: mobileFiltersOpen ? "auto" : "none" }}
                />
                <div
                    className="fixed top-0 left-0 h-full z-50 bg-neutral-2 lg:hidden transition-transform duration-300 overflow-y-auto"
                    style={{ width: "min(340px,90vw)", transform: mobileFiltersOpen ? "translateX(0)" : "translateX(-100%)" }}
                >
                    <div className="flex items-center justify-between p-5 border-b border-neutral-4">
                        <span className="font-bold text-body text-neutral-9">Filtres</span>
                        <button onClick={() => setMobileFiltersOpen(false)} className="text-[22px] text-neutral-6 bg-transparent border-0 cursor-pointer">×</button>
                    </div>
                    <div className="p-4">
                        <LocationFilters filters={filters} onChange={onFilterChange} onReset={onFilterReset} totalResults={products.length} />
                    </div>
                </div>
            </>
        </section>
    );
}

function LocationListRow({ product, nbDays, onAddToCart }) {
    const [qty, setQty] = useState(product.minQty);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart({
            id: product.id, name: product.name, emoji: product.emoji,
            price: product.pricePerDay * (nbDays || 1),
            unit: `x${qty} — ${nbDays || 1} jour${(nbDays || 1) > 1 ? "s" : ""}`,
            qty, type: "location",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="flex items-center gap-4 bg-neutral-0 rounded-2xl p-4 border border-neutral-4 hover:border-secondary-3 transition-all duration-200">
            <div className="w-16 h-16 bg-neutral-3 rounded-xl flex items-center justify-center text-h3 shrink-0">{product.emoji}</div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px] text-neutral-9 truncate">{product.name}</div>
                <div className="text-[12px] text-neutral-6">{product.category}</div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
                <div className="font-extrabold text-[17px] text-secondary-1">{product.pricePerDay.toLocaleString()} FCFA<span className="text-[11px] font-medium text-neutral-6">/j</span></div>
                {nbDays && <div className="text-[11px] text-neutral-6">{(product.pricePerDay * nbDays).toLocaleString()} FCFA / {nbDays}j</div>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center border border-neutral-4 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(product.minQty, qty - (product.minQty >= 10 ? 10 : 1)))} className="w-7 h-8 flex items-center justify-center font-bold text-neutral-7 bg-neutral-3 hover:bg-neutral-4 border-0 cursor-pointer">−</button>
                    <span className="w-10 text-center text-[13px] font-bold text-neutral-9">{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + (product.minQty >= 10 ? 10 : 1)))} className="w-7 h-8 flex items-center justify-center font-bold border-0 cursor-pointer" style={{ color: "#0047AB", background: "rgba(0,71,171,0.08)" }}>+</button>
                </div>
                <button
                    onClick={handleAdd}
                    className="font-bold text-[13px] px-4 py-2 rounded-xl border-0 cursor-pointer transition-all duration-200 text-neutral-0"
                    style={{ background: added ? "#008000" : "linear-gradient(135deg,#0047AB,#003A8C)" }}
                >
                    {added ? "✓" : "🛒"}
                </button>
            </div>
        </div>
    );
}