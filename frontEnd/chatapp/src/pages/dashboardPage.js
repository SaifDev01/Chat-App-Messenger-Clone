import React from 'react'
import makeToast from '../Toaster'
import axios from 'axios'
const dashboardPage = ()=>{
    return (
        <div className='card'>
            <div className='cardHeader'>ChatRoom</div>
                <div className='cardBody'>
                    <div className='inputGroup'>
                        <label htmlFor='name'>ChatRoom Name</label>
                        <input type="text" name= 'chatRoomName' id='chatRoomName' placeholder='John'/>

                    </div>
                </div>
                <button>Create ChatRoom</button>
                <div className='chatrooms'>
                    <div className='chatroom'>
                        <div>Happy Newbie</div>
                        <div className='join'> Join</div>
                    </div>
                    <div className='chatroom'>
                        <div>Happy Newbie</div>
                        <div className='join'> Join</div>
                    </div>
                    <div className='chatroom'>
                        <div>Happy Newbie</div>
                        <div className='join'> Join</div>
                    </div>
                </div>
                
        </div>
    )
}
export default dashboardPage
