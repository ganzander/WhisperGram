"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginViaOTP() {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [loginViaOTP, setLoginViaOTP] = useState(true);
  const [enterOTP, setEnterOTP] = useState(false);

  const onChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const onOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const sendOTP = async (event) => {
    event.preventDefault();
    const { email } = loginCredentials;
    if (!email) {
      toast.error("Please fill in the email address");
      return;
    }

    try {
      const result = await axios.post("/api/sendOTP", { email });
      if (result.data.Success) {
        setLoginViaOTP(false);
        setEnterOTP(true);
        toast.success("OTP sent");
      } else {
        toast.error("You have not registered yet.\nPlease Register First");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    }
  };

  const verifyOTP = async (event) => {
    event.preventDefault();
    const { email } = loginCredentials;
    if (!email || !otp) {
      toast.error("Please fill in the OTP");
      return;
    }

    try {
      const result = await axios.post("/api/checkOTP", { email, otp });
      if (result.data.Success) {
        localStorage.setItem(
          "AuthToken",
          JSON.stringify(result.data.AuthToken)
        );
        router.push("/");
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl">
        <CardContent>
          {loginViaOTP && (
            <>
              <h1 className="text-2xl font-bold text-center mb-4">
                Password Assistance
              </h1>
              <form onSubmit={sendOTP} className="space-y-4">
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
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            </>
          )}

          {enterOTP && (
            <>
              <h1 className="text-2xl font-bold text-center mb-4">
                OTP Verification
              </h1>
              <form onSubmit={verifyOTP} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={onOTPChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Button type="submit">Verify OTP</Button>
                  <Button
                    onClick={sendOTP}
                    size={"lg"}
                    className="bg-black text-white hover:bg-gray-950 hover:text-white border"
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            </>
          )}

          <p className="text-center text-sm mt-6">
            Not Registered?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-gray-300 underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
