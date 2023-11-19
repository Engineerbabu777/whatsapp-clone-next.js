import ChatScreen from '@/components/ChatScreen'
import Sidebar from '@/components/Sidebar'
import { auth, db } from '@/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'

export default function Index ({ chat, messages }) {
  const [user] = useAuthState(auth)
  return (
    <>
      <Container>
        <Head>
          <title>Chat</title>
        </Head>

        <Sidebar />

        <ChatContainer>
          <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
      </Container>
    </>
  )
}

export async function getServerSideProps (context) {
  const ref = collection(db, 'chats')

  // PREPARE THE MESSAGES ON THE SERVER!
  const queryMake = query(collection(db,'chats', context.query.id,'messages'),orderBy('timestamp','asc'))
  const messages = await getDocs(queryMake)
  // GET THE SPECIFIC CHAT!
  const currentUser = await getDoc(doc(ref, context.query.id))

  const data = messages.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .map(message => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime()
    }))

  const chat = { id: currentUser.id, ...currentUser.data() }

  console.log({ chat, data,messages })

  return {
    props: { chat: JSON.stringify(chat), messages: JSON.stringify(data) }
  }
}

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`
