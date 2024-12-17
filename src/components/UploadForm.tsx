"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UploadFormProps {
  handleDocumentId: (documentId: string) => void; 
}

const UploadForm: React.FC<UploadFormProps>  = ({handleDocumentId}) => {
  
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>();

  useEffect(()=>{
    const token = localStorage.getItem("token"); 
    if (token) {
        const decoded: { sub: string; email: string } = jwtDecode(token);
        setUserId(decoded.sub); 
    }
  },[]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setStatus("Por favor, selecione um arquivo antes de enviar.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
  
    try {
      setStatus("Escaneando...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatus("Texto extraído com sucesso!");
        handleDocumentId(data.documentId)
      } else {
        setStatus("Erro ao processar o arquivo: " + data.error);
      }
    } catch (error) {
      setStatus("Erro inesperado: " + error);
    }
  };
  


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Escolha um arquivo para upload
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Escanear
        </button>
        {status && <p className="text-center mt-2 text-gray-700">{status}</p>}
      </form>
    </>
    
  );
};

export default UploadForm;