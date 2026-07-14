"use client";

import { useState, useMemo } from "react";
import { AdminShell } from "@/components/admin/admin-shell";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
  joined: string;
  status: "active" | "inactive";
}

const avatarColors = [
  "from-blue-400 to-purple-400",
  "from-emerald-400 to-teal-400",
  "from-orange-400 to-pink-400",
  "from-amber-400 to-orange-400",
  "from-rose-400 to-pink-400",
  "from-cyan-400 to-blue-400",
];

export default function CustomersPage() {
  // Mock data
  const mockCustomers: Customer[] = [
    { id: "1", name: "João Silva", email: "joao@email.com", phone: "+244 923 456 789", city: "Luanda", orders: 5, spent: 450000, joined: "14 Jul 2026", status: "active" },
    { id: "2", name: "Maria Santos", email: "maria@email.com", phone: "+244 912 345 678", city: "Benguela", orders: 3, spent: 320000, joined: "13 Jul 2026", status: "active" },
    { id: "3", name: "Carlos Mendes", email: "carlos@email.com", phone: "+244 934 567 890", city: "Huambo", orders: 8, spent: 780000, joined: "10 Jul 2026", status: "active" },
    { id: "4", name: "Ana Costa", email: "ana@email.com", phone: "+244 945 678 901", city: "Luanda", orders: 1, spent: 125000, joined: "08 Jul 2026", status: "inactive" },
    { id: "5", name: "Pedro Alves", email: "pedro@email.com", phone: "+244 956 789 012", city: "Lobito", orders: 4, spent: 540000, joined: "05 Jul 2026", status: "active" },
  ];

  const [customers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesFilter = filter === "all" || c.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [customers, filter, search]);

  const totalRevenue = customers.reduce((acc, c) => acc + c.spent, 0);
  const activeCount = customers.filter((c) => c.status === "active").length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatCurrency = (value: number) => {
    return `${(value / 1000).toLocaleString("pt-AO", { minimumFractionDigits: 0 })} Kz`;
  };

  return (
    <AdminShell title="Clientes" subtitle="Gerir todos os clientes registrados na plataforma">
      <div className="space-y-5">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total Clientes",
              value: customers.length,
              color: "text-[#008060]",
            },
            {
              label: "Ativos",
              value: activeCount,
              color: "text-emerald-700",
            },
            {
              label: "Inativos",
              value: customers.length - activeCount,
              color: "text-gray-500",
            },
            {
              label: "Receita Total",
              value: `${(totalRevenue / 1000000).toFixed(1)}M`,
              color: "text-amber-600",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-[#e8e8e8] px-4 py-3.5 flex flex-col gap-0.5"
            >
              <span className={`text-xl font-bold leading-tight ${s.color}`}>{s.value}</span>
              <span className="text-[12px] text-[#999]">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
          {/* Filter tabs */}
          <div className="flex items-center gap-0 border-b border-[#f0f0f0]">
            {(["all", "active", "inactive"] as const).map((f) => {
              const label = f === "all" ? "Todos" : f === "active" ? "Ativos" : "Inativos";
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                    filter === f
                      ? "border-[#008060] text-[#008060]"
                      : "border-transparent text-[#888] hover:text-[#333]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-[#f5f5f5]">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="search"
                placeholder="Pesquisar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-[13px] bg-[#f5f5f5] border border-transparent rounded-lg outline-none focus:bg-white focus:border-[#008060]/30 focus:ring-2 focus:ring-[#008060]/10 transition-all placeholder:text-[#bbb]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 text-[12.5px] font-medium text-[#555] border border-[#e8e8e8] rounded-lg hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d=".5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
              Exportar
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[800px]">
              <thead>
                <tr className="border-b border-[#f5f5f5] bg-[#fafafa] text-left">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Contacto
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Cidade
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Pedidos
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Total Gasto
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Registado
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-[#bbb] text-[13px]">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      className="border-b border-[#f5f5f5] last:border-0 hover:bg-[#fafafa] transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${
                              avatarColors[i % avatarColors.length]
                            } flex items-center justify-center text-white text-[12px] font-bold shrink-0`}
                          >
                            {getInitials(c.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#222]">{c.name}</div>
                            <div className="text-[11px] text-[#bbb]">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#666]">{c.phone}</td>
                      <td className="px-4 py-4 text-[#666]">{c.city}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#333]">{c.orders}</span>
                          <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-[#008060] rounded-full"
                              style={{ width: `${Math.min((c.orders / 10) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#111] whitespace-nowrap">
                        {formatCurrency(c.spent)}
                      </td>
                      <td className="px-4 py-4 text-[#888]">{c.joined}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                            c.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {c.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-[#f5f5f5]">
            <p className="text-[12px] text-[#aaa]">
              Mostrando <strong className="text-[#555]">{filtered.length}</strong> de{" "}
              <strong className="text-[#555]">{customers.length}</strong> clientes
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
