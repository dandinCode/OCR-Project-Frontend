import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CheckPayment = () => {
  const router = useRouter();
  const { checkout_session_id } = router.query;
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkout_session_id) return;

    const verifyPayment = async () => {
      setLoading(true); 

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; 

        const response = await fetch(`${apiUrl}/stripe/verify-payment?session_id=${checkout_session_id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao verificar pagamento");
        }

        setPaymentData(data);
      } catch (err) {
        console.error("Erro na verificação do pagamento:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [checkout_session_id]);

  if (loading) return <p>Verificando pagamento...</p>;

  return (
    <div className="text-center p-6">
        {paymentData !== null ? (
            <>
            <h2 className="text-3xl font-bold text-green-600">🎉 Parabéns! Pagamento confirmado! 🎉</h2>
            <p className="text-xl text-gray-700 mt-2">
                Você agora possui o plano <span className="font-semibold">{paymentData.productName}</span>
            </p>
            </>
        ) : (
            <>
            <h1 className="text-3xl font-bold text-red-600">🙁 Pagamento não confirmado...</h1>
            <p className="text-xl text-gray-700 mt-2">Tente novamente ou entre em contato com o suporte.</p>
            </>
        )}
    </div>
  );
};

export default CheckPayment;
