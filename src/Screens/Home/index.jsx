import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../Components/Carousel";
import CourseItem from "../../Components/CourseItems";
import CourseRendering from "../../Components/CoursesRendering";
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

  const renderCourses = (courseQuantities) => {
    let courses = [];
    if (courseList.length) {
      for (let index = 0; index < courseQuantities; index++) {
        courses.push(courseList[index]);
      }
    }

    return <CourseRendering courseList={courses} />;
  };

  return (
    <>
      <Carousel />
      <section className="content mt-4">
        <h3 className="container text-left">Các khoá học mới nhất</h3>

        {renderCourses(8)}
      </section>
    </>
  );
}
