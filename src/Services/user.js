import axios from "axios";
import * as yup from "yup";
import { CYBERSOFT_TOKEN, GROUP_ID } from "../Ultis/constants";

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
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const signInApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
    data: user,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getAccountInfoApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
    data: user.taiKhoan,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const updateUserInfoApi = (user) => {
  return axios({
    method: "PUT",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    data: user.info,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getUsersApi = (keyword = "") => {
  let _url = `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}`;
  _url = keyword == "" ? _url : `${_url}&tuKhoa=${keyword}`;
  return axios({
    method: "GET",
    url: _url,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const addUserApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
    data: user.info,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const deleteUserApi = (user) => {
  return axios({
    method: "DELETE",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user.taiKhoan}`,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const updateUserApi = (user) => {
  return axios({
    method: "PUT",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    data: user.info,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getUnregisteredCoursesApi = (user) => {
  return axios({
    method: "POST",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${user.taiKhoan}`,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getUnauthorizedCoursesApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
    data: user.info,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getRegisteredCoursesApi = (user) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
    data: user.info,
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};
