"use client";

import { useState } from "react";
import UploadForm from "../../components/UploadForm";
import ExtractedDoc from "@/components/ExtractedDoc";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";

const UploadPage = () => {
  const [documentId, setDocumentId] = useState<string | null>(null);

  function handleDocumentId(id: string){
    setDocumentId(id);
  }

  return (
    <ProtectedRoute>
        <div className="bg-slate-200 text-center">
            <h1 className="text-2xl font-bold text-center mt-3">Upload de Imagens</h1>
            <UploadForm handleDocumentId={handleDocumentId}/>
            <ExtractedDoc documentId={documentId}/>
            {documentId && 
            <button className="bg-blue-900 text-white px-2 rounded mt-3" >
              <Link href={{ pathname: '/chat',query: { documentId: documentId },}}>
                Abrir chat
              </Link>
            </button>
            
            }
        </div>
    </ProtectedRoute>
  );
};

export default UploadPage;