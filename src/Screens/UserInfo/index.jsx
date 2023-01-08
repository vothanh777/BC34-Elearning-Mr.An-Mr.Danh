import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { userSelector } from "../../Redux/Selectors/selectors";
import { getAccountInfoApi, updateUserInfoApi } from "../../Services/user";
import { getLocal } from "../../Ultis/config";
import { Formik, Form, Field } from "formik";
import CoursesListing from "../../Components/CoursesListing";
import { _paginate } from "../../Services/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../Redux/Reducers/userReducer";

let registeredCourses = [];
const isCancel = true;
export default function UserInfo() {
  useEffect(() => {
    document.getElementById("myCoursesNav").classList.remove("active");
    document.getElementById("myInfo").classList.add("active");
  }, []);
  const dispatch = useDispatch();

  const userCredentials = getLocal("userCredentials");
  const [userInfo, setUserInfo] = useState({});
  const [eye, setEye] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(0);

  //myCourses
  const [myCourses, setMyCourses] = useState([]);
  const myArr = useSelector(userSelector).myCourses;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const [courseListAPage, setCourseListAPage] = useState([]);

  const getCouseListAPage = (page, list) => {
    let arr = [];
    for (let i = pageSize * (page - 1); i < pageSize * page; i++) {
      if (list[i]) {
        arr.push(list[i]);
      } else {
        break;
      }
    }
    setCourseListAPage(arr);
  };

  const getCoursePageChange = (page) => {
    getCouseListAPage(page, myCourses);
  };

  const paginate = () =>
    _paginate(
      [count, setCount],
      totalCount,
      pageSize,
      totalPages,
      [currentPage, setCurrentPage],
      getCoursePageChange
    );
  // end pagination

  useEffect(() => {
    getAccountInfoApi(userCredentials)
      .then((res) => {
        setUserInfo(res.data);
        setMyCourses(res.data.chiTietKhoaHocGhiDanh);
        //dispatch myCourses to reducer
        dispatch(getMyCourses(res.data.chiTietKhoaHocGhiDanh));

        registeredCourses = [...res.data.chiTietKhoaHocGhiDanh];

        //pagination
        getCouseListAPage(1, res.data.chiTietKhoaHocGhiDanh);
        setTotalCount(res.data.chiTietKhoaHocGhiDanh.length);
        setTotalPages(
          Math.ceil(res.data.chiTietKhoaHocGhiDanh.length / pageSize)
        );
        setCurrentPage(1);
        setCount(1);
      })
      .catch((err) => {
        console.log(err);
        //pagination
        setCurrentPage(1);
        setTotalCount(0);
        setCount(1);
      });
  }, [userCredentials.taiKhoan, myArr.length]);

  const switchActive = (idOn, idOff) => {
    if (!document.getElementById(idOn).classList.contains("active")) {
      document.getElementById(idOn).classList.add("active");
      document.getElementById(idOn).classList.remove("fade");
    }
    document.getElementById(idOff).classList.remove("active");
    document.getElementById(idOff).classList.add("fade");
  };

  const renderPassword = () => {
    let str = "";
    for (let index = 0; index < userInfo.matKhau.length; index++) {
      str += "*";
    }
    return str;
  };

  return (
    <>
      <section
        className="container"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Nav tabs */}
        <ul className="nav nav-tabs">
          <li
            className="nav-item"
            onClick={() => switchActive("myInfo", "myCourses")}
          >
            <NavLink
              id="myInfoNav"
              className="nav-link myInfo"
              data-toggle="tab"
              to="#myInfo"
            >
              Thông tin cá nhân
            </NavLink>
          </li>
          <li
            className="nav-item"
            onClick={() => switchActive("myCourses", "myInfo")}
          >
            <NavLink
              id="myCoursesNav"
              className="nav-link myCourses"
              data-toggle="tab"
              to="#myCourses"
            >
              Khoá học của tôi
            </NavLink>
          </li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content text-left py-3">
          <div className="tab-pane container" id="myInfo">
            {userInfo.taiKhoan ? (
              <Formik
                initialValues={userInfo}
                onSubmit={(value) => {
                  setUserInfo(value);
                  const {
                    taiKhoan,
                    matKhau,
                    hoTen,
                    soDT,
                    maLoaiNguoiDung,
                    maNhom,
                    email,
                  } = value;
                  const updatedUser = {
                    accessToken: userCredentials.accessToken,
                    info: {
                      taiKhoan,
                      matKhau,
                      hoTen,
                      soDT,
                      maLoaiNguoiDung,
                      maNhom,
                      email,
                    },
                  };
                  updateUserInfoApi(updatedUser)
                    .then((res) => setUpdateStatus(1))
                    .catch((err) => {
                      console.log(err);
                      setUpdateStatus(-1);
                    });
                }}
              >
                {({ values, handleSubmit, handleChange, resetForm }) => (
                  <Form className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-3">Email:</label>
                        <div className="col-9">{userInfo.email}</div>
                      </div>
                      <div className="form-group row">
                        <label className="col-3">Họ tên: </label>
                        <div className="col-9">
                          {isUpdate ? (
                            <Field
                              name="hoTen"
                              className="form-control"
                              type="text"
                              value={values.hoTen}
                            />
                          ) : (
                            userInfo.hoTen
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-3">Số điện thoại: </label>
                        <div className="col-9">
                          {isUpdate ? (
                            <Field
                              name="soDT"
                              className="form-control"
                              type="text"
                              value={values.soDT}
                            />
                          ) : (
                            userInfo.soDT
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-3">Tài khoản: </label>
                        <div className="col-9">{userInfo.taiKhoan}</div>
                      </div>
                      <div className="form-group row">
                        <label className="col-3">Mật khẩu: </label>
                        <div className="col-9">
                          {isUpdate ? (
                            <Field
                              name="matKhau"
                              className="form-control"
                              type="text"
                              value={values.matKhau}
                              onChange={handleChange}
                            />
                          ) : userInfo.matKhau && !eye ? (
                            <span>
                              {renderPassword()}{" "}
                              <i
                                onClick={() => setEye(true)}
                                className="fa fa-eye"
                              ></i>
                            </span>
                          ) : (
                            <span>
                              {userInfo.matKhau}{" "}
                              <i
                                onClick={() => setEye(false)}
                                className="fa fa-eye-slash"
                              ></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-center col-12">
                      {updateStatus === 0 ? (
                        ""
                      ) : (
                        <>
                          {updateStatus === 1 ? (
                            <p className="text-success">
                              <i className="fa fa-check"></i>
                              <span style={{ fontSize: 14, marginLeft: 5 }}>
                                Cập nhật thành công!
                              </span>
                            </p>
                          ) : (
                            <p className="text-danger">
                              <i className="fa fa-times"></i>
                              <span style={{ fontSize: 14, marginLeft: 5 }}>
                                Cập nhật thành công!
                              </span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <p className="text-center col-12">
                      {isUpdate ? (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              handleSubmit();
                              setTimeout(() => {
                                setUpdateStatus(0);
                                setIsUpdate(false);
                              }, 1000);
                            }}
                          >
                            Hoàn tất
                          </button>
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => {
                              setIsUpdate(false);
                              resetForm({
                                values: {
                                  ...userInfo,
                                  hoTen: userInfo.hoTen,
                                  soDT: userInfo.soDT,
                                  matKhau: userInfo.matKhau,
                                },
                              });
                            }}
                          >
                            Huỷ
                          </button>
                        </>
                      ) : (
                        <a
                          className="btn btn-primary"
                          onClick={() => {
                            setIsUpdate(true);
                            setUpdateStatus(0);
                          }}
                        >
                          Cập nhật
                        </a>
                      )}
                    </p>
                  </Form>
                )}
              </Formik>
            ) : (
              ""
            )}
          </div>
          <div className="tab-pane container fade" id="myCourses">
            <h3>Các khoá học đã ghi danh</h3>
            <p style={{ maxWidth: "30%", marginLeft: "auto" }}>
              <Formik initialValues={{ searchText: "" }}>
                {({ values, handleChange }) => (
                  <Form>
                    <Field
                      className="form-control"
                      type="search"
                      placeholder="Tìm khoá học"
                      name="searchText"
                      value={values.searchText}
                      onChange={(e) => {
                        handleChange(e);
                        const myCoursesFilter = registeredCourses.filter(
                          (course) =>
                            course.tenKhoaHoc
                              .toLowerCase()
                              .search(e.target.value.toLowerCase()) > -1
                        );
                        setMyCourses(myCoursesFilter);

                        //pagination
                        getCouseListAPage(1, myCoursesFilter);
                        setTotalCount(myCoursesFilter.length);
                        setTotalPages(
                          Math.ceil(myCoursesFilter.length / pageSize)
                        );
                        setCurrentPage(1);
                        setCount(1);
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </p>
            {courseListAPage.length > 0 ? (
              <>
                <p>{paginate()}</p>
                <CoursesListing
                  courseList={courseListAPage}
                  isCancel={isCancel}
                />
                <p>{paginate()}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}
