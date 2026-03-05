import { useState, useEffect, useRef } from "react";

const STATS = [
    { value: 1200, suffix: "+", label: "Commandes livrées", icon: "📦", color: "#FFD700" },
    { value: 850, suffix: "+", label: "Clients satisfaits", icon: "😊", color: "#0047AB" },
    { value: 300, suffix: "+", label: "Événements organisés", icon: "🎉", color: "#008000" },
    { value: 2, suffix: "h", label: "Délai moyen de livraison", icon: "⚡", color: "#FFD700" },
];

function CountUp({ target, suffix, active }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
        }, 2000 / steps);
        return () => clearInterval(timer);
    }, [active, target]);
    return <>{count}{suffix}</>;
}

export default function StatsSection() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="bg-neutral-2 py-20 px-4 md:px-8 border-t border-b border-neutral-4">
            <div className="max-w-275 mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {STATS.map((stat, i) => (
                        <div
                            key={i}
                            className="text-center py-8 px-6 bg-neutral-0 rounded-2xl border border-neutral-4 transition-all duration-500"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(20px)",
                                transitionDelay: `${i * 0.1}s`,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div className="text-[28px] mb-3">{stat.icon}</div>
                            <div className="font-extrabold leading-none mb-2" style={{ fontSize: "clamp(28px,4vw,40px)", color: stat.color }}>
                                <CountUp target={stat.value} suffix={stat.suffix} active={visible} />
                            </div>
                            <div className="text-[13px] text-neutral-6 font-medium leading-snug">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}