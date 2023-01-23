import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import "./conversation.css"
export default function Conversation({conversation, currentUser}) {
  const [user, setUser] =useState(null)
  useEffect(()=>{
    const friendId =conversation.members.find(m=>m!==currentUser?._id)
    const getUser  = async ()=>{
      try{
        const res = await axios.get("http://localhost:4001/api/v1/user/"+friendId, {withCredentials : "same-orgin"})
        // console.log(res.data.user);
        setUser(res.data.user)
      }catch(err){
        console.log(err);
      }
    }
    getUser()
    // console.log(user);
  }, [currentUser, conversation])


  return (
    <div className='conversation' >
        <img className='conversationImage' src={user?.avatar.url} />
        
        <span className='conversationName'>{user?.name}</span>
    </div>
  )
}
