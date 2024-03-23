"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thred.models";
import User from "../models/user.models";
import { connect } from "../mongoose";
import ThreadComment from "../models/comments.model";

interface params {
  text: string;
  author: string;
  path: string;
  images: string;
}
interface Commentparams {
  text: string;
  threadId: string;
  userId: string;
  authorImage: string;
  path: string;
}

export async function createThread({ text, images, author, path }: params) {
  try {
    connect();

    const createThread = await Thread.create({ text, images, author });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
    return createThread;
  } catch (error: any) {
    console.log("error in creating thread", error.message);
  }
}

export async function createThreadComment({
  text,
  threadId,
  authorImage,
  userId,
  path
}: Commentparams) {
  try {
    connect();

    const createThreadComment = await ThreadComment.create({
      text,
      threadId,
      authorImage,
      userId,
      path
    });

    await Thread.findByIdAndUpdate(threadId, {
      $push: { children: createThreadComment._id },
    });

    revalidatePath(path);
    return createThreadComment;
  } catch (error: any) {
    console.log("error in creating thread", error.message);
  }

}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connect();
    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery =await Thread.find()
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .populate({
        path: "author",
        model: User,
      })

    return  postsQuery ;
    
  } catch (error: any) {
    console.log("error in creating thread", error.message);
  }
}

export async function fetchPostsComments(threadId: string) {
  try {
    connect();

    const postsQuery = Thread.findOne({ _id: threadId })
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children",
        model: ThreadComment,
        select: " text authorImage userId ",
        populate: {
          path: "userId",
          model: User,
          select: " username name "
        }

      })

    const posts = await postsQuery.exec();
    revalidatePath(`/${threadId}`)
    return posts;
  } catch (error: any) {
    console.log("error in creating thread", error.message);
  }
}
