import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookDetails = () => {
  const params = useParams();
  const firebase = useFirebase();
  // console.log(params);

  const [bookData, setBookData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [url, setURL] = useState(null);



  useEffect(() => {
    firebase
      .getBooksById(params.bookId)
      .then((value) => setBookData(value.data()));
  }, []);

  //   console.log(bookData.name) ;
  useEffect(() => {
    if (bookData) {
      const imagePath = bookData.imageURL;
      firebase.getImageURL(imagePath).then((url) => setURL(url));
    }
  }, [bookData]);

  if (bookData == null) return <h2>Details Loading...</h2>;
//   console.log(bookData);

  const onPlaceOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, quantity, bookData.name);
    console.log("Your Order has been placed successfully");
    // return result ;
  };

  return (
    <div className="container m-5">
      <h2>{bookData.name}</h2>
      {<img src={url} />}
      <h3>Details</h3>
      <p>Price is Rs.{bookData.price}</p>
      <p>ISBN number : {bookData.isbn}</p>

      <h3>Owner Details</h3>
      <p>Name : {bookData.displayName}</p>
      <p>Email : {bookData.userEmail}</p>

      <Form.Group className="mb-3" controlId="formBasicQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          type="number"
        />
      </Form.Group>
      <Button onClick={onPlaceOrder} variant="success">
        Place Order
      </Button>
    </div>
  );
};

export default BookDetails;
