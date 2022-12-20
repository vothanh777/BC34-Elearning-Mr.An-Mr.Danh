import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../Assets/Images/cyberlogo-white.png";
import { getCourseCategories } from "../../Redux/Reducers/courseReducer";
import { signIn } from "../../Redux/Reducers/userReducer";
import { courseSelector, userSelector } from "../../Redux/Selectors/selectors";
import { getCourseCategoriesApi } from "../../Services/course";
import "./style.css";
import { Formik, Form, Field } from "formik";
import { GROUP_ID } from "../../Ultis/constants";
import { getLocal, removeLocal } from "../../Ultis/config";
import { useState } from "react";

export default function Header(props) {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState(null);

  const userLogin = useSelector(userSelector).userCredentials;
  useEffect(() => {
    if (userLogin) {
      setUserCredentials(userLogin);
    }
  }, [userLogin]);

  const courseCategories = useSelector(courseSelector).courseCategories;

  useEffect(() => {
    getCourseCategoriesApi()
      .then((res) => dispatch(getCourseCategories(res.data)))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  return (
    <header>
      <nav className="px-xl-5 navbar navbar-expand-lg navbar-light bg-dark">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ height: 50 }} />
        </NavLink>
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
              <NavLink className="nav-link" to="/">
                Trang chủ <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Danh mục khoá học
              </a>
              <div className="dropdown-menu p-0">
                {courseCategories.map((category, index) => {
                  return (
                    <NavLink
                      key={index}
                      className={
                        props.categoryId == category.maDanhMuc
                          ? "dropdown-item bg-primary"
                          : "dropdown-item"
                      }
                      to={`/courseCategories?maDanhMuc=${category.maDanhMuc}&maNhom=${GROUP_ID}`}
                    >
                      {category.tenDanhMuc}
                    </NavLink>
                  );
                })}
              </div>
            </li>
          </ul>
          <Formik
            initialValues={{ searchText: keyword }}
            onSubmit={({ searchText }) => {
              navigate(`/coursesearch?tenkhoahoc=${searchText}`);
            }}
          >
            {(props) => (
              <Form className="my-2 my-lg-0">
                <Field
                  className="form-control mr-sm-2 courseSearch"
                  type="search"
                  placeholder="Tìm khoá học"
                  name="searchText"
                  value={props.values.searchText}
                  onChange={(e) => {
                    props.handleChange(e);
                  }}
                />
              </Form>
            )}
          </Formik>

          <div className="ml-xl-3">
            {userCredentials ? (
              <div
                className="text-light dropdown"
                style={{ cursor: "pointer" }}
              >
                <a className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-user-circle mr-2 h3"></i>
                  <span className="h6">{userCredentials.hoTen}</span>
                </a>
                <div className="dropdown-menu p-0">
                  <a
                    className="dropdown-item bg-light"
                    onClick={() => {
                      removeLocal("userCredentials");
                      dispatch(signIn(null));
                      setUserCredentials(null);
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  className="btn btn-light btn-outline-primary my-2 my-sm-0 mx-1"
                  to="/signin"
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  className="btn btn-light btn-outline-primary my-2 my-sm-0"
                  to="/signup"
                >
                  Đăng ký
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
