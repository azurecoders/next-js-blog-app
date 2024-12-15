"use client";

import React, { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

const BlogOverview = ({ blogList }) => {
  const initialFormData = {
    title: "",
    description: "",
  };

  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleEditBlogById = async (blog) => {
    setOpenBlogDialog(true);
    setCurrentEditedBlogID(blog._id);
    setBlogFormData({
      title: blog?.title,
      description: blog?.description,
    });
  };

  const handleDeleteBlogByID = async (id) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
        method: "DELETE",
      });
      const data = await apiResponse.json();
      console.log(data);
      if (data?.success) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();

      if (result?.success) {
        setBlogFormData(initialFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogID(null);

        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setBlogFormData(initialFormData);
    } finally {
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blog, index) => (
            <Card key={index}>
              <CardContent>
                <CardHeader className="flex flex-col gap-3">
                  <CardTitle className="text-3xl">{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-5">
                  <Button onClick={() => handleEditBlogById(blog)}>Edit</Button>
                  <Button
                    onClick={() => handleDeleteBlogByID(blog._id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-5xl font-semibold">
            No Blog Found! Please create one
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
