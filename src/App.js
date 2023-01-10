import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./Screens/Home";
import CourseDetail from "./Screens/Details";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CourseCategories from "./Screens/CourseCategories";
import CourseSearch from "./Screens/CourseSearch";
import { useDispatch } from "react-redux";
import { getLocal } from "./Ultis/config";
import { signIn } from "./Redux/Reducers/userReducer";
import { useEffect } from "react";
import Header from "./Layouts/Header";
import UserInfo from "./Screens/UserInfo";
import UserManagement from "./Admin/UserManagement";
import CourseManagement from "./Admin/CourseManagement";
import NotFound from "./Screens/NotFound";
import UserLayout from "./Layouts/User";
import AdminLayout from "./Layouts/Admin";

function App() {
  //check user login
  const dispatch = useDispatch();
  const user = getLocal("userCredentials");
  useEffect(() => {
    if (user) {
      dispatch(signIn(user));
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/coursecategories" element={<CourseCategories />} />
          <Route path="/coursedetail/:courseId" element={<CourseDetail />} />
          <Route path="/coursesearch" element={<CourseSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {user && user.maLoaiNguoiDung == "GV" ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin/usermanagement" element={<UserManagement />} />
            <Route
              path="/admin/coursemanagement"
              element={<CourseManagement />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}

export default App;
