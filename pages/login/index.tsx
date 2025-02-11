import Alerta from "@/Components/alerta";
import Carrossel from "@/Components/login/carrossel";
import Navbar from "@/Components/navbar";
import { hasCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")
    //email
    const [email, setEmail] = useState<string>("")
    //form login
    const [verSenha, setVerSenha] = useState<boolean>(false)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const erro = urlParams.get("erro")
        if (Boolean(erro) === true) {
            setMostrar(true)
            setSucesso(false)
            setMsgA(urlParams.get("msg")!)
        }
    }, [])
    //verificar se está com login
    useEffect(() => {
        if(hasCookie("__session")){
            window.location.replace("/")
        }
    })
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Navbar />
            <main className="bg-background w-full mx-auto flex justify-center">
                <div className="w-[25rem] h-[35rem] bg-branco flex flex-row rounded-2xl lg:w-[50rem] lg:h-[35rem] my-5" style={{ boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.10) inset" }}>
                    <Carrossel />
                    <div className="w-full lg:w-1/2 my-5 sm:m-5">
                        <Link href={"/criarconta"} className="block w-full text-right text-preto p-3 pb-0 text-sm text-opacity-60 hover:text-opacity-100 transition-colors duration-200">Ainda não tem conta?</Link>
                        <br />
                        <br />
                        <h1 className="text-preto font-bold text-3xl mb-3 text-center lg:text-left">Bem vindo outra vez!</h1>
                        <h2 className="text-preto text-lg text-center lg:text-left">Entre na sua conta para gerir os seus dados</h2>
                        <br />
                        <br />
                        <form className="flex flex-col justify-center items-center w-full" method="POST" action={"/api/login"}>
                            <input type="email" placeholder="Email" name="email" required className="my-1 w-3/4 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <div className="my-2 w-3/4 flex items-center justify-end">
                                <input className="flex-grow mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" type={verSenha ? "text" : "password"} placeholder="Senha" name="senha" required />
                                <button type="button" className="absolute m-3 opacity-50" onClick={(e) => setVerSenha(!verSenha)}>
                                    {verSenha ?
                                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        :
                                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                            <br />
                            <input type="submit" value={"Entrar"} className="w-3/4 p-3 border border-cor4 bg-cor4 font-semibold text-branco text-xl rounded-xl hover:bg-transparent hover:text-preto transition-colors duration-200" />
                        </form>
                        <Link className="mx-auto w-3/4 block text-left text-preto text-opacity-50 text-sm hover:text-opacity-100 transition-all duration-200" href={"/api/esqueceu/criar-otp?email=" + email} onClick={(e) => {
                            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            if (!regex.test(email)) {
                                e.preventDefault()
                                setMostrar(true)
                                setSucesso(false)
                                setMsgA("Coloque o e-mail primeiro!")
                            }
                        }}>Esqueceu-se da senha?</Link>
                        <br />
                    </div>
                </div>
            </main>
        </>
    )
}