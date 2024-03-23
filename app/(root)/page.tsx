import { fetchPosts } from "@/lib/actions/thred.actions";

import { currentUser } from "@clerk/nextjs";
import ThreadCard from "../appcomponents/ThreadCard";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PostComponent from "../appcomponents/PostComponent";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const result = await fetchPosts();
  console.log("resulttt", result);

  return (
    <>
      <main className="flex min-h-screen flex-col  sm:px-24 pt-5 gap-2 ">
        <div className=" w-full flex items-center justify-center">
          <div className=" w-2/4 py-2 flex gap-3 justify-between items-center">
            <Link
              href={`/profile/${userInfo?.id}`}
              className="relative  h-11 w-14 "
            >
              <Image
                src={userInfo?.image}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </Link>
            <div className=" w-full">
              <PostComponent
                image={userInfo.image}
                username={userInfo.username}
                userId={userInfo._id}
                usergoogleid = {userInfo.id}
              />
            </div>

            <div>
              <Button variant={"secondary"} className="rounded-full">
                Post
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-2 flex  items-center justify-center flex-col gap-10">

          {
            result ? result.map((post, index) => {
              return <div className=" w-1/2" >
                <ThreadCard
                key={index}
                content={post?.text}
                id={post?._id.toString()}
                postLike={post?.likes}
                postimage={post?.images}
                postAuthorUsername={post?.author?.username}
                postAuthorImg={post?.author?.image}
                postAuthorId={post?.author?.id}
                postAuthor_Id={post?.author?._id?.toString()}
                userInfo_id={userInfo._id}
                />
                </div>
            }):"no posts found"
          }

          
        </section>
      </main>
    </>
  );
}
