import { Handle, Position } from "reactflow";

export default function NodesFunil({ id, data }: any) {
  const { stepType, label, value, onEdit, onDelete } = data;

  const getShapeStyle = () => {
    switch (stepType) {
     case "ad":
  return {
    background: "#fc9802",
    clipPath: "polygon(0% 0%, 100% 0%, 94% 100%, 6% 100%)"
  };

case "landing":
  return {
    background: "#ffae34",
    clipPath: "polygon(6% 0%, 94% 0%, 88% 100%, 12% 100%)"
  };

case "form":
  return {
    background: "#ffbc58",
    clipPath: "polygon(12% 0%, 88% 0%, 82% 100%, 18% 100%)"
  };

case "checkout":
  return {
    background: "#ffd493",
    clipPath: "polygon(18% 0%, 82% 0%, 50% 100%)"
  };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 12,
          height: 12,
          background: "#fff",
          border: "2px solid #333"
        }}
      />

      <div
        style={{
          ...getShapeStyle(),
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "10px",
          textAlign: "center"
        }}
      >
        <div>{label}</div>
        {value && (
          <div style={{ fontSize: "9px", marginTop: "2px" }}>
            {value}
          </div>
        )}
      </div>

      {/* BOTÕES */}
      <div
        style={{
          position: "absolute",
          top: 4,
          display: "flex",
          gap: 8,
          fontSize: 6,
          cursor: "pointer"
        }}
      >
        <span onClick={() => onEdit(id)}>editar</span>
        <span onClick={() => onDelete(id)}>x</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 12,
          height: 12,
          background: "#fff",
          border: "2px solid #333"
        }}
      />
    </div>
  );
}