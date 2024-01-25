import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [url, setURL] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate() ;

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem", height: "30rem", margin: "10px" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            This book has a title {props.name} and this book is sold by
             {props.displayName} and costs Rs.{props.price}
          </Card.Text>
          <Button onClick={()=> navigate(props.link)} variant="primary">
            View
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookCard;
