import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import Page404 from "./routes/Page404";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="article" element={<Details />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="not-found" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
