import { useState } from "react";
import "./App.css";

import {Route, Routes} from 'react-router-dom' ;

function App() {
  const [count, setCount] = useState(0);

  return(
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/register" element={<h1>Register Here</h1>} />
      <Route path="/login" element={<h1>Login Here</h1>} />
    </Routes>
  )
}

export default App;
