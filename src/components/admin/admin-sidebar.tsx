"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SubItem {
  href: string;
  label: string;
  badge?: number;
  icon: React.ReactNode;
}

interface NavItem {
  href?: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  subItems?: SubItem[];
}

interface Section {
  label?: string;
  items: NavItem[];
}

export function AdminSidebar({
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();
  const [ecommerceExpanded, setEcommerceExpanded] = useState(true);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const isSubActive = (subItems?: SubItem[]) => {
    if (!subItems) return false;
    return subItems.some((item) => isActive(item.href));
  };

  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
      </svg>
    ),
    ecommerce: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    orders: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    categories: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    customers: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    analytics: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  const navigationData: Section[] = [
    {
      items: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: icons.dashboard,
        },
        {
          label: "Vendas",
          icon: icons.ecommerce,
          subItems: [
            {
              href: "/admin/pedidos",
              label: "Pedidos",
              icon: icons.orders,
            },
            {
              href: "/admin/produtos",
              label: "Produtos",
              icon: icons.products,
            },
            {
              href: "/admin/categorias",
              label: "Categorias",
              icon: icons.categories,
            },
          ],
        },
        {
          href: "/admin/clientes",
          label: "Clientes",
          icon: icons.customers,
        },
      ],
    },
    {
      label: "Configurações",
      items: [
        {
          href: "/admin/analytics",
          label: "Análises",
          icon: icons.analytics,
        },
        {
          href: "/admin/definicoes",
          label: "Definições",
          icon: icons.settings,
        },
      ],
    },
  ];

  return (
    <aside className="flex h-full w-full flex-col bg-white border-r border-gray-100 select-none">
      {/* Brand Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-5.5 py-4.5 border-b border-gray-100 shrink-0 transition-all duration-300`}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-3">
            <span className="text-[18px] font-bold tracking-tight text-[#008060]">
              iPhoneSão
            </span>
          </Link>
        )}

        {/* Toggle Collapse / Mobile Close Button */}
        <button
          onClick={onToggleCollapse || onClose}
          className={`p-1 cursor-pointer rounded-full text-gray-600 hover:text-gray-500 hover:bg-gray-200 border border-gray-200 lg:flex items-center justify-center transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          title={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
          </svg>
        </button>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6.5">
        {navigationData.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {section.label && !isCollapsed && (
              <p className="px-3 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item, itemIdx) => {
                const hasSubItems = !!item.subItems;
                const isItemActive = item.href ? isActive(item.href) : false;

                if (hasSubItems) {
                  if (isCollapsed) {
                    const activeSubItem = item.subItems?.find(sub => isActive(sub.href));
                    const displayItem = activeSubItem || item.subItems?.[0];
                    if (!displayItem) return null;

                    return (
                      <li key={itemIdx}>
                        <Link
                          href={displayItem.href}
                          title={displayItem.label}
                          className={`flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 ${isActive(displayItem.href)
                            ? "bg-[#edf2ff] text-[#008060]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <span className={isActive(displayItem.href) ? "text-[#008060]" : "text-gray-400"}>
                            {displayItem.icon}
                          </span>
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={itemIdx} className="space-y-0.5">
                      <button
                        onClick={() => setEcommerceExpanded(!ecommerceExpanded)}
                        className={`w-full flex items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
                      >
                        <span className="flex items-center gap-3.5">
                          <span className="text-gray-400">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <span className="text-gray-400 text-[11px] font-bold">
                          {ecommerceExpanded ? "—" : "+"}
                        </span>
                      </button>

                      {ecommerceExpanded && (
                        <ul className="pl-4.5 space-y-0.5 mt-0.5 border-l border-gray-100 ml-4.5">
                          {item.subItems?.map((sub, subIdx) => {
                            const isSubItemActive = isActive(sub.href);
                            return (
                              <li key={subIdx}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className={`flex items-center justify-between gap-3 rounded-lg px-3.5 py-2 text-[12px] font-medium transition-all duration-200 ${isSubItemActive
                                    ? "bg-[#edf2ff] text-[#008060]"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                  <span className="flex items-center gap-3">
                                    <span className={isSubItemActive ? "text-[#008060]" : "text-gray-400"}>
                                      {sub.icon}
                                    </span>
                                    <span>{sub.label}</span>
                                  </span>
                                  {sub.badge !== undefined && (
                                    <span className="w-4.5 h-4.5 flex items-center justify-center text-[9px] font-bold bg-red-500 text-white rounded-full">
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={itemIdx} className="relative">
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3 rounded-lg ${isCollapsed ? 'p-2.5' : 'px-3.5 py-2.5'} text-[13px] font-medium transition-all duration-200 ${isItemActive
                        ? "bg-[#edf2ff] text-[#008060]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <span className={`flex items-center ${isCollapsed ? '' : 'gap-3.5'}`}>
                        <span className={isItemActive ? "text-[#008060]" : "text-gray-400"}>
                          {item.icon}
                        </span>
                        {!isCollapsed && <span>{item.label}</span>}
                      </span>
                      {!isCollapsed && item.badge !== undefined && (
                        <span className="w-4.5 h-4.5 flex items-center justify-center text-[9px] font-bold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {isCollapsed && item.badge !== undefined && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
