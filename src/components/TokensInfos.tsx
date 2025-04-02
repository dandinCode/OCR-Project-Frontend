interface TokensInfosProps {maxTokens: Number}

const TokensInfos: React.FC<TokensInfosProps>  = ({maxTokens}) => {
  return (
    <>
       <div className="text-center">
            <div className="text-center my-6">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">O que são Tokens?</h2>
            <p className="text-lg text-gray-600">Os tokens são como "moedinhas" que você gasta nas interações com nosso chat inteligente! 💬✨</p>
            </div>

            <div className="bg-indigo-50 p-5 rounded-lg mb-6 text-center">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Como funcionam?</h3>
            <ul className="space-y-3">
                <li className=" ">
                <span className="text-green-500 mr-2">•</span>
                <span>Você gasta tokens quando <strong>envia mensagens</strong> (perguntas, comandos)</span>
                </li>
                <li className="">
                <span className="text-green-500 mr-2">•</span>
                <span>E também quando <strong>recebe respostas</strong> (explicações, análises)</span>
                </li>
            </ul>
            </div>
            <div className="flex justify-center"> 
            <div className="w-full md:w-1/2"> 
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Dicas importantes
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center">
                    <span className="bg-indigo-100 text-indigo-800 p-1 rounded-full mr-2">
                        🔄
                    </span>
                    <span>Conversas detalhadas usam mais tokens</span>
                    </li>
                    <li className="flex items-center">
                    <span className="bg-indigo-100 text-indigo-800 p-1 rounded-full mr-2">
                        💡
                    </span>
                    <span> Mensagens objetivas economizam tokens!</span>
                    </li>
                </ul>
                </div>
            </div>
        </div>

        <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800">
                Atualmente você possui {maxTokens && <>{maxTokens.toLocaleString("pt-BR")}</>} tokens restantes🚀
            </h3>
        </div>
    </div>
    </>
  );
};

export default TokensInfos;


