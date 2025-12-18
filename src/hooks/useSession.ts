import { adminAuthClient } from '@/utils/auth/auth'
import { useEffect, useState } from 'react'

export const useSession = () => {
  const [loading, setLoading] = useState<boolean>()
  const [session, setSession] = useState({
    data: {},
    message: '',
    isSuccess: false,
  } as {data: any, message: string, isSuccess: boolean})

  useEffect(() => {
    setLoading(true)
    const fetchSession = async () => {
        const { data, isSuccess, message } = await adminAuthClient.getClientSession()

        if (!isSuccess) {
            setSession({
            data: {},
            message,
            isSuccess,
            })
        }

        try {
            //@ts-ignore
            const req: any = await fetch('/api/users/' + data.user.id)
            const res: any = await req.json()
            //@ts-ignore
            data.user = res
        } catch (err) {
            console.log(err)
        }

        setSession({
            data,
            message,
            isSuccess,
        })
        setLoading(false)
    }
    fetchSession()
  }, [])

  return {
    loading,
    ...session,
  }
}