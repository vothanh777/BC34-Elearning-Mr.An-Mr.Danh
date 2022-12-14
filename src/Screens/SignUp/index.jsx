import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpApi, signUpUserSchema } from "../../Services/user";
import Header from "../../Layouts/Header";
import { GROUP_ID } from "../../Ultis/constants";
import Footer from "../../Layouts/Footer";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="w-50 mx-auto my-3">
        <h1>Đăng ký</h1>
        <Formik
          initialValues={{
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            maNhom: GROUP_ID,
            email: "",
          }}
          validationSchema={signUpUserSchema}
          onSubmit={(value) => {
            signUpApi(value)
              .then(() => navigate("/signin"))
              .catch((err) => console.log(err));
          }}
        >
          {(props) => (
            <Form className="text-left">
              <div className="form-group">
                <label>Tài khoản</label>
                <Field
                  type="text"
                  className="form-control"
                  name="taiKhoan"
                  onChange={props.handleChange}
                />
                <ErrorMessage name="taiKhoan">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <Field
                  type="password"
                  className="form-control"
                  name="matKhau"
                  onChange={props.handleChange}
                />
                <ErrorMessage name="matKhau">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Họ tên</label>
                <Field
                  type="text"
                  className="form-control"
                  name="hoTen"
                  onChange={props.handleChange}
                />
                <ErrorMessage name="hoTen">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Email</label>
                <Field
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={props.handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <Field
                  type="text"
                  className="form-control"
                  name="soDT"
                  onChange={props.handleChange}
                />
                <ErrorMessage name="soDT">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label>Mã nhóm</label>
                <Field
                  component="select"
                  className="form-control"
                  name="maNhom"
                  onChange={props.handleChange}
                >
                  <option value="GP01">GP01</option>
                  <option value="GP02">GP02</option>
                  <option value="GP03">GP03</option>
                  <option value="GP04">GP04</option>
                  <option value="GP05">GP05</option>
                  <option value="GP06">GP06</option>
                  <option value="GP07">GP07</option>
                  <option value="GP08">GP08</option>
                  <option value="GP09">GP09</option>
                  <option value="GP10">GP10</option>
                </Field>
              </div>
              <div className="text-center">
                <button className="btn btn-success">Đăng ký</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}
