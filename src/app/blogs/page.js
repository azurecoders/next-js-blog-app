import BlogOverview from "@/components/blog-overview";
import React from "react";

const fetchListOfBlogs = async () => {
  try {
    const apiRepsonse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiRepsonse.json();
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const Blogs = async () => {
  const blogList = await fetchListOfBlogs();
  return <BlogOverview blogList={blogList} />;
};

export default Blogs;
