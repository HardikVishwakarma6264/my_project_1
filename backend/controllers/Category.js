const Category = require("../models/categoryy");


// Create Category Controller
exports.createcategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in DB
    const tagDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log(tagDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating category",
      error: error.message,
    });
  }
};

// Show All Tags Controller
exports.showAllcategory = async (req, res) => {
  try {
   const allTags = await Category.find({}, { name: 1, description: 1 })
      .populate({
        path: "course",
        select: "coursename price thumbnail", // limit fields if needed
      });

    return res.status(200).json({
      success: true,
      message: "All categories with courses fetched successfully",
      allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// exports.categorypagedetail = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     if (!categoryId || categoryId.trim() === "") {
//   return res.status(400).json({
//     success: false,
//     message: "CategoryId is required",
//   });
// }

//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//   .populate({
//     path: "course",
//     // match: { status: "Published" },
//     populate: "ratingandreviews",
//   })
//   .exec();

//     console.log("SELECTED COURSE", selectedCategory);

//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.");
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }

//     // Handle the case when there are no courses
//     if (selectedCategory.course.length === 0) {
//       console.log("No courses found for the selected category.");
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       });
//     }

//     // Get courses for other categories
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });
    
//     let differentCategory = null;
//     if (categoriesExceptSelected.length > 0) {
//       differentCategory = categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)];
//       await differentCategory.populate({
//         path: "courses",
//         match: { status: "Published" },
//       }).exec();
//     }

//     // Get top-selling courses across all categories
//     const allCategories = await Category.find();
//     const allCourses = allCategories.flatMap(category => category.course);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 10);

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching category page details:", error);
//     res.status(500).json({ success: false, message: "Internal server error", error: error.message });
//   }
// };

// exports.categorypagedetail = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     if (!categoryId || categoryId.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "CategoryId is required",
//       });
//     }

//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "course",
//         // Populate ratingandreviews only if field exists
//         // populate: "ratingandreviews",
//       })
//       .exec();

//     console.log("SELECTED CATEGORY", selectedCategory);

//     if (!selectedCategory) {
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }

//     // If no courses, just return empty array (don't throw 404)
//     const courses = selectedCategory.course || [];

//     // Get other categories (differentCategory)
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });

//     let differentCategory = null;
//     if (categoriesExceptSelected.length > 0) {
//       differentCategory = categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)];
//       // safe populate
//       await differentCategory.populate({
//         path: "course",
//         match: { status: "Published" },
//       }).exec();
//     }

//     // Get top-selling courses across all categories
//     const allCategories = await Category.find().populate("course");
//     const allCourses = allCategories.flatMap(cat => cat.course || []);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => (b.sold || 0) - (a.sold || 0))
//       .slice(0, 10);

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory: { ...selectedCategory.toObject(), course: courses },
//         differentCategory,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching category page details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// exports.categorypagedetail = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     if (!categoryId || categoryId.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "CategoryId is required",
//       });
//     }

//     // Get the selected category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "course",
//         // Populate ratingandreviews only if it exists
//         populate: {
//           path: "ratingandreview", // Use correct field name
//           select: "rating comment user ",
          
//           // optional: select fields you need
//         },
//       });

//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     const courses = selectedCategory.course || [];

//     // Get a random different category (excluding selected)
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });

//     let differentCategory = null;
//     if (categoriesExceptSelected.length > 0) {
//       differentCategory = categoriesExceptSelected[
//         Math.floor(Math.random() * categoriesExceptSelected.length)
//       ];
//       // Document populate (no exec)
//       await differentCategory.populate({
//         path: "course",
//         match: { status: "Published" },
//       });
//     }

//     // Get top-selling courses across all categories
//     const allCategories = await Category.find().populate("course");
//     const allCourses = allCategories.flatMap(cat => cat.course || []);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => (b.sold || 0) - (a.sold || 0))
//       .slice(0, 10);

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory: { ...selectedCategory.toObject(), course: courses },
//         differentCategory: differentCategory
//           ? { ...differentCategory.toObject(), course: differentCategory.course }
//           : null,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching category page details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };


// exports.categorypagedetail = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     if (!categoryId || categoryId.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "CategoryId is required",
//       });
//     }

//     // ✅ Get the selected category with instructor + reviews populated
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "course",
//         populate: [
//           {
//             path: "instructor",
//             select: "firstname lastname email", // 👈 instructor ka naam yahan se aayega
//           },
//           {
//             path: "ratingandreview", // 👈 reviews
//             select: "rating comment user",
//           },
//         ],
//       });

//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     const courses = selectedCategory.course || [];

//     // ✅ Get a random different category (excluding selected)
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });

//     let differentCategory = null;
//     if (categoriesExceptSelected.length > 0) {
//       differentCategory =
//         categoriesExceptSelected[
//           Math.floor(Math.random() * categoriesExceptSelected.length)
//         ];
//       await differentCategory.populate({
//         path: "course",
//         match: { status: "Published" },
//         populate: { path: "instructor", select: "firstname lastname" }, // 👈 yahan bhi
//       });
//     }

//     // ✅ Get top-selling courses across all categories
//     const allCategories = await Category.find().populate({
//       path: "course",
//       populate: { path: "instructor", select: "firstname lastname" }, // 👈 aur yahan bhi
//     });

//     const allCourses = allCategories.flatMap((cat) => cat.course || []);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => (b.sold || 0) - (a.sold || 0))
//       .slice(0, 10);

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory: { ...selectedCategory.toObject(), course: courses },
//         differentCategory: differentCategory
//           ? { ...differentCategory.toObject(), course: differentCategory.course }
//           : null,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching category page details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
exports.categorypagedetail = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId?.trim()) {
      return res.status(400).json({ success: false, message: "CategoryId is required" });
    }

    // Selected category with reviews
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        populate: [
          { path: "instructor", select: "firstname lastname email" },
          { path: "ratingandreview", select: "rating comment user" },
        ],
      });

    if (!selectedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Random different category (also populate reviews)
    const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });
    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      differentCategory =
        categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)];
      await differentCategory.populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          { path: "instructor", select: "firstname lastname" },
          { path: "ratingandreview", select: "rating comment user" }, // ⭐ add this
        ],
      });
    }

    // Top-selling courses across all categories (populate reviews)
    const allCategories = await Category.find().populate({
      path: "course",
      populate: [
        { path: "instructor", select: "firstname lastname" },
        { path: "ratingandreview", select: "rating comment user" }, // ⭐ add this
      ],
    });

    const allCourses = allCategories.flatMap(cat => cat.course || []);
    const mostSellingCourses = allCourses
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory: { ...selectedCategory.toObject(), course: selectedCategory.course },
        differentCategory: differentCategory
          ? { ...differentCategory.toObject(), course: differentCategory.course }
          : null,
        mostSellingCourses, // now each course includes ratingandreview populated
      },
    });
  } catch (error) {
    console.error("Error fetching category page details:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

