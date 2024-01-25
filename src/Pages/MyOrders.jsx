import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Component/Card";

const MyOrders = () => {
  const firebase = useFirebase();

  const [mybooks, setMyBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setMyBooks(books.docs));
  }, [firebase]);

  if(!mybooks) return <h2>Loading..</h2>
//   console.log(mybooks);

  return (
    <div className="container m-5 row">
      {mybooks.map((book) => (
        <BookCard
          link={`/book/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default MyOrders;
