import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./Screens/Home";
import CourseDetail from "./Screens/Details";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";
import { Route, Routes } from "react-router-dom";
import CourseCategories from "./Screens/CourseCategories";
import CourseSearch from "./Screens/CourseSearch";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/coursecategories" element={<CourseCategories />} />
        <Route path="/coursedetail" element={<CourseDetail />} />
        <Route path="/coursesearch" element={<CourseSearch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
