import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const extractAllBlogsFromDB = await Blog.find();
    if (!extractAllBlogsFromDB) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }

    return NextResponse.json({
      success: true,
      data: extractAllBlogsFromDB,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
