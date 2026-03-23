export default function Resultados({ nodes }: any) {
    if (!nodes.length) return null;

    const nodesComTaxa = nodes.filter(
        (n: any) =>
            n.data.conversionRate !== undefined &&
            n.data.stepType !== "ad"
    );

    if (!nodesComTaxa.length) return null;

    const melhorNode = nodesComTaxa.reduce((melhor: any, atual: any) =>
        atual.data.conversionRate > melhor.data.conversionRate
            ? atual
            : melhor
    );

    const piorNode = nodesComTaxa.reduce((pior: any, atual: any) =>
        atual.data.conversionRate < pior.data.conversionRate
            ? atual
            : pior
    );

    const aviso = () => {
            switch (piorNode.data.stepType) {
                case "landing":
                    return (
                        <>
                            Você precisa focar na sua Landing Page! <br />
                            Que tal melhorar o <b>design, tempo de carregamento e clareza da oferta?</b>
                        </>
                    );

                case "form":
                    return (
                        <>
                            Seu formulário pode estar causando desistência. <br />
                            Tente reduzir campos e melhorar a usabilidade.
                        </>
                    );

                case "checkout":
                    return (
                        <>
                            O problema está no checkout! <br />
                            Revise formas de pagamento, confiança e possíveis erros na finalização.
                        </>
                    );

                case "ad":
                    return (
                        <>
                            Seus anúncios não estão performando bem. <br />
                            Revise público, criativo e segmentação.
                        </>
                    );

                default:
                    return "Revise essa etapa para melhorar sua conversão.";
            }
    };

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    top: 100,
                    right: 20,
                    background: "#e3f3f3",
                    border: "1px solid #2cd3d3",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    zIndex: 9999
                }}
            >
                <strong>Pior etapa </strong>

                <div>{piorNode.data.label}</div>
                <div>{piorNode.data.conversionRate}% de conversão</div>

                <div style={{ marginTop: 8, fontSize: 13 }}>
                    {aviso()}
                </div>
            </div>
            <div
                style={{
                    position: "fixed",
                    top: 260,
                    right: 20,
                    background: "#d1fae5",
                    border: "1px solid #10b981",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    zIndex: 9999
                }}
            >
                <strong>Melhor etapa 🚀</strong>

                <div>{melhorNode.data.label}</div>
                <div>{melhorNode.data.conversionRate}% de conversão</div>
            </div>
        </div>
    );
}