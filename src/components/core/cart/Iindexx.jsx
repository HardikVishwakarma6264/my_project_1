import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white w-11/12 max-w-5xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
      <p className="text-lg mb-6">{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <RenderCartCourses />
          </div>
          <div className="w-full lg:w-1/3">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Your Cart is Empty</p>
      )}
    </div>
  );
}
