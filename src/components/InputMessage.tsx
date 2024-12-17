"use client";

import { useState } from "react";

interface InputMessageProps {
  document: {} | null,
  checkNewMessage: () => void; 
}

const InputMessage: React.FC<InputMessageProps>  = ({document, checkNewMessage}) => {
  const [prompt, setPrompt] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/openai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, document }),
    });

    if (res.ok) {
      setPrompt('')
      checkNewMessage()
    }
  };



  return (
     <form onSubmit={handleSignUp} className="text-center py-2">
        <input
          className="w-96 px-3 py-1 rounded"
          type="text"
          placeholder="Faça uma pergunta sobre o documento"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      <button className=" mx-2 bg-blue-900 text-white px-2 rounded mt-5" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default InputMessage;