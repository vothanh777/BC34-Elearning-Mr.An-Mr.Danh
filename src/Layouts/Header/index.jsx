import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/Images/cyberlogo-white.png";
import "./style.css";

export default function Header() {
  return (
    <header>
      <nav className="px-xl-5 navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" style={{ height: 50 }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse ml-xl-5"
          id="navbarTogglerDemo02"
        >
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Trang chủ <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Danh mục khoá học
              </a>
            </li>
          </ul>
          <form className="my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 courseSearch"
              type="search"
              placeholder="Tìm khoá học"
            />
          </form>
          <div className="ml-xl-3">
            <a className="btn btn-light btn-outline-primary my-2 my-sm-0 mx-1">
              Đăng nhập
            </a>
            <a className="btn btn-light btn-outline-primary my-2 my-sm-0">
              Đăng ký
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
