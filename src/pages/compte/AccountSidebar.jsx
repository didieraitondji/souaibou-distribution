import { useAuth } from "../../context/AuthContext.jsx";

const TABS = [
    { id: "profile", icon: "👤", label: "Mon profil" },
    { id: "orders", icon: "📦", label: "Mes commandes" },
    { id: "addresses", icon: "📍", label: "Mes adresses" },
    { id: "security", icon: "🔒", label: "Sécurité" },
];

export default function AccountSidebar({ activeTab, onTabChange }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <aside className="w-full lg:w-55 shrink-0">
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 overflow-hidden sticky top-24">
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className="flex items-center gap-3 px-4 py-3.5 border-0 cursor-pointer transition-all duration-150 text-left w-full shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal"
                                style={{
                                    background: isActive ? "rgba(255,215,0,0.08)" : "transparent",
                                    borderLeft: isActive ? "3px solid #FFD700" : "3px solid transparent",
                                    borderBottom: "1px solid #f1f5f9",
                                }}
                            >
                                <span className="text-h6">{tab.icon}</span>
                                <span className="font-semibold text-[14px]"
                                    style={{ color: isActive ? "#B89800" : "#64748B" }}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}

                    {/* Déconnexion */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3.5 border-0 cursor-pointer transition-all duration-150 text-left w-full shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal hover:bg-danger-2"
                        style={{ borderLeft: "3px solid transparent" }}
                    >
                        <span className="text-h6">🚪</span>
                        <span className="font-semibold text-[14px] text-danger-1">Se déconnecter</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}