import { useCart } from "../../context/CartContext.jsx";

export default function CartSummary({ onContinue }) {
    const { cart, cartTotal, cartCount, removeFromCart, updateQty } = useCart();

    const livraison = cartTotal >= 10000 ? 0 : 1500;
    const totalFinal = cartTotal + livraison;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-5 text-center px-4">
                <span className="text-[72px]">🛒</span>
                <h2 className="font-bold text-h4 text-neutral-9">Votre panier est vide</h2>
                <p className="text-[15px] text-neutral-6 max-w-90 leading-relaxed">
                    Ajoutez des boissons, du matériel ou des services pour commencer votre commande.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {[
                        { label: "🍺 Boissons", href: "/boissons" },
                        { label: "🪑 Location", href: "/location" },
                        { label: "🎉 Services", href: "/services" },
                    ].map((l) => (
                        <a key={l.href} href={l.href}
                            className="font-semibold text-sm no-underline px-6 py-3 rounded-xl border border-neutral-4 text-neutral-8 hover:border-primary-1 hover:text-primary-1 transition-all duration-200">
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Liste des articles ── */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-h5 text-neutral-9">
                        Mon panier <span className="text-neutral-6 font-medium text-body">({cartCount} article{cartCount > 1 ? "s" : ""})</span>
                    </h2>
                    <a href="/boissons" className="text-[13px] font-semibold text-secondary-1 no-underline hover:underline">
                        + Ajouter des articles
                    </a>
                </div>

                <div className="flex flex-col gap-3">
                    {cart.map((item) => {
                        const unitPrice = item.promo
                            ? Math.round(item.price * (1 - item.promo / 100))
                            : item.price;
                        const lineTotal = unitPrice * item.qty;

                        return (
                            <div key={item.id}
                                className="flex gap-4 bg-neutral-0 rounded-2xl p-4 md:p-5 border border-neutral-4 hover:border-neutral-5 transition-all duration-200">

                                {/* Emoji */}
                                <div className="w-16 h-16 bg-neutral-3 rounded-2xl flex items-center justify-center text-h3 shrink-0">
                                    {item.emoji ?? "📦"}
                                </div>

                                {/* Infos */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-bold text-[15px] text-neutral-9 leading-snug">{item.name}</p>
                                            <p className="text-[12px] text-neutral-6 mt-0.5">{item.unit ?? ""}</p>
                                            {item.type === "location" && (
                                                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1"
                                                    style={{ background: "rgba(0,71,171,0.1)", color: "#0047AB", border: "1px solid rgba(0,71,171,0.2)" }}>
                                                    📅 Location
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)}
                                            className="text-neutral-5 hover:text-danger-1 bg-transparent border-0 cursor-pointer text-h6 transition-colors shrink-0 leading-none">
                                            ×
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                                        {/* Qty selector */}
                                        <div className="flex items-center border border-neutral-4 rounded-xl overflow-hidden bg-neutral-3">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}
                                                className="w-8 h-8 flex items-center justify-center font-bold text-[15px] text-neutral-7 hover:bg-neutral-4 border-0 cursor-pointer transition-colors">−</button>
                                            <span className="w-10 text-center font-bold text-sm text-neutral-9">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}
                                                className="w-8 h-8 flex items-center justify-center font-bold text-[15px] text-primary-7 hover:bg-primary-5 border-0 cursor-pointer transition-colors">+</button>
                                        </div>

                                        {/* Prix ligne */}
                                        <div className="text-right">
                                            <div className="font-extrabold text-[17px] text-primary-1">{lineTotal.toLocaleString()} FCFA</div>
                                            {item.qty > 1 && (
                                                <div className="text-[11px] text-neutral-6">{unitPrice.toLocaleString()} FCFA / unité</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Récapitulatif ── */}
            <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 sticky top-24">
                    <h3 className="font-bold text-body text-neutral-9 mb-5">Récapitulatif</h3>

                    <div className="flex flex-col gap-3 pb-4 border-b border-neutral-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-6">Sous-total</span>
                            <span className="font-semibold text-neutral-9">{cartTotal.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-6">Livraison</span>
                            <span className={`font-semibold ${livraison === 0 ? "text-accent-1" : "text-neutral-9"}`}>
                                {livraison === 0 ? "Gratuite 🎉" : `${livraison.toLocaleString()} FCFA`}
                            </span>
                        </div>
                        {livraison > 0 && (
                            <p className="text-[11px] text-neutral-6 bg-neutral-3 rounded-lg px-3 py-2">
                                Livraison gratuite dès <strong>10 000 FCFA</strong> — il vous manque {(10000 - cartTotal).toLocaleString()} FCFA
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <span className="font-bold text-[17px] text-neutral-9">Total</span>
                        <span className="font-extrabold text-[22px] text-primary-1">{totalFinal.toLocaleString()} <span className="text-sm font-medium text-neutral-6">FCFA</span></span>
                    </div>

                    <button
                        onClick={onContinue}
                        className="w-full font-bold text-[15px] text-neutral-9 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}
                    >
                        Passer la commande →
                    </button>

                    {/* Garanties */}
                    <div className="mt-4 flex flex-col gap-2">
                        {[
                            { icon: "🔒", text: "Paiement 100% sécurisé" },
                            { icon: "🚚", text: "Livraison express disponible" },
                            { icon: "✅", text: "Produits qualité garantie" },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-[12px] text-neutral-6">
                                <span>{icon}</span> {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}