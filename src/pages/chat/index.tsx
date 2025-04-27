"use client";

import ExtractedDoc from "@/components/ExtractedDoc";
import InputMessage from "@/components/InputMessage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Message from "@/components/Message";
import DownloadButton from "@/components/DownloadButton";

const Chat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<{ userId: string } | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [chatName, setChatName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("chatId");
    if (id) {
      setChatId(id);
      getChatName(id)
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

  async function getChatName(id: string){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.success) {
      setChatName(data.chat.name);
    }
  }

  function checkNewMessage(){
    getMessages();
  }

  function valideUser(){
    if (documentData && documentData.userId && (documentData.userId !== "") && userId !== documentData.userId) { 
      router.push("/home"); 
    }
  }

  async function getMessages() {
    if (!chatId) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/openai/messages/${chatId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
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
    if(chatId){
      getMessages();
    }
   
  }, [chatId]);

  async function updateChatName(name: string){
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, name }),
      });
    }  catch(error){
        console.error(error);
    }
  }

  return (
    <div className="bg-slate-200 pb-5">
      <div className="grid justify-items-end"> 
        <DownloadButton chatId={chatId}/>
      </div>
      <h1 className="text-2xl font-bold text-center">
        <input 
          title="Clique para editar o nome do chat"
          type="text"
          className="bg-inherit text-center"
          placeholder="Digite um nome para o chat"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          onBlur={(e) => updateChatName(e.target.value)}
          required
        />
      </h1>
      <ExtractedDoc chatId={chatId} />
      <InputMessage userId={userId} chatId={chatId} checkNewMessage={checkNewMessage}/>
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
