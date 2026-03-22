import { Handle, Position } from "reactflow";

export default function NodesFunil({ data }: any) {
  const { stepType, label, value } = data;

  const getStyle = () => {
    switch (stepType) {
      case "ad":
        return {
          width: 200,
          height: 60,
          background: "#bb00b2",
          clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)"
        };

      case "landing":
        return {
          width: 200,
          height: 60,
          background: "#b600ad",
          clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)"
        };

      case "form":
        return {
          width: 200,
          height: 60,
          background: "#cf04c5",
          clipPath: "polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)"
        };

      case "checkout":
        return {
          width: 200,
          height: 60,
          background: "#f004e4",
          clipPath: "polygon(30% 0%, 70% 0%, 50% 100%)"
        };

      default:
        return {};
    }
  };

  return (
    <div
      style={{
        ...getStyle(),
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8px",        
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
        textAlign: "center"
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <div>{label}</div>
        {value && (
          <div style={{ fontSize: "9px", marginTop: "2px" }}>
            {value}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}