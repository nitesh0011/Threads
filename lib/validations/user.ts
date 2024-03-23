import { z } from "zod";
export const userValidations = z.object({
  profile_photo: z.string().url().min(1),
  name:z.string().min(3).max(30),
  username:z.string().min(3).max(30),
  bio:z.string().min(3).max(1000),
})




// export const userValidations = z.object({
//   profile_photo: z.string().url().min(1),
//   name: z.string().min(3).max(30),
//   username: z.string()
//     .min(3)
//     .max(30)
//     .refine((username, ctx) => {
//       // Replace with your actual username uniqueness check logic (e.g., database call)
//       const isUnique = checkUsernameUniqueness(username); // This function should return true/false
//       if (!isUnique) {
//         ctx.addIssue({
//           code: "custom",
//           message: "Username is already taken",
//         });
//       }
//     }),
//   bio: z.string().min(3).max(1000),
// });

// // This function is just an example and needs to be implemented based on your data storage method
// function checkUsernameUniqueness(username) {
//   // Simulate an asynchronous database check
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(availableUsernames.includes(username)); // Replace with your actual check
//     }, 1000); // Simulate a delay
//   });
// }

// const availableUsernames = ["johnDoe", "janeDoe", "admin"]; // Replace with your actual data source
