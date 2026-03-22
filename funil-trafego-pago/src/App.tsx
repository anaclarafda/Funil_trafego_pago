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
      <div style={{display: "flex"}}>
      <h1 style={{ marginBottom: "10px", fontSize: "35px", color:"orangered" }}>
        Construa seu Funil de Tráfego Pago
      </h1>

      <p style={{ marginBottom: "10px", marginTop: "20px", marginLeft: "10px",color: "#6b7280", fontSize:"15px"}}>
        Monte visualmente seu funil, conecte etapas e salve seu projeto para visualizar os resultados
      </p>
    </div>
      {/* Área do Canvas */}
      <div style={{ height: "600px" }}>
        <Canva />
      </div>
    </div >
  );
}

export default App;