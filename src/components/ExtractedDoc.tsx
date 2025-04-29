"use client";

import { useEffect, useState } from "react";

interface DocumentsData {
  id: string;
  userId: string;
  filePath: string;
  extractedText: string;
  createdAt: string;
  name?: string;
}

interface ExtractedDocProps {
  chatId: string | null;
}

const ExtractedDoc: React.FC<ExtractedDocProps> = ({ chatId }) => {
  const [extractedText, setExtractedText] = useState<DocumentsData[] | null>(null);
  const [hiddenTextExtracted, setHiddenTextExtracted] = useState(false);

  useEffect(() => {
    getDocumentsData();
  }, [chatId]);


  const getDocumentsData = async () => {
    if (!chatId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/byChatId/${chatId}`,
        { method: "GET" }
      );

      const data = await response.json();
      if (data.success) {
        setExtractedText(data.documents);
      }
    } catch (error) {
      console.log("Erro inesperado: " + error);
    }
  };

  return (
    <>
      {extractedText && (
        <div className="mt-3 text-center" >
          <h1 className="my-2">Textos Extraídos 
            <button onClick={() => setHiddenTextExtracted(!hiddenTextExtracted)} className="ps-1 ">
            {hiddenTextExtracted ? <svg fill="#2563eb" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M47.6,17.8L27.1,38.5c-0.6,0.6-1.6,0.6-2.2,0L4.4,17.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2 c0.6-0.6,1.6-0.6,2.2,0l16.1,16.3c0.6,0.6,1.6,0.6,2.2,0l16.1-16.2c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C48.1,16.3,48.1,17.2,47.6,17.8z"></path> </g></svg>
             : <svg fill="#2563eb" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4,34.2l20.5-20.7c0.6-0.6,1.6-0.6,2.2,0l20.5,20.7c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2 c-0.6,0.6-1.6,0.6-2.2,0L27.1,22.2c-0.6-0.6-1.6-0.6-2.2,0L8.8,38.5c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2C3.9,35.7,3.9,34.8,4.4,34.2z"></path> </g></svg>}
            </button>
          </h1>
          <div className="space-y-4 text-center" hidden={hiddenTextExtracted}>
            {extractedText.map((doc) => (
              <div key={doc.id} className="p-4 rounded border-b-1 border-stone-300">
                <p className="font-semibold">
                  Imagem: {doc.name || doc.filePath.split("\\").pop()}
                </p>
                <p className=" mt-2">{doc.extractedText}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExtractedDoc;
