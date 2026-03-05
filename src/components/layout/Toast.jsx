import { useCart } from "../../context/CartContext.jsx";

export default function Toast() {
    const { toastMsg } = useCart();
    return (
        <div
            className="fixed bottom-6 left-1/2 z-50 transition-all duration-300 pointer-events-none"
            style={{
                transform: `translateX(-50%) translateY(${toastMsg ? "0" : "16px"})`,
                opacity: toastMsg ? 1 : 0,
            }}
        >
            <div
                className="flex items-center gap-3 bg-neutral-9 text-neutral-0 px-6 py-3.5 rounded-2xl text-sm font-semibold whitespace-nowrap"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
            >
                <span className="text-accent-1 text-body">✓</span>
                {toastMsg}
            </div>
        </div>
    );
}