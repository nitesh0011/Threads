import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
 
export default authMiddleware({

    



  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
   
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  publicRoutes:['/sign-in','/sign-up']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};