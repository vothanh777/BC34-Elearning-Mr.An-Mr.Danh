import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function CourseItem(props) {
  const { maKhoaHoc, tenKhoaHoc, hinhAnh, luotXem } = props.course;

  const [rating, setRating] = useState(3);

  const navigate = useNavigate();

  return (
    <div className="card p-2 mb-4">
      <img src={hinhAnh} alt="" style={{ width: "100%", height: 150 }} />
      <p className="lead font-weight-bold">{tenKhoaHoc}</p>
      <p className="lead" style={{ fontSize: "1rem" }}>
        <Rating initialValue={rating} /> ({luotXem})
      </p>
      <button
        className="btn btn-success"
        onClick={() => navigate(`/coursedetail/${maKhoaHoc}`)}
      >
        XEM CHI TIẾT
      </button>
    </div>
  );
}
