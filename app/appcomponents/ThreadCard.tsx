"use client";
import Image from "next/image";
import Link from "next/link";

import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";

import LikeButton from "./LikeButton";



interface Props {
  id: string;
  content: string;
  postimage: string;
  postAuthorId: string;
  postAuthorImg: string;
  postAuthorUsername: string;
  postLike:[];
  postAuthor_Id:string;
  userInfo_id:string;

}

function ThreadCard({
  id,
  content,
  postimage,
  postAuthorId,
  postAuthorImg,
  postAuthorUsername,
  postLike,
  postAuthor_Id,
  userInfo_id

}: Props) {

  return (
    <>
 <article className="flex flex-col pb-5">
  <div className="w-full sm:py-4 sm:px-4 flex items-center justify-center">
    <div className="h-[1.5px] bg-gray-200 dark:bg-slate-800 w-full"></div>
  </div>
  <div className="flex items-start justify-between">
    <div className="flex  flex-1 flex-row gap-4">
      <div className="flex flex-col items-center">
        <Link href={`/profile/${postAuthorId}`} className="relative h-11 w-11">
          <Image src={postAuthorImg} alt="logo" fill className="rounded-full object-cover shadow-2xl min-h-11 min-w-11" />
        </Link>
        <div className="h-full flex items-center justify-center py-3">
          <div className="h-full bg-gray-200 dark:bg-slate-800 w-[2.5px]"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full flex">
          <a href={`/profile/${postAuthorId}`} className="w-fit">
            <h4 className="cursor-pointer text-base-semibold text-light-1">{postAuthorUsername}</h4>
          </a>
          <div className="ml-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Follow</button>
          </div>
        </div>
        <p className="mt-2 text-small-regular text-light-2 py-2">{content}</p>
        <div className=" overflow-hidden ">
          {postimage ? (
            <div className="relative min-h-96 min-w-72" id='img'>
              <Image src={postimage} alt="images" fill className="rounded-md object-cover  " />
            </div>
          ) : ""}
        </div>
        <div className="flex py-4 text-xl gap-4">
          <div>
          <div ><LikeButton threadId={id} postLike={postLike} userInfo_id={userInfo_id} postAuthor_Id={postAuthor_Id} /></div>
          </div>
          <FaRegShareFromSquare />
          <Link href={`/${id}`}>
            <FaRegCommentDots />
          </Link>
        </div>
      </div>
    </div>
  </div>
</article>

    </>
  );
}

export default ThreadCard;
