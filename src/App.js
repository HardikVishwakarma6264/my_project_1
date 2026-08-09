import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/core/Homepage/common/Navbar";
import Login from "./components/core/login&signup/Login";
import Signup from "./components/core/login&signup/Signup";
import Dashboard from "./components/core/login&signup/Dashboard";
import Forgotpassword from "./components/core/login&signup/Forgotpassword";
import Updatepassword from "./components/core/login&signup/Updatepassword";
import ResetSuccess from "./components/core/login&signup/ResetSuccess";
import VerifyEmailss from "./components/core/login&signup/VerifyEmailss";
import MyProfile from "./components/core/login&signup/MyProfile";
import SignupSuccess from "./components/core/login&signup/SignupSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ✅ Dashboard Pages
import Settings from "./components/core/dashboard/Settings";
import Mycourse from "./components/core/instructor/Mycourse";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/dashboard/PurchaseHistory";
// import Cart from "./components/core/cart/Iindexx";
import { ACCOUNT_TYPE } from "./utils/constants";
import Addcourse from "./components/core/instructor/Addcourse";
import Instructor from "./components/core/instructor/Instructor";
import Coursebuy from "./components/core/coursebuy/Coursebuy";

// ✅ Redux
import { useSelector } from "react-redux";
import Editcourse from "./components/core/instructor/3rd_section/Editcourse";
import Catalog from "./pages/Catalog";
import Viewcourse from "./components/core/viewCourse/Viewcourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";

function App() {
  const { user } = useSelector((state) => state.auth); // ✅ get user from Redux

  return (
    <div className="w-screen min-h-screen bg-[#121212] flex flex-col font-inter ">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="catalog/:catalogname" element={<Catalog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/update-password/:id" element={<Updatepassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/verify-email" element={<VerifyEmailss />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/:courseId" element={<Coursebuy />} />

        {/* ✅ Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="my-courses" element={<Mycourse />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="edit-course/:courseid" element={<Editcourse />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          
          <Route path="add-course" element={<Addcourse />} />

          {/* ✅ Only for Students */}
          {user?.accounttype === ACCOUNT_TYPE.STUDENT && (
            <>
              {/* <Route path="cart" element={<Cart />} /> */}
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}
        </Route>

      <Route
      element={
        <PrivateRoute>
          <Viewcourse/>
        </PrivateRoute>
      }
      >{
        user?.accounttype === ACCOUNT_TYPE.STUDENT && (
            <>
             
             <Route path="view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element={<VideoDetails />} />

            </>
          )
      }

      </Route>

      </Routes>
    </div>
  );
}

export default App;
