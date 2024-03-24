'use client'
import { dislikepost, likepost } from '@/lib/actions/user.actions'
import React, { useState } from 'react'
import { AiFillLike,AiFillDislike } from "react-icons/ai";
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
interface params {
    threadId: string;
    postLike: [] | any;
    postAuthor_Id: string;
    userInfo_id: string;
}
const LikeButton = ({ threadId, userInfo_id, postLike }: params) => {
const [dislike,setDislike]=useState(false)
    function func() {
        setDislike(!dislike)
    }
    function func2(){
        setDislike(false)
    }
    return (
        <div className='flex gap-4'>
            <form action={likepost}>
                <input className=' hidden' type='text' name='id' id='id' value={threadId} />
                <button type='submit' id="LikePost" className='text-2xl' onClick={func2} >
                    {postLike.includes(userInfo_id) ? <><AiFillLike /></> : <><AiOutlineLike /></>}
                </button>
            </form>

            <form action={dislikepost}>
                <input className=' hidden' type='text' name='id' id='id' value={threadId} />
                <button type='submit' id="dislikePost" className='text-2xl'  onClick={func} >
                    {dislike?<><AiFillDislike/></>:<><AiOutlineDislike/></>}
                </button>
            </form>


        </div>
    )
}

export default LikeButton