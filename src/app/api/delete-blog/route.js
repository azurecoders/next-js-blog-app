import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is missing",
      });
    }

    await Blog.findByIdAndDelete(getCurrentBlogId);

    return NextResponse.json({
      success: true,
      message: "Blog Deleted Successfuly",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong... Please try again",
      error: error,
    });
  }
}
