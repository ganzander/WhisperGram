"use client";

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function SendMessage() {
  const params = useParams();
  const [msg, setMsg] = useState("");
  const [suggestedMsg, setSuggestedMsg] = useState([
    "What's your favorite movie?",
    "Do you have any pets?",
    "What's your dream job?",
  ]);

  function handleMsgChange(e) {
    setMsg(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { username } = params;

    try {
      const result = await axios.post("/api/send-message", {
        content: msg,
        username,
      });
      if (result.data.Success === true) {
        toast.success(result.data.msg);
        setMsg("");
      } else {
        toast.error(result.data.msg);
      }
    } catch {
      toast.error("Failed to send message. Try again.");
    }
  }

  async function fetchSuggestMsg() {
    try {
      const result = await axios.get("/api/suggest-messages");
      if (result.data.Success === true) {
        toast.success("Updated the suggestions.");
        setSuggestedMsg(result.data.data);
      } else {
        toast.error(result.data.data);
      }
    } catch {
      toast.error("Failed to fetch suggestions.");
    }
  }

  function handleMessageClick(message) {
    setMsg(message);
  }

  return (
    <div className="flex justify-center items-center px-4 py-8 min-h-screen">
      <div className="w-full max-w-3xl bg-black rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Public Profile Link
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <Label htmlFor="msg" className="mb-1 cursor-custom">
              Enter Message
            </Label>
            <div className="flex gap-2">
              <Input
                id="msg"
                name="msg"
                value={msg}
                className="cursor-custom"
                onChange={handleMsgChange}
                placeholder="Send a message"
                required
              />
              <Button className="cursor-custom" type="submit" variant="default">
                Send
              </Button>
            </div>
          </div>
        </form>

        <Separator className="my-6" />

        <div className="text-center">
          <Button onClick={fetchSuggestMsg} className="mb-4 cursor-custom">
            Suggest Messages
          </Button>
          <p className="text-sm text-gray-400 mb-4">
            Click on any message below to select it.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Suggested Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 justify-center">
              {suggestedMsg.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full cursor-custom"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
