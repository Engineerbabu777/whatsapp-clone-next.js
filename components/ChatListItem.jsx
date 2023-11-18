import { auth, db } from '@/firebase'
import { getRecipientEmail } from '@/utils/getRecipientEmail'
import { Avatar } from '@material-ui/core'
import { collection, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

export default function ChatListItem ({ data, id }) {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter();

  const [value] = useCollection(
    query(
      collection(db, 'users'),
      where('email', '==', getRecipientEmail(data.users, user))
    )
  )

  const enterChat = () => {
     router.push('/chat/'+id)
  }

  return (
    <>
      {value && (
        <>
          {value.docs.map(doc => (
            <Container onClick={enterChat}>
              <UserAvatar src={doc.data().photoURL} />
              <div>{doc.data().email}</div>
            </Container>
          ))}
        </>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 5px;
  margin-right: 15px;
  :hover {
    opacity: 0.8;
  }
`
