import Canva from "./components/funilTP/telaFunilTP";

function App() {
  return (
    <div className="bg-fuchsia-700 p-3 min-h-screen">
      <div className="bg-white rounded-xl p-5 shadow-md">
        
        <div className="flex items-start gap-4 mb-4 p-2">
          <h1 className="text-3xl font-semibold text-black">
            Construa seu Funil de Tráfego Pago
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Monte visualmente seu funil, conecte etapas e salve seu projeto para visualizar os resultados
          </p>
        </div>

        {/* Área do Canvas */}
           <div className="bg-white rounded-xl shadow-md h-[170vh]">
          <Canva />
        </div>

      </div>
    </div>
  );
}

export default App;