/**
 * Leilões: todos os equipamentos leiloados pertencem exclusivamente à empresa
 * (origem em trade-in, compras a clientes ou stock próprio).
 * Nenhum utilizador cria leilões nem vende diretamente.
 */

export type AuctionStatus = 'agendado' | 'a_decorrer' | 'terminado' | 'cancelado';

export interface Auction {
  id: string;
  productId: string;
  title: string;
  description?: string;
  startingPrice: number;
  currentPrice: number;
  minBidIncrement: number;
  currency: string;
  status: AuctionStatus;
  startsAt: Date;
  endsAt: Date;
  bidsCount: number;
  participantsCount: number;
  winningBidId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  amount: number;
  placedAt: Date;
}

export interface AuctionSummary {
  auction: Auction;
  timeRemainingMs: number;
  bidHistory: Bid[];
}
