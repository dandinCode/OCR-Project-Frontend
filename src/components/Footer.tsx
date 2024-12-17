"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Footer = () => {
  const router = useRouter();
  const [logged, setLogged] = useState<Boolean | null>(true);

  const checkRoute = () => {
    const isAuthRoute = router.pathname === "/signin" || router.pathname === "/signup";
    setLogged(!isAuthRoute);
  };

  useEffect(() => {
    checkRoute();

    const handleRouteChange = () => checkRoute();
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <> 
      {!logged && 
        ( <footer className="fixed bottom-0 bg-blue-600 text-white text-center p-2 w-full">
          <p>&copy; 2024 <Link href="https://www.linkedin.com/in/caio-finotti-7520a7222/" className="underline underline-offset-1">Caio Finotti Bosco</Link>. Todos os direitos reservados.</p>
        </footer>)
      }
    </>
   
  );
};

export default Footer;