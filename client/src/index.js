import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import Page404 from "./routes/Page404";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="article/:id" element={<Details />}/>
        <Route path="not-found" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
        <Route path="/not-found" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
