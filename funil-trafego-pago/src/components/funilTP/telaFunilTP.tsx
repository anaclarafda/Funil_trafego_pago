import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge
} from "reactflow";
import EntradaValor from "./entradaValor";
import "reactflow/dist/style.css";
import { FunnelStepType, funnelStepLabels } from "./etapasFunilTP";
import NodesFunil from "./nodesFunilTP";

const nodeTypes = {
  funnelNode: NodesFunil
};

let id = 2;
const getId = () => `${id++}`;

export default function TelaFunilTP() {
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentStepType, setCurrentStepType] = useState<FunnelStepType | null>(null);
  const [selectedStep, setSelectedStep] = useState<FunnelStepType>("ad");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleEdit = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setCurrentStepType(node.data.stepType);
    setInputValue(node.data.value || "");
    setEditingNodeId(nodeId);
    setIsModalOpen(true);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [setEdges]
  );

  const addEtapa = (stepType: FunnelStepType) => {
    setCurrentStepType(stepType);
    setInputValue("");
    setEditingNodeId(null); 
    setIsModalOpen(true);
  };

  const editarEtapa = (nodeId: string, novoValor: string) => {
    setNodes((nds: any[]) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
            ...node,
            data: {
              ...node.data,
              value: novoValor
            }
          }
          : node
      )
    );
  };
  const excluirEtapa = (nodeId: string) => {
    setNodes((nds: any[]) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds: any[]) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
  };

  const confirmarEtapa = () => {
    if (!currentStepType) return;

    if (editingNodeId) {
      editarEtapa(editingNodeId, inputValue);
    } 
    
    else {
      const newNode = {
        id: getId(),
        position: { x: 90, y: 90 },
        type: "funnelNode",
        data: {
          label: funnelStepLabels[currentStepType],
          stepType: currentStepType,
          value: inputValue,
          onEdit: handleEdit,
          onDelete: excluirEtapa
        }
      };

      setNodes((nds: any) => [...nds, newNode]);
    }

    setIsModalOpen(false);
    setEditingNodeId(null);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <div
        style={{
          padding: "13px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(99, 99, 99, 0.34)",
          display: "flex",
          alignItems: "center",
          width: "50%",
          gap: "27px",
          border: "1px solid #e5e7eb"
        }}
      >
        <span style={{ fontWeight: 600, marginLeft: 18 }}>Defina a etapa que você quer adicionar:</span>

        <select
          value={selectedStep}
          onChange={(e) =>
            setSelectedStep(e.target.value as FunnelStepType)
          }
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          {Object.entries(funnelStepLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => addEtapa(selectedStep)}
          style={{
            background: "#f04c00",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.2s"
          }}
        >
          + Adicionar
        </button>
      </div>

      <EntradaValor
        isOpen={isModalOpen}
        stepType={currentStepType}
        value={inputValue}
        onChange={setInputValue}
        onConfirm={confirmarEtapa}
        onCancel={() => setIsModalOpen(false)}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}