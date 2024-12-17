"use client";

import ExtractedDoc from "@/components/ExtractedDoc";
import InputMessage from "@/components/InputMessage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Message from "@/components/Message";

const Chat = () => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<{} | null>({userId: ""});
  const [messages, setMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("documentId");
    if (id) {
      setDocumentId(id);
    }
  }, [searchParams]);

  useEffect(()=>{
    const token = localStorage.getItem("token"); 
    if (token) {
        const decoded: { sub: string; email: string } = jwtDecode(token);
        setUserId(decoded.sub); 
    }
  },[]);

  useEffect(() => {
    valideUser();
  }, [documentData, userId]);

  function checkNewMessage(){
    getMessages();
  }

  function valideUser(){
    if (documentData && (documentData.userId !== "") && userId !== documentData.userId) { 
      router.push("/home"); 
    }
  }

  async function getDocumentData() {
    if (!documentId) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image/${documentId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setDocumentData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMessages() {
    if (!documentId) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/openai/messages/${documentId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(documentId)
      console.log(data)
      if (response.ok) {
        if (Array.isArray(data)) { 
          setMessages(data);
        } else {
          setMessages([]); 
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if(documentId){
      getDocumentData();
      getMessages();
    }
   
  }, [documentId]);

  return (
    <div className="bg-slate-200 pb-5">
      <h1 className="text-2xl font-bold text-center">Chat</h1>
      <ExtractedDoc documentId={documentId} />
      <InputMessage document={documentData} checkNewMessage={checkNewMessage}/>
      {messages && 
        <div>
          {messages.map((message: any) => (
            <div key={message.id} className="py-2  px-3">
              <Message text={message.text} owner={message.owner}/>
            </div>
            ))}
        </div>
      }
    </div>
  );
};

export default Chat;
