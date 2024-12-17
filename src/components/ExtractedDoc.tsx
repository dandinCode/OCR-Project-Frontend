"use client";

import { useEffect, useState } from "react";

interface ExtractedDocProps {documentId: string | null}

const ExtractedDoc: React.FC<ExtractedDocProps>  = ({documentId}) => {
    const [extractedText, setExtractedText] = useState<string | null>(null);

    useEffect(()=>{
        getDocumentData();
    },[documentId])


    const getDocumentData = async () => {
        if (!documentId) {
        return;
        }
    
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image/${documentId}`, {
            method: "GET",
        });
    
        const data = await response.json();
    
        if (response.ok) {
            setExtractedText(data.extractedText);
        }
        } catch (error) {
        console.log("Erro inesperado: " + error);
        }
    };
  


  return (
    <>
        {extractedText &&
            <div className="mt-3 text-center">
                <hr/>
                <h1 className="my-2">Texto Extraído:</h1>
                <p>
                   {extractedText}
                </p>
            </div>
        }
    </>
  );
};

export default ExtractedDoc;