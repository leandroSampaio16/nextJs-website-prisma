import { useState } from "react";

type props = {
    mostrar: boolean,
    sucesso: boolean,
    msg: string,
    fecharF: any
}
export default function Alerta({ mostrar, sucesso, msg, fecharF }: props) {
    const [cor, setCor] = useState<string>();
    if (!mostrar) {
        return null
    }
    return (
        <div className="fixed top-0 left-0 rounded flex flex-row items-center z-10 p-3 m-2 bg-cor4 text-branco">
            <span className="m-1">{sucesso ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            }</span>
            <span className="text-lg opacity-75">{msg}</span>
            <button className="opacity-50" onClick={fecharF}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}