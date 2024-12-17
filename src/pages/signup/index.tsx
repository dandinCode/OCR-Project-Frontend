import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Usuário registrado com sucesso!");
      router.push("/home"); 
    } else {
      alert("Erro ao registrar usuário.");
    }
  };

  return (
    <form onSubmit={handleSignUp} className="bg-slate-200 text-center">
      <div className="pt-5">
        <input
          className="px-3 py-1 rounded"
          type="email"
          placeholder="Email"
          value={email ? email : ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="pt-5">
        <input
          className="px-3 py-1 rounded"
          type="password"
          placeholder="Senha"
          value={password ? password : ""}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="bg-blue-900 text-white px-2 rounded mt-5" type="submit">
        Registrar
      </button>
      <div className="py-2">
        <Link href="/signin" className="underline underline-offset-1 text-red-800">
            Já tem cadastro? Clique aqui para fazer login.
        </Link>
      </div>
    </form>
  );
}
