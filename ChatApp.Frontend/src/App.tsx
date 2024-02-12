/**
 * v0 by Vercel.
 * @see https://v0.dev/t/C9pHoVwQVEw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner"


import { useEffect, useState } from "react";
import useSignalR from "./useSignalR";

type Message = {
  id: number;
  content: string;
  createdAt: string;
};

export default function Component() {
  const { connection } = useSignalR("/r/chatHub");

  useEffect(() => {
    if (!connection) {
      return;
    }
    // listen for messages from the server
    connection.on("ReceiveMessage", (message: Message) => {
      // from the server
      setMessages((messages) => [...(messages || []), message]);
      toast("New Message", {
        description: message.content,
        action: {
          label: "Cool",
          onClick: () => console.log("cool"),
        },
      });
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, [connection]);

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    async function getMessages() {
      const result = await fetch("/api/messages");
      const messages = await result.json();
      setMessages(messages);
    }
    getMessages();
  }, []);

  const sendMessage = async () => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent("");
  };

  return (
    <div className="flex w-full mx-auto shadow-xl h-[100vh] rounded-tl-3xl rounded-bl-3xl overflow-hidden">
      <div className="grid w-[250px] border-r items-stretch">
        <div className="flex h-12 items-center px-4 border-b">
          <TwitterIcon className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-medium leading-none">general</h2>
          <p>{connection ? "✅" : "❌"}</p>
          <Button className="ml-auto rounded-full" size="sm" variant="ghost">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-1 px-2">
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              general
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              random
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              music
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              gaming
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              movies
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              sports
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              news
            </Button>
            <Button
              className="w-full justify-start gap-2 text-left"
              size="sm"
              variant="ghost"
            >
              <TwitterIcon className="w-4 h-4" />
              politics
            </Button>
          </div>
        </div>
        <div className="flex h-12 items-center px-4">
          <Input
            className="w-full bg-gray-100 dark:bg-gray-800"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
      <div className="grid w-full border-r items-stretch">
        <div className="flex h-12 items-center px-4 border-b">
          <h2 className="text-lg font-medium leading-none">general</h2>
          <Button className="ml-auto rounded-full" size="sm" variant="ghost">
            <PhoneCallIcon className="w-4 h-4" />
          </Button>
          <Button className="rounded-full" size="sm" variant="ghost">
            <VideoIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4 gap-4 flex flex-col">
          {messages?.map((message) => (
            // a single message
            <div className="flex items-start gap-4" key={message.id}>
              <div className="rounded-full overflow-hidden w-10 h-10">
                <img
                  alt="User 2"
                  className="rounded-full border"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <p className="font-semibold">User</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-12 items-center px-4">
          <Input
            className="flex-1 rounded-full"
            placeholder="Message #general"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button className="ml-4" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

// @ts-ignore
function PhoneCallIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  );
}

// @ts-ignore
function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// @ts-ignore
function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

// @ts-ignore
function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
