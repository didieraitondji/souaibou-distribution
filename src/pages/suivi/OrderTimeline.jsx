import { useEffect, useState } from "react";
import { TIMELINE_STEPS, ORDER_STATUSES } from "./data.js";

export default function OrderTimeline({ order }) {
    const [animated, setAnimated] = useState(false);
    const currentStep = ORDER_STATUSES[order.status]?.step ?? 0;

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(t);
    }, [order.id]);

    const getStepState = (stepIndex) => {
        const stepNum = stepIndex + 1;
        if (order.status === "cancelled") return "cancelled";
        if (stepNum < currentStep) return "done";
        if (stepNum === currentStep) return "active";
        return "pending";
    };

    return (
        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-[17px] text-neutral-9">Progression de la livraison</h3>
                <StatusBadge status={order.status} />
            </div>

            <div className="relative">
                {/* Ligne verticale de fond */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-neutral-4" style={{ zIndex: 0 }} />

                {/* Ligne de progression animée */}
                <div
                    className="absolute left-6 top-6 w-0.5 transition-all duration-1000 ease-out"
                    style={{
                        zIndex: 1,
                        background: "linear-gradient(to bottom,#008000,#FFD700)",
                        height: animated ? `${Math.max(0, (currentStep - 1) / (TIMELINE_STEPS.length - 1)) * 100}%` : "0%",
                        top: 24,
                    }}
                />

                <div className="flex flex-col gap-0">
                    {TIMELINE_STEPS.map((step, i) => {
                        const state = getStepState(i);
                        const timelineEntry = order.timeline[i];
                        const isDone = state === "done";
                        const isActive = state === "active";
                        const isPending = state === "pending";

                        return (
                            <div key={step.id} className="relative flex gap-5 pb-8 last:pb-0" style={{ zIndex: 2 }}>
                                {/* Icône */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-[20px] shrink-0 transition-all duration-500 border-2"
                                    style={{
                                        background: isDone ? "#008000" : isActive ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.8)",
                                        borderColor: isDone ? "#008000" : isActive ? "#FFD700" : "#E2E8F0",
                                        boxShadow: isActive ? "0 0 0 4px rgba(255,215,0,0.2)" : "none",
                                        transitionDelay: `${i * 150}ms`,
                                        opacity: animated ? 1 : 0,
                                        transform: animated ? "scale(1)" : "scale(0.8)",
                                    }}
                                >
                                    {isDone ? "✓" : step.icon}
                                </div>

                                {/* Contenu */}
                                <div
                                    className="flex-1 pt-2 min-w-0"
                                    style={{
                                        opacity: animated ? 1 : 0,
                                        transform: animated ? "translateX(0)" : "translateX(-10px)",
                                        transition: `all 0.4s ease ${i * 150 + 100}ms`,
                                    }}
                                >
                                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                        <span
                                            className="font-bold text-[15px]"
                                            style={{ color: isDone ? "#008000" : isActive ? "#B89800" : "#A9A9A9" }}
                                        >
                                            {step.label}
                                        </span>
                                        {(isDone || isActive) && timelineEntry?.time && (
                                            <span className="text-[11px] font-medium text-neutral-6">
                                                {timelineEntry.date} à {timelineEntry.time}
                                            </span>
                                        )}
                                        {isActive && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                                                style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
                                                EN COURS
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-[13px] leading-relaxed"
                                        style={{ color: isDone || isActive ? "#64748B" : "#CBD5E1" }}>
                                        {step.desc}
                                    </p>

                                    {/* Note spéciale (livreur, signature…) */}
                                    {timelineEntry?.note && (isDone || isActive) && (
                                        <div className="mt-2 flex items-center gap-2 text-[12px] font-medium px-3 py-1.5 rounded-lg w-fit"
                                            style={{ background: "rgba(255,215,0,0.08)", color: "#B89800", border: "1px solid rgba(255,215,0,0.2)" }}>
                                            <span>ℹ️</span> {timelineEntry.note}
                                        </div>
                                    )}

                                    {/* Estimation si pending */}
                                    {isPending && (
                                        <p className="text-[12px] text-neutral-5 mt-1">— En attente</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const s = ORDER_STATUSES[status];
    if (!s) return null;
    return (
        <span
            className="text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{
                background: `${s.color}15`,
                color: s.color,
                border: `1px solid ${s.color}30`,
            }}
        >
            {s.icon} {s.label}
        </span>
    );
}