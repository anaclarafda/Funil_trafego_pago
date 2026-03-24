{/* Início do código. Aqui montei o cabeçalho com título e subtítulo e
    utilizei o componente "Canva", que é importado abaixo.
    Esse componente representa a área (canvas) onde as formas geométricas
    serão exibidas. */}

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
            Monte visualmente seu funil,{" "}
            <span className="font-semibold underline">
              conecte etapas com uma linha
            </span>{" "}
            e{" "}
            <span className="font-semibold underline">
              salve seu projeto
            </span>{" "}
            <span className="font-semibold mt-2">
              para visualizar os resultados
            </span>
          </p>
          <p className="text-[14px] font-semibold text-gray-300">
            Obs: Ao editar uma etapa, reconecte os nós para que a porcentagem seja recalculada
          </p>
        </div>

        {/* Área do Canvas */}
        <div className="bg-gray-100 rounded-xl shadow-md h-[130vh]">
          <Canva />
        </div>

      </div>
    </div>
  );
}

export default App;