import Canva from "./components/funilTP/telaFunilTP";

function App() {
  return (
    <div className="bg-[#2e003e] p-3 min-h-screen">
      <div className="bg-[#2e003e] rounded-xl p-5 shadow-md">
        
        <div className=" items-start mb-4 p-2">
          <h1 className="text-3xl font-bold text-white">
            Construa seu Funil de Tráfego Pago
          </h1>

          <p className="text-purple-300 text-2xl font-semibold mt-2">
            Monte visualmente seu funil, conecte etapas e salve seu projeto para visualizar os resultados
          </p>
        </div>

        {/* Área do Canvas */}
           <div className="bg-gray-200 rounded-xl shadow-md h-[130vh]">
          <Canva />
        </div>

      </div>
    </div>
  );
}

export default App;