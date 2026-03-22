import { useEffect, useRef } from "react";
import { FunnelStepType } from "./etapasFunilTP";

interface EntradaValorProps {
    isOpen: boolean;
    stepType: FunnelStepType | null;
    value: string;
    onChange: (value: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const mensagensInput: Record<FunnelStepType, string> = {
    ad: "Digite o número de impressões:",
    landing: "Digite o número de cliques:",
    form: "Digite o número de leads:",
    checkout: "Digite o número de vendas:"
};

export default function EntradaValor({
    isOpen,
    stepType,
    value,
    onChange,
    onConfirm,
    onCancel
}: EntradaValorProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus quando abrir
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // ESC fecha modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onCancel();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen || !stepType) return null;

    const isInvalid = value.trim() === "" || Number(value) < 0;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "28px",
                    borderRadius: "18px",
                    width: "360px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                }}
            >
                <h3 style={{ marginBottom: "16px" }}>
                    {mensagensInput[stepType]}
                </h3>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!isInvalid) {
                            onConfirm();
                        }
                    }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px"
                    }}
                >
                    <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Digite o valor"
                        style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1px solid #d1d5db",
                            fontSize: "14px",
                            outline: "none"
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px"
                        }}
                    >
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "10px",
                                border: "1px solid #d1d5db",
                                background: "#f3f4f6",
                                cursor: "pointer"
                            }}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isInvalid}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "10px",
                                border: "none",
                                background: isInvalid ? "#9ca3af" : "#2563eb",
                                color: "white",
                                cursor: isInvalid ? "not-allowed" : "pointer",
                                transition: "0.2s"
                            }}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}