import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const [ submitting, setSubmitting ] = useState(false)

  const { username, password, passwordConf } = formData;

  function handleChange(event){
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }


  async function handleSubmit(event){
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid(){
    return !(username && password && password === passwordConf);
  };

  return (
    <form className='w-full flex justify-center' onSubmit={handleSubmit}>
     <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
        <CardDescription>
          Enter your username and password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                type='text'
                autoComplete='off'
                id='username'
                value={formData.username}
                name='username'
                onChange={handleChange}
                required
                placeholder="e.g., RonaldoSui"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

              </div>
              <Input             type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign-Up
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={()=> navigate('/sign-in')}>
          Login
        </Button>
      </CardFooter>
    </Card>
    </form>
  );
}
export default Signup;
