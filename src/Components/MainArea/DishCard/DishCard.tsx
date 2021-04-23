import { Card } from "react-bootstrap";
import DishModel from "../../../Models/DishModel";
import "./DishCard.css";
interface DcProps {
  dish: DishModel;
  selected: Function;
}
function DishCard(props: DcProps): JSX.Element {
  const handleSelectDish = () => {
    props.selected(props.dish);
  };
  return (
    <div onClick={handleSelectDish} className="DishCard">
      <Card style={{ width: "18rem", height: "30rem", margin: "10px" }}>
        <Card.Img variant="top" src={props.dish.secondaryImage} />
        <Card.Body>
          <Card.Title>
            {props.dish.id}) {props.dish.name}
          </Card.Title>
          <Card.Text>{props.dish.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DishCard;
