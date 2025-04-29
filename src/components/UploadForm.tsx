"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UploadFormProps {
  handleChatId: (chatId: string) => void; 
}

interface UserData {
  email: string;
  chosenPlan: string;
}

const UploadForm: React.FC<UploadFormProps>  = ({handleChatId}) => {
  
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>("");
  const [userData, setUserData] = useState<UserData | null>(null);

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
    
    const input = document.getElementById('file') as HTMLInputElement;
    if (input?.files) {
      Array.from(input.files).forEach((f) => {
        formData.append("file", f); 
      });
    }
  
    formData.append("userId", userId ?? "");
  
    try {
      setStatus("Escaneando...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        setStatus("Texto extraído com sucesso!");
        handleChatId(data.chatId)
      } else {
        setStatus("Erro ao processar o arquivo: " + data.error);
      }
    } catch (error) {
      setStatus("Erro inesperado: " + error);
    }
  };
  
  async function getUserData() {
    if (!userId) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app/${userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.success) {
          setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserData();
  }, [userId])


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Escolha um arquivo para upload
        </label>
        {userData && userData.chosenPlan == "Gratuito" ?
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          :
            <input
              type="file"
              multiple 
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
        }
        
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