import CommentSection from "@/app/appcomponents/CommentSection";

import ThreadCard from "@/app/appcomponents/ThreadCard";
import {  fetchPostsComments } from "@/lib/actions/thred.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  
  
  const userInfo = await fetchUser(user.id);

  const result = await fetchPostsComments(params.id);
  console.log('result coments params',result)
 

  const text = result?.children.map((child: any) => {
    return [child.text, child.authorImage,child.userId.username,child._id,child.userId._id];
  });

 

  return (
    <main className="flex min-h-screen   items-center flex-col  px-24 pt-5 gap-3 ">
      <section className=" flex flex-col w-2/3  px-40  gap-3">
        <ThreadCard
          key={result?._id}
          id={result?._id}
          postAuthorId={result?.author?.id}
          
          content={result?.text}
          postAuthorUsername={result.author.username}
          postAuthorImg={result.author.image}
          postimage={result?.images}
          postAuthor_Id={result.author._id.toString()}
          postLike={result.likes} 
          userInfo_id={userInfo.id}        />
        <CommentSection
          key={result?._id}
          threadid={result?._id}
          userId={userInfo._id}
          parentId={result?.author?._id}
          authorImage={userInfo.image}
          comments={text}
          
          
        />
      </section>
    </main>
  );
};

export default page;
