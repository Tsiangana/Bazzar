"use client";

import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminDashboard() {
  // Mock data
  const stats = [
    { label: "Total de Pedidos", value: 156, color: "text-[#008060]", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Pedidos Pendentes", value: 23, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Produtos Ativos", value: 89, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    { label: "Total Clientes", value: 342, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  ];

  const recentOrders = [
    { id: "PED-001", customer: "João Silva", status: "Pendente", value: "125.000 Kz", date: "14 Jul 2026" },
    { id: "PED-002", customer: "Maria Santos", status: "Em Processamento", value: "89.500 Kz", date: "14 Jul 2026" },
    { id: "PED-003", customer: "Carlos Mendes", status: "Entregue", value: "156.000 Kz", date: "13 Jul 2026" },
    { id: "PED-004", customer: "Ana Costa", status: "Pendente", value: "78.000 Kz", date: "13 Jul 2026" },
    { id: "PED-005", customer: "Pedro Alves", status: "Em Trânsito", value: "234.500 Kz", date: "12 Jul 2026" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";
      case "Em Processamento":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "Em Trânsito":
        return "bg-purple-50 text-purple-700 border border-purple-100";
      case "Entregue":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  return (
    <AdminShell title="Dashboard" subtitle="Visão geral do seu negócio">
      <div className="space-y-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-white rounded-xl border ${stat.border} px-4 py-3.5 flex items-center gap-3`}>
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} font-bold text-[15px] shrink-0`}>
                {stat.value}
              </div>
              <span className="text-[12.5px] text-[#666] font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-[15px] font-bold text-gray-900">Pedidos Recentes</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Últimos pedidos registrados no sistema</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#f5f5f5] bg-[#fafafa]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Pedido</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Cliente</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Estado</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Valor</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#f5f5f5] last:border-0 hover:bg-[#fafafa] transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="font-mono text-[12px] text-[#008060] font-semibold">{order.id}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-[#333] text-[12.5px]">{order.customer}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-[#111] whitespace-nowrap">
                      {order.value}
                    </td>
                    <td className="px-4 py-4 text-[#888]">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-[#f5f5f5]">
            <p className="text-[12px] text-[#aaa]">
              Mostrando <strong className="text-[#555]">{recentOrders.length}</strong> pedidos mais recentes
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="bg-white rounded-xl border border-[#e8e8e8] px-4 py-4 hover:bg-[#fafafa] transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#008060] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900">Novo Produto</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Adicionar produto ao catálogo</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-xl border border-[#e8e8e8] px-4 py-4 hover:bg-[#fafafa] transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900">Nova Categoria</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Criar categoria de produtos</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-xl border border-[#e8e8e8] px-4 py-4 hover:bg-[#fafafa] transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900">Ver Relatórios</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Análises e estatísticas</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
