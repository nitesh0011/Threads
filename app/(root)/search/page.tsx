"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAllUsers } from "@/lib/actions/user.actions";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resArr, setResArr] = useState<[]>([]);

  const getResult = async (searchTerm: string) => {
    const res: any = await fetchAllUsers(searchTerm);
    setResArr(res);
   
  };

  return (
    <div className="flex flex-col gap-5  justify-between items-center">
      <div className="flex gap-4 w-full justify-center items-center">
        <Input
          className="w-[20%]"
          type="text"
          name="search"
          placeholder="enter your name.."
          onChange={(e) => getResult(e.target.value)}
        />

        <Button onClick={() => getResult(searchTerm)}>search</Button>
      </div>

      <div className="w-full flex flex-col gap-2 justify-center items-center">
        {resArr
          ? resArr.map((user: any) => (
            <div key={user.id} className="flex gap-2  w-[20%]">
              <div className="relative h-10 w-10 object-cover">

                <Link href={`/profile/${user.profileId}`} className="">
                  <Image
                    src={user.image}
                    alt="logo"
                    fill
                    className="rounded-full object-cover shadow-2xl"
                  />
                </Link>
              </div>
              <p>{user.name}</p>
            </div>
           
          ))
          :
          <>
            no user found
          </>
        }

      </div>
    </div>
  );
};

export default Page;
