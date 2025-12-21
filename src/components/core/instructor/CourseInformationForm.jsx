




import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "../../../services/apiconnector";
import { categories } from "../../../services/apis";
import RequirementsField from "./RequirementsField";
import { setCourse, setStep } from "../../../slices/courseSlice";
import UploadThumbnail from "./UploadThumbnail";
import { editCourse, createCourse } from "../../../services/operations/coursedetailapi";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../utils/constants";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse: isEditCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  // Check if form is updated
  const isFormUpdated = () => {
    const currentvalues = getValues();
    return (
      currentvalues.coursetitle !== course.coursename ||
      currentvalues.coursedesc !== course.coursedescription ||
      currentvalues.courseprice !== course.price ||
      currentvalues.coursebenefits !== course.whatwillyoulearn ||
      currentvalues.coursecategory !== course.category._id ||
      JSON.stringify(currentvalues.courserequirements) !== JSON.stringify(course.instruction) ||
      currentvalues.courseimage !== course.thumbnail ||
      currentvalues.coursetag !== course.tag
    );
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      setCourseCategories(result?.data?.allTags || []);
    } catch (error) {
      console.error("Could not fetch category list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

    if (isEditCourse && course) {
      setValue("coursetitle", course.coursename);
      setValue("coursedesc", course.coursedescription);
      setValue("courseprice", course.price);
      setValue("coursetag", course.tag);
      setValue("coursebenefits", course.whatwillyoulearn);
      setValue("coursecategory", course.category._id);
      setValue("courserequirements", course.instruction);
      setValue("courseimage", course.thumbnail);
    }
  }, [isEditCourse, course, setValue]);

  // Submit Handler
  const onSubmit = async (data) => {
    if (isEditCourse) {
      if (isFormUpdated()) {
        const formdata = new FormData();
        formdata.append("courseid", course._id);

        if (data.coursetitle !== course.coursename) {
          formdata.append("coursename", data.coursetitle);
        }
        if (data.coursedesc !== course.coursedescription) {
          formdata.append("coursedescription", data.coursedesc);
        }
        if (data.courseprice !== course.price) {
          formdata.append("price", data.courseprice);
        }
        if (data.coursetag !== course.tag) {
          formdata.append("tag", data.coursetag);
        }
        if (data.coursebenefits !== course.whatwillyoulearn) {
          formdata.append("whatwillyoulearn", data.coursebenefits);
        }
        if (data.coursecategory !== course.category._id) {
          formdata.append("category", data.coursecategory);
        }
        if (data.courseimage !== course.thumbnail) {
          formdata.append("thumbnail", data.courseimage);
        }
        if (
          JSON.stringify(data.courserequirements) !== JSON.stringify(course.instruction)
        ) {
          formdata.append("instruction", JSON.stringify(data.courserequirements));
        }

        setLoading(true);
        const result = await editCourse(formdata, token);
        setLoading(false);

        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      } else {
        toast.error("No changes detected in the form");
      }
      return;
    }

    // Create a new course
    const formdata = new FormData();
    formdata.append("coursename", data.coursetitle);
    formdata.append("coursedescription", data.coursedesc);
    formdata.append("whatwillyoulearn", data.coursebenefits);
    formdata.append("price", data.courseprice);
    formdata.append("category", data.coursecategory);
    formdata.append("thumbnail", data.courseimage);
    formdata.append("tag", data.coursetag);
    formdata.append("status", COURSE_STATUS.DRAFT);
    formdata.append("instruction", JSON.stringify(data.courserequirements));

    const result = await createCourse(formdata, token);
    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-2xl bg-gray-800 rounded-2xl p-2 sm:p-8 md:space-y-6 space-y-2 shadow-lg"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Course Title <span className="text-red-500">*</span>
        </label>
        <input
          id="coursetitle"
          placeholder="Enter course title"
          {...register("coursetitle", { required: "Course title is required" })}
          className="w-full bg-gray-600 rounded px-3 py-2 text-white"
        />
        {errors.coursetitle && (
          <span className="text-red-500 text-sm">{errors.coursetitle.message}</span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Course Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="coursedesc"
          placeholder="Enter description"
          {...register("coursedesc", { required: "Course description is required" })}
          className="w-full min-h-[140px] bg-gray-600 rounded px-3 py-2 text-white"
        />
        {errors.coursedesc && (
          <span className="text-red-500 text-sm">{errors.coursedesc.message}</span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Course Price <span className="text-red-500">*</span>
        </label>
        <input
          id="courseprice"
          placeholder="Enter course price"
          type="number"
          {...register("courseprice", {
            required: "Course price is required",
            valueAsNumber: true,
          })}
          className="w-full bg-gray-600 rounded px-3 py-2 text-white"
        />
        {errors.courseprice && (
          <span className="text-red-500 text-sm">{errors.courseprice.message}</span>
        )}
      </div>

      {/* Tag */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Tag <span className="text-red-500">*</span>
        </label>
        <input
          id="coursetag"
          placeholder="Enter course tag"
          type="text"
          {...register("coursetag", { required: "Course tag is required" })}
          className="w-full bg-gray-600 rounded px-3 py-2 text-white"
        />
        {errors.coursetag && (
          <span className="text-red-500 text-sm">{errors.coursetag.message}</span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Course Category <span className="text-red-500">*</span>
        </label>
        <select
          id="coursecategory"
          defaultValue=""
          {...register("coursecategory", { required: "Course category is required" })}
          className="w-full bg-gray-600 rounded px-3 py-2 text-white"
        >
          <option value="" disabled>
            Choose category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.coursecategory && (
          <span className="text-red-500 text-sm">{errors.coursecategory.message}</span>
        )}
      </div>

      {/* Thumbnail Upload */}
      <UploadThumbnail
        name="courseimage"
        label="Course Thumbnail"
        setValue={setValue}
        getValues={getValues}
        error={errors.courseimage}
        rules={{ required: "Course thumbnail is required" }}
      />

      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-white text-base">
          Course Benefits <span className="text-red-500">*</span>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter what students will learn"
          {...register("coursebenefits", { required: "Course benefits are required" })}
          className="w-full min-h-[140px] bg-gray-600 rounded px-3 py-2 text-white"
        />
        {errors.coursebenefits && (
          <span className="text-red-500 text-sm">{errors.coursebenefits.message}</span>
        )}
      </div>

      {/* Requirements Field */}
      <RequirementsField
        name="courserequirements"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Submit Button */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-4">
        {isEditCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500 transition-colors"
          >
            Continue Without Saving
          </button>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors"
        >
          {!isEditCourse ? "Next" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
