import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import logo_admin from "../../Assets/Images/cyberlogo-admin.jpg";
import { getLocal, removeLocal } from "../../Ultis/config";
import { useDispatch } from "react-redux";
import { signIn } from "../../Redux/Reducers/userReducer";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState(
    getLocal("userCredentials")
  );

  const handleClick = () => {
    document.getElementById("sidebarMenu").classList.remove("show");
  };
  const handleSignOut = () => {
    removeLocal("userCredentials");
    dispatch(signIn(null));
    setUserCredentials(null);
    navigate("/");
  };
  return (
    <>
      {userCredentials ? (
        <div className="adminLayout">
          <div>
            {/*Main Navigation*/}
            <header>
              {/* Sidebar */}
              <nav
                id="sidebarMenu"
                className="collapse d-lg-block sidebar collapse bg-white"
              >
                <div className="position-sticky">
                  <div className="list-group list-group-flush mx-3 mt-4">
                    <div
                      className="text-light dropdown adminInfo-sidebar"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fa fa-user-circle mr-2 h3"
                        style={{ color: "#343a40" }}
                      ></i>
                      <a
                        style={{ color: "#343a40" }}
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <span className="h6">{userCredentials.hoTen}</span>
                      </a>
                      <div className="dropdown-menu p-0">
                        <NavLink
                          className="dropdown-item bg-light userInfo"
                          to="/userinfo"
                        >
                          Thông tin tài khoản
                        </NavLink>
                        <a
                          className="dropdown-item bg-light userInfo"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                    <Link
                      className="py-2 "
                      to="/admin/usermanagement"
                      onClick={handleClick}
                    >
                      <span>Quản lý người dùng</span>
                    </Link>
                    <Link
                      className="py-2"
                      to="/admin/coursemanagement"
                      onClick={handleClick}
                    >
                      <span>Quản lý khoá học</span>
                    </Link>
                  </div>
                </div>
              </nav>
              {/* Sidebar */}
              {/* Navbar */}
              <nav
                id="main-navbar"
                className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
              >
                {/* Container wrapper */}
                <div className="container-fluid">
                  {/* Toggle button */}
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="fas fa-bars" />
                  </button>
                  {/* Brand */}
                  <Link className="navbar-brand" to="/">
                    <img
                      src={logo_admin}
                      height={50}
                      alt="Cybersoft Logo"
                      loading="lazy"
                    />
                    <span style={{ fontWeight: "bold" }}>Dashboard</span>
                  </Link>
                  {/* Right links */}
                  {/* <ul className="navbar-nav ms-auto d-flex flex-row"> */}
                  {/* Avatar */}
                  <div
                    className="text-light dropdown adminInfo"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      style={{ color: "#343a40" }}
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-user-circle mr-2 h3"></i>
                      <span className="h6">{userCredentials.hoTen}</span>
                    </a>
                    <div className="dropdown-menu p-0">
                      <NavLink
                        className="dropdown-item bg-light userInfo"
                        to="/userinfo"
                      >
                        Thông tin tài khoản
                      </NavLink>
                      <a
                        className="dropdown-item bg-light userInfo"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                  {/* </ul> */}
                </div>
                {/* Container wrapper */}
              </nav>
              {/* Navbar */}
            </header>
            {/*Main Navigation*/}
            {/*Main layout*/}
            <main style={{ marginTop: 76 }}>
              <Outlet />
            </main>
            {/*Main layout*/}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
