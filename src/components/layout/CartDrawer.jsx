import { useCart } from "../../context/CartContext.jsx";

export default function CartDrawer() {
    const { cart, cartTotal, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    return (
        <>
            {/* Overlay sombre */}
            <div
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 z-40 transition-all duration-300"
                style={{
                    background: "rgba(0,0,0,0.5)",
                    opacity: cartOpen ? 1 : 0,
                    pointerEvents: cartOpen ? "auto" : "none",
                }}
            />

            {/* Panneau latéral */}
            <div
                className="fixed top-0 right-0 h-full z-50 bg-neutral-0 flex flex-col transition-transform duration-300 ease-in-out"
                style={{
                    width: "min(420px, 100vw)",
                    transform: cartOpen ? "translateX(0)" : "translateX(100%)",
                    boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[22px]">🛒</span>
                        <div>
                            <h2 className="font-bold text-[17px] text-neutral-9">Mon panier</h2>
                            <p className="text-[12px] text-neutral-6">{totalItems} article{totalItems > 1 ? "s" : ""}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="w-9 h-9 rounded-full bg-neutral-3 border-0 cursor-pointer flex items-center justify-center text-neutral-7 hover:bg-neutral-4 transition-colors text-h5 leading-none"
                    >×</button>
                </div>

                {/* Liste des articles */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <span className="text-[56px]">🛒</span>
                            <p className="font-semibold text-body text-neutral-9">Votre panier est vide</p>
                            <p className="text-sm text-neutral-6">Ajoutez des produits pour commencer</p>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="font-bold text-sm text-neutral-9 px-6 py-3 rounded-xl border-0 cursor-pointer mt-2"
                                style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)" }}
                            >
                                Parcourir le catalogue
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => {
                            const unitPrice = item.promo
                                ? Math.round(item.price * (1 - item.promo / 100))
                                : item.price;
                            return (
                                <div key={item.id} className="flex gap-4 p-4 bg-neutral-3 rounded-2xl">
                                    <div className="w-14 h-14 bg-neutral-0 rounded-xl flex items-center justify-center text-[28px] shrink-0">
                                        {item.emoji ?? "📦"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-neutral-9 truncate">{item.name}</p>
                                        <p className="text-[11px] text-neutral-6 mb-2">{item.unit ?? ""}</p>
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <div className="flex items-center border border-neutral-4 rounded-lg overflow-hidden bg-neutral-0">
                                                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center font-bold text-sm text-neutral-7 hover:bg-neutral-3 border-0 cursor-pointer">−</button>
                                                <span className="w-8 text-center text-[13px] font-bold text-neutral-9">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center font-bold text-sm text-primary-7 hover:bg-primary-5 border-0 cursor-pointer">+</button>
                                            </div>
                                            <span className="font-extrabold text-[15px] text-primary-1 shrink-0">
                                                {(unitPrice * item.qty).toLocaleString()} FCFA
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="self-start text-neutral-6 hover:text-danger-1 bg-transparent border-0 cursor-pointer text-body transition-colors shrink-0"
                                    >🗑</button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer panier */}
                {cart.length > 0 && (
                    <div className="px-6 py-5 border-t border-neutral-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-6">Livraison</span>
                            <span className="font-semibold text-accent-1">
                                {cartTotal >= 10000 ? "Gratuite 🎉" : "Gratuite dès 10 000 FCFA"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-t border-neutral-4">
                            <span className="font-bold text-body text-neutral-9">Total</span>
                            <span className="font-extrabold text-[22px] text-primary-1">
                                {cartTotal.toLocaleString()}
                                <span className="text-sm font-medium text-neutral-6 ml-1">FCFA</span>
                            </span>
                        </div>
                        <a
                            href="/panier"
                            onClick={() => setCartOpen(false)}
                            className="font-bold text-[15px] text-neutral-9 no-underline py-4 rounded-xl text-center block transition-all duration-200 hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}
                        >
                            Valider ma commande →
                        </a>
                        <button
                            onClick={() => setCartOpen(false)}
                            className="font-semibold text-[13px] text-neutral-6 bg-transparent border-0 cursor-pointer py-2 hover:text-neutral-9 transition-colors"
                        >
                            Continuer mes achats
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}