"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function MessageCard({ message, onMessageDelete, authToken }) {
  const [open, setOpen] = useState(false);

  async function handleDeleteConfirm() {
    try {
      const messageId = message._id;
      const result = await axios.post("/api/delete-message", {
        messageId,
        authToken,
      });

      if (result.data.Success === true) {
        toast.success(result.data.msg);
        onMessageDelete(messageId);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to delete the message.");
    }
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  }

  const formattedTimestamp = formatTimestamp(message.createdAt);

  return (
    <Card className="mb-4 w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg">{message.content}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {formattedTimestamp}
          </CardDescription>
        </div>
        <Button
          variant="destructive"
          className="cursor-custom"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent></CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete your
            message.
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="cursor-custom"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-custom"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
