export const ORDER_STATUSES = {
  confirmed: {
    label: "Commande confirmée",
    icon: "✅",
    color: "#008000",
    step: 1,
  },
  preparing: { label: "En préparation", icon: "📦", color: "#0047AB", step: 2 },
  out: {
    label: "En cours de livraison",
    icon: "🚚",
    color: "#FFD700",
    step: 3,
  },
  delivered: { label: "Livré", icon: "🎉", color: "#008000", step: 4 },
  cancelled: { label: "Annulée", icon: "❌", color: "#EF4444", step: 0 },
};

export const TIMELINE_STEPS = [
  {
    id: "confirmed",
    label: "Commande confirmée",
    icon: "✅",
    desc: "Votre commande a été enregistrée et validée.",
  },
  {
    id: "preparing",
    label: "En préparation",
    icon: "📦",
    desc: "Nos équipes préparent soigneusement vos articles.",
  },
  {
    id: "out",
    label: "En livraison",
    icon: "🚚",
    desc: "Votre commande est en route vers vous.",
  },
  {
    id: "delivered",
    label: "Livré",
    icon: "🎉",
    desc: "Commande remise avec succès. Bon événement !",
  },
];

// Commandes de démo — utilisées quand le client cherche par numéro
export const DEMO_ORDERS = [
  {
    id: "SD-A1B2C3",
    status: "out",
    client: {
      nom: "Adjovi Mireille",
      telephone: "+229 97 11 22 33",
      zone: "Cotonou – Akpakpa",
    },
    date: "2025-06-15",
    heure: "14:00",
    paymentMethod: "mtn",
    items: [
      { name: "Castel Beer x24", emoji: "🍺", qty: 5, price: 12000 },
      { name: "Coca-Cola 1.5L x12", emoji: "🥤", qty: 2, price: 6000 },
      { name: "Eau Minérale x24", emoji: "💧", qty: 3, price: 7200 },
    ],
    timeline: [
      { step: "confirmed", time: "10:32", date: "2025-06-15", done: true },
      { step: "preparing", time: "10:45", date: "2025-06-15", done: true },
      {
        step: "out",
        time: "13:10",
        date: "2025-06-15",
        done: true,
        note: "Livreur : Kofi — 📞 +229 97 00 11 22",
      },
      { step: "delivered", time: "14:00", date: "2025-06-15", done: false },
    ],
  },
  {
    id: "SD-D4E5F6",
    status: "delivered",
    client: {
      nom: "Kokou Mensah",
      telephone: "+229 96 55 44 33",
      zone: "Cotonou – Fidjrossè",
    },
    date: "2025-06-12",
    heure: "11:00",
    paymentMethod: "cash",
    items: [
      { name: "Chaise plastique ×50", emoji: "🪑", qty: 1, price: 7500 },
      { name: "Table ronde ×10", emoji: "⭕", qty: 1, price: 20000 },
      { name: "Nappe blanche ×10", emoji: "⬜", qty: 1, price: 5000 },
    ],
    timeline: [
      { step: "confirmed", time: "08:15", date: "2025-06-11", done: true },
      { step: "preparing", time: "09:00", date: "2025-06-12", done: true },
      { step: "out", time: "09:45", date: "2025-06-12", done: true },
      {
        step: "delivered",
        time: "11:05",
        date: "2025-06-12",
        done: true,
        note: "Reçu et signé par le client",
      },
    ],
  },
  {
    id: "SD-G7H8I9",
    status: "preparing",
    client: {
      nom: "Fatoumata Diallo",
      telephone: "+229 95 22 11 00",
      zone: "Abomey-Calavi",
    },
    date: "2025-06-16",
    heure: "09:00",
    paymentMethod: "moov",
    items: [
      { name: "Heineken ×48", emoji: "🍺", qty: 2, price: 33600 },
      { name: "Jus de Bissap ×20", emoji: "🫐", qty: 1, price: 6000 },
    ],
    timeline: [
      { step: "confirmed", time: "18:20", date: "2025-06-15", done: true },
      { step: "preparing", time: "07:00", date: "2025-06-16", done: true },
      { step: "out", time: "", date: "", done: false },
      { step: "delivered", time: "", date: "", done: false },
    ],
  },
];

export function findOrder(query) {
  const q = query.trim().toUpperCase();
  return DEMO_ORDERS.find((o) => o.id.toUpperCase() === q) ?? null;
}

export function getOrderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
