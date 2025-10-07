import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetails } from "../../../services/operations/coursedetailapi";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from "../../../components/core/Homepage/Footer";
import { buycourse } from "../../../services/operations/studentfeatureapi";
import toast from "react-hot-toast";
import RatingStars from "../Homepage/common/RatingStars";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TbPlayCardStar, TbWorld } from "react-icons/tb";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";
import GetAvgRating from "../../../utils/avgRating";

const Coursebuy = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avgreviewcount, setAvgreviewcount] = useState(0);

  useEffect(() => {
    if (courseData?.ratingandreview) {
      const count = GetAvgRating(courseData.ratingandreview);
      setAvgreviewcount(count);
    }
  }, [courseData]);

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseDetails(courseId);
      setCourseData(data);
      console.log("jo data aya dekna ke liye wo->", data);
    };
    fetchData();
  }, [courseId]);

  if (!courseData) {
    return (
      <div className="text-white text-center mt-10">Loading Course...</div>
    );
  }

  const {
    coursename,
    instructor,
    thumbnail,
    price,
    coursedescription,
    rating,
    ratingandreview,
    createdAt,
    whatwillyoulearn,
    coursecontent = [],
    studentenrolled = [],
  } = courseData;

  const isEnrolled = studentenrolled?.some((id) => id.toString() === user?._id);

  const createdDate = createdAt ? new Date(createdAt) : new Date(); // agar null ho to current time

  const handlebuycourse = () => {
    if (!token) {
      // Agar student login nahi hai to signup page pe bhej do
      navigate("/signup");
      toast.error("Please first signup do....");
      return;
    }

    // Agar login hai to buy course call karo
    buycourse({
      courses: [courseId], // course ko array me pass karna
      token,
      userdetail: user, // user ka data
      navigate,
      dispatch,
    });
  };

  const handleShare = () => {
    const courseURL = `${window.location.origin}/course/${courseId}`;
    navigator.clipboard
      .writeText(courseURL)
      .then(() => toast.success("Course link copied! Share it with others "))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleaddtocart = () => {
    if (user && user?.accounttype === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor, not a student");
      return;
    }

    if (!token) {
      navigate("/signup");
      toast.error("Please first signup...");
      return;
    }

    // Yaha payload me courseData bhejo
    dispatch(addToCart(courseData));
    toast.success("Course added to cart 🛒");
  };

  return (
    <div className="text-white bg-[#121212] min-h-full mb-8">
      <div className="h-[450px] w-full bg-gray-700  ">
        <div className="w-[550px] h-[300px]  ml-[500px] relative top-[130px] ">
          <h1 className="text-6xl font-bold">{coursename}</h1>
          <p className="text-2xl mt-4">{`${coursename} By ${instructor?.firstname} ${instructor?.lastname}`}</p>
          {/* Ratings */}

          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-400 text-xl font-bold">
              {avgreviewcount?.toFixed(1) || 0}
            </span>
            <RatingStars value={avgreviewcount} readOnly={true} size={24} />
            <span className="text-base ml-2">
              ({courseData?.ratingandreview?.length || 0} reviews)
            </span>
            <span className="text-base ml-2">
              {courseData?.studentenrolled?.length || 0} students enrolled
            </span>
          </div>

          <p className="text-2xl mt-4">{`By ${instructor?.firstname} ${instructor?.lastname}`}</p>
          <p className="text-xl mt-4 flex items-center gap-2">
            <AiOutlineClockCircle size={20} />
            Created at {createdDate.toLocaleDateString()}{" "}
            {createdDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            |
            <TbWorld />
            Language: Hindi
          </p>
        </div>
      </div>

      <div className=" ml-[450px] mt-8">
        <div className="mt-8 border border-gray-700   rounded-md  w-[800px] ">
          <h2 className="text-4xl font-bold mb-2 m-4">What you'll learn</h2>
          <div className="bg- text-gray-200 p-4 rounded-lg w-[800px] h-[50px]  mt-2 ml-8">
            {whatwillyoulearn || "No details provided."}
          </div>
        </div>

        {/* Course Content */}
        <div className="mt-10 w-[800px]">
          <h2 className="text-4xl font-semibold mb-4">Course Content</h2>

          <p className="text-base text-gray-300 mb-2">
            {coursecontent.length} section(s),{" "}
            {coursecontent.reduce(
              (acc, section) => acc + (section?.subsection?.length || 0),
              0
            )}{" "}
            lecture(s)
            {coursecontent.map((section, idx) => (
              <div key={idx} className="mt-[-25px] ml-[175px]">
                {section.subsection?.map((lecture, i) => (
                  <div key={i} className="text-base text-gray-300">
                    ⏱ {lecture.timeduration} total length
                  </div>
                ))}
              </div>
            ))}
          </p>

          <div className="space-y-4">
            {coursecontent.map((section, idx) => (
              <div
                key={idx}
                className="border bg-gray-700 border-gray-700 rounded-md p-4"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(idx)}
                >
                  <h3 className="text-lg font-semibold">
                    {section.sectionname}
                  </h3>
                  {openSection === idx ? (
                    <FaChevronUp className="text-white" />
                  ) : (
                    <FaChevronDown className="text-white" />
                  )}
                </div>

                {openSection === idx && (
                  <ul className="mt-2 ml-6 list-disc text-gray-200">
                    {section.subsection?.map((lecture, i) => (
                      <li key={i}>{lecture.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[450px] h-[700px] rounded-lg p-5 bg-gray-800  absolute top-[150px] left-[1300px] ">
        <img
          src={thumbnail}
          alt="Course Thumbnail"
          className="rounded-lg mb-4 w-full "
        />
        <p className="text-4xl font-bold mb-2 mt-4 ml-4">Rs. {price}</p>

        {isEnrolled ? (
          <button
            className="w-[400px] bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded mb-3 mt-3 ml-2"
            onClick={() => navigate("/dashboard/enrolled-courses")}
          >
            Go To Course
          </button>
        ) : (
          <>
            <button
              className="w-[400px] bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded mb-3 mt-3 ml-2"
              onClick={handlebuycourse}
            >
              Buy Now
            </button>
            <button
              className="w-[400px] border bg-gray-900 border-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 ml-2 mt-2"
              onClick={handleaddtocart}
            >
              Add to Cart
            </button>
          </>
        )}

        <div className=" text-sm text-gray-400">
          <p className="text-[20px] text-white ml-[65px] mt-8">
            1-Day Money-Back Guarantee
          </p>
          <p className="mt-6 text-[20px] text-white ml-5">
            {" "}
            This Course Include :
          </p>
          <div className="mt-3 text-[#08e3ee] text-[15px] ml-4">
            <p>✔️ Full lifetime access</p>
            <p>✔️ Certificate of completion</p>
          </div>
        </div>
        <div
          className="mt-6 text-yellow-400 text-[19px] flex items-center gap-2  justify-center cursor-pointer transform transition-transform duration-200 hover:scale-110 "
          onClick={handleShare}
        >
          <FaShareSquare />
          <p>Share</p>
        </div>
      </div>

      <div className="mt-11 ml-[450px]">
        <p className="text-3xl font-bold text-[#f16202]">Author</p>
        <div className="flex gap-2 mt-4">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-gray-600"
          />
          <p className="text-2xl mt-4">{` ${instructor?.firstname} ${instructor?.lastname}`}</p>
        </div>
        <p className="mt-3 ml-1 text-2xl">Hello</p>
      </div>

      <Footer />
    </div>
  );
};

export default Coursebuy;
