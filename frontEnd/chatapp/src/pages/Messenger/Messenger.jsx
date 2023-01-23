import React, {  useEffect, useRef, useState } from 'react'
import "./messenger.css"
import Conversation from '../../components/conversations/conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import axios from 'axios'
import {io} from "socket.io-client"
axios.defaults.withCredentials =true
export default function Messenger() {
  const[conversations , setConversation] = useState([])
  const[currentChat , setCurrentChat] = useState(null)
  const[messages ,  setMessages] = useState([])
  const[newMessages , setNewMessages] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([])
  const[arrivalMessages , setArrivalMessages] = useState(null)
  const[user , setUser] = useState([])
  const scrollRef = useRef()
  const socket = useRef()
  useEffect(()=>{
    socket.current = io("ws://localhost:8900")

    socket.current.on("getMessage", data =>{
      setArrivalMessages({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[])
  useEffect(()=>{
    arrivalMessages&&currentChat?.members.includes(arrivalMessages.sender) &&
    setMessages((prev)=>[...messages,arrivalMessages])

  }, [arrivalMessages, currentChat])

  useEffect(()=>{
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers" , users=>{
      // setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f)))
      // users
      setOnlineUsers(users.filter(i=>i.userId !==user._id))
    })
  },[user])
  
  

  useEffect(()=>{
    const getConversation = async ()=>{
      try{
      const res = await axios.get("http://localhost:4001/api/v1/getChatRoom",{withCredentials: "same-origin"})
      const user = await axios.get("http://localhost:4001/api/v1/user",{withCredentials: "same-origin"})
      setConversation(res.data.chatRoom)
      setUser(user.data.user)
      // console.log(res.data.chatRoom);
      // console.log(user.data.user);
    
    }catch(err){
      console.log(err);
    }
    }
    getConversation()
  }, [user. _id])
  // console.log(currentChat);
  useEffect(()=>{
    const getMessages = async()=>{
      try{
        const res = await axios.get("http://localhost:4001/api/v1/messages/"+currentChat?._id)
        // console.log(res.data);
        setMessages(res.data.messages)

      }catch(err){
        console.log(err);
      }
      
       
    }
    getMessages()
  },[currentChat])
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const message = {
      text : newMessages,
      conversationId : currentChat._id
    }
    const receiverId = currentChat.members.find(member =>member!==user._id)
    socket.current.emit("sendMessage",{
      senderId : user._id,
      receiverId,
      text : newMessages
    })
    try{
      const res = await axios.post("http://localhost:4001/api/v1/addMessage",message)
      setMessages([...messages, res.data.newMessage])
      setNewMessages("")
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
  })
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])
  // console.log(currentChat);
  return (
    <>
    <div className='messenger'>
      <div className='chatMenu'>
        <div className="chatMenuWrapper">

          <input placeholder='Search for Friend' className='chatMenuInput' />
          {conversations.map((c) => (
            <div onClick={()=>setCurrentChat(c)}> 
            <Conversation conversation = {c} currentUser = {user}/>
            </div>
          ))}
          {/* <Conversation/> */}
        </div>
      </div>

      <div className='chatBox'>
        <div className="chatBoxWrapper">
          {
            currentChat ?(
          <>
          <div className="chatBoxTop">
            {messages.map((m)=>(
              <div ref={scrollRef}><Message message = {m} own = {m.sender === user._id} /></div>
            
            ))}

          </div>
          <div className="chatBoxBottom">
            <textarea className='chatMessageInput' placeholder='Write a Message' onChange={(e)=>setNewMessages(e.target.value)} value= {newMessages} ></textarea>
            <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
          </div></> ):( <span className='noConversationText'>Open Conversation to Start Chat</span>)}
        </div>
      </div>
      <div className='chatOnline'>
        <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers = {onlineUsers} currentId = {user?._id} setCurrentChat = {setCurrentChat} />
          
        
        </div>
      </div>
    </div>

    </>
  )
}
