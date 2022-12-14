import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCoursesBySearchApi } from "../../Services/course";
import { GROUP_ID } from "../../Ultis/constants";

export default function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  const [searchCourseList, setSearchCourseList] = useState([]);

  useEffect(() => {
    getCoursesBySearchApi(keyword, GROUP_ID)
      .then((res) => setSearchCourseList(res.data))
      .catch((err) => console.log(err));
  }, [keyword]);

  return (
    <>
      <Header />
      <section className="container text-left my-3">
        <h3 className="my-3">
          Tìm thấy <span className="text-info">{searchCourseList.length}</span>{" "}
          khoá học <span className="text-info">"{keyword}"</span>
        </h3>
        <div className="row">
          {searchCourseList.map((course, index) => {
            return (
              <div
                className="col-12 py-2 mb-4"
                key={index}
                style={{
                  borderTop: "1px solid black",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div className="row">
                  <div className="col-3">
                    <img
                      style={{ height: 150 }}
                      src={course.hinhAnh}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-9">
                    <h1>
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "black",
                          cursor: "pointer",
                        }}
                        to={`/coursedetail/${course.maKhoaHoc}`}
                      >
                        {course.tenKhoaHoc}
                      </NavLink>
                    </h1>
                    <p>{course.moTa}</p>
                    <div className="text-right">
                      {course.soLuongHocVien} học viên
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
