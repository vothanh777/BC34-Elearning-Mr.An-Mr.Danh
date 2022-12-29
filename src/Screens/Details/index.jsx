import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import { getCourseDetail } from "../../Redux/Reducers/courseReducer";
import { courseSelector } from "../../Redux/Selectors/selectors";
import { getCourseDetailApi } from "../../Services/course";
import { Rating } from "react-simple-star-rating";
import RegisterButton from "../../Components/RegisterButton";

export default function CourseDetail() {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const courseDetail = useSelector(courseSelector).courseDetail;

  useEffect(() => {
    getCourseDetailApi(courseId)
      .then((res) => {
        dispatch(getCourseDetail(res.data));
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  const [rating, setRating] = useState(4);

  return (
    <>
      <Header />
      <section className="text-left">
        <div className="title">
          <img src={courseDetail.hinhAnh} alt={courseDetail.tenKhoaHoc} />
          <div className="titleContent">
            <h1 className="display-3">{courseDetail.tenKhoaHoc}</h1>
            <p className="ratings">
              Đánh giá khoá học
              <Rating initialValue={rating} />
            </p>
            <RegisterButton maKhoaHoc={courseId} />
          </div>
        </div>

        <div className="content container mt-3">
          <h3>Giới thiệu khoá học</h3>
          <p>{courseDetail.moTa}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            nihil eligendi suscipit sunt earum corporis repudiandae. Ut quaerat
            dolor reiciendis debitis perspiciatis voluptate, delectus amet
            asperiores facilis fugiat laudantium enim labore saepe, temporibus
            optio corporis ad. Possimus, cumque laudantium aut quae quas
            accusantium consequuntur, ex impedit ab ipsam reiciendis recusandae
            sint quia, perspiciatis suscipit unde. Corporis nam placeat debitis,
            labore omnis voluptatem, quisquam illo, eaque totam officia
            voluptate laborum. Magni, inventore, placeat possimus dolores, quas
            incidunt ipsum natus sunt enim voluptatem laudantium iusto eos
            deserunt! Voluptatibus et ipsam assumenda in nostrum vel mollitia
            sapiente obcaecati architecto at hic saepe rerum, temporibus eaque?
            Cupiditate eligendi, aspernatur sed adipisci laborum expedita at
            obcaecati consectetur, dicta et culpa, voluptate praesentium vitae
            nihil iste voluptatibus? Libero similique voluptatem, consectetur
            dicta voluptates incidunt quisquam earum pariatur amet id cupiditate
            illo aperiam impedit dolorem, voluptas non tempora odit minus
            laudantium ipsa optio, facilis dolor laboriosam sit. Exercitationem
            eum reprehenderit ad odio provident sapiente ea delectus pariatur,
            repudiandae nemo facilis commodi id nobis enim, earum quas molestias
            obcaecati sint asperiores quos accusantium, ipsa esse vero. Tenetur
            earum quos, voluptate debitis quisquam dolores sit amet autem. Nobis
            voluptate officia autem. Voluptatum eos nobis at possimus assumenda
            in quod.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
