import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Subsectionmodal from "./Subsectionmodal";
import Confirmationmodel from "./Confirmationmodel";
import { setCourse } from "../../../../slices/courseSlice";
import { deleteSection } from "../../../../services/operations/coursedetailapi";
import { deleteSubSection } from "../../../../services/operations/coursedetailapi";

const NestedView = ({ handlechangededitsectionname }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  const [addsubsection, setaddsubsection] = useState(null);
  const [viewsubsection, setviewsubsection] = useState(null);
  const [editsubsection, seteditsubsection] = useState(null);
  const [confirmationmodel, setconfirmationmodel] = useState(null);

  const handledeletesection = async(sectionid) => {
    const result=await deleteSection({
      sectionid,
      courseid:course._id,
      token,
    })
    if(result){
      dispatch(setCourse(result));
    }
    setconfirmationmodel(null);
    
  };

  const handledeletesubsection = async (subsectionid, sectionid) => {
  const result = await deleteSubSection({ subsectionid, sectionid, token });
  if (result) {
    const updatedCourse = { ...course };

    updatedCourse.coursecontent = updatedCourse.coursecontent.map((section) =>
      section._id === result._id ? result : section
    );

    dispatch(setCourse(updatedCourse));
  }
  setconfirmationmodel(null);
};


  return (
    <div>
    <div className="space-y-3">
      {course?.coursecontent?.map((section) => (
        <details
          key={section._id}
          open
          className="bg-gray-800 text-white rounded-lg p-3 shadow-md"
        >
          <summary className="flex items-center justify-between cursor-pointer">
            {/* Left side: Section title */}
            <div className="flex items-center gap-2">
              <IoIosArrowDropdown size={20} />
              <span className="font-medium">{section.sectionname}</span>
            </div>

            {/* Right side: action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  handlechangededitsectionname(section._id, section.sectionname)
                }
                className="hover:text-yellow-400 transition-colors"
              >
                <MdModeEditOutline size={20} />
              </button>

              <button
                onClick={() => {
                  setconfirmationmodel({
                    text1: "Delete this section",
                    text2: "All the lectures in this section will be deleted",
                    btn1text: "Delete",
                    btn2text: "Cancel",
                    btn1handler: () => handledeletesection(section._id),
                    btn2handler: () => setconfirmationmodel(null),
                  });
                }}
                className="hover:text-red-500 transition-colors"
              >
                <MdDeleteForever size={20} />
              </button>
            </div>
          </summary>

          {/* Subsections */}
          <div className="mt-3 ml-6 space-y-2">
            {section.subsection?.map((data) => (
              <div
                key={data?._id}
                onClick={() => setviewsubsection(data)}
                className="flex items-center justify-between border-b border-gray-600 pb-2"
              >
                {/* Left side */}
                <div className="flex items-center gap-x-2">
                  <IoIosArrowDropdown size={16} />
                  <p className="text-sm">{data.title}</p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() =>
                      seteditsubsection({ ...data, sectionid: section._id })
                    }
                    className="hover:text-yellow-400 transition-colors"
                  >
                    <MdModeEditOutline size={18} />
                  </button>

                  <button
                    onClick={() =>
                      setconfirmationmodel({
                        text1: "Delete this sub section",
                        text2: "Selected lecture will be deleted",
                        btn1text: "Delete",
                        btn2text: "Cancel",
                        btn1handler: () =>
                          handledeletesubsection(data._id, section._id),
                        btn2handler: () => setconfirmationmodel(null),
                      })
                    }
                    className="hover:text-red-500 transition-colors"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            ))}

         <button
  onClick={() => setaddsubsection(section._id)}   // ✅
  className="mt-3 flex items-center gap-x-2 text-yellow-500 "
>
  
  <p>Add Lecture</p>
  <FaPlus />
</button>

 
          </div>
        </details>
      ))}
    </div>

    {addsubsection ? (
  <Subsectionmodal modaldata={addsubsection} setmodaldata={setaddsubsection} add={true}/>
) : viewsubsection ? (
  <Subsectionmodal modaldata={viewsubsection} setmodaldata={setviewsubsection} view={true}/>
) : editsubsection ? (
  <Subsectionmodal modaldata={editsubsection} setmodaldata={seteditsubsection} edit={true}/>
) : null}


{
  confirmationmodel ? (
    <Confirmationmodel modaldata={confirmationmodel}/>
  )
:(<div></div>)
}
</div>
  );
};

export default NestedView;
