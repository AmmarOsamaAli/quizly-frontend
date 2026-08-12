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
    <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          <Card className="border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur-xl">

            <CardHeader className="space-y-3 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                Welcome Back
              </p>

              <CardTitle className="text-3xl font-black">
                Sign in to Quizly
              </CardTitle>

              <CardDescription className="text-slate-400">
                Enter your username and password to continue.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                  <Label
                    htmlFor="username"
                    className="font-semibold text-slate-300"
                  >
                    Username
                  </Label>

                  <Input
                    type="text"
                    autoComplete="off"
                    id="username"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    required
                    placeholder="e.g. RonaldoSui"
                    className="h-12 border-white/10 bg-black/20 text-white placeholder:text-slate-600 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="font-semibold text-slate-300"
                  >
                    Password
                  </Label>

                  <Input
                    type="password"
                    autoComplete="off"
                    id="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                    className="h-12 border-white/10 bg-black/20 text-white focus-visible:border-cyan-400 focus-visible:ring-cyan-400/20"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-center text-sm font-semibold text-red-300">
                    {error}
                  </div>
                )}

              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-cyan-400 font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Sign In
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="h-12 w-full rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
                onClick={() => navigate('/sign-up')}
              >
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