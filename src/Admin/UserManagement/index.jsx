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
} from "antd";
import { Field, Form as Form_ik, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteRegisteredCourseApi,
  registerCourseForUserApi,
} from "../../Services/course";
import { _paginate } from "../../Services/pagination";
import {
  addUserApi,
  deleteUserApi,
  getRegisteredCoursesApi,
  getUnauthorizedCoursesApi,
  getUnregisteredCoursesApi,
  getUsersApi,
  updateUserApi,
} from "../../Services/user";
import { getLocal } from "../../Ultis/config";
import { GROUP_ID } from "../../Ultis/constants";

const accessToken = getLocal("userCredentials")
  ? getLocal("userCredentials").accessToken
  : "";
export default function UserManagement() {
  const [userList, setUserList] = useState([]);

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
  const [unregistedCourses, setUnregistedCourses] = useState([]);
  const [userId, setUserId] = useState("");

  // Talble antd
  const columns = [
    {
      title: "STT",
      dataIndex: "soTT",
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
    },
    {
      title: "Chờ xác nhận",
      render: (values) => (
        <Space size="middle">
          <Button
            className="btn-success"
            onClick={async () => {
              await registerCourseForUser(values.maKhoaHoc);
              await getUnauthorizedCourses(userId);
            }}
          >
            Xác nhận
          </Button>
          <Button
            className="btn-danger"
            onClick={async () => {
              await deleteRegisteredCourse(values.maKhoaHoc);
              await getUnauthorizedCourses(userId);
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
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
    },
    {
      title: "Chờ xác nhận",
      render: (values) => (
        <Space size="middle">
          <Button
            className="btn-danger"
            onClick={async () => {
              await deleteRegisteredCourse(values.maKhoaHoc);
              await getRegisteredCourses(userId);
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

  // End Modal

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const [userListAPage, setUserListAPage] = useState([]);

  const getUserListAPage = (page, list) => {
    let arr = [];
    for (let i = pageSize * (page - 1); i < pageSize * page; i++) {
      if (list[i]) {
        arr.push({ ...list[i], soTT: i });
      } else {
        break;
      }
    }
    setUserListAPage(arr);
  };

  const getUserPageChange = (page) => {
    getUserListAPage(page, userList);
  };

  const paginate = () =>
    _paginate(
      [count, setCount],
      totalCount,
      pageSize,
      totalPages,
      [currentPage, setCurrentPage],
      getUserPageChange
    );
  // end pagination

  const fetchUsers = (keyword) => {
    getUsersApi(keyword)
      .then((res) => {
        setUserList(res.data);

        //pagination
        getUserListAPage(1, res.data);
        setTotalCount(res.data.length);
        setTotalPages(Math.ceil(res.data.length / pageSize));
        setCurrentPage(1);
        setCount(1);
      })
      .catch((err) => {
        console.log(err);
        //pagination
        setCurrentPage(1);
        setTotalCount(0);
        setCount(1);
      });
  };

  const getCourseOptions = (userInfo) => {
    getUnregisteredCoursesApi(userInfo)
      .then((res) => {
        const courseOptions = res.data.map((item) => {
          return {
            value: item.maKhoaHoc,
            label: item.tenKhoaHoc,
          };
        });
        setUnregistedCourses(courseOptions);
      })
      .catch((err) => console.log(err));
  };

  const registerCourseForUser = async (maKhoaHoc) => {
    const registerInfo = {
      accessToken,
      info: {
        maKhoaHoc,
        taiKhoan: userId,
      },
    };

    await registerCourseForUserApi(registerInfo)
      .then((res) => {
        //refresh select options
        getCourseOptions({ accessToken, taiKhoan: userId });
        form1.resetFields();
      })
      .catch((err) => console.log(err));
  };

  const getUnauthorizedCourses = async (_taiKhoan) => {
    const userInfo = {
      accessToken,
      info: {
        taiKhoan: _taiKhoan,
      },
    };

    await getUnauthorizedCoursesApi(userInfo)
      .then((res) => {
        const tempArr = res.data.map((item, index) => {
          return {
            soTT: index + 1,
            tenKhoaHoc: item.maKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
          };
        });
        setData(tempArr);
      })
      .catch((err) => console.log(err));
  };

  const deleteRegisteredCourse = async (maKhoaHoc) => {
    try {
      const registerInfo = {
        accessToken,
        info: {
          maKhoaHoc,
          taiKhoan: userId,
        },
      };
      await deleteRegisteredCourseApi(registerInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getRegisteredCourses = async (taiKhoan) => {
    try {
      const userInfo = {
        accessToken,
        info: { taiKhoan },
      };
      const coursesApi = await getRegisteredCoursesApi(userInfo);

      setData1(
        coursesApi.data.map((item, index) => {
          return {
            soTT: index + 1,
            tenKhoaHoc: item.maKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(fetchUsers, []);

  const getUsersOnSearch = (value) => {
    fetchUsers(value.searchText);
  };

  return (
    <div className="text-left p-3">
      <h5>
        <Link
          onClick={() => {
            setOpen(true);
            setIsAdd(true);
            form.resetFields();
          }}
        >
          Thêm người dùng
        </Link>
      </h5>
      <Formik initialValues={{ searchText: "" }} onSubmit={getUsersOnSearch}>
        {({ values }) => (
          <Form_ik className="my-4">
            <Field
              className="form-control"
              type="search"
              name="searchText"
              placeholder="Nhập vào tài khoản hoặc tên người dùng"
            />
          </Form_ik>
        )}
      </Formik>

      {/* pagination */}
      <p>{paginate()}</p>
      {/* pagination */}

      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tài khoản</th>
              <th>Mật khẩu</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {userListAPage.map((user, index) => {
              return (
                <tr>
                  <td>{user.soTT + 1}</td>
                  <td>{user.taiKhoan}</td>
                  <td>{user.matKhau}</td>
                  <td>{user.hoTen}</td>
                  <td>{user.email}</td>
                  <td>{user.soDt}</td>
                  <td style={{ display: "flex" }}>
                    <button
                      style={{ fontSize: 14, marginRight: 2 }}
                      className="btn btn-success"
                      onClick={() => {
                        setOpenGD(true);

                        setUserId(user.taiKhoan);

                        form1.resetFields();

                        const userInfo = {
                          accessToken,
                          taiKhoan: user.taiKhoan,
                        };
                        getCourseOptions(userInfo);

                        getUnauthorizedCourses(user.taiKhoan);

                        getRegisteredCourses(user.taiKhoan);
                      }}
                    >
                      Ghi danh
                    </button>
                    <button
                      style={{ fontSize: 14, marginRight: 2 }}
                      className="btn btn-primary"
                      onClick={() => {
                        setIsAdd(false);
                        setOpen(true);

                        form.setFieldsValue({
                          taiKhoan: user.taiKhoan,
                          matKhau: user.matKhau,
                          email: user.email,
                          hoTen: user.hoTen,
                          soDt: user.soDt,
                          maLoaiNguoiDung: user.maLoaiNguoiDung,
                        });
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      style={{ fontSize: 14 }}
                      className="btn btn-danger"
                      onClick={() => {
                        const userTemp = {
                          accessToken,
                          taiKhoan: user.taiKhoan,
                        };
                        deleteUserApi(userTemp)
                          .then(() => fetchUsers())
                          .catch((err) => console.log(err));
                      }}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <p>{paginate()}</p>
      {/* pagination */}

      {/* Modal */}
      <Modal
        title={isAdd ? "Thêm người dùng" : "Sửa thông tin người dùng"}
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
            const { taiKhoan, email, matKhau, soDt, maLoaiNguoiDung, hoTen } =
              values;
            const info = {
              taiKhoan,
              matKhau,
              hoTen,
              soDT: soDt,
              maLoaiNguoiDung,
              maNhom: GROUP_ID,
              email,
            };
            if (isAdd) {
              addUserApi({ accessToken, info })
                .then((res) => {
                  fetchUsers();
                  form.resetFields();
                })
                .catch((err) => isAdd && alert(err.response.data));
            } else {
              updateUserApi({ accessToken, info })
                .then((res) => fetchUsers())
                .catch((err) => console.log(err));

              setOpen(false);
            }
          }}
          scrollToFirstError
        >
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                label="Tài khoản"
                name="taiKhoan"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tài khoản!",
                  },
                ]}
              >
                <Input disabled={isAdd ? "" : "disabled"} />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "E-mail không hợp lệ!",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập E-mail!",
                  },
                ]}
              >
                <Input disabled={isAdd ? "" : "disabled"} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                label="Mật khẩu"
                name="matKhau"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="soDt"
                label="Số điện thoại"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Vui lòng nhập đúng định dạng số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="hoTen"
                label="Họ tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...layout.col}>
              <Form.Item
                {...layout.formItem}
                name="maLoaiNguoiDung"
                label="Loại người dùng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại người dùng!",
                  },
                ]}
              >
                <Select placeholder="Loại người dùng">
                  <Option value="HV">Học viên</Option>
                  <Option value="GV">Giáo vụ</Option>
                </Select>
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
        {/* Chọn khoá học ghi danh */}
        <div style={{ borderBottom: "1px solid black" }}>
          <h6>Chọn khoá học</h6>
          <Form
            form={form1}
            name="courseRegister"
            onFinish={({ maKhoaHoc }) => {
              registerCourseForUser(maKhoaHoc);
            }}
          >
            <Row>
              <Col {...layoutGD.col1}>
                <Form.Item
                  name="maKhoaHoc"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khoá học!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn khoá học"
                    options={unregistedCourses}
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
          <h6>Khoá học chờ xác thực</h6>
          <Table columns={columns} dataSource={data} />
        </div>

        {/* Khoá học đã ghi danh */}
        <div className="mt-3" style={{ borderBottom: "1px solid black" }}>
          <h6>Khoá học đã ghi danh</h6>
          <Table columns={columns1} dataSource={data1} />
        </div>
      </Modal>
      {/* End Modal ghi danh */}
    </div>
  );
}
