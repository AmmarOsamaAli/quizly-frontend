import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signIn } from '../services/authService'
import { useAuth } from '../context/AuthContext'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignInForm = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')

      const signedInUser = await signIn(formData)

      setUser(signedInUser)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Could not sign in'
      )
    }
  }

  return (
    <main className="h-[calc(100dvh-73px)] overflow-hidden bg-slate-50 px-4">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center">

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Card className="border border-slate-200 bg-white text-slate-900 shadow-sm">

            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-3xl font-bold">Sign in to Quizly</CardTitle>

              <CardDescription className="text-slate-500">
                Enter your username and password to continue.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-7">

                <div className="grid gap-2">
                  <Label htmlFor="username" className="font-medium text-slate-700">
                    Username
                  </Label>

                  <Input type="text" autoComplete="off" id="username" value={formData.username} name="username" onChange={handleChange} required placeholder="e.g. RonaldoSui" className="h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="font-medium text-slate-700">
                    Password
                  </Label>

                  <Input type="password" autoComplete="off" id="password" value={formData.password} name="password" onChange={handleChange} required className="h-12 border-slate-300 bg-white text-slate-900 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20" />
                </div>

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-5 border-t-0 bg-transparent pt-2">
              <Button type="submit" className="h-12 w-full rounded-md bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700">
                Sign In
              </Button>

              <Button type="button" variant="ghost" className="h-12 w-full rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => navigate('/sign-up')}>
                Create an Account
              </Button>
            </CardFooter>

          </Card>
        </form>

      </div>
    </main>
  )
}

export default SignInForm