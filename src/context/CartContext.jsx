import { createContext, useContext, useState, useCallback, useEffect } from "react";


const CartContext = createContext(null);

const STORAGE_KEY = "sd_cart";

function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
        // localStorage indisponible (navigation privée saturée, etc.)
    }
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(loadCart);   // ← initialisé depuis localStorage
    const [cartOpen, setCartOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState(null);

    // Synchroniser localStorage à chaque modification du panier
    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    const showToast = useCallback((msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 2500);
    }, []);

    const addToCart = useCallback((product) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + (product.qty ?? 1) } : i
                );
            }
            return [...prev, { ...product, qty: product.qty ?? 1 }];
        });
        showToast(`${product.emoji ?? "🛒"} ${product.name} ajouté au panier !`);
    }, [showToast]);

    const removeFromCart = useCallback((id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQty = useCallback((id, qty) => {
        if (qty <= 0) { removeFromCart(id); return; }
        setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    }, [removeFromCart]);

    const clearCart = useCallback(() => setCart([]), []);

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cart.reduce((sum, item) => {
        const price = item.promo
            ? Math.round(item.price * (1 - item.promo / 100))
            : item.price;
        return sum + price * item.qty;
    }, 0);

    return (
        <CartContext.Provider value={{
            cart, cartCount, cartTotal,
            addToCart, removeFromCart, updateQty, clearCart,
            cartOpen, setCartOpen,
            toastMsg,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart doit être utilisé dans un <CartProvider>");
    return ctx;
}