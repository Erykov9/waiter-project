import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TableCard = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Table: {props.table}
        </Card.Title>
        <Card.Text>
          Status: {props.status}
        </Card.Text>
        <Button variant="primary" as={NavLink} to={'/tables/' + props.id}>Show More</Button>
      </Card.Body>
    </Card>
  )
};

export  default TableCard;