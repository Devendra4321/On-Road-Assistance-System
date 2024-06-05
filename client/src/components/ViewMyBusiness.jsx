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

import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewMyBusiness = () => {
  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////

  const [businessId, setBusinessId] = useState(""); // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${businessId}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // Update location on the server
  async function updateLocationOnServer(latitude, longitude) {
    //  const businessId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual business ID
    const url = `http://localhost:4000/api/v1/business/map/` + businessId;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });

      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (businessId) {
      getUserLocation();
    }
  }, [businessId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //////////////Update Delete Code ///////////////
  ////////////////////////////////////////////////

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      const token = localStorage.getItem("token");

      fetch("http://localhost:4000/api/v1/business/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then((res) => {
          //  alert('Removed successfully.')
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const LoadEdit = (id) => {
    navigate("/update_business/" + id);
  };

  const UpdateLocation = (id) => {
    navigate("/geolocation/" + id);
  };

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/business/");
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const vendoremail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter business data based on vendoremail
        const filteredBusiness = data.filter(
          (business) => business.vendoremail === vendoremail
        );
        setBusinessData(filteredBusiness);
        setFilteredData(filteredBusiness);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business data:", error.message);
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <h4>Search My Services</h4>
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

            {/* Show if Null data in table */}

            {filteredData.length > 0 ? (
              <div
                className="row"
                style={{ marginTop: 10, marginBottom: "90px" }}
              >
                {/* Get Details Map field and id */}
                {filteredData.map((business) => (
                  <div key={business._id} className="col-12 col-md-6 mb-4">
                    <div
                      className="card product-card"
                      style={{ marginBottom: 10 }}
                    >
                      <div className="card-body">
                        <a className="product-title d-block">
                          Service Name: <b> {business.name} </b>
                        </a>
                        <a className="product-title d-block">
                          Mechanic Name: <b> {business.mechanicname} </b>
                        </a>
                        <a className="product-title d-block">
                          Service Description:{business.service}{" "}
                        </a>
                        <a className="product-title d-block">
                          Available: {business.available}{" "}
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
                        <a
                          className="product-title d-block"
                          style={{ color: "green" }}
                        >
                          Status: {business.status}{" "}
                        </a>
                        <a className="product-title d-block">
                          Lat: {business.lat}{" "}
                        </a>
                        <a className="product-title d-block">
                          Long: {business.long}{" "}
                        </a>
                      </div>
                    </div>

                    <a
                      className="btn btn-danger"
                      style={{ marginLeft: "0" }}
                      onClick={() => {
                        LoadEdit(business.id);
                      }}
                    >
                      Edit
                    </a>
                    <a
                      className="btn btn-danger"
                      onClick={() => {
                        Removefunction(business.id);
                      }}
                    >
                      Delete
                    </a>
                    <a
                      className="btn btn-danger"
                      onClick={() => setBusinessId(business.id)}
                    >
                      Geo Map
                    </a>

                    <a
                      className="btn btn-danger"
                      target="_blank"
                      href={`https://maps.google.com/?q=${business.lat},${business.long}`}
                    >
                      Show Map
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                No business details found for the specified vendor email or
                search term.
              </p>
            )}

            {/* Show if Null data in table */}
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

export default ViewMyBusiness;
