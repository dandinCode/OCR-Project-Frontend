"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import TokensInfos from "@/components/TokensInfos";

const Plans = () => {
    
    const [plans, setPlans] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>();
    
    useEffect(()=>{
        getPlans();
        const token = localStorage.getItem("token"); 
        if (token) {
          const decoded: { sub: string; email: string } = jwtDecode(token);
          getUser(decoded.sub)
        }
    }, [])


    async function getPlans() {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/plans`,
            {
              method: "GET",
            }
          );
    
          const data = await response.json();
          if (response.ok) {
            if (Array.isArray(data)) { 
                setPlans(data);
            } else {
                setPlans([]); 
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      async function getUser(userId : string) {
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
          if (response.ok) {
            if (data) { 
                setUserData(data);
                console.log(data)
            } else {
                setUserData([]); 
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      return (
        <ProtectedRoute>
        <div className="min-h-screen bg-slate-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-12">Planos Disponíveis</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="p-6 flex-grow"> 
                    {userData && plan.name === userData.chosenPlan && (
                      <p className="text-gray-600 justify-center flex pb-1">
                         <span>Este é o seu plano atual!</span>
                      </p>
                    )}
                    <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                    <p className="mb-4">
                      <span className="text-2xl font-bold italic pe-1">
                        R${Number(plan.price).toFixed(2)}  
                      </span>
                      {(plan.name !== "Pré-pago" && plan.name !== "Gratuito") && (
                        <span className="text-xl ">
                          por mês
                        </span>
                      )}
                      
                    </p>
                    
                    <p className="text-gray-600 mb-6">{plan.tokens.toLocaleString("pt-BR")} tokens </p>
                    
                    {plan.name !== "Gratuito" && (
                        <>
                            <ul className=" space-y-1">
                                {plan.name !== "Pré-pago" ? 
                                  <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Tokens renovados a cada mês</span>
                                  </li>
                                :
                                  <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>

                                    <span>Pague somente uma vez </span>
                                  </li>
                              
                                }
                                <li className="flex items-start">
                                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Múltiplos uploads</span>
                                </li>
                                <li className="flex items-start">
                                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Validação de CNPJ</span>
                                </li>
                            </ul>
                        </>
                    )}
                  </div>
                  
                  <div className="p-4 mt-auto"> 
                    {userData && 
                      <>
                        <Link 
                          href={((plan.paymentLinks)+'?client_reference_id='+userData.id)} 
                          className={`bg-${plan.themeColor}-500 hover:bg-${plan.themeColor}-600 text-white font-bold py-3 px-6 rounded-lg w-full block text-center transition-colors`}
                        >
                            {plan.name === "Gratuito" ? 
                              <>
                                Usar grátis
                              </>
                              :
                              <>
                                Assinar
                              </>
                            }
                        </Link>
                      </>
                    }
                    
                  </div>
                </div>
              ))}
            </div>
            {userData && 
              <>
                <TokensInfos maxTokens={userData.maxTokens}/>
              </>
            }
          </div>
        </div>
      </ProtectedRoute>
      );
};

export default Plans;