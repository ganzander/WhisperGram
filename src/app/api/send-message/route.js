const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, content } = await req.json();
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return Response.json(
        { Success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    if (!userFound.isAcceptingMessages) {
      return Response.json(
        { Success: false, msg: "User is not accepting messages." },
        { status: 403 }
      );
    }

    const newMessage = {
      content,
      createdAt: new Date(),
    };

    const updatedUser = await User.updateOne(
      { username },
      {
        $push: { messages: newMessage },
      }
    );

    return Response.json(
      { Success: true, msg: "Message sent to user." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ Success: false, msg: error }, { status: 404 });
  }
}
