"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import PostThread from "./PostThread";
import ModalPostThread from "./modalPostThread";
interface params{
    image:string;
    username:string;
    userId:any;
    usergoogleid:any;
}
const PostComponent = ({image,username,userId,usergoogleid}:params) => {
  
  const [showModal, setShowModal] = useState(false);

  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col w-full" >
        <div
          className="w-full p-3 text-left rounded-md "
          onClick={() => setShowModal(true)}
        >
          Start a thread...
        </div>
      
      </div>
      {showModal && (
        <div
          id="modal"
          className="  fixed top-0 left-0  black:bg-black bg-black text-black  bg-opacity-65 z-50   p-2 h-full w-full rounded-lg shadow-xl "
          // Hide modal on outer click as well
          
        >
          <div className=" rounded-lg shadow-md flex  flex-col gap-4 p-4 h-96 w-1/2 mx-auto  mt-52  bg-slate-50">
            <button
              className="text-red-500 text-left hover:text-red-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <div className="w-full h-full flex  gap-3">
            <div
              
              className="relative  h-11 w-11 "
            >
              <Image
                src={image}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <div className="flex flex-col w-full ">
             {username}
             <ModalPostThread userId={userId.toString()} usergoogleid={usergoogleid} />
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostComponent;
