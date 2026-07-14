"use client";

import { useState, useMemo } from "react";
import { AdminShell } from "@/components/admin/admin-shell";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: string;
  location: string;
  paymentMethod: string;
  total: number;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; style: string; dot: string }> = {
  pending: { label: "Pendente", style: "bg-yellow-50 text-yellow-700 border border-yellow-100", dot: "bg-yellow-400" },
  processing: { label: "Processando", style: "bg-blue-50 text-blue-700 border border-blue-100", dot: "bg-blue-400" },
  shipped: { label: "Em Trânsito", style: "bg-purple-50 text-purple-700 border border-purple-100", dot: "bg-purple-400" },
  delivered: { label: "Entregue", style: "bg-emerald-50 text-emerald-800 border border-emerald-200", dot: "bg-emerald-600" },
  cancelled: { label: "Cancelado", style: "bg-red-50 text-red-600 border border-red-100", dot: "bg-red-400" },
};

const TABS = [
  { key: "all" as const, label: "Todos" },
  { key: "pending" as const, label: "Pendente" },
  { key: "processing" as const, label: "Processando" },
  { key: "shipped" as const, label: "Em Trânsito" },
  { key: "delivered" as const, label: "Entregue" },
  { key: "cancelled" as const, label: "Cancelado" },
];

export default function OrdersPage() {
  // Mock data
  const mockOrders: Order[] = [
    { id: "1", orderNumber: "PED-001", createdAt: "2026-07-14", status: "pending", customer: "João Silva", location: "Luanda, Angola", paymentMethod: "Transferência", total: 125000 },
    { id: "2", orderNumber: "PED-002", createdAt: "2026-07-14", status: "processing", customer: "Maria Santos", location: "Benguela, Angola", paymentMethod: "Multicaixa", total: 89500 },
    { id: "3", orderNumber: "PED-003", createdAt: "2026-07-13", status: "delivered", customer: "Carlos Mendes", location: "Huambo, Angola", paymentMethod: "Dinheiro", total: 156000 },
    { id: "4", orderNumber: "PED-004", createdAt: "2026-07-13", status: "pending", customer: "Ana Costa", location: "Luanda, Angola", paymentMethod: "Transferência", total: 78000 },
    { id: "5", orderNumber: "PED-005", createdAt: "2026-07-12", status: "shipped", customer: "Pedro Alves", location: "Lobito, Angola", paymentMethod: "Multicaixa", total: 234500 },
  ];

  const [orders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [search, setSearch] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: orders.length };
    TABS.slice(1).forEach(({ key }) => {
      result[key] = orders.filter((o) => o.status === key).length;
    });
    return result;
  }, [orders]);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => activeTab === "all" || o.status === activeTab)
      .filter((o) => {
        const q = search.toLowerCase();
        if (!q) return true;
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.location.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return sortNewest ? diff : -diff;
      });
  }, [orders, activeTab, search, sortNewest]);

  const formatCurrency = (value: number) => {
    return `${(value / 1000).toLocaleString("pt-AO", { minimumFractionDigits: 0 })} Kz`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <AdminShell title="Pedidos" subtitle="Gerir todos os pedidos da plataforma">
      <div className="space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: orders.length, color: "text-[#008060]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Pendentes", value: counts["pending"] ?? 0, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Em Trânsito", value: counts["shipped"] ?? 0, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
            { label: "Entregues", value: counts["delivered"] ?? 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-xl border ${s.border} px-4 py-3.5 flex items-center gap-3`}>
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center ${s.color} font-bold text-[15px] shrink-0`}>
                {s.value}
              </div>
              <span className="text-[12.5px] text-[#666] font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-[#f0f0f0] overflow-x-auto [scrollbar-width:none]">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex shrink-0 items-center gap-1.5 px-4 py-3.5 text-[12.5px] font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-[#008060] text-[#008060]"
                    : "border-transparent text-[#888] hover:text-[#333]"
                }`}
              >
                {label}
                {(counts[key] ?? 0) > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    activeTab === key ? "bg-[#008060]/10 text-[#008060]" : "bg-gray-100 text-[#888]"
                  }`}>
                    {counts[key]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-[#f5f5f5]">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="search"
                placeholder="Pesquisar por número, cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-[13px] bg-[#f5f5f5] border border-transparent rounded-lg outline-none focus:bg-white focus:border-[#008060]/30 focus:ring-2 focus:ring-[#008060]/10 transition-all placeholder:text-[#bbb]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>
            <button
              onClick={() => setSortNewest((p) => !p)}
              className="flex items-center justify-center gap-2 px-3.5 py-2 text-[12.5px] font-medium text-[#555] border border-[#e8e8e8] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm4 1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5"/>
              </svg>
              {sortNewest ? "Mais recentes" : "Mais antigos"}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#f5f5f5] bg-[#fafafa]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Pedido</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb] hidden md:table-cell">Cliente / Morada</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb] hidden lg:table-cell">Pagamento</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Total</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-[#bbb] text-[13px]">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => {
                    const cfg = STATUS_CONFIG[order.status];
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-[#f5f5f5] last:border-0 hover:bg-[#f8faff] transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4">
                          <div className="font-mono text-[12px] text-[#008060] font-semibold">{order.orderNumber}</div>
                          <div className="text-[11px] text-[#ccc] mt-0.5">{formatDate(order.createdAt)}</div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="font-medium text-[#333] text-[12.5px]">{order.customer}</div>
                          <div className="text-[11px] text-[#bbb] mt-0.5">{order.location}</div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell text-[#666]">
                          {order.paymentMethod}
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#111] whitespace-nowrap">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${cfg.style}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#f5f5f5]">
            <p className="text-[12px] text-[#aaa]">
              Mostrando <strong className="text-[#555]">{filtered.length}</strong> de{" "}
              <strong className="text-[#555]">{orders.length}</strong> pedidos
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
