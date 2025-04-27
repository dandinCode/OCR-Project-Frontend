"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const Home = () => {

  return (
    <ProtectedRoute>
        <div className="bg-slate-200 text-center">
            <h1 className="text-2xl font-bold text-center mt-3">Bem Vindo!</h1>
            <div className="grid grid-cols-2 gap-2">
                <div className="my-5 ">
                    <button className="bg-gray-800 text-white px-3 py-1 rounded mt-3" >
                        <Link href='/upload'>
                            Escanear novo documento
                        </Link>
                    </button>
                </div>
                <div className="my-5 ">
                    <button className="bg-gray-800 text-white px-3 py-1 rounded mt-3" >
                        <Link href='/listChats'>
                            Acessar documentos escaneados
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </ProtectedRoute>
  );
};

export default Home;