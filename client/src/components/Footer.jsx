import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import "./css/style.css";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-left footer">
      <div
        className="text-center p-3"
        style={{
          backgroundColor: "rgba(255, 255, 255)",
        }}
      >
        <p
          className="text-dark"
          style={{ marginTop: "5px", fontWeight: "bold" }}
        >
          &copy; On Road Vehicle Assistance System
        </p>
      </div>
    </MDBFooter>
  );
}
