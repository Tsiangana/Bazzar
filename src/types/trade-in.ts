import { DeviceAssessment, Estimate } from './assessment';

/**
 * Trade-In: o cliente escolhe um novo iPhone, entrega o atual
 * e o valor avaliado é descontado na compra.
 *
 * Fluxo: estimativa → envio → inspeção → confirmação/ajuste → desconto na compra.
 */

export type TradeInStatus =
  | 'estimativa_gerada'
  | 'aceite'
  | 'equipamento_enviado'
  | 'em_inspecao'
  | 'valor_confirmado'
  | 'valor_ajustado'
  | 'concluido'
  | 'cancelado';

export interface TradeInRequest {
  id: string;
  userId: string;
  /** Produto do catálogo que o cliente pretende adquirir. */
  targetProductId: string;
  assessment: DeviceAssessment;
  estimate: Estimate;
  status: TradeInStatus;
  /** Diferença a pagar pelo cliente após o desconto do trade-in. */
  amountDue?: number;
  createdAt: Date;
  updatedAt: Date;
}
