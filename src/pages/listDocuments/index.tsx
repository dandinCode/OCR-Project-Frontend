"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";

const UploadList = () => {
  const [documents, setDocuments] = useState<[] | null>([]);
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
        `${process.env.NEXT_PUBLIC_API_URL}/upload/list/?userId=${userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setDocuments(data.result);
      } else {
        console.error("Erro ao buscar documentos:", data.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-slate-200 text-2xl text-center">
        <h1 className="font-bold pb-2">Histórico de Imagens</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : documents && documents.length > 0 ? (
          <>
            {documents.map((document: any) => (
              <h2 key={document.id}>
                <Link
                  href={{
                    pathname: "/chat",
                    query: { chatId: document.chatId },
                  }}
                >
                  <p>
                    {document.name} ({format(new Date(document.createdAt), "yyyy-MM-dd | HH:mm")})
                  </p>
                </Link>
                <br />
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
