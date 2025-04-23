// "use client";
// import React, { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { RefreshCcw } from "lucide-react";
// import Switch from "react-switch";
// import MessageCard from "@/components/MessageCard";
// import { NavbarDemo } from "@/components/Navbar";
// import { Button } from "@/components/ui/button";

// export default function Dashboard() {
//   const [decoded, setDecoded] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);
//   const [isAccepting, setIsAccepting] = useState(false);
//   const [authToken, setAuthToken] = useState("");
//   const [profileUrl, setProfileUrl] = useState("");

//   function handleDeleteMessage(messageId) {
//     setMessages(messages.filter((msg) => msg._id !== messageId));
//   }

//   async function fetchAcceptMessages() {
//     setIsSwitchLoading(true);
//     axios.post("/api/check-accept-message", { authToken }).then((result) => {
//       if (result.data.Success === true) {
//         setIsAccepting(result.data.msg);
//         setIsSwitchLoading(false);
//       }
//     });
//   }

//   function fetchMessages() {
//     setIsLoading(true);
//     axios.post("/api/get-messages", { authToken }).then((result) => {
//       setMessages(result.data.userMessages || []);
//       setIsLoading(false);
//     });
//   }

//   async function changeAcceptMessage() {
//     setIsLoading(true);
//     axios.post("/api/accept-message", { authToken }).then((result) => {
//       if (result.data.Success === true) {
//         localStorage.setItem("AuthToken", JSON.stringify(result.data.token));
//         setAuthToken(result.data.token);
//       } else {
//         toast.error(result.data.msg);
//       }
//     });
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
//       if (storedAuthToken) {
//         setAuthToken(storedAuthToken);
//         const decodedToken = jwt.decode(storedAuthToken);
//         setDecoded(decodedToken);
//         setProfileUrl(`${location.origin}/u/${decodedToken.name}`);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (authToken !== "") {
//       fetchAcceptMessages();
//       fetchMessages();
//     }
//   }, [authToken]);

//   function copyToClipboard() {
//     navigator.clipboard.writeText(profileUrl);
//     toast.success("Copied To Clipboard");
//   }

//   if (authToken === "") {
//     return (
//       <>
//         <NavbarDemo />
//         <div className="p-6 flex justify-center items-center w-full min-h-[75vh] mt-4">
//           <h1 className="font-bold text-5xl mb-4 text-center text-white">
//             It seems you have not logged in yet!! <br />
//             Please Login
//           </h1>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <NavbarDemo />
//         <div className="px-20 p-6 rounded w-full min-h-[75vh] mt-4 space-y-8 ">
//           <h1 className="font-weight-bold text-4xl font-bold">
//             User Dashboard
//           </h1>
//           <div>
//             <h3 className="font-weight-bold mb-3 text-xl">
//               Copy Your Unique Link
//             </h3>
//             <div className="mb-3 flex items-center gap-8">
//               <div className="rounded-lg px-4 py-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
//                 {profileUrl}
//               </div>
//               <Button variant="outline" onClick={copyToClipboard}>
//                 Copy
//               </Button>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 pb-4 border-b">
//             <Switch
//               className="me-3"
//               checked={isAccepting}
//               onChange={changeAcceptMessage}
//               disabled={isSwitchLoading}
//             />
//             <span className="ml-2">
//               {isAccepting ? "Accepting Messages" : "Not Accepting Messages"}
//             </span>
//           </div>
//           <div>
//             <Button
//               className="p-4"
//               variant="outline"
//               onClick={(e) => {
//                 e.preventDefault();
//                 fetchMessages(true);
//               }}
//             >
//               {isLoading ? (
//                 <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <RefreshCcw />
//               )}
//             </Button>
//             <div className="mt-4 grid grid-cols-3 gap-4">
//               {messages.length > 0 ? (
//                 messages.map((message, index) => {
//                   return (
//                     <MessageCard
//                       authToken={authToken}
//                       key={index}
//                       message={message}
//                       onMessageDelete={handleDeleteMessage}
//                     />
//                   );
//                 })
//               ) : (
//                 <p>No messages to display.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import toast from "react-hot-toast";
import { RefreshCcw } from "lucide-react";
import Switch from "react-switch";
import MessageCard from "@/components/MessageCard";
import { NavbarDemo } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [decoded, setDecoded] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  function handleDeleteMessage(messageId) {
    setMessages(messages.filter((msg) => msg._id !== messageId));
  }

  async function fetchAcceptMessages() {
    setIsSwitchLoading(true);
    axios.post("/api/check-accept-message", { authToken }).then((result) => {
      if (result.data.Success === true) {
        setIsAccepting(result.data.msg);
        setIsSwitchLoading(false);
      }
    });
  }

  function fetchMessages() {
    setIsLoading(true);
    axios.post("/api/get-messages", { authToken }).then((result) => {
      setMessages(result.data.userMessages || []);
      setIsLoading(false);
    });
  }

  async function changeAcceptMessage() {
    setIsLoading(true);
    axios.post("/api/accept-message", { authToken }).then((result) => {
      if (result.data.Success === true) {
        localStorage.setItem("AuthToken", JSON.stringify(result.data.token));
        setAuthToken(result.data.token);
      } else {
        toast.error(result.data.msg);
      }
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
        const decodedToken = jwt.decode(storedAuthToken);
        setDecoded(decodedToken);
        setProfileUrl(`${location.origin}/u/${decodedToken.name}`);
      }
    }
  }, []);

  useEffect(() => {
    if (authToken !== "") {
      fetchAcceptMessages();
      fetchMessages();
    }
  }, [authToken]);

  function copyToClipboard() {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied To Clipboard");
  }

  if (authToken === "") {
    return (
      <>
        <NavbarDemo />
        <div className="p-6 flex justify-center items-center w-full min-h-[75vh] mt-4">
          <h1 className="font-bold text-5xl mb-4 text-center text-white">
            It seems you have not logged in yet!! <br />
            Please Login
          </h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavbarDemo />
        <div className="px-4 sm:px-6 md:px-20 p-6 rounded w-full min-h-[75vh] mt-4 space-y-8">
          <h1 className="font-weight-bold text-3xl sm:text-4xl md:text-5xl font-bold">
            User Dashboard
          </h1>
          <div>
            <h3 className="font-weight-bold mb-3 text-xl sm:text-2xl">
              Copy Your Unique Link
            </h3>
            <div className="mb-3 flex flex-wrap items-center gap-2 md:gap-6">
              <div className="rounded-lg px-4 py-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex-grow sm:flex-grow-0">
                {profileUrl}
              </div>
              <Button
                variant="ghost"
                className="border cursor-custom border-gray-500"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 pb-4 border-b cursor-custom">
            <Switch
              className="me-3 cursor-custom"
              checked={isAccepting}
              onChange={changeAcceptMessage}
              disabled={isSwitchLoading}
            />
            <span className="ml-2 text-sm sm:text-base">
              {isAccepting ? "Accepting Messages" : "Not Accepting Messages"}
            </span>
          </div>
          <div>
            <Button
              className="p-4 w-auto cursor-custom"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <RefreshCcw />
              )}
            </Button>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {messages.length > 0 ? (
                messages.map((message, index) => {
                  return (
                    <MessageCard
                      authToken={authToken}
                      key={index}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  );
                })
              ) : (
                <p>No messages to display.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
