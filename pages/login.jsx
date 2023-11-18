import { auth, provider } from '@/firebase'
import { Button } from '@material-ui/core'
import Head from 'next/head'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import styled from 'styled-components'

export default function Login () {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);


    const signIn = async() => {
        await signInWithGoogle();
    }
  return (
    <>
      <Container>
        <Head>
            <title>Login</title>
        </Head>

        <LoginContainer>
            <Logo src={"https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"}/>
            <Button onClick={signIn} variant='outlined'>Sign In with Google</Button>
        </LoginContainer>


      </Container>
    </>
  )
}

const Container = styled.div`
display:grid;
place-items:center;
height:100vh;
background-color:whiteSmoke;
`

const LoginContainer = styled.div`
display:flex;
padding:100px;
background-color:white;
flex-direction:column;
border-radius:5px;
box-shadow:0px 4px 14px -3px rgba(0,0,0,0.2);
`

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom:50px; 
`
