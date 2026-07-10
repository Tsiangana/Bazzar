export const PRODUCT_CATEGORIES = [
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14',
  'iPhone 13',
  'iPhone SE',
] as const;

export const STORAGE_OPTIONS = [
  '64GB',
  '128GB',
  '256GB',
  '512GB',
  '1TB',
] as const;

export const COLOR_OPTIONS = [
  { name: 'Preto', value: 'black', hex: '#000000' },
  { name: 'Branco', value: 'white', hex: '#FFFFFF' },
  { name: 'Azul', value: 'blue', hex: '#0000FF' },
  { name: 'Roxo', value: 'purple', hex: '#800080' },
  { name: 'Rosa', value: 'pink', hex: '#FFC0CB' },
  { name: 'Verde', value: 'green', hex: '#00FF00' },
  { name: 'Vermelho', value: 'red', hex: '#FF0000' },
  { name: 'Dourado', value: 'gold', hex: '#FFD700' },
  { name: 'Prata', value: 'silver', hex: '#C0C0C0' },
] as const;

export const DEVICE_CONDITION_LABELS = {
  novo: 'Novo',
  usado: 'Usado',
  remodelado: 'Remodelado',
} as const;

export const AESTHETIC_GRADE_LABELS = {
  'A+': 'Como novo',
  A: 'Excelente',
  B: 'Bom — sinais ligeiros de uso',
  C: 'Razoável — sinais visíveis de uso',
} as const;

export const LIFECYCLE_STAGE_LABELS = {
  recebido: 'Recebido',
  em_inspecao: 'Em inspeção técnica',
  em_limpeza: 'Em limpeza',
  em_reparacao: 'Em reparação',
  classificado: 'Classificado',
  fotografado: 'Fotografado',
  em_stock: 'Em stock',
  a_venda: 'À venda',
  em_leilao: 'Em leilão',
  vendido: 'Vendido',
} as const;

export const TRADE_IN_STATUS_LABELS = {
  estimativa_gerada: 'Estimativa gerada',
  aceite: 'Aceite pelo cliente',
  equipamento_enviado: 'Equipamento enviado',
  em_inspecao: 'Em inspeção',
  valor_confirmado: 'Valor confirmado',
  valor_ajustado: 'Valor ajustado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
} as const;

export const SELL_REQUEST_STATUS_LABELS = {
  avaliacao_pedida: 'Avaliação pedida',
  estimativa_enviada: 'Estimativa enviada',
  aceite: 'Aceite pelo cliente',
  equipamento_enviado: 'Equipamento enviado',
  em_inspecao: 'Em inspeção',
  valor_confirmado: 'Valor confirmado',
  pago: 'Pago',
  cancelado: 'Cancelado',
} as const;

export const AUCTION_STATUS_LABELS = {
  agendado: 'Agendado',
  a_decorrer: 'A decorrer',
  terminado: 'Terminado',
  cancelado: 'Cancelado',
} as const;

export const SCREEN_CONDITION_LABELS = {
  perfeito: 'Perfeito',
  micro_riscos: 'Micro-riscos',
  riscos_visiveis: 'Riscos visíveis',
  partido: 'Partido',
} as const;

export const BODY_CONDITION_LABELS = {
  perfeito: 'Perfeito',
  sinais_de_uso: 'Sinais de uso',
  amolgadelas: 'Amolgadelas',
  partido: 'Partido',
} as const;

export const SORT_OPTIONS = [
  { label: 'Mais recente', value: 'newest' },
  { label: 'Preço: menor para maior', value: 'price_asc' },
  { label: 'Preço: maior para menor', value: 'price_desc' },
  { label: 'Mais vendidos', value: 'popular' },
  { label: 'Melhor avaliação', value: 'rating' },
] as const;

export const ORDER_STATUS_LABELS = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Em processamento',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
} as const;

export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'bank_transfer', label: 'Transferência Bancária' },
  { value: 'cash_on_delivery', label: 'Pagamento na Entrega' },
] as const;

export const PROVINCES_ANGOLA = [
  'Luanda',
  'Benguela',
  'Huambo',
  'Huíla',
  'Cabinda',
  'Cunene',
  'Cuanza Sul',
  'Cuanza Norte',
  'Bengo',
  'Bié',
  'Cuando Cubango',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Namibe',
  'Uíge',
  'Zaire',
] as const;
