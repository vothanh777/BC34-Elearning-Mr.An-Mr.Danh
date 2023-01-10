import axios from "axios";
import { CYBERSOFT_TOKEN, GROUP_ID } from "../Ultis/constants";

export const getCoursesApi = () => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCourseDetailApi = (courseId) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCourseCategoriesApi = () => {
  return axios({
    method: "GET",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesByCategoryApi = (categoryId) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryId}&MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesBySearchApi = (searchText) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${searchText}&MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesBySearchPaginationApi = (searchText, page, pageSize) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${searchText}&page=${page}&pageSize=${pageSize}&MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const registerCourseApi = (registerInfo) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc",
    data: registerInfo.info,
    headers: {
      Authorization: `Bearer ${registerInfo.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const removeRegisteredCourseApi = (registerInfo) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh",
    data: registerInfo.info,
    headers: {
      Authorization: `Bearer ${registerInfo.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const registerCourseForUserApi = (registerInfo) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
    data: registerInfo.info,
    headers: {
      Authorization: `Bearer ${registerInfo.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const deleteRegisteredCourseApi = (registerInfo) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh",
    data: registerInfo.info,
    headers: {
      Authorization: `Bearer ${registerInfo.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const deleteCourseApi = ({ accessToken, maKhoaHoc }) => {
  return axios({
    method: "DELETE",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const addCourseApi = (info) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc",
    data: info.data,
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const updateCoursesApi = (course) => {
  return axios({
    method: "PUT",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc",
    data: course,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};
