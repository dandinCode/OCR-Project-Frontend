"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";

const UploadList = () => {
  const [chats, setChats] = useState<[] | null>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: { sub: string; email: string } = jwtDecode(token);
      setUserId(decoded.sub);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getDocumentData();
    }
  }, [userId]);

  const getDocumentData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/listChats/${userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      
      if (data.success) {
        const sortedChats = data.chats.sort((a: any, b: any) => {
          return new Date(b.accessed).getTime() - new Date(a.accessed).getTime();
        });
        setChats(sortedChats);
      } else {
        console.error("Erro ao buscar documentos:", data.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    } finally {
      setLoading(false); 
    }
  };

  const deleteChat = async (chatId: string) => {
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      });

      getDocumentData();
    } catch(error){
      console.error("Erro inesperado:", error);
    }
  }

  return (
    <ProtectedRoute>
      <div className="bg-slate-200 text-2xl text-center">
        <h1 className="font-bold py-2">Últimos acessos</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : chats && chats.length > 0 ? (
          <>
            {chats.map((chat: any) => (
              <h2 key={chat.id} className="py-2 flex items-center justify-center">
                <Link
                  href={{
                    pathname: "/chat",
                    query: { chatId: chat.id },
                  }}
                >
                  <span>
                    {chat.name} ({format(new Date(chat.accessed), "dd-MM-yyyy | HH:mm")})
                  </span>
                </Link>
                <button className="pl-2" onClick={()=>{deleteChat(chat.id)}}>
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                      <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#bd0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                  </svg>
                </button>
              </h2>
            ))}
          </>
        ) : (
          <>
            Você ainda não escaneou nenhum documento!
            <Link href="/upload" className="underline underline-offset-1 text-blue-800">
              Clique aqui para escanear
            </Link>


          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UploadList;
