// 🔹 Tipos possíveis de etapa
export type FunnelStepType =
  | "ad"
  | "landing"
  | "form"
  | "checkout"

// 🔹 Dados de cada node
export interface FunnelStepData {
  label: string;
  stepType: FunnelStepType;
}

// 🔹 Labels exibidas na interface
export const funnelStepLabels: Record<FunnelStepType, string> = {
  ad: "Anúncio",
  landing: "Landing Page",
  form: "Formulário",
  checkout: "Checkout",
};