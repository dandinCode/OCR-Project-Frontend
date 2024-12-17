"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
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
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <h1 className="text-center text-xl font-bold">
          <Link href="/home">OCR Project</Link>
        </h1>
      </div>
      {logged && (
        <div title="Logout">
          <LogoutButton />
        </div>
      )}
    </header>
  );
};

export default Header;