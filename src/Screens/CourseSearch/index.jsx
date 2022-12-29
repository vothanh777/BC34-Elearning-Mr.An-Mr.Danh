import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CoursesListing from "../../Components/CoursesListing";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCoursesBySearchPaginationApi } from "../../Services/course";
import { _paginate } from "../../Services/pagination";
import { GROUP_ID } from "../../Ultis/constants";

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

  const getCoursesBySearchPagination = (page) => {
    return getCoursesBySearchPaginationApi(keyword, GROUP_ID, page, pageSize);
  };

  //pagination
  const getCoursePageChange = (page) => {
    getCoursesBySearchPagination(page)
      .then((res) => setSearchCourseList(res.data.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCoursesBySearchPagination(1)
      .then((res) => {
        setSearchCourseList(res.data.items);
        setTotalCount(res.data.totalCount);
        setTotalPages(Math.ceil(res.data.totalCount / pageSize));
        setCurrentPage(1);
        setCount(1);
      })
      .catch((err) => {
        console.log(err);
        setSearchCourseList([]);
        setCurrentPage(1);
        setTotalCount(0);
        setCount(1);
      });
  }, [keyword]);

  //pagination
  const paginate = () =>
    _paginate(
      [count, setCount],
      totalCount,
      pageSize,
      totalPages,
      [currentPage, setCurrentPage],
      getCoursePageChange
    );

  return (
    <>
      <Header />
      <section className="container text-left my-3">
        <h3 className="my-3">
          Tìm thấy <span className="text-info">{totalCount}</span> khoá học{" "}
          <span className="text-info">"{keyword}"</span>
        </h3>
        {paginate()}
        <CoursesListing courseList={searchCourseList} />
        {paginate()}
      </section>
      <Footer />
    </>
  );
}
