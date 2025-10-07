


import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/coursedetailapi"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { toast } from "react-hot-toast"

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerRef = useRef(null)
  const containerRef = useRef(null) // fullscreen toggle ke liye

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )
  const location = useLocation()

  const [videodata, setVideodata] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // ---------------- get current video ----------------
  useEffect(() => {
    if (!courseSectionData.length) return
    if (!courseId || !sectionId || !subsectionId) {
      navigate("/dashboard/enrolled-courses")
      return
    }

    const section = courseSectionData.find((c) => c._id === sectionId)
    const subsection = section?.subsection?.find((s) => s._id === subsectionId)

    if (subsection) {
      setVideodata(subsection)
      setVideoEnded(false)
    }
  }, [courseSectionData, location.pathname, courseId, sectionId, subsectionId, navigate])

  const handleLectureComplete = async () => {
    try {
      const res = await markLectureAsComplete({ courseId, subsectionId }, token)

      if (!res) {
        toast.error("Failed to mark as completed")
        return
      }

      if (res.alreadyCompleted) {
        toast("You already marked this lecture as completed", { icon: "ℹ️" })
        return
      }

      dispatch(updateCompletedLectures(subsectionId))
      toast.success("Lecture marked as completed!")
    } catch (err) {
      console.error("Error marking complete:", err)
      toast.error("Failed to mark as completed")
    }
  }

  const handleLectureEnd = () => setVideoEnded(true)

  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.pause()
      playerRef.current.currentTime = 0
      playerRef.current.play()
      setVideoEnded(false)
    }
  }

  // ---------- helpers to move to next / previous ----------
  const gotoNextVideo = () => {
    const secIdx = courseSectionData.findIndex((s) => s._id === sectionId)
    if (secIdx === -1) return

    const subIdx = courseSectionData[secIdx]?.subsection?.findIndex(
      (s) => s._id === subsectionId
    )
    if (subIdx === -1) return

    const noOfSub = courseSectionData[secIdx]?.subsection?.length || 0

    if (subIdx < noOfSub - 1) {
      const nextSubId = courseSectionData[secIdx].subsection[subIdx + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`)
    } else if (secIdx < courseSectionData.length - 1) {
      const nextSection = courseSectionData[secIdx + 1]
      if (nextSection?.subsection?.length) {
        const nextSubId = nextSection.subsection[0]._id
        navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubId}`)
      }
    }
  }

  const gotoPreviousVideo = () => {
    const secIdx = courseSectionData.findIndex((s) => s._id === sectionId)
    if (secIdx === -1) return

    const subIdx = courseSectionData[secIdx]?.subsection?.findIndex(
      (s) => s._id === subsectionId
    )
    if (subIdx === -1) return

    if (subIdx > 0) {
      const prevSubId = courseSectionData[secIdx].subsection[subIdx - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`)
    } else if (secIdx > 0) {
      const prevSection = courseSectionData[secIdx - 1]
      if (prevSection?.subsection?.length) {
        const prevSubId = prevSection.subsection[prevSection.subsection.length - 1]._id
        navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubId}`)
      }
    }
  }

  // ---------- identify first & last video ----------
  const currentSectionIndex = courseSectionData.findIndex((s) => s._id === sectionId)
  const currentSubIndex =
    currentSectionIndex !== -1
      ? courseSectionData[currentSectionIndex]?.subsection?.findIndex((s) => s._id === subsectionId)
      : -1

  const isFirstVideo = currentSectionIndex === 0 && currentSubIndex === 0
  const isLastVideo =
    currentSectionIndex !== -1 &&
    currentSubIndex !== -1 &&
    currentSectionIndex === courseSectionData.length - 1 &&
    currentSubIndex ===
      (courseSectionData[currentSectionIndex]?.subsection?.length || 0) - 1

  // ---------- Fullscreen toggle ----------
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  // ---------- UI ----------
  return (
    <div className="w-full flex flex-col items-center">
      {!videodata || !videodata.videourl ? (
        <div>No video data found</div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full max-w-8xl aspect-video bg-black rounded-lg overflow-hidden"
        >
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 z-10 px-3 py-1 text-sm bg-black/60 text-white rounded hover:bg-black/80"
          >
            {isFullscreen ? "⛶ Exit" : "⛶ Fullscreen"}
          </button>

          {/* Video Player */}
          <video
            ref={playerRef}
            className="w-full h-full object-contain"
            controls
            onEnded={handleLectureEnd}
            onLoadedMetadata={() => setVideoEnded(false)}
          >
            <source src={videodata.videourl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Buttons */}
          {videoEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70">
              {!completedLectures.includes(subsectionId) && (
                <button
                  onClick={handleLectureComplete}
                  className="px-5 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                >
                  ✅ Mark as Completed
                </button>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleRewatch}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  🔁 Rewatch
                </button>
                {!isFirstVideo && (
                  <button
                    onClick={gotoPreviousVideo}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    ⬅️ Previous
                  </button>
                )}
                {!isLastVideo && (
                  <button
                    onClick={gotoNextVideo}
                    className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
                  >
                    ➡️ Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoDetails

