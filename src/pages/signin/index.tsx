import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const { access_token } = await res.json();
            localStorage.setItem("token", access_token); 
            router.push("/home"); 
        } else {
            alert("Credenciais inválidas!");
        }
    };

    return (
        <form onSubmit={handleLogin} className="bg-slate-200 text-center">
            <div className="pt-5">
                <input
                    className="px-3 py-1 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="pt-5">
                <input
                    className="px-3 py-1 rounded"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="bg-blue-900 text-white px-2 rounded mt-5" type="submit">
                Entrar
            </button>
            <div className="py-2">
                <Link href="/signup" className="underline underline-offset-1 text-red-800">
                    Não tem cadastro? Clique aqui.
                </Link>
            </div>
            
        </form>
    );
}
