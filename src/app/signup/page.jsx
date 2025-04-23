"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Signup() {
  const router = useRouter();
  const [passShow, setPassShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAvailable, setIsAvailable] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password } = credentials;
    if (!name || !email || !password) {
      toast.error("Please fill in the form completely");
      return;
    }

    try {
      const result = await axios.post("/api/createuser", {
        name,
        email,
        password,
      });

      if (result.data.Success) {
        toast.success("Successfully registered");
        router.push("/login");
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }

    setCredentials({ name: "", email: "", password: "" });
  }

  useEffect(() => {
    const { name } = credentials;
    if (!name) return;

    axios
      .post("/api/check-username-unique", { name })
      .then((result) => {
        setIsAvailable(result.data.Success);
      })
      .catch((err) => console.error(err));
  }, [credentials.name]);

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-2">
            Join WhisperGram
          </h1>
          <p className="text-sm text-center mb-6 text-muted-foreground">
            Sign up to start your whisperous adventure
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  autoComplete="off"
                  required
                />
                {credentials.name && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isAvailable ? (
                      <Check className="text-green-600 w-5 h-5" />
                    ) : (
                      <X className="text-red-600 w-5 h-5" />
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={passShow ? "text" : "password"}
                value={credentials.password}
                onChange={onChange}
                autoComplete="off"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isAvailable === false}
              className="w-full"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already a member?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-gray-300 underline cursor-pointer"
            >
              Log In
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
