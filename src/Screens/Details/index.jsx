import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layouts/Header";
import { getCourseDetail } from "../../Redux/Reducers/courseReducer";
import { courseSelector } from "../../Redux/Selectors/selectors";
import { getCourseDetailApi } from "../../Services/course";

export default function CourseDetail() {
  const dispatch = useDispatch();
  const courseDetail = useSelector(courseSelector).courseDetail;

  useEffect(() => {
    getCourseDetailApi("ITEC2108")
      .then((res) => {
        dispatch(getCourseDetail(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <img src={courseDetail.hinhAnh} alt="" />
      <h3>{courseDetail.tenKhoaHoc}</h3>
    </>
  );
}
