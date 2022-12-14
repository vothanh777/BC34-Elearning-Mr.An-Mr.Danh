import React from "react";
import CourseItem from "../CourseItems";

export default function CourseRendering(props) {
  const courseList = props.courseList;
  return (
    <div className="container pt-3" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="row">
        {courseList.map((course) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12" key={course.maKhoaHoc}>
              <CourseItem course={course} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
