import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewUserAdmin = () => {
  const navigate = useNavigate();

  const UpdateStatusAdmin = (id) => {
    navigate("/update_status_admin/" + id);
  };

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/users/`);
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const filteredData = businessData.filter((user) => {
    const isMatch = Object.values(user).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = user.status.toLowerCase() === 'approved';

    return isMatch;
  });

  const doc = new jsPDF();
  const exportPDFHandler = () => {
    console.log("Data exported into pdf");
    const fontSize = 20;
    doc.setFontSize(fontSize);
    const lineY = 20;
    doc.text("User Details Report", 68, lineY + 10);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    autoTable(doc, {
      html: "#user-details",
      startY: 50,
      // theme: "plain",
      // styles: {
      //   lineColor: [0, 0, 0], // Border color (black)
      //   lineWidth: 0.3, // Border width (0.5mm)
      // },
    });
    doc.save("UserDetails_Report.pdf");
  };

  return (
    <>
      <Navbar
        a1="Services Approval"
        a2="User Details"
        a3="Service Provider"
        a1href="/view_business_admin"
        a2href="/view_user_admin"
        a3href="/view_service_provider"
      />
      <div>
        <div className="row">
          <div className="col-9 offset-2 mt-3">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>User Details</h4>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>

            {/* <div className="row" style={{ marginTop: 10 }}>
              {filteredData.map((user) => (
                <div key={user._id} className="col-12 col-md-6">
                  <div
                    className="card product-card"
                    style={{ marginBottom: 10 }}
                  >
                    <div className="card-body">
                      <a className="product-title d-block">
                        Name: <b> {user.name} </b>
                      </a>
                      <a className="product-title d-block">
                        Email: {user.email}{" "}
                      </a>
                      <a className="product-title d-block">
                        Mobile: {user.phone}{" "}
                      </a>
                      <a className="product-title d-block">
                        City: {user.city}{" "}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <div
              className="col-9 offset-1  mt-5"
              style={{ marginTop: 10, marginBottom: "80px" }}
            >
              <div className="row">
                <div className="col-7"></div>
                <div className="col-4 offset-1 mb-2">
                  <button
                    style={{ width: "120px", marginLeft: "182px" }}
                    className="btn btn-warning"
                    onClick={exportPDFHandler}
                  >
                    Export in PDF
                  </button>
                </div>
              </div>
              <table
                className="col-12 col-md-12 table   table-hover"
                id="user-details"
              >
                <thead className="bg-dark">
                  <tr>
                    <th style={{ color: "white" }}>User Name</th>
                    <th style={{ color: "white" }}>Email</th>
                    <th style={{ color: "white" }}>Mobile No</th>
                    <th style={{ color: "white" }}>City</th>
                  </tr>
                </thead>
                <tbody className="table-Light">
                  {filteredData.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active">
                  {" "}
                  <Link to="/admin_home">
                    <i className="lni lni-home"></i>Home{" "}
                  </Link>{" "}
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserAdmin;
