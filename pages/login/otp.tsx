import Navbar from "@/Components/navbar";
import { hasCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Otp() {
    const [email, setEmail] = useState<string>("")
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const emailP = urlParams.get("email")
        if (typeof emailP === 'string') {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (regex.test(emailP)) {
                setEmail(emailP)
                return
            }
        }
        window.location.replace("/")
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
                <title>OTP</title>
            </Head>
            <Navbar />
            <style jsx>{`
            /* Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            
            /* Firefox */
            input[type=number] {
              -moz-appearance: textfield;
            }
            `}</style>
            <main className="bg-background w-full">
                <br />
                <br />
                <div className="text-center mx-auto my-5">
                    <div className="mx-auto w-[12rem] h-[12rem] bg-branco flex flex-row justify-center items-center rounded-full" style={{ boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.10) inset" }}>
                        <Image src="/cadeado.png" alt="Cadeado" width={550 / 4} height={550 / 4} priority={true} />
                    </div>
                </div>
                <h1 className="text-center font-bold text-3xl">Insira o código OTP</h1>
                <br />
                <h2 className="text-center">Insira o código OTP enviado para o seu email</h2>
                <br />
                <form method="POST" action={"/api/esqueceu/verificar-otp"}>
                    <input type="hidden" name="email" value={email} />
                    <div className="mx-auto text-center">
                        <input min={0} max={9} step={1} type="number" name="num1"
                            className="m-2 p-3 text-3xl bg-cor5 rounded-2xl w-16 h-24 sm:w-20 sm:h-28 text-center outline-none border-b-4 border-b-cor5 focus:border-b-cor1 transition-all duration-200"
                            onPaste={(e) => {
                                e.preventDefault()
                            }}
                            onKeyUp={(e) => {
                                var keyC = e.keyCode || e.charCode
                                if (keyC == 8 || keyC == 46)
                                    return
                                var key = e.key
                                if (Number(key) < 0 || Number(key) > 9) {
                                    return
                                }
                                document.getElementById("inp2")?.focus()
                            }}
                            onChange={(e) => {
                                if (e.target.value.length > 1) {
                                    e.target.value = e.target.value.slice(0, 1)
                                }
                            }}
                        />
                        <input id="inp2" min={0} max={9} step={1} type="number" name="num2"
                            className="m-2 p-3 text-3xl bg-cor5 rounded-2xl w-16 h-24 sm:w-20 sm:h-28 text-center outline-none border-b-4 border-b-cor5 focus:border-b-cor1 transition-all duration-200"
                            onPaste={(e) => {
                                e.preventDefault()
                            }}
                            onKeyUp={(e) => {
                                var keyC = e.keyCode || e.charCode
                                if (keyC == 8 || keyC == 46)
                                    return
                                var key = e.key
                                if (Number(key) < 0 || Number(key) > 9) {
                                    return
                                }
                                document.getElementById("inp3")?.focus()
                            }}
                            onChange={(e) => {
                                if (e.target.value.length > 1) {
                                    e.target.value = e.target.value.slice(0, 1)
                                }
                            }}
                        />
                        <input id="inp3" min={0} max={9} step={1} type="number" name="num3"
                            className="m-2 p-3 text-3xl bg-cor5 rounded-2xl w-16 h-24 sm:w-20 sm:h-28 text-center outline-none border-b-4 border-b-cor5 focus:border-b-cor1 transition-all duration-200"
                            onPaste={(e) => {
                                e.preventDefault()
                            }}
                            onKeyUp={(e) => {
                                var keyC = e.keyCode || e.charCode
                                if (keyC == 8 || keyC == 46)
                                    return
                                var key = e.key
                                if (Number(key) < 0 || Number(key) > 9) {
                                    return
                                }
                                document.getElementById("inp4")?.focus()
                            }}
                            onChange={(e) => {
                                if (e.target.value.length > 1) {
                                    e.target.value = e.target.value.slice(0, 1)
                                }
                            }}
                        />
                        <input id="inp4" min={0} max={9} step={1} type="number" name="num4"
                            className="m-2 p-3 text-3xl bg-cor5 rounded-2xl w-16 h-24 sm:w-20 sm:h-28 text-center outline-none border-b-4 border-b-cor5 focus:border-b-cor1 transition-all duration-200"
                            onPaste={(e) => {
                                e.preventDefault()
                            }}
                            onKeyUp={(e) => {
                                var keyC = e.keyCode || e.charCode
                                if (keyC == 8 || keyC == 46)
                                    return
                                document.getElementById("sub")?.focus()
                            }}
                            onChange={(e) => {
                                if (e.target.value.length > 1) {
                                    e.target.value = e.target.value.slice(0, 1)
                                }
                            }}
                        />
                    </div>
                    <input id="sub" type="submit" value={"Verificar"} className="block text-center mx-auto my-4 mb-1 w-64 p-3 border border-cor4 bg-cor4 font-bold text-branco text-lg rounded-lg hover:bg-transparent hover:text-preto transition-colors duration-200" />
                </form>
            </main>
        </>
    )
}