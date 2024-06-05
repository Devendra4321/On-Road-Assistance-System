import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewMyRequest = () => {
  const navigate = useNavigate();

  const UpdateStatus = (id) => {
    navigate("/update_status/" + id);
  };

  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/location/");
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const vendoremail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter location data based on vendoremail
        const filteredBusiness = data.filter(
          (location) => location.vendoremail === vendoremail
        );
        setBusinessData(filteredBusiness);
        setFilteredData(filteredBusiness);
      } catch (error) {
        console.error("Error fetching location data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = businessData.filter((business) =>
      Object.values(business).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const doc = new jsPDF();
  const exportPDFHandler = () => {
    console.log("Data exported into pdf");
    const fontSize = 20;
    doc.setFontSize(fontSize);
    const lineY = 20;
    doc.text("Request's Report", 76, lineY + 10);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    autoTable(doc, {
      html: "#request-table",
      startY: 50,
      columns: [0, 1, 2, 3],
    });
    doc.save("Request's_Report.pdf");
  };

  return (
    <>
      <Navbar
        a1="Service"
        a2="Requests"
        a1href="/post_business"
        a2href="/view_my_request"
      />
      <div>
        <div>
          <div className="container mt-3">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>My Request</h4>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-10"></div>
                  <div className="col-1 mb-2">
                    <button
                      style={{ width: "120px", marginLeft: "20px" }}
                      className="btn btn-warning"
                      onClick={exportPDFHandler}
                    >
                      Export in PDF
                    </button>
                  </div>
                </div>
              </div>
              <table className="col-11 table   table-hover" id="request-table">
                <thead className="bg-dark">
                  <tr>
                    <th style={{ color: "white" }}>Date and Time</th>
                    <th style={{ color: "white" }}>Complaint</th>
                    <th style={{ color: "white" }}>Mobile Number</th>
                    {/* <th style={{ color: "white" }}>Latitude</th>
                    <th style={{ color: "white" }}>Longitude</th> */}
                    <th style={{ color: "white" }}>Status</th>
                    <th style={{ color: "white" }}></th>
                    <th style={{ color: "white" }}></th>
                    {/* <th style={{ color: "white" }}></th> */}
                  </tr>
                </thead>

                <tbody className="table-Light">
                  {filteredData.map((location) => (
                    <tr key={location._id}>
                      <td>
                        {new Date(location.dateCreated).toLocaleDateString(
                          "en-GB",
                          timeOptions
                        )}{" "}
                      </td>
                      <td>{location.complaint}</td>
                      <td>{location.mobile}</td>
                      {/* <td>{location.lat}</td>
                      <td>{location.long}</td> */}
                      <td style={{ color: "green" }}>{location.status}</td>
                      <td>
                        <a
                          className="btn btn-danger mb-4"
                          style={{
                            marginLeft: "0",
                            marginBottom: "80px",
                            marginLeft: "10px",
                          }}
                          onClick={() => UpdateStatus(location.id)}
                        >
                          Update Status
                        </a>
                      </td>
                      {/* <td>
                        <a
                          className="btn btn-danger mb-4"
                          target="_blank"
                          href={`https://maps.google.com/?q=${location.lat},${location.long}`}
                        >
                          Show Map
                        </a>
                      </td> */}
                      <td>
                        <a
                          className="btn btn-danger mb-4"
                          target="_blank"
                          href={`https://maps.google.com/?q=${location.lat},${location.long}`}
                        >
                          Show Map
                        </a>
                      </td>
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
                  <Link to="/vendor_home">
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

export default ViewMyRequest;
