import { Form, Formik, Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layouts/Header";
import { signIn } from "../../Redux/Reducers/userReducer";
import { userSelector } from "../../Redux/Selectors/selectors";
import { signInApi } from "../../Services/user";

export default function SignIn() {
  const dispatch = useDispatch();
  const userCredentials = useSelector(userSelector).userCredentials;

  return (
    <>
      <Header />
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
        }}
        onSubmit={(values) => {
          signInApi(values)
            .then((res) => {
              dispatch(signIn(res.data));
              localStorage.setItem("userCredentials", JSON.stringify(res.data));
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ handleChange }) => (
          <Form className="w-50 mx-auto mt-3 text-left">
            <h1 className="text-center">Đăng nhập</h1>
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
