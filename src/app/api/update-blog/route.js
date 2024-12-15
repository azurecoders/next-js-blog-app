import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    const { title, description } = await req.json();

    const { error } = EditNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    if (!getCurrentBlogId)
      return NextResponse.json({
        sucsess: false,
        message: "Blog Id is required",
      });

    const updateBlogByBlogId = await Blog.findByIdAndUpdate(
      getCurrentBlogId,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updateBlogByBlogId)
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });

    return NextResponse.json({
      success: true,
      message: "Blog Updated Successfuly",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
