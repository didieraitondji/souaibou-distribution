import { useState } from "react";

const CATEGORIES = ["Tout", "Bières", "Jus & Sodas", "Eaux", "Vins & Spiritueux"];

const PRODUCTS = [
    { name: "Castel Beer", category: "Bières", price: 500, unit: "bouteille", emoji: "🍺", badge: "Populaire", badgeColor: "#FFD700" },
    { name: "La Béninoise", category: "Bières", price: 450, unit: "bouteille", emoji: "🍻", badge: "Local", badgeColor: "#008000" },
    { name: "Heineken 33cl", category: "Bières", price: 700, unit: "bouteille", emoji: "🍺", badge: null },
    { name: "Jus de Bissap", category: "Jus & Sodas", price: 300, unit: "bouteille", emoji: "🥤", badge: "Naturel", badgeColor: "#008000" },
    { name: "Coca-Cola 1L", category: "Jus & Sodas", price: 500, unit: "bouteille", emoji: "🥤", badge: null },
    { name: "Pamplemousse", category: "Jus & Sodas", price: 250, unit: "verre", emoji: "🍊", badge: "Frais", badgeColor: "#0047AB" },
    { name: "Eau Minérale 1.5L", category: "Eaux", price: 300, unit: "bouteille", emoji: "💧", badge: null },
    { name: "Eau Pétillante", category: "Eaux", price: 400, unit: "bouteille", emoji: "✨", badge: null },
];

function ProductCard({ product }) {
    const [qty, setQty] = useState(0);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        if (qty === 0) return;
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="bg-neutral-0 rounded-2xl p-5 flex flex-col gap-3 border border-neutral-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="w-full h-20 bg-neutral-3 rounded-xl flex items-center justify-center text-4xl relative">
                {product.emoji}
                {product.badge && (
                    <span
                        className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: product.badgeColor, color: product.badgeColor === "#FFD700" ? "#0D0D1A" : "#fff" }}
                    >
                        {product.badge}
                    </span>
                )}
            </div>

            <div>
                <div className="font-bold text-small text-neutral-9">{product.name}</div>
                <div className="text-[12px] text-neutral-6">par {product.unit}</div>
            </div>

            <div className="font-extrabold text-body text-primary-1">
                {product.price} <span className="text-[12px] font-medium text-neutral-6">FCFA</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setQty(Math.max(0, qty - 1))}
                    className="w-8 h-8 rounded-lg border border-neutral-4 bg-neutral-3 cursor-pointer font-bold text-body text-neutral-8 flex items-center justify-center"
                >−</button>
                <span className="font-bold text-[15px] text-neutral-9 min-w-6 text-center">{qty}</span>
                <button
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-lg border border-primary-4 bg-primary-5 cursor-pointer font-bold text-body text-primary-7 flex items-center justify-center"
                >+</button>
            </div>

            <button
                onClick={handleAdd}
                className="font-bold text-[13px] py-2.5 rounded-lg border-0 transition-all duration-200 cursor-pointer"
                style={{
                    background: added ? "#008000" : qty > 0 ? "#FFD700" : "#F8FAFC",
                    color: added ? "#fff" : qty > 0 ? "#0D0D1A" : "#A9A9A9",
                    cursor: qty > 0 ? "pointer" : "default",
                }}
            >
                {added ? "✓ Ajouté !" : "Ajouter au panier"}
            </button>
        </div>
    );
}

export default function FeaturedProducts() {
    const [activeCategory, setActiveCategory] = useState("Tout");
    const filtered = activeCategory === "Tout" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <section className="bg-neutral-3 py-24 px-4 md:px-8">
            <div className="max-w-275 mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
                    <div>
                        <div className="inline-block bg-primary-5 border border-primary-3 rounded-full px-5 py-1.5 mb-3 text-[12px] font-semibold text-primary-7 tracking-widest uppercase">
                            Boissons populaires
                        </div>
                        <h2 className="font-extrabold text-neutral-9 leading-tight" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
                            Commandez vos <span className="text-primary-1">boissons favorites</span>
                        </h2>
                    </div>
                    <a href="/boissons" className="font-semibold text-sm text-secondary-1 no-underline whitespace-nowrap shrink-0">
                        Voir tout →
                    </a>
                </div>

                {/* Filters — horizontal scroll on mobile */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="font-semibold text-[13px] px-5 py-2 rounded-full border cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                            style={{
                                background: activeCategory === cat ? "#FFD700" : "#fff",
                                color: activeCategory === cat ? "#0D0D1A" : "#1A1A2E",
                                borderColor: activeCategory === cat ? "#FFD700" : "#f1f5f9",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filtered.map((p, i) => <ProductCard key={i} product={p} />)}
                </div>
            </div>
        </section>
    );
}