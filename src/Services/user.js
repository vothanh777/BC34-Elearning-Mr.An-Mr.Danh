import axios from "axios";
import * as yup from "yup";

export const signUpUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản!"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu!"),
  hoTen: yup.string().required("Vui lòng nhập họ tên!"),
  email: yup
    .string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  soDT: yup
    .string()
    .required("Vui lòng nhập số điện thoại!")
    .matches(/^[0-9]+$/, "Vui lòng nhập ký tự số!"),
});

export const signUpApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
    data: user,
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
};

export const signInApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
    data: user,
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
};
