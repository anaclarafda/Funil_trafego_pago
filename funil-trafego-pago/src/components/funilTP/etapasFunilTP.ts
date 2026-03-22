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

import { Edge, Node } from "reactflow";

export const calcularTaxaConversao = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
) => {
  const conexoes = edges.filter(
    (edge) => edge.source === nodeId
  );

  return conexoes.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return null;

    const valueSource = Number(sourceNode.data.value);
    const valueTarget = Number(targetNode.data.value);

    if (!valueSource) return null;

    const taxa = (valueTarget / valueSource) * 100;

    return {
      sourceId: sourceNode.id,
      targetId: targetNode.id,
      taxa: taxa.toFixed(1) // tipo "32.5"
    };
  }).filter(Boolean);
};