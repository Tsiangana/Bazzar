/**
 * Avaliação de um equipamento do cliente.
 * Usada tanto no Trade-In como na Venda à empresa: o cliente descreve
 * o estado do iPhone e o sistema gera uma estimativa de valor.
 */

export type ScreenCondition = 'perfeito' | 'micro_riscos' | 'riscos_visiveis' | 'partido';
export type BodyCondition = 'perfeito' | 'sinais_de_uso' | 'amolgadelas' | 'partido';

export interface DeviceAssessment {
  model: string;
  storage: string;
  color: string;
  batteryHealth: number; // percentagem 0–100
  screenCondition: ScreenCondition;
  backCondition: BodyCondition;
  faceIdWorking: boolean;
  cameraWorking: boolean;
  buttonsWorking: boolean;
  damages: string[]; // danos adicionais declarados pelo cliente
  hasOriginalBox: boolean;
  hasCharger: boolean;
}

export interface Estimate {
  id: string;
  assessment: DeviceAssessment;
  estimatedValue: number;
  currency: string;
  /** Valor final após inspeção física — pode confirmar ou ajustar a estimativa. */
  confirmedValue?: number;
  expiresAt: Date;
  createdAt: Date;
}
