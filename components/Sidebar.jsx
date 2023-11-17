import { Avatar, Button, IconButton } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'

function Sidebar () {
  const createChat = () => {
    const input = prompt('Enter am email address to start the chat with ?')

    if (!input) return null

    // VALIDATE THE EMAIL BY EMAIL PACAKAGE!
    if (EmailValidator.validate(input)) {

    }
  }
  return (
    <>
      <Container>
        <Header>
          <UserAvatar />

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
