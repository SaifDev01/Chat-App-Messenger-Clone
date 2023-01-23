import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./chatOnline.css"

export default function ChatOnline(onlineUsers, currentId,setCurrentChat) {
  const [onlineFriends , setOnlineFriends] =useState([])
  const [friends , setFriends] =useState([])

  // useEffect(()=>{
  //   const getFriends = async ()=>{
  //     // console.log(currentId)
  //     const res = await axios.get("http://localhost:4001/api/v1/user/"+currentId,{withCredentials: "same-origin"})
  //     setFriends(res.data)
  //     console.log(res.data);
  //   }
  //   getFriends()
  // }, [currentId]
  
  // )
  
  // console.log(friends)

  // useEffect(()=>{
  //   setOnlineFriends(onlineUsers)
  // },[onlineUsers])
  // console.log(onlineUsers)
 



  return (
    <div className="chatOnline">
      {/* {onlineFriends.map((o)=>( */}
        <div className="chatOnlineFriend">
            <div className="chatOnlineImageContainer">
                <img className='chatOnlineImage' src="" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className='chatOnlineName'>saif</span>
            
        </div>
        {/* ))} */}
    </div>
  )
}
