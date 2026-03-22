export type FunnelStepType =
  | "ad"
  | "landing"
  | "form"
  | "checkout"

export interface FunnelStepData {
  label: string;
  stepType: FunnelStepType;
}

export const funnelStepLabels: Record<FunnelStepType, string> = {
  ad: "Anúncio",
  landing: "Landing Page",
  form: "Formulário",
  checkout: "Checkout",
};