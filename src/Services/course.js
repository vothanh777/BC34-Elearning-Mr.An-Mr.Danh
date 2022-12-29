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

export const getCoursesByCategoryApi = (categoryId, groupId) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryId}&MaNhom=${groupId}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesBySearchApi = (searchText, groupId) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${searchText}&MaNhom=${groupId}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesBySearchPaginationApi = (
  searchText,
  groupId,
  page,
  pageSize
) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${searchText}&page=${page}&pageSize=${pageSize}&MaNhom=${groupId}`,
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
