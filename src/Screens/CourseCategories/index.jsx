import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseRendering from "../../Components/CoursesRendering";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCoursesByCategoryApi } from "../../Services/course";

export default function CourseCategories() {
  // remove BS4 active class
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("maDanhMuc");
  const groupId = searchParams.get("maNhom");

  const [courseListByCategory, setCourseListByCategory] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getCoursesByCategoryApi(categoryId, groupId)
      .then((res) => {
        setCategoryName(res.data[0].danhMucKhoaHoc.tenDanhMucKhoaHoc);
        setCourseListByCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, [categoryId, groupId]);

  return (
    <>
      <Header categoryId={categoryId} />
      <section className="content">
        <h1 className="text-left bg-success">
          <p className="container text-light py-3">{categoryName}</p>
        </h1>
        <h3 className="container text-left">Các khoá học phổ biến</h3>
        <CourseRendering courseList={courseListByCategory} />
      </section>
      <Footer />
    </>
  );
}
