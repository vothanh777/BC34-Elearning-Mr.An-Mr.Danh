import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../Components/Carousel";
import CourseItem from "../../Components/CourseItems";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCourses } from "../../Redux/Reducers/courseReducer";
import { courseSelector } from "../../Redux/Selectors/selectors";
import { getCoursesApi } from "../../Services/course";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const courseList = useSelector(courseSelector).courses;

  useEffect(() => {
    getCoursesApi()
      .then((res) => {
        dispatch(getCourses(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderCourse = (courseQuantities) => {
    let courses = [];
    if (courseList.length) {
      for (let index = 0; index < courseQuantities; index++) {
        courses.push(courseList[index]);
      }
    }

    return courses.map((course) => {
      return (
        <div className="col-3" key={course.maKhoaHoc}>
          <CourseItem course={course} />
        </div>
      );
    });
  };

  return (
    <div>
      <Header />
      <Carousel />
      <h1 className="display-4">Danh sách khoá học</h1>
      <div className="container">
        <div className="row">{renderCourse(8)}</div>
      </div>
      <Footer />
    </div>
  );
}
