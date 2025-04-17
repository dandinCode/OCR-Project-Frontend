"use client";

import { useState } from "react";
import UploadForm from "../../components/UploadForm";
import ExtractedDoc from "@/components/ExtractedDoc";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

const UploadPage = () => {
  const [chatId, setChatId] = useState<string | null>(null);

  function handleChatId(id: string){
    setChatId(id);
  }

  return (
    <ProtectedRoute>
        <div className="bg-slate-200 text-center">
            <h1 className="text-2xl font-bold text-center mt-3">Upload de Imagens</h1>
            <UploadForm handleChatId={handleChatId}/>
            <ExtractedDoc chatId={chatId}/>
            {chatId && 
            <button className="bg-blue-900 text-white px-2 rounded mt-3" >
              <Link href={{ pathname: '/chat',query: { chatId: chatId },}}>
                Abrir chat
              </Link>
            </button>
            
            }
        </div>
    </ProtectedRoute>
  );
};

export default UploadPage;