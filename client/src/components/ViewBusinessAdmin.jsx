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

import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewBusinessAdmin = () => {
  const navigate = useNavigate();

  const UpdateStatusAdmin = (id) => {
    navigate("/update_status_admin/" + id);
  };

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/business/`
        );
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error("Error fetching business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const filteredData = businessData.filter((business) => {
    const isMatch = Object.values(business).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = business.status.toLowerCase() === 'approved';

    return isMatch;
  });

  const doc = new jsPDF();
  const exportPDFHandler = () => {
    console.log("Data exported into pdf");
    const fontSize = 20;
    doc.setFontSize(fontSize);
    const lineY = 20;
    doc.text("Services Report", 76, lineY + 10);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    autoTable(doc, {
      html: "#services-table",
      startY: 50,
      columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      // theme: "plain",
      // styles: {
      //   lineColor: [0, 0, 0], // Border color (black)
      //   lineWidth: 0.3, // Border width (0.5mm)
      // },
    });
    doc.save("Services_Report.pdf");

    // doc.setLineWidth(0.7);

    // const pageSize = doc.internal.pageSize;
    // const pageWidth = pageSize.width;
    // const pageHeight = pageSize.height;
    // doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Adjust the margin as needed
    // const text = "On Road Assistance System";
    // const fontSize = 10;
    // const textWidth =
    //   (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;
    // const textX = pageWidth - textWidth - 37; // 10 is the right margin
    // const textY = 25; // 10 is the top margin
    // doc.text(text, textX, textY);

    // // Add a horizontal line below the text
    // const lineY = textY + 5; // Adjust the Y position as needed
    // doc.setLineWidth(0.5);
    // doc.line(10, lineY, pageWidth - 10, lineY);
    // const specificFontSize = 14;
    // doc.setFontSize(specificFontSize);

    // doc.text("Services", 10, 50);
    // doc.setFontSize(fontSize);
    // autoTable(doc, {
    //   html: "#services-table",
    //   startY: 60,
    //   columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    //   // theme: "plain",
    //   // styles: {
    //   //   lineColor: [0, 0, 0], // Border color (black)
    //   //   lineWidth: 0.3, // Border width (0.5mm)
    //   // },
    // });
    // // doc.setProperties({ title: "Title" });
    // doc.save("Services.pdf");
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
          <div className="col-9 offset-2 mt-4">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>Approve On Road Services</h4>
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

            {/* <div
              className="row"
              style={{ marginTop: 10, marginBottom: "80px" }}
            >
              {filteredData.map((business) => (
                <div key={business._id} className="col-12 col-md-6">
                  <div
                    className="card product-card"
                    style={{ marginBottom: 10 }}
                  >
                    <div className="card-body">
                      <a className="product-title d-block">
                        Business Name: <b> {business.name} </b>
                      </a>
                      <a className="product-title d-block">
                        Mechanic Name: <b> {business.mechanicname} </b>
                      </a>
                      <a className="product-title d-block">
                        Service Description:{business.service}{" "}
                      </a>
                      <a className="product-title d-block">
                        Available: {business.avialableavialable}{" "}
                      </a>
                      <a className="product-title d-block">
                        Address: {business.address}{" "}
                      </a>
                      <a className="product-title d-block">
                        Locality: {business.locality}{" "}
                      </a>
                      <a className="product-title d-block">
                        City: {business.city}{" "}
                      </a>
                      <a className="product-title d-block">
                        Mobile: {business.mobile}{" "}
                      </a>

                      <a className="product-title d-block">
                        Lat: {business.lat}{" "}
                      </a>
                      <a className="product-title d-block">
                        Long: {business.long}{" "}
                      </a>
                      <a
                        className="product-title d-block"
                        style={{ color: "green" }}
                      >
                        Status: {business.status}{" "}
                      </a>
                    </div>
                  </div>

                  <a
                    className="btn btn-danger"
                    style={{ marginLeft: "0" }}
                    onClick={() => UpdateStatusAdmin(business.id)}
                  >
                    Update Status
                  </a>

                  <a
                    className="btn btn-danger"
                    target="_blank"
                    href={`https://maps.google.com/?q=${business.lat},${business.long}`}
                  >
                    Show Map{" "}
                  </a>
                </div>
              ))}
            </div> */}

            <div
              className="row mt-5"
              style={{ marginTop: 10, marginBottom: "80px" }}
            >
              <div className="row">
                <div className="col-11"></div>
                <div className="col-1 mb-2">
                  <button
                    style={{ width: "120px" }}
                    className="btn btn-warning"
                    onClick={exportPDFHandler}
                  >
                    Export in PDF
                  </button>
                </div>
              </div>
              <table
                className="col-12 col-md-12 table   table-hover"
                id="services-table"
              >
                <thead className="bg-dark">
                  <tr>
                    <th style={{ color: "white" }}>Services Name</th>
                    <th style={{ color: "white" }}>Mechanic Name</th>
                    <th style={{ color: "white" }}>Service Description</th>
                    <th style={{ color: "white" }}>Address</th>
                    <th style={{ color: "white" }}>City</th>
                    <th style={{ color: "white" }}>MobileNo</th>
                    <th style={{ color: "white" }}>Lat</th>
                    <th style={{ color: "white" }}>Long</th>
                    <th style={{ color: "white" }}>Status</th>
                    <th style={{ color: "white" }}></th>
                    <th style={{ color: "white" }}></th>
                  </tr>
                </thead>
                <tbody className="table-Light">
                  {filteredData.map((business) => (
                    <tr key={business._id}>
                      <td>{business.name}</td>
                      <td>{business.mechanicname}</td>
                      <td>{business.service} </td>
                      <td>{business.address} </td>
                      <td>{business.city} </td>
                      <td>{business.mobile} </td>
                      <td>{business.lat} </td>
                      <td>{business.long} </td>
                      <td style={{ color: "green" }}>{business.status} </td>
                      <td>
                        <a
                          className="btn btn-danger"
                          style={{ marginLeft: "0" }}
                          onClick={() => UpdateStatusAdmin(business.id)}
                        >
                          Update Status
                        </a>
                      </td>
                      <td>
                        <a
                          className="btn btn-success"
                          target="_blank"
                          href={`https://maps.google.com/?q=${business.lat},${business.long}`}
                        >
                          Show Map{" "}
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

export default ViewBusinessAdmin;
