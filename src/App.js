import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./Screens/Home";
import CourseDetail from "./Screens/Details";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";
import { Route, Routes } from "react-router-dom";
import CourseCategories from "./Screens/CourseCategories";
import CourseSearch from "./Screens/CourseSearch";
import { useDispatch } from "react-redux";
import { getLocal } from "./Ultis/config";
import { signIn } from "./Redux/Reducers/userReducer";
import { useEffect } from "react";
import Header from "./Layouts/Header";

function App() {
  //check user login
  const dispatch = useDispatch();
  useEffect(() => {
    const user = getLocal("userCredentials");
    if (user) {
      dispatch(signIn(user));
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/coursecategories" element={<CourseCategories />} />
        <Route path="/coursedetail/:courseId" element={<CourseDetail />} />
        <Route path="/coursesearch" element={<CourseSearch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
