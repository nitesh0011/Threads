'use client'
import { deleteCommentpost } from '@/lib/actions/user.actions'
import React from 'react'

const DeletCommentButton = ({commentid}:{commentid:string}) => {
    
  return (
    <div>
    
     <form action={deleteCommentpost}>
       <input className='hidden ' type='text' name='commentid' id='commentid' value={commentid.toString()} />
       <button  name="deletePost">delete</button>
     </form>
     
    </div>
  )
}

export default DeletCommentButton;
