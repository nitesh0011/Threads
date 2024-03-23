'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { userValidations } from "@/lib/validations/user";
import { useForm } from "react-hook-form";
import { zodResolver, zodResolver as zr } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { useEdgeStore } from "@/lib/edgestore";
import { updateUser } from "@/lib/actions/user.actions";

import {  usePathname, useRouter } from "next/navigation";

interface props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
const AccountProfile =  ({ user, btnTitle }: props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { edgestore } = useEdgeStore();

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm <z.infer<typeof userValidations>>({
    resolver: zodResolver(userValidations),
    defaultValues: {
      profile_photo:user?.image ? user.image : "",
      name:user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });
 
  const handleImage =  (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    
    
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
     
  };

  async function onSubmit(values: z.infer<typeof userValidations>) {
    alert("form submitted");
   
    
    try {
      const res = await edgestore.publicFiles.upload({
        file: files[0],
      
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
        
      if (res && res.url) {
        values.profile_photo = res.url;
      }
      
    } catch (error:any) {
      console.log(error.message);
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image:  values.profile_photo,
      path: pathname,
    });
    router.push("/");
  }

  return (
    <div>
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    "😁"
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="upload  a photo"
                    onChange={(e) =>{ handleImage(e, field.onChange)}}
                  />
                  
                </FormControl>

                
              </FormItem>
            )}
          />
         

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="">Username</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfile;

