import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  createSubSection,
  updateSubSection,
} from "../../../../services/operations/coursedetailapi";
import { setCourse } from "../../../../slices/courseSlice";
import { ImCancelCircle } from "react-icons/im";
import Upload from "../2nd_section/Upload";

const Subsectionmodal = ({
  modaldata,
  setmodaldata,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view || edit) {
      setValue("lecturetitle", modaldata.title);
      setValue("lecturedesc", modaldata.description);
      setValue("lecturevideo", modaldata.videourl);
      setValue("lecturetime", modaldata.timeduration);
    }
  }, []);

  const isformuploaded = () => {
    const currentvalue = getValues();
    return (
      currentvalue.lecturetitle !== modaldata.title ||
      currentvalue.lecturedesc !== modaldata.description ||
      currentvalue.lecturevideo !== modaldata.videourl ||
      currentvalue.lecturetime !== modaldata.timeduration
    );
  };

  const handleeditsubsection = async () => {
  const currentvalue = getValues();
  const formdata = new FormData();

  formdata.append("subsectionid", modaldata._id);

  if (currentvalue.lecturetitle !== modaldata.title) {
    formdata.append("title", currentvalue.lecturetitle);
  }
  if (currentvalue.lecturedesc !== modaldata.description) {
    formdata.append("description", currentvalue.lecturedesc);
  }
  if (currentvalue.lecturetime !== modaldata.timeduration) {
    formdata.append("timeduration", currentvalue.lecturetime);
  }
  if (currentvalue.lecturevideo !== modaldata.videourl) {
    formdata.append("video", currentvalue.lecturevideo);
  }

  const result = await updateSubSection(formdata, token);

  if (result) {
    const updatedCourse = { ...course };

    updatedCourse.coursecontent = updatedCourse.coursecontent.map((section) => {
      if (section._id === modaldata.sectionid) {
        return {
          ...section,
          subsection: section.subsection.map((subsec) =>
            subsec._id === result._id ? result : subsec
          ),
        };
      }
      return section;
    });

    dispatch(setCourse(updatedCourse));
  }

  setmodaldata(null);
};

  const onsubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isformuploaded()) {
        toast.error("No changes made to this form");
      } else {
        handleeditsubsection();
      }
      return;
    }

    const formdata = new FormData();
    formdata.append("sectionid", modaldata);
    formdata.append("title", data.lecturetitle);
    formdata.append("description", data.lecturedesc);
    formdata.append("video", data.lecturevideo);
    formdata.append("timeduration", data.lecturetime);

    const result = await createSubSection(formdata, token);

if (result) {
  // ✅ Update Redux course with new subsection
  const updatedCourse = { ...course };
  updatedCourse.coursecontent = updatedCourse.coursecontent.map((section) =>
    section._id === result._id ? result : section
  );

  dispatch(setCourse(updatedCourse));
}

setmodaldata(null);

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </h2>
          <button
            onClick={() => setmodaldata(null)}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <ImCancelCircle size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
          <Upload
            name="lecturevideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewdata={view ? modaldata.videourl : null}
            editdata={edit ? modaldata.videourl : null}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Lecture Title
            </label>
            <input
              id="lecturetitle"
              placeholder="Enter lecture title"
              {...register("lecturetitle", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={view}
            />
            {errors.lecturetitle && (
              <span className="text-red-500 text-sm">
                Lecture title is required
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Time Duration
            </label>
            <input
              id="lecturetime"
              placeholder="Enter lecture time (e.g., 10:30)"
              {...register("lecturetime", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={view}
            />
            {errors.lecturetime && (
              <span className="text-red-500 text-sm">
                Lecture time is required
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Lecture Description
            </label>
            <textarea
              id="lecturedesc"
              placeholder="Enter lecture description"
              {...register("lecturedesc", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={view}
            />
            {errors.lecturedesc && (
              <span className="text-red-500 text-sm">
                Lecture description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Subsectionmodal;


