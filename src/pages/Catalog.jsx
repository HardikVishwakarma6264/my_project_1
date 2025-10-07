

import React, { useEffect, useState } from "react";
import { getcategoryapi } from "../services/operations/categoryapi";
import Footer from "../components/core/Homepage/Footer";
import { useParams } from "react-router-dom";
import { apiconnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import Courseslider from "./slider/Courseslider";
import Course_Card from "./slider/Course_Card";

const Catalog = () => {
  const { catalogname } = useParams();
  const [catalogpagedata, setcatalogpagedata] = useState(null);
  const [categoryid, setcategoryid] = useState("");

  useEffect(() => {
    const getcategories = async () => {
      const res = await apiconnector("GET", categories.CATEGORIES_API);
      const matched = res?.data?.allTags?.find(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogname
      );
      if (matched?._id) {
        setcategoryid(matched._id);
      }
    };
    getcategories();
  }, [catalogname]);

  useEffect(() => {
    const getcategorydetail = async () => {
      if (!categoryid) return;
      const res = await getcategoryapi(categoryid);
      setcatalogpagedata(res);
    };
    getcategorydetail();
  }, [categoryid]);

  return (
    <div className="text-white">
      {/* Header */}
      <div className="w-full h-[250px] bg-gray-800 flex items-center">
        <div className="max-w-6xl px-6 md:px-12">
          <p>
            {`Home / Catalog / `}
            <span className="text-yellow-500">
              {catalogpagedata?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="mt-4 text-2xl md:text-4xl font-semibold">
            {catalogpagedata?.data?.selectedCategory?.name}
          </p>
          <p className="mt-4 text-sm md:text-base">
            {catalogpagedata?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-xl md:text-3xl mt-6 font-semibold">
          Courses to get you started
        </h2>
        <div className="flex gap-x-6 text-lg md:text-2xl mt-4">
          <p className="cursor-pointer">Most popular</p>
          <p className="cursor-pointer">New</p>
        </div>
        <Courseslider
          Courses={catalogpagedata?.data?.selectedCategory?.course || []}
        />
      </div>

      {/* Section 2 */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 mt-12">
        <p className="text-xl md:text-3xl mb-6 font-semibold">
          Top Courses in{" "}
          {catalogpagedata?.data?.selectedCategory?.name}
        </p>
        <Courseslider
          Courses={catalogpagedata?.data?.differentCategory?.course || []}
        />
      </div>

      {/* Section 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12">
        <p className="text-xl md:text-3xl font-semibold">
          Frequently Bought
        </p>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalogpagedata?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, index) => (
              <Course_Card
                course={course}
                key={index}
                height={"h-[350px]"}
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;


