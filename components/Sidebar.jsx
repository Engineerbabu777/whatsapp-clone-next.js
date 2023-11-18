import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatListItem from './ChatListItem'

function Sidebar () {
  const [user, loading] = useAuthState(auth)
  const [userChats, setUserChats] = useState([])

  const userChatRef = query(
    collection(db, 'chats'),
    where('users', 'array-contains', user?.email)
  )
  const [value] = useCollection(userChatRef)

  const data = value?.docs?.map(doc => ({ id: doc.id, ...doc.data() }))


  const createChat = async () => {
    const input = prompt('Enter am email address to start the chat with ?')

    if (!input) return null

    // VALIDATE THE EMAIL BY EMAIL PACAKAGE!
    if (EmailValidator.validate(input) && input !== user?.email) {
      const isProceeded = await chatAlreadyExists(input)
      if (isProceeded) return

      const collectionRef = collection(db, 'chats')
      addDoc(collectionRef, {
        users: [user?.email, input]
      }).then(() => console.log('created'))
    }
  }

  const chatAlreadyExists = async recipientEmail => {
    return data?.filter(chat => chat.users[1] === recipientEmail).length > 0
  }
  return (
    <>
      <Container>
        <Header>
          <UserAvatar onClick={async () => await signOut(auth)} src={user?.photoURL} />

          <IconsContainer>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconsContainer>
        </Header>

        {/* SEARCH */}
        <Search>
          <SearchIcon />
          <SearchInput />
        </Search>

        {/* SIDE BAR */}
        <SidebarButton onClick={createChat}>Start a Chat</SidebarButton>

        {/* LIST OF CHATS */}
        {value && (
          <>
            {value.docs.map(doc => (
                <ChatListItem id={doc.id} data={doc.data()} />
            ))}
          </>
        )}
      </Container>
    </>
  )
}

export default Sidebar

const Container = styled.div``

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whiteSmoke;
    border-bottom: 1px solid whiteSmoke;
  }
`

const Header = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whiteSmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``
