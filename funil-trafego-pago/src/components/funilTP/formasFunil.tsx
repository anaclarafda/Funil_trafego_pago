import { Handle, Position } from "reactflow";

export default function FormasFunil({ id, data }: any) {
  const { stepType, label, value, onEdit, onDelete, conversionRate } = data;

  const finalConversionRate =
    stepType === "ad" ? 100 : conversionRate;

  const getShapeStyle = () => {
    switch (stepType) {
      case "ad":
        return {
          background: "#9702a5",
          clipPath: "polygon(0% 0%, 100% 0%, 94% 100%, 6% 100%)"
        };

      case "landing":
        return {
          background: "#c503d6",
          clipPath: "polygon(6% 0%, 94% 0%, 88% 100%, 12% 100%)"
        };

      case "form":
        return {
          background: "#df19e6",
          clipPath: "polygon(12% 0%, 88% 0%, 82% 100%, 18% 100%)"
        };

      case "checkout":
        return {
          background: "#f101c9",
          clipPath: "polygon(18% 0%, 82% 0%, 50% 100%)"
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-[180px] h-[55px] flex items-center justify-center">

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-gray-700"
      />

      {/* SHAPE */}
      <div
        style={getShapeStyle()}
        className="w-full h-full flex flex-col items-center justify-center text-white text-center px-2"
      >
        <div className="font-semibold text-[10px]">
          {label}
        </div>

        {value && (
          <div className="text-[9px] opacity-90">
            {data.value}
          </div>
        )}

        {finalConversionRate !== undefined && (
          <div className="text-[9px] font-semibold text-black">
            {finalConversionRate}%
          </div>
        )}


      </div>

      <div className="absolute -top-2 -right-2 flex gap-1 text-[7px]">
        <button
          onClick={() => onEdit(id)}
          className="bg-white text-gray-700 px-1 rounded shadow hover:bg-gray-100"
        >
          edit
        </button>

        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-1 rounded shadow hover:bg-red-600"
        >
          ✕
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-700"
      />
    </div>
  );
}