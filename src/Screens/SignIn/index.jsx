import { Form, Formik, Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Redux/Reducers/userReducer";
import { signInApi } from "../../Services/user";
import { saveLocal } from "../../Ultis/config";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
        }}
        onSubmit={(values) => {
          signInApi(values)
            .then((res) => {
              dispatch(signIn(res.data));
              saveLocal("userCredentials", res.data);
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data);
            });
        }}
      >
        {({ handleChange }) => (
          <Form className="w-50 mx-auto mt-3 text-left">
            <h2 className="text-center">Đăng nhập</h2>
            <div className="form-group">
              <label>Tài khoản</label>
              <Field
                name="taiKhoan"
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <Field
                name="matKhau"
                type="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-success">Đăng nhập</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
