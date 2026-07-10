import { DeviceAssessment, Estimate } from './assessment';

/**
 * Venda à empresa: o cliente vende o iPhone sem comprar outro.
 *
 * Fluxo: pedido de avaliação → estimativa → envio → inspeção →
 * confirmação do valor → pagamento. Depois o equipamento pertence à empresa.
 */

export type SellRequestStatus =
  | 'avaliacao_pedida'
  | 'estimativa_enviada'
  | 'aceite'
  | 'equipamento_enviado'
  | 'em_inspecao'
  | 'valor_confirmado'
  | 'pago'
  | 'cancelado';

export interface SellRequest {
  id: string;
  userId: string;
  assessment: DeviceAssessment;
  estimate: Estimate;
  status: SellRequestStatus;
  paymentMethod?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
