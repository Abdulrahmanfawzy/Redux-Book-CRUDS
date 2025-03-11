import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { addBook, getAllBooks } from "../../redux/reducers/BookSlice";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  title: "",
  price: "",
  desc: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "min length is 3 characters")
    .max(20, "max length is 20 characters")
    .required("Title is required *"),
  price: Yup.string().required("Price is required *"),
  desc: Yup.string()
    .min(3, "min length is 3 characters")
    .required("description is required *"),
});

export default function Form() {
  const { data, error, isLoading } = useSelector((store) => store.books);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addBook(values));
      values.title = "";
      values.price = "";
      values.desc = "";
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {isLoading ? <h2>Loading...</h2> : ""}
      {error ? (
        <div className="bg-red-200 p-5 text-sm rounded mb-2">{error}</div>
      ) : (
        ""
      )}

      <div className="mb-3">
        <label htmlFor="title" className="font-semibold mb-1 block">
          Title
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          className="border-2 p-2 rounded border-[#999] w-full"
        />
        {formik.errors.title && formik.touched.title ? (
          <div className="bg-red-200 mt-1 text-sm p-3 rounded">
            {formik.errors.title}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="Price" className="font-semibold mb-1 block">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="Price"
          className="border-2 p-2 rounded border-[#999] w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.errors.price && formik.touched.price && (
          <div className="bg-red-200 mt-1 text-sm p-3 rounded">
            {formik.errors.price}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="font-semibold mb-1 block">
          description
        </label>
        <textarea
          name="desc"
          id="desc"
          className="border-2 p-2 h-35 rounded border-[#999] w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.desc}
        ></textarea>
        {formik.errors.desc && formik.touched.desc ? (
          <div className="bg-red-200 mt-1 text-sm p-3 rounded">
            {formik.errors.desc}
          </div>
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-5 rounded cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}
