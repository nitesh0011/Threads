'use client'
import { deletepost } from '@/lib/actions/user.actions'
import React from 'react'

const DeletButton = ({id}:{id:string}) => {
    
  return (
    <div>
    
     <form action={deletepost}>
       <input className=' hidden' type='text' name='id' id='id' value={id.toString()} />
       <button  name="deletePost">delete</button>
     </form>
     
    </div>
  )
}

export default DeletButton
