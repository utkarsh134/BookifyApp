import React, { useEffect, useState } from "react";
import MyNavbar from "../Component/Navbar";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Component/Card";

const Home = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getListAllBooks().then((book) => setBooks(book.docs));
  }, []);
    // console.log(books);
  return (
    <div className="container m-5 row">
      {books.map((book) => (
        <BookCard
          link={`/book/view/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default Home;
