import { auth, db } from '@/firebase'
import '@/styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import Loading from '@/components/Loading'
import { useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export default function App ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, 'users', `${user?.uid}`),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL
        },
        { merge: true }
      ).
      then(
        () => {
          console.log('user set')
        }
      ).
      catch(
        // eslint-disable-next-line
        (error) => {
          console.log('user set failed')
        }
      )
    }
  }, [user])
  if (loading) return <Loading />

  if (!user) {
    return <Login />
  }

  return <Component {...pageProps} />
}
