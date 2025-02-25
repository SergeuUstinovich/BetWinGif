import style from './AuthForm.module.scss'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import GoogleSvg from '../../assets/svg/GoogleSvg/GoogleSvg'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterFrom/RegisterForm'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth, googleAuthUser } from '../../api/googleAuth'
import { googleLoginProps } from '../../types/GoogleAuth'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { useDispatch } from 'react-redux'
import { tokenActions } from '../../providers/StoreProvider'

function AuthForm() {
  const [authType, setAuthType] = useState<string>('auth')
  const [googleData, setGoogleData] = useState<googleLoginProps | undefined>()
  const dispatch = useDispatch()

  const handleClick = () => {
    setAuthType((prevState) => (prevState === 'register' ? 'auth' : 'register'))
  }

  const mutateGoogle = useMutation(
    {
      mutationFn: (data: { email: string; username: string }) =>
        googleAuthUser(data.email, data.username),
      onSuccess: (data) => {
        dispatch(tokenActions.initAuthData(data))
      },
    },
    queryClient
  )

  useEffect(() => {
    if (googleData) {
      mutateGoogle.mutate({
        email: googleData.email,
        username: googleData.email,
      })
    }
  }, [googleData])

  const handleSuccessGoogle = async (response: any) => {
    const result = await googleAuth(response)
    if (result) {
      const { email, username, lastname, id } = result
      setGoogleData({ email, username, lastname, id })
    }
  }

  const dataGoogle = useGoogleLogin({
    onSuccess: handleSuccessGoogle,
  })

  return (
    <>
      <div className={style.boxSwitch}>
        <h1>{authType === 'auth' ? 'Sign in' : 'Sign up'}</h1>
        <div className="flex justify-center items-center">
          <p className="mr-1">
            {authType === 'auth'
              ? 'Need an account?'
              : 'Already have an Account?'}
          </p>
          <Button className={style.btnSwitch} onClick={handleClick}>
            {authType === 'auth' ? 'Sign up' : 'Sign in'}
          </Button>
        </div>
      </div>
      <div className={style.boxGoogle}>
        <Button onClick={() => dataGoogle()} className={style.googleAuth}>
          <GoogleSvg />
          <p className={style.authDescr}>Use Google</p>
        </Button>
      </div>
      <div className={style.stroke}>
        <div className={style.lineBreack} />
        <p className={style.and}>OR</p>
        <div className={style.lineBreack} />
      </div>
      {authType === 'auth' ? <LoginForm /> : <RegisterForm />}
    </>
  )
}

export default AuthForm
