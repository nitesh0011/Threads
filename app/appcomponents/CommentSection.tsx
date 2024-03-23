"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createThread, createThreadComment } from "@/lib/actions/thred.actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thred";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletButton from "./DeletPostButton";
import DeletCommentButton from "./DeleteCommentButton";

interface params {
  authorImage: string;
  userId: any;
  threadid: string;
  comments: any;
  parentId:any;
}

const CommentSection = ({
  authorImage,
  threadid,
  userId,
  comments,
  parentId
}: params) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: threadid,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    

    await createThreadComment({
      text: values.thread,
      authorImage: authorImage,
      userId: userId,
      threadId: threadid,
      path: pathname,
    });
  };
  return (
    <div className=" w-full p-4 rounded-md ">
      <div className="flex w-full gap-3">
        <div className="relative h-11 w-11">
          <Image
            src={authorImage}
            alt="logo"
            fill
            className="rounded-full object-cover shadow-2xl"
          />
        </div>
        <Form {...form}>
          <form
            className=" flex items-center w-full  px-3  gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="w-full flex  items-center  gap-3">
                  <FormControl className="w-full">
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Enter comments"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" w-1/5 " type="submit">
              Post 
            </Button>
          </form>
        </Form>
      </div>

      {/* fetch comments */}

      <div className="flex flex-col h-96 mt-3    gap-2">
        {comments && (
          <ul className="comments-list h-full   ">
            {comments.map((commentPair: any) => (
              <li key={commentPair[0]} className="flex gap-2 mt-4 px-4">
                <div className="relative h-9 w-9">
                  <Image
                    src={commentPair[1]}
                    alt="logo"
                    fill
                    className="rounded-full object-cover shadow-2xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{commentPair[2]}</p>
                  <p className=" font-light">{commentPair[0]}</p>
                </div>
                <div className="ml-auto">
                  {parentId != commentPair[4]?"": <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-2xl ">
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem>
                        <DeletCommentButton commentid={commentPair[3]} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
