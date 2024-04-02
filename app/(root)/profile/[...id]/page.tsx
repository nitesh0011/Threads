import ProfileHeader from "@/app/appcomponents/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FetchCard from "@/app/appcomponents/FetchCard";


const ProfileCommentpage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo:any = await fetchUser(params.id);
  console.log("userInfo from params",userInfo)
 

  return (
    <div className=" px-56 h-full w-full  ">
      <ProfileHeader
        accountId={userInfo?.id}
        authUserId={user?.id}
        name={userInfo?.name}
        username={userInfo?.username}
        image={userInfo?.image}
        bio={userInfo?.bio}
      />

      <div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">posts <p className="px-3">{userInfo?.threads.length>0 ?userInfo?.threads.length:'0' }</p></TabsTrigger>
            <TabsTrigger value="Tagged">Tagged</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="" >
            {userInfo?.threads.map((post: any) => (
              <FetchCard
                key={userInfo._id}
                id={userInfo.id != user.id ? "":post._id}
                currentUserId={userInfo.id}
                parentId={post.author.toString()}
                content={post.text}
                author={post.author}
                postimage={post.images}
                createdAt={post.createdAt}
                authorImage={userInfo.image}
                username={userInfo.username}
                postLike={post.likes}  
              />
            ))}
          </TabsContent>
          <TabsContent value="tags">tags</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileCommentpage;
