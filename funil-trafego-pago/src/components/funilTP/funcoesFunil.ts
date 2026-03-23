import { addEdge, Connection } from "reactflow";
import { calcularTaxaConversao } from "./etapasFunil";

export const handleEdit = (
  nodeId: string,
  nodes: any[],
  setCurrentStepType: any,
  setInputValue: any,
  setEditingNodeId: any,
  setIsModalOpen: any
) => {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return;

  setCurrentStepType(node.data.stepType);
  setInputValue(node.data.value || "");
  setEditingNodeId(nodeId);
  setIsModalOpen(true);
};

export const atualizarTaxas = (
  nodeId: string,
  nodesAtual: any[],
  edgesAtual: any[],
  setNodes: any
) => {
  const resultados = calcularTaxaConversao(nodeId, nodesAtual, edgesAtual);

  if (!resultados) return;

  setNodes((nds: any[]) =>
    nds.map((node) => {
      const resultado = resultados.find(r => r?.targetId === node.id);

      if (resultado) {
        return {
          ...node,
          data: {
            ...node.data,
            conversionRate: resultado.taxa
          }
        };
      }

      return node;
    })
  );
};

export const onConnectFunc = (
  params: Connection,
  edges: any[],
  nodes: any[],
  setEdges: any,
  atualizarTaxasFn: any
) => {
  const novosEdges = addEdge(params, edges);
  setEdges(novosEdges);

  if (params.source) {
    atualizarTaxasFn(params.source, nodes, novosEdges);
  }
};

export const excluirEtapa = (
  nodeId: string,
  setNodes: any,
  setEdges: any
) => {
  setNodes((nds: any[]) => nds.filter((node) => node.id !== nodeId));
  setEdges((eds: any[]) =>
    eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    )
  );
};

export const editarEtapa = (
  nodeId: string,
  novoValor: string,
  setNodes: any,
  edges: any[],
  atualizarTaxasFn: any,
  handleEdit: any,
  excluirEtapaFn: any
) => {
  let novosNodesAtualizados: any[] = [];

  setNodes((nds: any[]) => {
    novosNodesAtualizados = nds.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              value: novoValor,
              onEdit: handleEdit,
              onDelete: excluirEtapaFn
            }
          }
        : node
    );

    return novosNodesAtualizados;
  });

  atualizarTaxasFn(nodeId, novosNodesAtualizados, edges);
};

export const confirmarEtapa = (
  currentStepType: any,
  editingNodeId: string | null,
  inputValue: string,
  setNodes: any,
  setIsModalOpen: any,
  setEditingNodeId: any,
  handleEdit: any,
  excluirEtapaFn: any,
  editarEtapaFn: any,
  funnelStepLabels: any,
  getId: any
) => {
  if (!currentStepType) return;

  if (editingNodeId) {
    editarEtapaFn(editingNodeId, inputValue);
  } else {
    const newNode = {
      id: getId(),
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100
      },
      type: "funnelNode",
      data: {
        label: funnelStepLabels[currentStepType],
        stepType: currentStepType,
        value: inputValue,
        onEdit: handleEdit,
        onDelete: excluirEtapaFn
      }
    };

    setNodes((nds: any) => [...nds, newNode]);
  }

  setIsModalOpen(false);
  setEditingNodeId(null);
};