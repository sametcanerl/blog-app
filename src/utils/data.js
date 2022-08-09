import { useEffect, useState } from "react";

import firebase from "./firebase";
import { ref,set,push, getDatabase, onValue, update, remove} from "firebase/database";




export const newBlog=(newTitle,newImageUrl,newContent,newBlogCreateTime,currentUserID,currentUserEmail)=>{
    
    const db = getDatabase(firebase);
    const userBlog=ref(db,"blog/")
    const newBlog=push(userBlog);

    set(newBlog,{
        newTitle:newTitle,
        newImageUrl:newImageUrl,
        newContent:newContent,
        newBlogCreateTime:newBlogCreateTime,
        uid:currentUserID,
        email:currentUserEmail
    })

}

export const useFetch=()=>{

    const [blogCards,setBlogCards]=useState();

   useEffect(() => {
       const db = getDatabase(firebase);
       const userBlog=ref(db,"blog/")
       onValue(userBlog,(snapshot)=>{
           const data=snapshot.val();
           const userArray=[]

           for (let id in data){
               userArray.push({id,...data[id]})
           }
           setBlogCards(userArray)
          
       })
   },[])
   return {blogCards}
}


 export const updateBlogFnc=(updateBlog)=>{

    const db = getDatabase(firebase);
    const updates={}
    updates["blog/"+ updateBlog.id]=updateBlog

    return update(ref(db),updates)

}

export const deleteBlog=(id)=>{
    const db = getDatabase(firebase);
    remove(ref(db,"blog/"+id));

}