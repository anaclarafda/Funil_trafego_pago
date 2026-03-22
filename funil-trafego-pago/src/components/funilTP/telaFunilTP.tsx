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

import "reactflow/dist/style.css";
import { FunnelStepType, funnelStepLabels } from "./etapasFunilTP";
import NodesFunil from "./nodesFunilTP";

const nodeTypes = {
  funnelNode: NodesFunil
};

let id = 2;
const getId = () => `${id++}`;

export default function TelaFunilTP() {

  // 🔹 estado do select
  const [selectedStep, setSelectedStep] = useState<FunnelStepType>("ad");

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 250, y: 100 },
      data: { label: "Anúncio", stepType: "ad" },
      type: "default"
    }
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [setEdges]
  );

  const addEtapa = (stepType: FunnelStepType) => {
    let value = "";

    if (stepType === "ad") {
      value = prompt("Digite o número de impressões:") || "";
    }

    if (stepType === "landing") {
      value = prompt("Digite o número de cliques:") || "";
    }

    if (stepType === "form") {
      value = prompt("Digite o número de leads:") || "";
    }

    if (stepType === "checkout") {
      value = prompt("Digite o número de vendas:") || "";
    }
    const newNode = {
      id: getId(),
      position: {
        x: 100,
        y: 100
      },
      data: {
        label: funnelStepLabels[stepType],
        stepType,
        value 
      },
      type: "funnelNode"
    };

    setNodes((nds: any) => [...nds, newNode]);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <div
        style={{
          zIndex: 10,
          top: 20,
          left: 20,
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          border: "1px solid #e5e7eb"
        }}
      >
        <span style={{ fontWeight: 600 }}>Adicionar etapa:</span>

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
            background: "#2563eb",
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