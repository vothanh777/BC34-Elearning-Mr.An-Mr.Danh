import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function CourseItem(props) {
  const { tenKhoaHoc, hinhAnh, luotXem } = props.course;

  const [rating, setRating] = useState(3);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="card p-2 mb-4">
      <img src={hinhAnh} alt="" style={{ width: "100%", height: 150 }} />
      <p className="lead font-weight-bold">{tenKhoaHoc}</p>
      <p className="lead">
        <Rating onClick={handleRating} initialValue={rating} /> ({luotXem})
      </p>
      <button className="btn btn-success">ĐĂNG KÝ</button>
    </div>
  );
}
