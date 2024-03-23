import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletButton from "./DeletPostButton";
import LikeButton from "./LikeButton";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: any;
  postimage: string;
  author: string;
  authorImage:string;
  createdAt: string;
  username:string;
  isComment?: boolean;
  postLike:[];
}

function FetchCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  authorImage,
  postimage,
  createdAt,
  username,
  isComment,
  postLike
}: Props) {
  return (
    <article
      className={`flex  w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex  items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="relative h-11 w-11">
              <Image
                src={authorImage}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl "
              />
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div  className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {username}
              </h4>
            </div>

            <p className="mt-2 text-small-regular text-light-2 py-2">
              {content}
            </p>
            {postimage ? (
              <Image src={postimage} alt={"images"} height={100} width={100} />
            ) : (
              ""
            )}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
              <div ><LikeButton threadId={id} postLike={postLike} postAuthor_Id={author} userInfo_id={""}/></div>
                <FaRegShareFromSquare />
                <Link href={`/${id}`}>
                  <FaRegCommentDots />
                </Link>
              </div>
            </div>
          </div>

          <div className=''>
           {id != ""? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size='sm' className="text-2xl ">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="  bg-yellow-200">
                <DropdownMenuItem className=""><DeletButton id={id.toString()} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>:""}
          </div>
        </div>
      </div>
    </article>
  );
}

export default FetchCard;
