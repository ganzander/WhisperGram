// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { Card, Button, Alert } from "react-bootstrap";
// import toast from "react-hot-toast";

// export default function SendMessage() {
//   const params = useParams();
//   console.log(params.username);
//   const [msg, setMsg] = useState("");
//   const [suggestedMsg, setSuggestedMsg] = useState([
//     "What's your favorite movie?",
//     "Do you have any pets?",
//     "What's your dream job?",
//   ]);

//   function handleMsgChange(e) {
//     setMsg(e.target.value);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const { username } = params;

//     axios
//       .post("/api/send-message", { content: msg, username })
//       .then((result) => {
//         if (result.data.Success === true) {
//           toast.success(result.data.msg);
//         } else {
//           toast.error(result.data.msg);
//         }
//       });
//   }

//   function fetchSuggestMsg() {
//     axios.get("/api/suggest-messages").then((result) => {
//       if (result.data.Success === true) {
//         toast.success("Updated the suggestions.");
//         setSuggestedMsg(result.data.data);
//       } else {
//         toast.error(result.data.data);
//       }
//     });
//   }

//   function handleMessageClick(message) {
//     setMsg(message);
//   }

//   return (
//     <>
//       <div className="container mt-3 p-3 bg-white rounded max-w-4xl">
//         <h1 className="display-4 font-weight-bold mb-4 text-center">
//           Public Profile Link
//         </h1>

//         <div className="my-5">
//           <div className="card">
//             <div className="card-header">
//               <h3 className="h5 font-weight-semibold">Messages</h3>
//             </div>
//             <div className="card-body d-flex flex-column">
//               Enter Message
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3 d-flex">
//                   <input
//                     type="text"
//                     className="form-control me-5"
//                     name="msg"
//                     value={msg}
//                     onChange={handleMsgChange}
//                     placeholder="Send Message"
//                     autoComplete="off"
//                     required
//                   />
//                   <button type="submit" className="btn btn-dark ">
//                     Send
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <hr className="my-5" />
//         <div className="text-center">
//           <div className="mb-4"></div>
//           <div className="mb-3">
//             <button
//               className="btn btn-dark text-white my-4 p-3"
//               onClick={fetchSuggestMsg}
//             >
//               Suggest Messages
//             </button>
//           </div>
//           <p>Click on any message below to select it.</p>
//           <Card>
//             <Card.Header>
//               <h3 className="text-xl font-semibold">Messages</h3>
//             </Card.Header>
//             <Card.Body className="flex flex-col space-y-4">
//               {suggestedMsg.map((message, index) => (
//                 <div key={index} className="row mb-2 justify-content-center">
//                   <div className="col">
//                     <button
//                       className=" mb-2 btn btn-light border border-dark btn-outline-dark rounded-pill"
//                       onClick={() => handleMessageClick(message)}
//                     >
//                       {message}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// }

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
            <Label htmlFor="msg" className="mb-1">
              Enter Message
            </Label>
            <div className="flex gap-2">
              <Input
                id="msg"
                name="msg"
                value={msg}
                onChange={handleMsgChange}
                placeholder="Send a message"
                required
              />
              <Button type="submit" variant="default">
                Send
              </Button>
            </div>
          </div>
        </form>

        <Separator className="my-6" />

        <div className="text-center">
          <Button onClick={fetchSuggestMsg} className="mb-4">
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
                  className="rounded-full"
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
