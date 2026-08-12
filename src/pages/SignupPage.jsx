import { useState } from "react"
import { useNavigate } from "react-router"
import { signUp } from "../services/authService"

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

function Signup() {
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  })

  const { username, password, passwordConf } = formData

  function handleChange(event) {
    setError("")

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSubmitting(true)
      setError("")

      await signUp(formData)

      navigate("/sign-in")
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Could not create account"
      )
    } finally {
      setSubmitting(false)
    }
  }

  function isFormInvalid() {
    return !(
      username &&
      password &&
      passwordConf &&
      password === passwordConf
    )
  }

  return (
    <main className="h-[calc(100dvh-73px)] overflow-hidden bg-slate-50 px-4">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center">

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Card className="border border-slate-200 bg-white text-slate-900 shadow-sm">

            <CardHeader className="space-y-4 text-center">
              <CardTitle className="text-3xl font-bold">Create your account</CardTitle>

              <CardDescription className="text-slate-500">
                Create an account to host quizzes and join live games.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-7">

                <div className="grid gap-2">
                  <Label htmlFor="username" className="font-medium text-slate-700">
                    Username
                  </Label>

                  <Input type="text" autoComplete="off" id="username" value={username} name="username" onChange={handleChange} required placeholder="e.g. RonaldoSui" className="h-12 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="font-medium text-slate-700">
                    Password
                  </Label>

                  <Input type="password" autoComplete="off" id="password" value={password} name="password" onChange={handleChange} required className="h-12 border-slate-300 bg-white text-slate-900 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="passwordConf" className="font-medium text-slate-700">
                    Confirm Password
                  </Label>

                  <Input type="password" autoComplete="off" id="passwordConf" value={passwordConf} name="passwordConf" onChange={handleChange} required className="h-12 border-slate-300 bg-white text-slate-900 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20" />
                </div>

                {passwordConf && password !== passwordConf && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-medium text-amber-700">
                    Passwords do not match.
                  </div>
                )}

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-5 border-t-0 bg-transparent pt-2">
              <Button type="submit" disabled={isFormInvalid() || submitting} className="h-12 w-full rounded-md bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">
                {submitting ? "Creating Account..." : "Sign Up"}
              </Button>

              <Button type="button" variant="ghost" className="h-12 w-full rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => navigate("/sign-in")}>
                Already have an account? Sign In
              </Button>
            </CardFooter>

          </Card>
        </form>

      </div>
    </main>
  )
}

export default Signup