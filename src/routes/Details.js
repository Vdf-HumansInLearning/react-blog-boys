import React from "react";
import { Component } from "react/cjs/react.production.min";
import DarkModeButton from "../components/DarkModeButton/DarkModeButton";
import Navbar from "../components/Navbar/Navbar";

class Details extends Component {
  render() {
    return (
      <>
        <DarkModeButton />
        <Navbar />
      </>
    );
  }
}

export default Details;
