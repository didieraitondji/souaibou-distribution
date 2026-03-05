import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart({ ...product, qty });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    const discountedPrice = product.promo
        ? Math.round(product.price * (1 - product.promo / 100))
        : null;

    return (
        <div className="bg-neutral-0 rounded-2xl overflow-hidden border border-neutral-4 flex flex-col transition-all duration-250 hover:-translate-y-1 hover:shadow-xl group">
            {/* Image zone */}
            <div className="relative bg-neutral-3 h-44 flex items-center justify-center overflow-hidden">
                <span className="text-[64px] transition-transform duration-300 group-hover:scale-110 select-none">
                    {product.emoji}
                </span>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.promo && (
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-danger-1 text-neutral-0">
                            -{product.promo}%
                        </span>
                    )}
                    {product.badge && (
                        <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{
                                background: product.badgeColor,
                                color: product.badgeColor === "#FFD700" ? "#0D0D1A" : "#fff",
                            }}
                        >
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Stock indicator */}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warning-2 text-warning-1 border border-warning-1">
                        Plus que {product.stock} !
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-neutral-9/60 flex items-center justify-center rounded-none">
                        <span className="text-[13px] font-bold text-neutral-0 bg-neutral-9 px-4 py-1.5 rounded-full">
                            Rupture de stock
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 grow">
                {/* Category */}
                <span className="text-[11px] font-semibold text-secondary-1 uppercase tracking-wider">
                    {product.category}
                </span>

                {/* Name */}
                <h3 className="font-bold text-[15px] text-neutral-9 leading-snug">{product.name}</h3>

                {/* Description */}
                <p className="text-[12px] text-neutral-6 leading-relaxed grow">{product.desc}</p>

                {/* Volume / format */}
                {product.volume && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {product.formats?.map((f) => (
                            <span key={f} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-3 text-neutral-7 border border-neutral-4">
                                {f}
                            </span>
                        ))}
                    </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-extrabold text-h5 text-primary-1">
                        {(discountedPrice ?? product.price).toLocaleString()}
                        <span className="text-[12px] font-medium text-neutral-6 ml-1">FCFA</span>
                    </span>
                    {discountedPrice && (
                        <span className="text-[13px] text-neutral-6 line-through">
                            {product.price.toLocaleString()} FCFA
                        </span>
                    )}
                </div>

                <p className="text-[11px] text-neutral-6">par {product.unit}</p>
            </div>

            {/* Add to cart */}
            <div className="px-4 pb-4 flex items-center gap-2">
                {/* Qty selector */}
                <div className="flex items-center border border-neutral-4 rounded-xl overflow-hidden shrink-0">
                    <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        disabled={product.stock === 0}
                        className="w-8 h-9 flex items-center justify-center font-bold text-body text-neutral-7 bg-neutral-3 hover:bg-neutral-4 transition-colors border-0 cursor-pointer disabled:opacity-40"
                    >−</button>
                    <span className="w-8 text-center font-bold text-sm text-neutral-9">{qty}</span>
                    <button
                        onClick={() => setQty(qty + 1)}
                        disabled={product.stock === 0}
                        className="w-8 h-9 flex items-center justify-center font-bold text-body text-primary-7 bg-primary-5 hover:bg-primary-4 transition-colors border-0 cursor-pointer disabled:opacity-40"
                    >+</button>
                </div>

                {/* Add button */}
                <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="flex-1 font-bold text-[13px] py-2.5 rounded-xl border-0 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        background: added
                            ? "#008000"
                            : product.stock === 0
                                ? "#F1F5F9"
                                : "linear-gradient(135deg,#FFD700,#E6C200)",
                        color: added ? "#fff" : product.stock === 0 ? "#A9A9A9" : "#0D0D1A",
                        boxShadow: added || product.stock === 0 ? "none" : "0 4px 12px rgba(255,215,0,0.3)",
                    }}
                >
                    {added ? "✓ Ajouté !" : product.stock === 0 ? "Indisponible" : "🛒 Ajouter"}
                </button>
            </div>
        </div>
    );
}