
import { fetchUser } from "@/lib/actions/user.actions";
import {  currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./thems";
import { PiHouseBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaThreads } from "react-icons/fa6";
const Navbar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo:any = await fetchUser(user.id);
  console.log("userinfo", userInfo);
  
  return (
    <div className="overflow-hidden z-50 w-full px-6 flex justify-around items-center gap-8 backdrop-filter backdrop-blur-[10px] sticky top-0 bg-opacity-40">
    <div className="text-3xl"><FaThreads /></div>
  
    <div className="w-full md:w-1/2 flex justify-between items-center text-2xl">
      <Link href="/" className="hover:bg-gray-100 hover:dark:bg-slate-900 p-6 rounded-lg"><PiHouseBold /></Link>
      <Link href="/create" className="hover:bg-gray-100 hover:dark:bg-slate-900 p-6 rounded-lg"><FaPenToSquare /></Link>
      <Link href="/search" className="hover:bg-gray-100 hover:dark:bg-slate-900 p-6 rounded-lg"><IoSearch /></Link>
      <Link href={`/profile/${userInfo?.id}`} className="hover:bg-gray-100 hover:dark:bg-slate-900 p-6 rounded-lg"><CgProfile /></Link>
    </div>
    
    <div className="hidden md:block">
      <ModeToggle />
    </div>
  </div>
  
  );
};

export default Navbar;
