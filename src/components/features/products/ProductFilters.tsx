'use client';

import { useMemo, useState } from 'react';

import { ProductCard } from '@/components/features/products/ProductCard';
import type { CatalogProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

type SortOrder = 'bestsellers' | 'price-asc' | 'price-desc' | 'rating';
type FilterKey = 'preco' | 'modelo' | 'cor' | 'ano' | 'ordenar' | null;

const sortLabels: Record<SortOrder, string> = {
  bestsellers: 'Bestsellers',
  'price-asc': 'Preço: menor para maior',
  'price-desc': 'Preço: maior para menor',
  rating: 'Melhor avaliação',
};

const colorNames: Record<string, string> = {
  '#9bc4bc': 'Verde-água',
  '#f5f5f0': 'Branco estrela',
  '#1d1d1f': 'Preto',
  '#f2c9cf': 'Rosa',
  '#f7e96e': 'Amarelo',
  '#a7b8cc': 'Azul',
  '#d9cfc2': 'Dourado natural',
  '#8a8d91': 'Titânio',
  '#48495c': 'Titânio azul',
  '#e3e4e5': 'Titânio branco',
  '#c9c4bd': 'Titânio natural',
  '#4e3c56': 'Roxo profundo',
  '#3a5e50': 'Verde',
  '#b23a48': 'Vermelho',
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${checked ? 'border-zinc-950 bg-zinc-950' : 'border-zinc-300 bg-white'
        }`}
    >
      {checked ? <CheckIcon /> : null}
    </span>
  );
}

export function ProductFilters({ products }: { products: CatalogProduct[] }) {
  const [openFilter, setOpenFilter] = useState<FilterKey>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState<SortOrder>('bestsellers');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const modelOptions = useMemo(
    () => [...new Set(products.map((p) => p.name))],
    [products],
  );
  const colorOptions = useMemo(
    () => [...new Set(products.flatMap((p) => p.colors))],
    [products],
  );
  const yearOptions = useMemo(
    () => [...new Set(products.map((p) => p.releaseYear))].sort((a, b) => b - a),
    [products],
  );
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const minPriceValue = priceMin ? Number(priceMin) : null;
  const maxPriceValue = priceMax ? Number(priceMax) : null;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedModels.length && !selectedModels.includes(p.name)) return false;
      if (selectedColors.length && !p.colors.some((c) => selectedColors.includes(c)))
        return false;
      if (selectedYears.length && !selectedYears.includes(p.releaseYear)) return false;
      if (minPriceValue !== null && p.price < minPriceValue) return false;
      if (maxPriceValue !== null && p.price > maxPriceValue) return false;
      return true;
    });
  }, [products, selectedModels, selectedColors, selectedYears, minPriceValue, maxPriceValue]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const activeCount =
    selectedModels.length +
    selectedColors.length +
    selectedYears.length +
    (minPriceValue !== null || maxPriceValue !== null ? 1 : 0);

  function toggle<T>(list: T[], value: T, setList: (next: T[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  }

  function clearAll() {
    setSelectedModels([]);
    setSelectedColors([]);
    setSelectedYears([]);
    setPriceMin('');
    setPriceMax('');
    setPage(1);
  }

  function pillClass(active: boolean, open: boolean) {
    return `flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 border cursor-pointer text-[12px] font-medium transition-colors ${open || active
        ? 'border-zinc-950 bg-zinc-950 text-white'
        : 'border-zinc-300 bg-white text-zinc-900 hover:border-zinc-500'
      }`;
  }

  function toggleFilter(key: FilterKey) {
    setOpenFilter((current) => (current === key ? null : key));
  }

  return (
    <>
      {/* Filtros */}
      <div className="relative mt-8">
        <div className="flex flex-wrap items-center gap-3">
          {/* Preço */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleFilter('preco')}
              className={pillClass(minPriceValue !== null || maxPriceValue !== null, openFilter === 'preco')}
            >
              Preço
              <ChevronIcon open={openFilter === 'preco'} />
            </button>
            {openFilter === 'preco' ? (
              <div className="absolute top-full left-0 z-30 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Preço</h3>
                <div className="mt-4 flex items-center gap-3">
                  <label className="group flex h-11 flex-1 items-center rounded-lg border border-zinc-300 px-3 transition-all duration-300 focus-within:border-rose-500/40 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]">
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => {
                        setPriceMin(e.target.value);
                        setPage(1);
                      }}
                      placeholder={String(priceBounds.min)}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400"
                    />
                  </label>
                  <span className="text-zinc-400">—</span>
                  <label className="group flex h-11 flex-1 items-center rounded-lg border border-zinc-300 px-3 transition-all duration-300 focus-within:border-rose-500/40 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]">
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => {
                        setPriceMax(e.target.value);
                        setPage(1);
                      }}
                      placeholder={String(priceBounds.max)}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400"
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  De {formatKz(priceBounds.min)} até {formatKz(priceBounds.max)}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenFilter(null)}
                  className="mt-4 h-11 w-full rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Ver {sorted.length} produtos
                </button>
              </div>
            ) : null}
          </div>

          {/* Modelo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleFilter('modelo')}
              className={pillClass(selectedModels.length > 0, openFilter === 'modelo')}
            >
              Modelo{selectedModels.length ? ` (${selectedModels.length})` : ''}
              <ChevronIcon open={openFilter === 'modelo'} />
            </button>
            {openFilter === 'modelo' ? (
              <div className="absolute top-full left-0 z-30 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Modelo</h3>
                <div className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto">
                  {modelOptions.map((model) => (
                    <label
                      key={model}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-zinc-50"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedModels.includes(model)}
                        onChange={() => toggle(selectedModels, model, setSelectedModels)}
                      />
                      <Checkbox checked={selectedModels.includes(model)} />
                      {model}
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenFilter(null)}
                  className="mt-4 h-11 w-full rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Ver {sorted.length} produtos
                </button>
              </div>
            ) : null}
          </div>

          {/* Cor */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleFilter('cor')}
              className={pillClass(selectedColors.length > 0, openFilter === 'cor')}
            >
              Cor{selectedColors.length ? ` (${selectedColors.length})` : ''}
              <ChevronIcon open={openFilter === 'cor'} />
            </button>
            {openFilter === 'cor' ? (
              <div className="absolute top-full left-0 z-30 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Cor</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {colorOptions.map((hex) => {
                    const checked = selectedColors.includes(hex);
                    return (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => toggle(selectedColors, hex, setSelectedColors)}
                        className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${checked ? 'border-zinc-950' : 'border-zinc-200 hover:bg-zinc-50'
                          }`}
                      >
                        <span
                          className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300"
                          style={{ backgroundColor: hex }}
                        >
                          {checked ? (
                            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-zinc-950/30">
                              <CheckIcon />
                            </span>
                          ) : null}
                        </span>
                        {colorNames[hex] ?? hex}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenFilter(null)}
                  className="mt-4 h-11 w-full rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Ver {sorted.length} produtos
                </button>
              </div>
            ) : null}
          </div>

          {/* Data de lançamento */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleFilter('ano')}
              className={pillClass(selectedYears.length > 0, openFilter === 'ano')}
            >
              Data de lançamento{selectedYears.length ? ` (${selectedYears.length})` : ''}
              <ChevronIcon open={openFilter === 'ano'} />
            </button>
            {openFilter === 'ano' ? (
              <div className="absolute top-full left-0 z-30 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Data de lançamento</h3>
                <div className="mt-4 flex flex-col gap-2">
                  {yearOptions.map((year) => (
                    <label
                      key={year}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-zinc-50"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedYears.includes(year)}
                        onChange={() => toggle(selectedYears, year, setSelectedYears)}
                      />
                      <Checkbox checked={selectedYears.includes(year)} />
                      {year}
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenFilter(null)}
                  className="mt-4 h-11 w-full rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Ver {sorted.length} produtos
                </button>
              </div>
            ) : null}
          </div>

          {/* Filtrar (todos, para mobile/mega-painel) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={pillClass(activeCount > 0, false)}
          >
            Filtrar
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {activeCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-zinc-950">
                {activeCount}
              </span>
            ) : null}
          </button>

          {activeCount > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-[15px] font-semibold text-rose-600 underline underline-offset-2 hover:text-rose-700"
            >
              Limpar filtros
            </button>
          ) : null}

        </div>

        {/* Backdrop para fechar dropdowns ao clicar fora */}
        {openFilter ? (
          <button
            type="button"
            aria-label="Fechar filtro"
            onClick={() => setOpenFilter(null)}
            className="fixed inset-0 z-20 cursor-default"
          />
        ) : null}
      </div>

      <p className="mt-6 text-sm text-zinc-600">{sorted.length} produtos</p>

      {/* Grelha de produtos */}
      {paged.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {paged.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold">Nenhum produto encontrado</p>
          <p className="text-[15px] text-zinc-600">
            Tenta ajustar ou limpar os filtros aplicados.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-2 inline-flex h-11 items-center rounded-lg bg-zinc-950 px-6 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 ? (
        <nav
          aria-label="Paginação"
          className="mt-12 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            aria-label="Página anterior"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-600 transition-colors enabled:hover:bg-zinc-200 disabled:text-zinc-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              type="button"
              key={p}
              aria-current={p === currentPage ? 'page' : undefined}
              onClick={() => setPage(p)}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[15px] font-medium transition-colors ${p === currentPage ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-200'
                }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            aria-label="Página seguinte"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-600 transition-colors enabled:hover:bg-zinc-200 disabled:text-zinc-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </nav>
      ) : null}

      {/* Painel "Filtrar" (todos os filtros num só sítio) */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fechar filtros"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-zinc-950/40"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <h2 className="text-xl font-semibold">Filtrar</h2>
              <button
                type="button"
                aria-label="Fechar filtros"
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-950 transition-colors hover:bg-zinc-100"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col px-6">
              {/* Preço */}
              <div className="border-b border-zinc-100 py-5">
                <h3 className="text-[15px] font-semibold">Preço</h3>
                <div className="mt-4 flex items-center gap-3">
                  <label className="group flex h-11 flex-1 items-center rounded-lg border border-zinc-300 px-3 transition-all duration-300 focus-within:border-rose-500/40 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]">
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      placeholder={String(priceBounds.min)}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400"
                    />
                  </label>
                  <span className="text-zinc-400">—</span>
                  <label className="group flex h-11 flex-1 items-center rounded-lg border border-zinc-300 px-3 transition-all duration-300 focus-within:border-rose-500/40 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]">
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      placeholder={String(priceBounds.max)}
                      className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-400"
                    />
                  </label>
                </div>
              </div>

              {/* Modelo */}
              <div className="border-b border-zinc-100 py-5">
                <h3 className="text-[15px] font-semibold">Modelo</h3>
                <div className="mt-4 flex flex-col gap-2">
                  {modelOptions.map((model) => (
                    <label
                      key={model}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1 text-[15px] font-medium"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedModels.includes(model)}
                        onChange={() => toggle(selectedModels, model, setSelectedModels)}
                      />
                      <Checkbox checked={selectedModels.includes(model)} />
                      {model}
                    </label>
                  ))}
                </div>
              </div>

              {/* Cor */}
              <div className="border-b border-zinc-100 py-5">
                <h3 className="text-[15px] font-semibold">Cor</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {colorOptions.map((hex) => {
                    const checked = selectedColors.includes(hex);
                    return (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => toggle(selectedColors, hex, setSelectedColors)}
                        className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors ${checked ? 'border-zinc-950' : 'border-zinc-200'
                          }`}
                      >
                        <span
                          className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-300"
                          style={{ backgroundColor: hex }}
                        >
                          {checked ? (
                            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-zinc-950/30">
                              <CheckIcon />
                            </span>
                          ) : null}
                        </span>
                        {colorNames[hex] ?? hex}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data de lançamento */}
              <div className="py-5">
                <h3 className="text-[15px] font-semibold">Data de lançamento</h3>
                <div className="mt-4 flex flex-col gap-2">
                  {yearOptions.map((year) => (
                    <label
                      key={year}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1 text-[15px] font-medium"
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedYears.includes(year)}
                        onChange={() => toggle(selectedYears, year, setSelectedYears)}
                      />
                      <Checkbox checked={selectedYears.includes(year)} />
                      {year}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-zinc-100 px-6 py-5">
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[15px] font-semibold text-zinc-700 underline underline-offset-2 hover:text-zinc-950"
                >
                  Limpar
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 flex-1 rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Ver {sorted.length} produtos
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
