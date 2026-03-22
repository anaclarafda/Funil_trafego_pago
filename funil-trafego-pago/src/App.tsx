import Canva from "./components/funilTP/telaFunilTP";

function App() {
  return (
    < div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }
      }
    >
      <h1 style={{ marginBottom: "5px" }}>
        Construtor de Funil de Tráfego Pago
      </h1>

      <p style={{ marginBottom: "20px", color: "#6b7280" }}>
        Monte visualmente seu funil conectando etapas.
      </p>

      {/* Área do Canvas */}
      <div style={{ height: "600px" }}>
        <Canva />
      </div>
    </div >
  );
}

export default App;