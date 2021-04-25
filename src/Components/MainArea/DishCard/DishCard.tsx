import { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import DishModel from "../../../Models/DishModel";
import "./DishCard.css";
interface DcProps {
  dish: DishModel;
  selected: Function;
}
function DishCard(props: DcProps): JSX.Element {
  let [classMod, setClassMod] = useState("DishCard");
  const handleSelectDish = () => {
    props.selected(props.dish);
  };
  const handleDown = () => {
    setClassMod("DishCard Clicked");
  };
  const handleUp = () => {
    setClassMod("DishCard");
  };
  // console.log(props.dish.name);
  return (
    <div
      onClick={handleSelectDish}
      className={classMod}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
    >
      <CardGroup style={{ border: "1px solid lightgrey", margin: "7px" }}>
        <Card.Img
          style={{
            width: "10rem",
            height: "10rem",
          }}
          variant="top"
          src={props.dish.secondaryImage}
        />
        <Card
          style={{
            maxWidth: "25rem",
            height: "10rem",
            border: "none",
          }}
        >
          <Card.Body>
            <Card.Title>
              {props.dish.id}) {props.dish.name}
            </Card.Title>
            <Card.Text>{props.dish.description}</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default DishCard;
