import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCoursesBySearchPaginationApi } from "../../Services/course";
import { GROUP_ID } from "../../Ultis/constants";
import Pagination from "../../Components/Pagination";

export default function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);

  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  const [searchCourseList, setSearchCourseList] = useState([]);

  const getCoursesBySearchPagination = (page = currentPage) => {
    return getCoursesBySearchPaginationApi(keyword, GROUP_ID, page, pageSize);
  };

  const getCoursePageChange = (page) => {
    getCoursesBySearchPagination(page)
      .then((res) => setSearchCourseList(res.data.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCoursesBySearchPagination()
      .then((res) => {
        setSearchCourseList(res.data.items);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
        setSearchCourseList([]);
        setTotalCount(0);
      });
  }, [keyword]);

  //pagination
  const prevPage = () => {
    const currentPg = currentPage === 1 ? 1 : currentPage - 1;
    getCoursePageChange(currentPg);
    setCurrentPage(currentPg);

    const _count = pageSize * (currentPg - 1) + 1;
    setCount(_count);
  };

  const nextPage = () => {
    const currentPg = currentPage < totalPages ? currentPage + 1 : currentPage;
    getCoursePageChange(currentPg);
    setCurrentPage(currentPg);

    const _count = pageSize * (currentPg - 1) + 1;
    setCount(_count);
  };

  const renderPagination = () => {
    return (
      <div
        className="text-right"
        style={{ display: totalCount === 0 ? "none" : "block" }}
      >
        <span className="text-info">
          {count}-
          {count + pageSize - 1 > totalCount
            ? totalCount
            : count + pageSize - 1}{" "}
          trong số {totalCount}
        </span>
        <button
          onClick={prevPage}
          className="btn btn-light text-dark"
          style={{ borderRadius: "50%" }}
          disabled={currentPage === 1 ? "disabled" : ""}
        >
          <i className="fa fa-angle-left"></i>
        </button>
        <button
          onClick={nextPage}
          className="btn btn-light text-dark"
          style={{ borderRadius: "50%" }}
          disabled={currentPage === totalPages ? "disabled" : ""}
        >
          <i className="fa fa-angle-right"></i>
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <section className="container text-left my-3">
        <h3 className="my-3">
          Tìm thấy <span className="text-info">{totalCount}</span> khoá học{" "}
          <span className="text-info">"{keyword}"</span>
        </h3>
        {renderPagination()}
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
        {renderPagination()}
      </section>
      <Footer />
    </>
  );
}
