import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/app/appcomponents/PostThread";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo:any = await fetchUser(user.id);

  return (
    <>
      <PostThread userId={userInfo?._id.toString()} />
    </>
  );
}

export default Page;
