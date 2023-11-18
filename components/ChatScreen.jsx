import { auth } from '@/firebase'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)

  return (
    <>
      <Container></Container>
    </>
  )
}
export default ChatScreen

const Container = styled.div``
