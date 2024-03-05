import { authMiddleware } from "@clerk/nextjs";

// allowing public access to this api endpoint so clerk can ping it with new events
export default authMiddleware({
  publicRoutes: ['/api/webhooks/clerk']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

//checking if github is working