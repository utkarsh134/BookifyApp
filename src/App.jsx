import { useState, useEffect } from "react";

// CSS
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";

// components
import MyNavbar from "./Component/Navbar";

//Pages
import Home from "./Pages/Home";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import Listing from "./Pages/Listing";
import MyOrders from "./Pages/MyOrders";
import BookDetails from "./Pages/Details";
import ViewOrders from "./Pages/ViewOrders";

// Notification
// import { messaging } from "./Context/Firebase";
// import { getToken } from "firebase/messaging";

function App() {
  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     // Generate Token
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BELz2bRgE6WteOZJXCJuLxRWOzBsu_fiPOSJ5xHyK8FfbR95zlBzROgiH1KRzmBRLgm0aXUXvDHpK8Ss9Wh5srE",
  //     });
  //     console.log("Token Gen", token);
  //   } else if (permission === "denied") {
  //     alert("You denied for the notification") ;
  //   }
  // }
  // useEffect(() => {
  //   // Req user for notification permission
  //   requestPermission();
  // });

  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/list" element={<Listing />} />
        <Route path="/book/orders" element={<MyOrders />} />
        <Route path="/book/view/:bookId" element={<BookDetails />} />
        <Route path="/book/orders/:bookId" element={<ViewOrders />} />
      </Routes>
    </>
  );
}

export default App;
