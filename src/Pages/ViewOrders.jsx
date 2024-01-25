import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

const ViewOrders = () => {
  const params = useParams();
  console.log(params);
  const [orders, setOrders] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase
      .fetchMyOrders(params.bookId)
      .then((orderList) => setOrders(orderList.docs));
  }, [params]);

//   console.log(orders);
  return (
    <div>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="m-5"
            style={{ border: "1px solid", padding: "8px" }}
          >
            <h5>Order By: {data.displayName} </h5>
            <h6>Quantity: {data.quantity} </h6>
            <p>Email: {data.userEmail} </p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrders;
