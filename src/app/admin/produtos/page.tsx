"use client";

import { useState, useMemo } from "react";
import { AdminShell } from "@/components/admin/admin-shell";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  image?: string;
}

export default function ProductsPage() {
  // Mock data
  const mockProducts: Product[] = [
    { id: "1", name: "iPhone 14 Pro Max 256GB", category: "iPhones", price: 450000, stock: 15, status: "active" },
    { id: "2", name: "iPhone 13 128GB", category: "iPhones", price: 320000, stock: 23, status: "active" },
    { id: "3", name: "iPhone 12 64GB", category: "iPhones", price: 250000, stock: 8, status: "active" },
    { id: "4", name: "iPhone 11 Pro 256GB", category: "iPhones", price: 280000, stock: 0, status: "inactive" },
    { id: "5", name: "iPhone SE 2022 128GB", category: "iPhones", price: 180000, stock: 12, status: "active" },
  ];

  const [products] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, filterStatus]);

  const totalActive = products.filter((p) => p.status === "active").length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const formatCurrency = (value: number) => {
    return `${(value / 1000).toLocaleString("pt-AO", { minimumFractionDigits: 0 })} Kz`;
  };

  return (
    <AdminShell title="Produtos" subtitle="Gerir catálogo de produtos disponíveis">
      <div className="space-y-5">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total de Produtos", value: products.length, bg: "bg-blue-50", color: "text-[#008060]" },
            { label: "Produtos Ativos", value: totalActive, bg: "bg-emerald-50", color: "text-emerald-700" },
            { label: "Stock Total", value: totalStock, bg: "bg-purple-50", color: "text-purple-700" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#e8e8e8] px-4 py-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center font-bold text-[14px] shrink-0`}>
                {s.value}
              </div>
              <span className="text-[13px] text-[#666]">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-[#f0f0f0] overflow-x-auto [scrollbar-width:none]">
            {(["all", "active", "inactive"] as const).map((tab) => {
              const count = tab === "all" ? products.length : products.filter(p => p.status === tab).length;
              const label = tab === "all" ? "Todos" : tab === "active" ? "Ativos" : "Inativos";
              return (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`shrink-0 flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                    filterStatus === tab
                      ? "border-[#008060] text-[#008060]"
                      : "border-transparent text-[#888] hover:text-[#333]"
                  }`}
                >
                  {label}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    filterStatus === tab ? "bg-[#008060]/10 text-[#008060]" : "bg-gray-100 text-[#888]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-[#f5f5f5]">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="search"
                placeholder="Pesquisar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-[13px] bg-[#f5f5f5] border border-transparent rounded-lg outline-none focus:bg-white focus:border-[#008060]/30 focus:ring-2 focus:ring-[#008060]/10 transition-all placeholder:text-[#bbb]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>
            <button className="flex items-center gap-2 px-3.5 h-9 text-[12.5px] font-bold text-white bg-[#008060] rounded-lg hover:bg-blue-600 transition-colors shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Novo Produto
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#f5f5f5] bg-[#fafafa]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Produto</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb] hidden md:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Preço</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Stock</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Estado</th>
                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[#bbb]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-[#bbb] text-[13px]">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr key={product.id} className="border-b border-[#f5f5f5] last:border-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${product.status === "active" ? "bg-blue-50 text-[#008060]" : "bg-gray-100 text-gray-400"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div>
                            <p className={`font-semibold leading-tight ${product.status === "active" ? "text-[#111]" : "text-[#aaa]"}`}>
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 hidden md:table-cell">
                        <code className="text-[12px] bg-gray-50 border border-gray-100 text-[#008060] px-2 py-0.5 rounded font-mono">
                          {product.category}
                        </code>
                      </td>

                      <td className="px-4 py-4 font-semibold text-[#111]">
                        {formatCurrency(product.price)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${product.stock === 0 ? "text-red-500" : "text-[#333]"}`}>
                            {product.stock}
                          </span>
                          {product.stock > 0 && (
                            <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full bg-[#008060] rounded-full"
                                style={{ width: `${Math.min((product.stock / 30) * 100, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                          product.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}>
                          {product.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-[#bbb] hover:text-[#008060] hover:bg-blue-50 transition-colors cursor-pointer" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                          </button>
                          <button className="p-1.5 rounded-lg text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer" title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                          </button>
                        </div>
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
              Mostrando <strong className="text-[#555]">{filtered.length}</strong> de <strong className="text-[#555]">{products.length}</strong> produtos
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
