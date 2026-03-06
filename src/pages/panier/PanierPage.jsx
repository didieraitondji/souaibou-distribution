import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import CartSummary from "./CartSummary.jsx";
import CheckoutForm from "./CheckoutForm.jsx";
import OrderConfirmation from "./OrderConfirmation.jsx";

const STEPS = [
    { id: 1, label: "Panier", icon: "🛒" },
    { id: 2, label: "Livraison", icon: "🚚" },
    { id: 3, label: "Confirmé", icon: "✅" },
];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function PanierPage() {
    const [step, setStep] = useState(1);
    const [orderData, setOrderData] = useState(null);
    const { cartCount } = useCart();

    const handleConfirm = (data) => {
        setOrderData(data);
        setStep(3);
    };

    return (
        <div className="min-h-screen bg-neutral-3">
            {/* Page header */}
            <div className="bg-neutral-0 border-b border-neutral-4 pt-20 pb-0 px-4 md:px-8">
                <div className="max-w-275 mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[13px] text-neutral-6 pt-6 pb-4">
                        <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                        <span>/</span>
                        <span className="text-primary-1 font-semibold">Mon panier</span>
                    </div>

                    {/* Stepper */}
                    {step < 3 && (
                        <div className="flex items-center gap-0 pb-0 overflow-x-auto">
                            {STEPS.filter((s) => s.id <= 2).map((s, i) => (
                                <div key={s.id} className="flex items-center gap-0 shrink-0">
                                    {/* Step */}
                                    <div
                                        className="flex items-center gap-2.5 px-4 py-4 border-b-2 transition-all duration-200 cursor-pointer"
                                        style={{
                                            borderBottomColor: step === s.id ? "#FFD700" : step > s.id ? "#008000" : "transparent",
                                        }}
                                        onClick={() => { if (s.id < step) setStep(s.id); }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black shrink-0"
                                            style={{
                                                background: step === s.id ? "#FFD700" : step > s.id ? "#008000" : "#F1F5F9",
                                                color: step === s.id ? "#0D0D1A" : step > s.id ? "#fff" : "#A9A9A9",
                                            }}
                                        >
                                            {step > s.id ? "✓" : s.id}
                                        </div>
                                        <span
                                            className="font-semibold text-sm whitespace-nowrap"
                                            style={{ color: step === s.id ? "#1A1A2E" : step > s.id ? "#008000" : "#A9A9A9" }}
                                        >
                                            {s.label}
                                            {s.id === 1 && cartCount > 0 && (
                                                <span className="ml-1.5 text-[11px] font-medium text-neutral-6">({cartCount})</span>
                                            )}
                                        </span>
                                    </div>
                                    {/* Séparateur */}
                                    {i < STEPS.filter((x) => x.id <= 2).length - 1 && (
                                        <div className="w-8 h-px mx-1 shrink-0" style={{ background: step > s.id ? "#008000" : "#E2E8F0" }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Contenu */}
            <div className="max-w-275 mx-auto px-4 md:px-8 py-8 md:py-10">
                {step === 1 && <CartSummary onContinue={() => setStep(2)} />}
                {step === 2 && <CheckoutForm onConfirm={handleConfirm} onBack={() => setStep(1)} />}
                {step === 3 && orderData && <OrderConfirmation orderData={orderData} />}
            </div>
        </div>
    );
}