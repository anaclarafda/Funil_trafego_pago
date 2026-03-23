import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
} from "reactflow";

import EntradaValor from "./entradaValor";
import "reactflow/dist/style.css";
import {
  FunnelStepType,
  funnelStepLabels,
} from "./etapasFunil";
import NodesFunil from "./formasFunil";
import Resultados from "./resultados";

import {
  handleEdit,
  atualizarTaxas,
  onConnectFunc,
  excluirEtapa,
  editarEtapa,
  confirmarEtapa
} from "./funcoesFunil";

const nodeTypes = {
  funnelNode: NodesFunil
};

let id = 2;
const getId = () => `${id++}`;

export default function TelaFunil() {
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentStepType, setCurrentStepType] = useState<FunnelStepType | null>(null);
  const [selectedStep, setSelectedStep] = useState<FunnelStepType>("ad");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleEditLocal = (nodeId: string) => {
    handleEdit(
      nodeId,
      nodes,
      setCurrentStepType,
      setInputValue,
      setEditingNodeId,
      setIsModalOpen
    );
  };

  const atualizarTaxasLocal = (nodeId: string, nodesAtual: any[], edgesAtual: any[]) => {
    atualizarTaxas(nodeId, nodesAtual, edgesAtual, setNodes);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      onConnectFunc(
        params,
        edges,
        nodes,
        setEdges,
        (source: string, n: any[], e: any[]) =>
          atualizarTaxas(source, n, e, setNodes)
      );
    },
    [edges, nodes]
  );

  const excluirEtapaLocal = (nodeId: string) => {
    excluirEtapa(nodeId, setNodes, setEdges);
  };

  const editarEtapaLocal = (nodeId: string, novoValor: string) => {
    editarEtapa(
      nodeId,
      novoValor,
      setNodes,
      edges,
      atualizarTaxasLocal,
      handleEditLocal,
      excluirEtapaLocal
    );
  };

  const confirmarEtapaLocal = () => {
    confirmarEtapa(
      currentStepType,
      editingNodeId,
      inputValue,
      setNodes,
      setIsModalOpen,
      setEditingNodeId,
      handleEditLocal,
      excluirEtapaLocal,
      editarEtapaLocal,
      funnelStepLabels,
      getId
    );
  };

  const addEtapa = (stepType: FunnelStepType) => {
    setCurrentStepType(stepType);
    setInputValue("");
    setEditingNodeId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full">

      <div className="p-[13px] rounded-xl shadow-[0_4px_12px_rgba(99,99,99,0.34)] flex items-center w-600 gap-[27px] border border-gray-200">
        <span className="font-semibold ml-[18px]">
          Defina a etapa que você quer adicionar:
        </span>

        <select
          value={selectedStep}
          onChange={(e) =>
            setSelectedStep(e.target.value as FunnelStepType)
          }
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm cursor-pointer"
        >
          {Object.entries(funnelStepLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => addEtapa(selectedStep)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-600"
        >
          + Adicionar
        </button>

        <button
          onClick={() => setMostrarResultados(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-600"
        >
          Salvar
        </button>
      </div>

      <EntradaValor
        isOpen={isModalOpen}
        stepType={currentStepType}
        value={inputValue}
        onChange={setInputValue}
        onConfirm={confirmarEtapaLocal}
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

      {mostrarResultados && <Resultados nodes={nodes} />}
    </div>
  );
}