import { styled } from 'styled-components'

import React from 'react'
import { auth } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'

function Messages ({ user, message }) {
  const [userLoggedin] = useAuthState(auth)

  const TypeOfMessage = userLoggedin?.email === user ? Sender : Receiver

  return (
    <>
      <Container>
        {/* message */}
        <TypeOfMessage>
          {message.message}
          <Timestamp>
            {message?.timestamp ? moment(message.timestamp).format('LT') : '...'}
          </Timestamp>
        </TypeOfMessage>
      </Container>
    </>
  )
}

export default Messages

const Container = styled.div``

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const Receiver = styled(MessageElement)`
  background-color: whiteSmoke;
  text-align: left;
`

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
