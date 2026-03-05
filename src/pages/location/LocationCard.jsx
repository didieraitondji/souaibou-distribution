import { useState } from "react";

export default function LocationCard({ product, nbDays, onAddToCart }) {
    const [qty, setQty] = useState(product.minQty);
    const [added, setAdded] = useState(false);

    const totalPrice = product.pricePerDay * qty * (nbDays || 1);

    const handleAdd = () => {
        onAddToCart({
            id: product.id,
            name: product.name,
            emoji: product.emoji,
            price: product.pricePerDay * (nbDays || 1),
            unit: `x${qty} — ${nbDays || 1} jour${(nbDays || 1) > 1 ? "s" : ""}`,
            qty,
            type: "location",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="bg-neutral-0 rounded-2xl overflow-hidden border border-neutral-4 flex flex-col transition-all duration-250 hover:-translate-y-1 hover:shadow-xl group">
            {/* Image zone */}
            <div className="relative bg-neutral-3 h-44 flex items-center justify-center overflow-hidden">
                <span className="text-[64px] transition-transform duration-300 group-hover:scale-110 select-none">
                    {product.emoji}
                </span>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: product.badgeColor, color: product.badgeColor === "#FFD700" ? "#0D0D1A" : "#fff" }}>
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Stock badge */}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warning-2 text-warning-1 border border-warning-1">
                        Plus que {product.stock} !
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-neutral-9/60 flex items-center justify-center">
                        <span className="text-[13px] font-bold text-neutral-0 bg-neutral-9 px-4 py-1.5 rounded-full">Indisponible</span>
                    </div>
                )}
            </div>

            {/* Contenu */}
            <div className="p-4 flex flex-col gap-2 grow">
                <span className="text-[11px] font-semibold text-secondary-1 uppercase tracking-wider">{product.category}</span>
                <h3 className="font-bold text-[15px] text-neutral-9 leading-snug">{product.name}</h3>
                <p className="text-[12px] text-neutral-6 leading-relaxed grow">{product.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {product.features.map((f) => (
                        <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-3 text-neutral-7 border border-neutral-4">{f}</span>
                    ))}
                </div>

                {/* Prix */}
                <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-h5 text-secondary-1">
                            {product.pricePerDay.toLocaleString()}
                        </span>
                        <span className="text-[12px] font-medium text-neutral-6">FCFA / jour</span>
                    </div>
                    {nbDays && nbDays > 1 && (
                        <p className="text-[11px] text-neutral-6">
                            soit <span className="font-semibold text-neutral-8">{(product.pricePerDay * nbDays).toLocaleString()} FCFA</span> pour {nbDays} jours
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex flex-col gap-3">
                {/* Quantité */}
                <div className="flex items-center justify-between">
                    <span className="text-[12px] text-neutral-6 font-medium">Quantité</span>
                    <div className="flex items-center border border-neutral-4 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setQty(Math.max(product.minQty, qty - (product.minQty >= 10 ? 10 : 1)))}
                            disabled={product.stock === 0}
                            className="w-8 h-9 flex items-center justify-center font-bold text-sm text-neutral-7 bg-neutral-3 hover:bg-neutral-4 border-0 cursor-pointer disabled:opacity-40"
                        >−</button>
                        <span className="px-3 font-bold text-sm text-neutral-9 min-w-12 text-center">{qty}</span>
                        <button
                            onClick={() => setQty(Math.min(product.stock, qty + (product.minQty >= 10 ? 10 : 1)))}
                            disabled={product.stock === 0}
                            className="w-8 h-9 flex items-center justify-center font-bold text-sm bg-secondary-5 hover:bg-secondary-4 border-0 cursor-pointer disabled:opacity-40"
                            style={{ color: "#0047AB" }}
                        >+</button>
                    </div>
                </div>

                {/* Total calculé */}
                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                    style={{ background: "rgba(0,71,171,0.06)", border: "1px solid rgba(0,71,171,0.15)" }}>
                    <span className="text-[12px] text-neutral-6 font-medium">
                        {qty} × {nbDays || 1}j
                    </span>
                    <span className="font-extrabold text-body text-secondary-1">
                        {totalPrice.toLocaleString()} FCFA
                    </span>
                </div>

                {/* Bouton */}
                <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="font-bold text-[13px] py-3 rounded-xl border-0 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        background: added ? "#008000" : product.stock === 0 ? "#F1F5F9"
                            : "linear-gradient(135deg,#0047AB,#003A8C)",
                        color: added ? "#fff" : product.stock === 0 ? "#A9A9A9" : "#fff",
                        boxShadow: added || product.stock === 0 ? "none" : "0 4px 12px rgba(0,71,171,0.3)",
                    }}
                >
                    {added ? "✓ Ajouté au panier !" : product.stock === 0 ? "Indisponible" : "🛒 Ajouter à ma location"}
                </button>
            </div>
        </div>
    );
}