"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connect } from "../mongoose";
import Thread from "../models/thred.models";
import { currentUser } from "@clerk/nextjs";
import ThreadComment from "../models/comments.model";



export async function fetchUser(userId: string) {
  try {
    connect();

    return await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      select: "text author images children likes",
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: params): Promise<void> {
  try {
    connect();
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image },
      { upsert: true }
    );

    if (path === "profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log("error", error.message);
  }
}

export async function deletepost(formData: FormData) {
  try {
    // Connect to the database (assuming your connection logic is elsewhere)
    await connect();

    const data = {
      id: formData.get("id"),
    };

    // Fetch the thread to be deleted
    const threadToDelete = await Thread.findById(data.id);

    if (!threadToDelete) {
      // Handle the case where the post is not found (e.g., return an error)
      throw new Error("Post not found");
    }

    // Update "children" arrays in other threads that reference the deleted one
    await Thread.updateMany(
      { children: { $in: [threadToDelete._id] } }, // Find threads with the deleted ID in "children"
      { $pull: { children: threadToDelete._id } } // Pull the deleted ID from "children" in those threads
    );

    // Delete the thread
    await Thread.findByIdAndDelete(data.id);

    //deletion of commets

    revalidatePath('/'); // Consider revalidating specific routes if applicable
  } catch (error: any) {
    console.error("Error:", error.message);
    // Handle other potential errors gracefully (e.g., display an error message to the user)
  }
}

export async function deleteCommentpost(formData: FormData) {

  try {
    const data = {
      commentid: formData.get("commentid"),
    };
    const commentsToDelete = await ThreadComment.findById(data.commentid);
    if (!commentsToDelete) {

      throw new Error("Post not found");
    }

    await ThreadComment.findByIdAndDelete(data.commentid);

    revalidatePath('/[id]');
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

export async function likepost(formdata: FormData) {
  try {
    connect();

    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);

    const data = {
      id: formdata.get("id"),
    };

  
    const updateddata = await Thread.findByIdAndUpdate(data?.id,{
      $addToSet: { likes:  userInfo._id }, // Push user ID to the likes array
    },
    { new: true } );
    console.log("updated-->", updateddata);

    revalidatePath("/")
  } catch (error: any) {
    console.log("error", error.message);
  }
}

export async function dislikepost(formdata: FormData) {
  try {
    connect();
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);


    const data = {
      id: formdata.get("id"),
    };

    //   const updateData = {
    //     likes: userInfo._id,
    // };
    const updateddata = await Thread.findByIdAndUpdate(data?.id, {
      $pull: { likes: userInfo._id  },
    });
    console.log("updated-->", updateddata);
    revalidatePath("/")
  } catch (error: any) {
    console.log("error", error.message);
  }
}

export async function fetchAllUsers(str: string) {
  try {
    connect();

    let searchtring = `${str.toLowerCase()}`;

    const res = await User.find({
      $or: [{ name: { $regex: searchtring, $options: "i" } }],
    });
    const userResults = res.map((user) => ({
      id: user._id.toString(),
      profileId: user.id.toString(),
      name: user.name,
      image: user.image,
    }));

    return userResults;
  } catch (error: any) {
    console.log("error", error.message);
  }
}
