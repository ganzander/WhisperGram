"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Login() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    const { email, password } = loginCredentials;

    if (!email || !password) {
      toast.error("Please fill in the form completely");
      return;
    }

    try {
      const result = await axios.post("/api/signin", { email, password });

      if (result.data.Success === true) {
        localStorage.setItem(
          "AuthToken",
          JSON.stringify(result.data.AuthToken)
        );
        toast.success(result.data.msg);
        router.push("/");
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    setLoginCredentials({ email: "", password: "" });
  }

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome Back to WhisperGram
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to continue your secret whispers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginCredentials.email}
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
                type="password"
                value={loginCredentials.password}
                onChange={onChange}
                autoComplete="off"
                required
              />
              <p
                className="mt-2 text-sm text-gray-300 cursor-pointer underline text-end"
                onClick={() => router.push("/loginOTP")}
              >
                Forgot Password?
              </p>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Not Registered?{" "}
            <span
              className="text-gray-300 cursor-pointer underline"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
