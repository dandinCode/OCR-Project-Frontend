import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }){
    return (
        <>
            <Header />
            <div className=""> {children} </div>
            <Footer />
        </>
    )
}