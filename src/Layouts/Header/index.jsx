import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../Assets/Images/cyberlogo-white.png";
import { getCourseCategories } from "../../Redux/Reducers/courseReducer";
import { courseSelector } from "../../Redux/Selectors/selectors";
import { getCourseCategoriesApi } from "../../Services/course";
import "./style.css";
import { Formik, Form, Field } from "formik";
import { GROUP_ID } from "../../Ultis/constants";

export default function Header() {
  const dispatch = useDispatch();
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
              <div className="dropdown-menu bg-dark text-light p-0">
                {courseCategories.map((category, index) => {
                  return (
                    <NavLink
                      key={index}
                      className="dropdown-item"
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
                    console.log("onchange:", e.currentTarget.value);
                    props.handleChange(e);
                  }}
                />
              </Form>
            )}
          </Formik>

          <div className="ml-xl-3">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
