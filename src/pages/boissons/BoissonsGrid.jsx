import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import BoissonsFilters from "./BoissonsFilters.jsx";

const SORT_OPTIONS = [
    { value: "default", label: "Pertinence" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "promo", label: "Promotions d'abord" },
    { value: "name", label: "Nom A→Z" },
];

export default function BoissonsGrid({ products, filters, onFilterChange, onFilterReset, onAddToCart }) {
    const [sort, setSort] = useState("default");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [view, setView] = useState("grid"); // "grid" | "list"

    const sorted = [...products].sort((a, b) => {
        const priceA = a.promo ? Math.round(a.price * (1 - a.promo / 100)) : a.price;
        const priceB = b.promo ? Math.round(b.price * (1 - b.promo / 100)) : b.price;
        if (sort === "price-asc") return priceA - priceB;
        if (sort === "price-desc") return priceB - priceA;
        if (sort === "promo") return (b.promo || 0) - (a.promo || 0);
        if (sort === "name") return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <section className="bg-neutral-3 px-4 md:px-8 py-10">
            <div className="max-w-275 mx-auto">
                <div className="flex gap-8 items-start">

                    {/* Sidebar — desktop */}
                    <div className="hidden lg:block">
                        <BoissonsFilters
                            filters={filters}
                            onChange={onFilterChange}
                            onReset={onFilterReset}
                            totalResults={products.length}
                        />
                    </div>

                    {/* Main */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                            <div className="flex items-center gap-3">
                                {/* Mobile filter toggle */}
                                <button
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="lg:hidden flex items-center gap-2 font-semibold text-[13px] text-neutral-8 px-4 py-2.5 rounded-xl bg-neutral-0 border border-neutral-4 cursor-pointer"
                                >
                                    ⚙️ Filtres
                                </button>
                                <span className="text-sm text-neutral-6">
                                    <span className="font-bold text-neutral-9">{products.length}</span> produit{products.length > 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* View toggle */}
                                <div className="hidden sm:flex border border-neutral-4 rounded-xl overflow-hidden bg-neutral-0">
                                    {["grid", "list"].map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setView(v)}
                                            className="px-3 py-2 border-0 cursor-pointer transition-all text-sm"
                                            style={{
                                                background: view === v ? "#FFD700" : "transparent",
                                                color: view === v ? "#0D0D1A" : "#A9A9A9",
                                            }}
                                        >
                                            {v === "grid" ? "⊞" : "☰"}
                                        </button>
                                    ))}
                                </div>

                                {/* Sort */}
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="text-[13px] font-medium text-neutral-8 bg-neutral-0 border border-neutral-4 rounded-xl px-3 py-2.5 cursor-pointer outline-none"
                                    style={{ accentColor: "#FFD700" }}
                                >
                                    {SORT_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products */}
                        {sorted.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-neutral-0 rounded-2xl border border-neutral-4">
                                <span className="text-[56px]">🔍</span>
                                <p className="font-bold text-body text-neutral-9">Aucun produit trouvé</p>
                                <p className="text-sm text-neutral-6">Essayez de modifier vos filtres ou votre recherche</p>
                                <button
                                    onClick={onFilterReset}
                                    className="font-bold text-sm text-neutral-9 px-6 py-3 rounded-xl border-0 cursor-pointer"
                                    style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)" }}
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : view === "grid" ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {sorted.map((p) => (
                                    <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {sorted.map((p) => <ProductListRow key={p.id} product={p} onAddToCart={onAddToCart} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile filters drawer */}
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
                        <BoissonsFilters
                            filters={filters}
                            onChange={onFilterChange}
                            onReset={onFilterReset}
                            totalResults={products.length}
                        />
                    </div>
                </div>
            </>
        </section>
    );
}

function ProductListRow({ product, onAddToCart }) {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const discountedPrice = product.promo ? Math.round(product.price * (1 - product.promo / 100)) : null;

    const handleAdd = () => {
        onAddToCart({ ...product, qty });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="flex items-center gap-4 bg-neutral-0 rounded-2xl p-4 border border-neutral-4 hover:border-primary-3 transition-all duration-200">
            <div className="w-16 h-16 bg-neutral-3 rounded-xl flex items-center justify-center text-h3 shrink-0">{product.emoji}</div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px] text-neutral-9 truncate">{product.name}</div>
                <div className="text-[12px] text-neutral-6">{product.category} · {product.unit}</div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
                <div className="font-extrabold text-[17px] text-primary-1">{(discountedPrice ?? product.price).toLocaleString()} FCFA</div>
                {discountedPrice && <div className="text-[12px] text-neutral-6 line-through">{product.price.toLocaleString()} FCFA</div>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center border border-neutral-4 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-8 flex items-center justify-center font-bold text-neutral-7 bg-neutral-3 hover:bg-neutral-4 border-0 cursor-pointer">−</button>
                    <span className="w-7 text-center text-[13px] font-bold text-neutral-9">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-7 h-8 flex items-center justify-center font-bold text-primary-7 bg-primary-5 hover:bg-primary-4 border-0 cursor-pointer">+</button>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="font-bold text-[13px] px-4 py-2 rounded-xl border-0 cursor-pointer transition-all duration-200"
                    style={{ background: added ? "#008000" : "linear-gradient(135deg,#FFD700,#E6C200)", color: added ? "#fff" : "#0D0D1A" }}
                >
                    {added ? "✓" : "🛒"}
                </button>
            </div>
        </div>
    );
}