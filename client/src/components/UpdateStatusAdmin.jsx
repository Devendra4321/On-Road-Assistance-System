import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const UpdateStatusAdmin = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  const [editedBusiness, setEditedBusiness] = useState({
    status: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/business/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setEditedBusiness({
            status: data.status,
          });
        } else {
          console.error("Error fetching User data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching User data:", error.message);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness({
      ...editedBusiness,
      [name]: value,
    });
  };

  const handleUpdateBusiness = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/business/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(editedBusiness),
        }
      );

      if (response.ok) {
        console.log("Status updated successfully!");
        // Add any additional logic you need after a successful update
        window.location.href = "/view_business_admin";
      } else {
        console.error("Not updating User details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating User details:", error.message);
    }
  };

  const [imageUrl, setImageUrl] = useState();

  const checkDocument = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/business/${id}`
      );
      if (response.status === 200) {
        setImageUrl(response.data.image.url);
        // console.log(response.data.image.url);
      } else {
        console.error("Error fetching business data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching business data:", error.message);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    setFile("");
    console.log(id);
    const selectedFile = event.target.files[0];
    console.log(selectedFile.name);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Debug: Check FormData content
      console.log(...formData.entries());

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/business/upload/${id}`,
          {
            method: "POST",
            body: formData, // Automatically sets the appropriate
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json(); // Assuming API returns JSON
        console.log("File uploaded successfully", responseData);
        setFile("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
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
        <div>
          <div className="page-content-wrapper">
            <div className="top-products-area py-3">
              <div className="container">
                <div className="section-heading d-flex align-items-center justify-content-between">
                  <h4>Update Status</h4>
                </div>
                {/* Form Scrip Start*/}
                <div className="profile-wrapper-area py-3">
                  <div className="card user-data-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-end">
                        <a
                          type="button"
                          className="btn btn-danger text-right"
                          style={{ marginLeft: "0" }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => checkDocument(business.id)}
                        >
                          Check Document
                        </a>
                      </div>
                      <form onSubmit={handleUpdateBusiness}>
                        <div className="mb-3">
                          <div className="title mb-2">
                            <span>Update Status</span>
                          </div>
                          <select
                            name="status"
                            id="status"
                            value={editedBusiness.status}
                            onChange={handleInputChange}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                        <button className="btn btn-success w-100" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Form Scrip End
                 */}
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
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Check status
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Upload Document
                  </button>
                  <button
                    class="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    onClick={() => checkDocument()}
                  >
                    Check Document
                  </button>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  tabindex="0"
                >
                  <div className="my-4 mx-5">
                    <label>Driving License:</label>
                    <div className="col-12 mb-3 mx-3 mt-2">
                      <input type="file" onChange={handleFileChange} />
                      {file && <p className="text-danger mt-2">{file}</p>}
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabindex="0"
                >
                  {imageUrl && (
                    <div className="my-4 mx-5">
                      <h4>Driving License</h4>
                      <img src={imageUrl} style={{ width: "20rem" }}></img>
                    </div>
                  )}
                  {!imageUrl && (
                    <h5 className="text-danger text-center my-5">
                      Documents not uploaded by mechanic!
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStatusAdmin;
