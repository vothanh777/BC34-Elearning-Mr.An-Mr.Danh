import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseRendering from "../../Components/CoursesRendering";
import { getCoursesByCategoryApi } from "../../Services/course";
import { _paginate } from "../../Services/pagination";

export default function CourseCategories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("maDanhMuc");
  const groupId = searchParams.get("maNhom");

  const [courseListByCategory, setCourseListByCategory] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
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
    getCouseListAPage(page, courseListByCategory);
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
    getCoursesByCategoryApi(categoryId, groupId)
      .then((res) => {
        setCategoryName(res.data[0].danhMucKhoaHoc.tenDanhMucKhoaHoc);
        setCourseListByCategory(res.data);
        //pagination
        getCouseListAPage(1, res.data);
        setTotalCount(res.data.length);
        setTotalPages(Math.ceil(res.data.length / pageSize));
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
  }, [categoryId, groupId]);

  return (
    <>
      <section className="content">
        <h1 className="text-left bg-success">
          <p className="container text-light py-3">{categoryName}</p>
        </h1>
        <h3 className="container text-left">Các khoá học phổ biến</h3>
        {courseListAPage.length > 0 ? (
          <>
            <p className="container">{paginate()}</p>
            <CourseRendering courseList={courseListAPage} />
            <p className="container">{paginate()}</p>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
