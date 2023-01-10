import {
  Button,
  Input,
  Modal,
  Select,
  Form,
  Row,
  Col,
  Table,
  Space,
  DatePicker,
  Upload,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Field, Form as Form_ik, Formik } from "formik";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addCourseApi,
  deleteCourseApi,
  getCourseCategoriesApi,
  getCoursesApi,
  getCoursesBySearchApi,
  registerCourseForUserApi,
  removeRegisteredCourseApi,
  updateCoursesApi,
} from "../../Services/course";
import {
  getUnauthorizedUsersApi,
  getUnregisteredUsersApi,
  getUsersOnCourseApi,
} from "../../Services/user";

import { getLocal } from "../../Ultis/config";
import { GROUP_ID } from "../../Ultis/constants";
import TextArea from "antd/es/input/TextArea";

const { accessToken, hoTen, taiKhoan } = getLocal("userCredentials");
export default function CourseManagement() {
  const [courseList, setCourseList] = useState([]);

  const [userID, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  console.log(userID);

  const [isAdd, setIsAdd] = useState(true);
  // Modal
  const [open, setOpen] = useState(false);
  const [openGD, setOpenGD] = useState(false);
  // Form antd
  const { Option } = Select;
  const [form] = Form.useForm();
  const form1 = { ...form };

  const layout = {
    col: {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
    },
    formItem: {
      labelCol: {
        xs: 4,
        sm: 4,
        md: 4,
        lg: 7,
        xl: 7,
      },
      wrapperCol: {
        xs: 20,
        sm: 20,
        md: 20,
        lg: 17,
        xl: 17,
      },
    },
  };
  const layoutGD = {
    col: {
      xs: 8,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 4,
    },
    col1: {
      xs: 16,
      sm: 18,
      md: 20,
      lg: 20,
      xl: 20,
    },
  };
  // End Form antd

  //Form antd Select Chọn khoá học
  const [unregistedUsers, setUnregistedUsers] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseCategories, setCourseCategories] = useState([]);

  // Talble antd
  const courseColumns = [
    {
      title: "STT",
      dataIndex: "soTT",
    },
    {
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
    },
    {
      title: "Hình ảnh",
      // dataIndex: "hinhAnh",
      render: ({ hinhAnh, tenKhoaHoc }) => {
        return <img height={50} src={hinhAnh} alt={tenKhoaHoc} />;
      },
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
    },
    {
      title: "Thao tác",
      render: ({
        maKhoaHoc,
        tenKhoaHoc,
        luotXem,
        danhGia,
        hinhAnh,
        danhMucKhoaHoc,
        ngayTao,
        nguoiTao,
        taiKhoanNguoiTao,
        moTa,
      }) => (
        <Space size="middle">
          <Button
            className="btn-success"
            onClick={async () => {
              setOpenGD(true);
              setCourseId(maKhoaHoc);
              form1.resetFields();
              getUserOptions({ accessToken, info: { maKhoaHoc } });
              getUnauthorizedUsers(maKhoaHoc);
              getUsersOnCourse(maKhoaHoc);
            }}
          >
            Ghi danh
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setIsAdd(false);
              setOpen(true);
              setUserId(nguoiTao);
              setUserName(taiKhoanNguoiTao);

              form.setFieldsValue({
                maKhoaHoc,
                tenKhoaHoc,
                hinhAnh,
                danhGia,
                luotXem,
                maDanhMucKhoaHoc: danhMucKhoaHoc.maDanhMucKhoaHoc,
                ngayTao: moment(ngayTao, "DD/MM/YYYY"),
                taiKhoanNguoiTao,
                moTa,
              });
            }}
          >
            Sửa
          </Button>
          <Button
            className="btn-danger"
            onClick={async () => {
              await deleteCourseApi({ accessToken, maKhoaHoc });
              getCourses();
            }}
          >
            <i className="fa fa-times"></i>
          </Button>
        </Space>
      ),
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "soTT",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      render: ({ taiKhoan }) => (
        <Space size="middle">
          <Button
            className="btn-success"
            onClick={async () => {
              await registerUserForCourse(taiKhoan);
              await getUnauthorizedUsers(courseId);
            }}
          >
            Xác nhận
          </Button>
          <Button
            className="btn-danger"
            onClick={async () => {
              await deleteRegisteredCourse(taiKhoan);
              await getUnauthorizedUsers(courseId);
            }}
          >
            Huỷ
          </Button>
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: "STT",
      dataIndex: "soTT",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      render: ({ taiKhoan }) => (
        <Space size="middle">
          <Button
            className="btn-danger"
            onClick={async () => {
              await deleteRegisteredCourse(taiKhoan);
              await getUsersOnCourse(courseId);
            }}
          >
            Huỷ
          </Button>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  // End Talble antd

  // Upload antd
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-1);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: "https://elearningnew.cybersoft.edu.vn/hinhanh/",
    onChange: handleChange,
    multiple: false,
  };
  //End Upload antd

  // End Modal

  const getCourses = (keyword = "") => {
    const courseListApi =
      keyword == "" ? getCoursesApi() : getCoursesBySearchApi(keyword);
    courseListApi
      .then((res) => {
        console.log(res.data);
        const arr = res.data.map((item, index) => {
          return {
            ...item,
            nguoiTao: item.nguoiTao.hoTen,
            taiKhoanNguoiTao: item.taiKhoan,
            soTT: index + 1,
          };
        });
        setCourseList(arr);
      })
      .catch((err) => {
        console.log(err);
        setCourseList([]);
      });
  };

  const getUserOptions = (info) => {
    getUnregisteredUsersApi(info)
      .then((res) => {
        const userOptions = res.data.map((item) => {
          return {
            value: item.taiKhoan,
            label: item.hoTen,
          };
        });
        setUnregistedUsers(userOptions);
      })
      .catch((err) => console.log(err));
  };

  const getCategoryOptions = () => {
    getCourseCategoriesApi()
      .then((res) => {
        const categoryOptions = res.data.map((item) => {
          return {
            value: item.maDanhMuc,
            label: item.tenDanhMuc,
          };
        });
        setCourseCategories(categoryOptions);
      })
      .catch((err) => console.log(err));
  };

  const registerUserForCourse = async (taiKhoan) => {
    try {
      const registerInfo = {
        accessToken,
        info: {
          maKhoaHoc: courseId,
          taiKhoan,
        },
      };
      await registerCourseForUserApi(registerInfo);
      //refresh select options
      getUserOptions({ accessToken, info: { maKhoaHoc: courseId } });
      form1.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const getUnauthorizedUsers = async (_maKhoaHoc) => {
    try {
      const info = {
        accessToken,
        info: {
          maKhoaHoc: _maKhoaHoc,
        },
      };
      const unauthorizedUsersApi = await getUnauthorizedUsersApi(info);
      setData(
        unauthorizedUsersApi.data.map((item, index) => {
          return {
            soTT: index + 1,
            taiKhoan: item.taiKhoan,
            hoTen: item.hoTen,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegisteredCourse = async (taiKhoan) => {
    try {
      const registerInfo = {
        accessToken,
        info: {
          maKhoaHoc: courseId,
          taiKhoan,
        },
      };
      await removeRegisteredCourseApi(registerInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersOnCourse = async (maKhoaHoc) => {
    try {
      const usersApi = await getUsersOnCourseApi({
        accessToken,
        info: { maKhoaHoc },
      });

      setData1(
        usersApi.data.map((item, index) => {
          return {
            soTT: index + 1,
            taiKhoan: item.taiKhoan,
            hoTen: item.hoTen,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(getCourses, []);

  const getCoursesOnSearch = (value) => {
    getCourses(value.searchText);
  };

  return (
    <div className="text-left p-3">
      <h5>
        <Link
          onClick={() => {
            setOpen(true);
            setIsAdd(true);
            form.resetFields();
            getCategoryOptions();
          }}
        >
          Thêm khoá học
        </Link>
      </h5>
      <Formik initialValues={{ searchText: "" }} onSubmit={getCoursesOnSearch}>
        {() => (
          <Form_ik className="my-4">
            <Field
              className="form-control"
              type="search"
              name="searchText"
              placeholder="Nhập vào tên khoá học"
            />
          </Form_ik>
        )}
      </Formik>

      <div style={{ overflowX: "auto" }}>
        <Table columns={courseColumns} dataSource={courseList} />
      </div>

      {/* Modal */}
      <Modal
        style={{ height: "calc(100vh - 200px)" }}
        title={isAdd ? "Thêm khoá học" : "Sửa thông tin khoá học"}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button type="primary" onClick={() => setOpen(false)}>
            Đóng
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="userForm"
          onFinish={(values) => {
            let {
              maKhoaHoc,
              tenKhoaHoc,
              danhGia,
              luotXem,
              maDanhMucKhoaHoc,
              moTa,
              ngayTao,
              taiKhoanNguoiTao,
              hinhAnh,
            } = values;
            ngayTao = ngayTao ? "" : moment().format("DD/MM/YYYY");
            danhGia = danhGia ? danhGia : 0;
            luotXem = luotXem ? luotXem : 0;
            hinhAnh = hinhAnh
              ? hinhAnh
              : "https://elearningnew.cybersoft.edu.vn/hinhanh/full-stack.jpg";

            const info = {
              maKhoaHoc,
              biDanh: maKhoaHoc,
              tenKhoaHoc,
              moTa,
              luotXem,
              danhGia,
              hinhAnh,
              maNhom: GROUP_ID,
              ngayTao,
              maDanhMucKhoaHoc,
              taiKhoanNguoiTao: taiKhoan,
            };
            if (isAdd) {
              addCourseApi({ accessToken, data: info })
                .then((res) => {
                  getCourses();
                  form.resetFields();
                })
                .catch((err) => {
                  isAdd && alert(err.response.data);
                });
            } else {
              updateCoursesApi(info)
                .then((res) => getCourses())
                .catch((err) => alert(err.response.data));
              setOpen(false);
            }
          }}
          scrollToFirstError
        >
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                label="Mã khoá học"
                name="maKhoaHoc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã khoá học!",
                  },
                ]}
              >
                <Input disabled={isAdd ? "" : "disabled"} />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item {...layout.formItem} name="danhGia" label="Đánh giá">
                <InputNumber defaultValue={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                label="Tên khoá học"
                name="tenKhoaHoc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên khoá học!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item {...layout.formItem} name="luotXem" label="Lượt xem">
                <InputNumber defaultValue={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="maDanhMucKhoaHoc"
                label="Danh mục khoá học"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại danh mục khoá học!",
                  },
                ]}
              >
                <Select
                  options={courseCategories}
                  placeholder="Chọn danh mục khoá học"
                ></Select>
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="taiKhoanNguoiTao"
                label="Người tạo"
              >
                {isAdd ? (
                  <Select defaultValue={taiKhoan}>
                    <Option value={taiKhoan}>{hoTen}</Option>
                  </Select>
                ) : (
                  <Select defaultValue={userID}>
                    <Option value={userID}>{userName}</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col {...layout.col}>
              <Form.Item {...layout.formItem} label="Ngày tạo" name="ngayTao">
                <DatePicker defaultValue={moment()} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item {...layout.formItem} name="hinhAnh" label="Hình ảnh">
                <Input
                  className="mb-1"
                  value={
                    fileList.length === 0
                      ? ""
                      : `https://elearningnew.cybersoft.edu.vn/hinhanh/${fileList[0].name}`
                  }
                />
                <Upload
                  {...props}
                  fileList={fileList}
                  listType="picture"
                  accept=".png,.jpeg,.jpg"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="moTa" label="Mô tả">
                <TextArea rows={6} autoSize={false} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center pl-5">
            <Button type="primary" htmlType="submit">
              {isAdd ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* End Modal */}

      {/* Modal ghi danh */}
      <Modal
        style={{ height: "calc(100vh - 200px)" }}
        centered
        open={openGD}
        onCancel={() => setOpenGD(false)}
        width={800}
        footer={[
          <Button type="primary" onClick={() => setOpenGD(false)}>
            Đóng
          </Button>,
        ]}
      >
        {/* Chọn người dùng ghi danh */}
        <div style={{ borderBottom: "1px solid black" }}>
          <h6>Chọn khoá học</h6>
          <Form
            form={form1}
            name="userRegister"
            onFinish={({ taiKhoan }) => {
              registerUserForCourse(taiKhoan);
            }}
          >
            <Row>
              <Col {...layoutGD.col1}>
                <Form.Item
                  name="taiKhoan"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn người dùng!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn người dùng"
                    options={unregistedUsers}
                  ></Select>
                </Form.Item>
              </Col>
              <Col {...layoutGD.col}>
                <Form.Item className="text-right text-sm-center">
                  <Button type="primary" htmlType="submit">
                    Ghi danh
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Khoá học chờ xác thực */}
        <div className="mt-3" style={{ borderBottom: "1px solid black" }}>
          <h6>Học viên chờ xác thực</h6>
          <Table columns={columns} dataSource={data} />
        </div>

        {/* Khoá học đã ghi danh */}
        <div className="mt-3" style={{ borderBottom: "1px solid black" }}>
          <h6>Học viên đã tham gia khoá học</h6>
          <Table columns={columns1} dataSource={data1} />
        </div>
      </Modal>
      {/* End Modal ghi danh */}
    </div>
  );
}
