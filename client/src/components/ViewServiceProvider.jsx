import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Logout from "./Logout.jsx";
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

const ViewServiceProvider = () => {
  const [providerData, setProviderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/vendor/`
        );
        if (response.status === 200) {
          setProviderData(response.data);
        } else {
          console.error("Error fetching business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error.message);
      }
    };

    fetchProviderData();
  }, []);

  // Filter data based on the search term
  const filteredData = providerData.filter((business) => {
    const isMatch = Object.values(business).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return isMatch;
  });

  const doc = new jsPDF();
  const exportPDFHandler = () => {
    console.log("Data exported into pdf");
    const fontSize = 20;
    doc.setFontSize(fontSize);
    const lineY = 20;
    doc.text("Services Provider Report", 66, lineY + 10);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    autoTable(doc, {
      html: "#Service-provider",
      startY: 50,
      // theme: "plain",
      // styles: {
      //   lineColor: [0, 0, 0], // Border color (black)
      //   lineWidth: 0.3, // Border width (0.5mm)
      // },
    });
    doc.save("Services_Provider.pdf");
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
              <h4>Services Provider</h4>
            </div>
            <div className="row">
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

            <div
              className="row mt-5"
              style={{ marginTop: 10, marginBottom: "80px" }}
            >
              <div className="row">
                <div className="col-7"></div>
                <div className="col-4 offset-1 mb-2">
                  <button
                    style={{ width: "120px", marginLeft: "90px" }}
                    className="btn btn-warning"
                    onClick={exportPDFHandler}
                  >
                    Export in PDF
                  </button>
                </div>
              </div>
              <div className="col-9 offset-1">
                <table
                  className="col-12 col-md-12 table   table-hover"
                  id="Service-provider"
                >
                  <thead className="bg-dark">
                    <tr>
                      <th style={{ color: "white" }}>Id</th>
                      <th style={{ color: "white" }}>Name</th>
                      <th style={{ color: "white" }}>Email</th>
                      <th style={{ color: "white" }}>Mobile No</th>
                      <th style={{ color: "white" }}>City</th>
                    </tr>
                  </thead>

                  <tbody className="table-Light">
                    {filteredData.map((business) => (
                      <tr key={business._id}>
                        <td>{business._id}</td>
                        <td>{business.name}</td>
                        <td>{business.email}</td>
                        <td>{business.phone} </td>
                        <td>{business.city} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default ViewServiceProvider;
