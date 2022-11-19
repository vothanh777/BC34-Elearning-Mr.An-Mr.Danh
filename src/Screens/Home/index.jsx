import axios from "axios";
import React, { useEffect } from "react";
import CourseItem from "../../Components/CourseItems";

export default function HomeScreen() {
  const getCourses = () => {
    axios({
      method: "GET",
      url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",

      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getCourses, []);
  return (
    <>
      <h1 className="display-4">Danh sách khoá học</h1>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <CourseItem />
          </div>
        </div>
      </div>
    </>
  );
}
