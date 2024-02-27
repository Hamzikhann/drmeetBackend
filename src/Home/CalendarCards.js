import { Card, CardContent } from "@mui/material";

const NumberCard = ({ number, isSelected, onClick, disabled }) => (
  <Card
    style={
      isSelected
        ? {
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            margin: "5px",
            borderRadius: "5px",
            backgroundColor: "green",
            color: "white",
          }
        : disabled
        ? {
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            borderRadius: "5px",
            backgroundColor: "lightgrey",
            color: "white",
          }
        : {
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            margin: "5px",
            borderRadius: "5px",
          }
    }
    onClick={() => !disabled && onClick(number)}
  >
    <CardContent>{number}</CardContent>
  </Card>
);

export default NumberCard;
