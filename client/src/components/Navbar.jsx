import React from "react";
import "./css/style.css";
export default function Navbar({ a1, a2, a3, a1href, a2href, a3href }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand header" href="/">
          On Road Assistance
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" aria-current="page" href={a1href}>
              {a1}
            </a>
            <a className="nav-link" href={a2href}>
              {a2}
            </a>
            <a className="nav-link" href={a3href}>
              {a3}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
