import React, { useState } from "react";
import { Link } from "react-router-dom";
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
{
  /*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/
}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

// vendoremail  useremail  complaint mobile lat long status

const PostFeedback = () => {
  const vendorEmail = document.cookie.replace(
    /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const userEmail = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  const [formData, setFormData] = useState({
    vendoremail: "",
    useremail: "",
    name: "",
    feedback: "",
  });

  const postFeedback = async () => {
    const token = localStorage.getItem("token");
    //console.log(userEmail);  // Output: vendor@gmail.com

    try {
      const response = await fetch("http://localhost:4000/api/v1/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          ...formData,
          vendoremail: vendorEmail,
          useremail: userEmail,
        }),
      });

      if (response.ok) {
        console.log("Feedback data posted successfully!");
        // Handle success, e.g., redirect to another page
        alert("Submitted Successful");
        window.location.href = "view_business";
      } else {
        console.error("Error posting Feedback data:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting Feedback data:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    postFeedback();
  };

  return (
    <>
      <Navbar
        a1="Services"
        a2="Requests"
        a3="My profile"
        a1href="/view_business"
        a2href="/view_user_request"
        a3href="/user_profile"
      />
      <div>
        <div>
          <div className="page-content-wrapper">
            <div className="top-products-area py-3">
              <div className="container">
                <div className="section-heading d-flex align-items-center justify-content-between">
                  <h4>Post Feedback</h4>
                </div>
                {/* Form Scrip Start*/}
                <div className="profile-wrapper-area py-3">
                  <div className="card user-data-card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <div className="title mb-2">
                            <span>Name</span>
                          </div>
                          <input
                            className="form-control"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                          />
                        </div>

                        <div className="mb-3">
                          <div className="title mb-2">
                            <span>Feedback</span>
                          </div>
                          <input
                            className="form-control"
                            name="feedback"
                            id="feedback"
                            value={formData.feedback}
                            onChange={handleInputChange}
                            type="text"
                          />
                        </div>

                        <button className="btn btn-success w-100" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Form Scrip End*/}
              </div>
            </div>
          </div>

          <div className="footer-nav-area" id="footerNav">
            <div className="container h-100 px-0">
              <div className="suha-footer-nav h-100">
                <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                  <li className="active">
                    {" "}
                    <Link to="/user_home">
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
    </>
  );
};

export default PostFeedback;
