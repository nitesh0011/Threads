"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thred";
import { createThread } from "@/lib/actions/thred.actions";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const [loading,setLoading]=useState(Number)
  const [files, setFiles] = useState<File[]>([]);
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      images: "",
      accountId: userId,
    },
  });
  const handleImage = (
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
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setLoading(0);
   
      try {
        const res = await edgestore.publicFiles.upload({
          file: files[0],
        
          onProgressChange: (progress) => {
           
            setLoading(progress);
          },
        });
          
        if (res && res.url) {
          values.images = res.url;
        }
        
      } catch (error:any) {
        console.log(error.message);
      }

   
    router.push("/");

    await createThread({
      text: values.thread ? values.thread:'',
      images: values.images ? values.images :'' ,
      author: userId,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col px-20 justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>
                {field.value ? (
                  <div className="  relative   h-28 w-28">
                    <Image
                      src={field.value}
                      alt="profile"
                      fill
                      priority
                      className="rounded-md object-cover   "
                    />
                  </div>
                ) : (
                  <p className="text-3xl">👨‍🦰</p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload  a photo"
                  onChange={(e) => {
                    handleImage(e, field.onChange);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormControl>
                <Textarea rows={10} {...field} className=" resize-none" placeholder="Captions are required when uploading photos. "/>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Post Thread</Button>
        {loading > 0 && <p className="text-sm mt-2">Progress: {loading}%</p>}
      </form>
    </Form>
  );
}
  
export default PostThread;
