import { auth, db } from '@/firebase'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { IconButton, Avatar } from '@material-ui/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore'
import Messages from './Messages'
import { InsertEmoticon, Mic } from '@material-ui/icons'
import { getRecipientEmail } from '@/utils/getRecipientEmail'
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {

  console.log({chat:JSON.parse(chat),messages})
  const [user] = useAuthState(auth)
  const router = useRouter()

  const endOfMessagesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' , block:'start'})
  }
  const [input, setInput] = useState('')

  const [value] = useCollection(
    query(collection(db, `chats`, router.query.id, 'messages'),orderBy('timestamp','asc'))
  )
  const email = JSON.parse(chat).users[0] === user?.email ? JSON.parse(chat).users[1] : JSON.parse(chat).users[0]

  const [value2] = useCollection(query(collection(db,'users'),where('email','==',email)))

  console.log(value2?.docs[0]?.data())

  const showMessages = () => {
    if (value) {
      return value.docs.map(doc => (
        <>
          <Messages
            key={doc.id}
            user={doc.data().user}
            message={{
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate().getTime()
            }}
          />
        </>
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Messages key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const sendMessage = async e => {
    e.preventDefault()

    // UPDATE THE LAST SEEN!
    const userRef = doc(collection(db, 'users'), user?.uid)
    setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true })


    const chatRef = collection(db, `chats`, router.query.id, 'messages')
    addDoc(
      chatRef,
      {
        timestamp: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user?.photoURL
      },
      {
        merge: true
      }
    )

    setInput('')
    scrollToBottom();
  }

  const container = useRef(null);

  // window.scrollTo(0, )
  container?.current?.scrollTo({ left: 0, top: container?.current?.scrollHeight, behavior: "smooth" });


  return (
    <>
      <Container>
        <Header>
          <Avatar src={value2?.docs[0]?.data()?.photoURL}/>

          <HeaderInformation>
            <h3>{email}</h3>
            {value2 && <span><p>Last Seen:</p> {value2?.docs[0]?.data().lastSeen?.toDate().toString().slice(15,24)}{console.log(value2?.docs[0]?.data().lastSeen?.toDate().toString().slice(15,24))}</span>}
          </HeaderInformation>

          <HeaderIcons>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </HeaderIcons>
        </Header>

        <MessageContainer ref={container}>
          {showMessages()}
          <EndOfMessages ref={endOfMessagesRef}/>
        </MessageContainer>

        <InputContainer>
          <InsertEmoticon />
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <button
            hidden
            disabled={!input}
            onClick={sendMessage}
            type={'submit'}
          >
            send message
          </button>
          <Mic />
        </InputContainer>
      </Container>
    </>
  )
}
export default ChatScreen

const Container = styled.div``

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whiteSmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border: 1px solid whiteSmoke;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  p {
    color: gray;
    font-size: 14px;
  }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessages = styled.div`
margin-bottom:50px;
`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`
