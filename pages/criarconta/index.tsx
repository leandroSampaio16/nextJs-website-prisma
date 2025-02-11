import Alerta from "@/Components/alerta";
import DatePicker from "@/Components/datepicker";
import Carrossel from "@/Components/login/carrossel";
import Navbar from "@/Components/navbar";
import { hasCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CriarConta() {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")
    //Formulário criar conta
    const [passo, setPasso] = useState<number>(1)

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [nomeF, setNomeF] = useState<string>("")
    const [genero, setGenero] = useState<string>("")
    const [nascimento, setNascimento] = useState<Date | null>(null)

    const [verSenha, setVerSenha] = useState<boolean>(false)
    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm()
    function onSubmitForm1(data: any) {
        if (Object.keys(errorsForm1).length !== 0 && errorsForm1.constructor === Object) {
            setMostrar(true)
            setSucesso(false)
            setMsgA("Erro no formulário")
        }
        else {
            if (data["senha"] !== data["rsenha"]) {
                setMostrar(true)
                setSucesso(false)
                setMsgA("As passwords não coincidem!")
            }
            else {
                setEmail(data["email"])
                setSenha(data["senha"])
                setPasso(2)
            }
        }

    }
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm()
    function onSubmitForm2(data: any) {
        if (Object.keys(errorsForm2).length !== 0 && errorsForm2.constructor === Object) {
            setMostrar(true)
            setSucesso(false)
            setMsgA("Erro no formulário")
        }
        else if (nascimento instanceof Date) {
            setNomeF(data["nome"])
            setGenero(data["genero"])
            setPasso(3)
        }
        else {
            setMostrar(true)
            setSucesso(false)
            setMsgA("Escolha a sua data de nascimento!")
        }
    }
    //verificar se está com login
    useEffect(() => {
        if(hasCookie("__session")){
            window.location.replace("/")
        }
    })
    return (
        <>
            <Head>
                <title>Criar conta</title>
            </Head>
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Navbar />
            <main className="bg-background w-full mx-auto flex justify-center">
                <div className="w-[25rem] h-[35rem] bg-branco flex flex-row rounded-2xl lg:w-[50rem] lg:h-[35rem] my-5" style={{ boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.10) inset" }}>
                    <Carrossel />
                    <div className="w-full lg:w-1/2 my-5 sm:m-5">
                        <Link href={"/login"} className="block w-full text-right text-preto p-3 pb-0 text-sm text-opacity-60 hover:text-opacity-100 transition-colors duration-200">Já tem conta?</Link>
                        <br />
                        <br />
                        <h1 className="text-preto font-bold text-3xl mb-3 text-center lg:text-left">Vamos começar!</h1>
                        <h2 className="text-preto text-lg text-center lg:text-left">Crie a sua conta e comece a mudar!</h2>
                        <br />
                        <br />
                        <div className="mx-auto w-3/4 flex justify-evenly items-center">
                            <span className={(passo >= 1 ? "bg-cor2 text-branco" : "bg-branco text-cor2 border border-cor2") + " size-8 rounded-full flex flex-col items-center justify-center"}>1</span>

                            <span className="border-b-2 border-b-cor2 w-10" style={{ height: "2px" }}></span>

                            <span className={(passo >= 2 ? "bg-cor2 text-branco" : "bg-branco text-cor2 border border-cor2") + " size-8 rounded-full flex flex-col items-center justify-center"}>2</span>

                            <span className="border-b-2 border-b-cor2 w-10" style={{ height: "2px" }}></span>

                            <span className={(passo >= 3 ? "bg-cor2 text-branco" : "bg-branco text-cor2 border border-cor2") + " size-8 rounded-full flex flex-col items-center justify-center"}>3</span>
                        </div>
                        <br />
                        {passo === 1 &&
                            <form onSubmit={handleSubmitForm1(onSubmitForm1)} className="flex flex-col justify-center items-center w-full">

                                <input className="mx-auto p-1 px-3 w-3/4 rounded-2xl outline-none border-2 border-preto border-opacity-10" type="email" placeholder="Email" {...registerForm1("email", { required: true })} />

                                <div className="my-2 w-3/4 flex items-center justify-end">
                                    <input className="flex-grow mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" type={verSenha ? "text" : "password"} placeholder="Senha" {...registerForm1("senha", { required: true })} />
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


                                <input className="w-3/4 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" type={verSenha ? "text" : "password"} placeholder="Repetir Senha" {...registerForm1("rsenha", { required: true })} />

                                <br />

                                <input className="w-3/4 p-3 border border-cor4 bg-cor4 font-semibold text-branco text-xl rounded-xl hover:bg-transparent hover:text-preto transition-colors duration-200" type="submit" value={"Próxima etapa"} />
                            </form>
                        }
                        {passo === 2 &&
                            <form onSubmit={handleSubmitForm2(onSubmitForm2)} className="flex flex-col justify-center items-center w-full">
                                <input className="w-3/4 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" type="text" placeholder="Nome" {...registerForm2("nome", { required: true })} />

                                <select className="my-2 w-3/4 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" {...registerForm2("genero", { required: true })}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                <DatePicker className="w-3/4 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10" placeholder="Data de nascimento" alterar={(d: string) => setNascimento(new Date(d))} />
                                <br />

                                <input className="w-3/4 p-3 border border-cor4 bg-cor4 font-semibold text-branco text-xl rounded-xl hover:bg-transparent hover:text-preto transition-colors duration-200" type="submit" value={"Próximo Passo"} />
                            </form>
                        }
                        {passo === 3 &&
                            <form className="flex flex-col w-full items-center" method="POST" action={"/api/criarconta"}>
                                <input type="hidden" name="email" value={email} />
                                <input type="hidden" name="senha" value={senha} />
                                <input type="hidden" name="nome" value={nomeF} />
                                <input type="hidden" name="genero" value={genero} />
                                <input type="hidden" name="nascimento" value={nascimento?.toDateString()} />
                                <div className="flex flex-col w-3/4">
                                    <label className="flex items-center text-sm my-1 hover:cursor-pointer"><input className="size-4" type="checkbox" name="obj1" /><span className="mx-3 opacity-75">Desenvolvimento Profissional</span></label>
                                    <label className="flex items-center text-sm my-1 hover:cursor-pointer"><input className="size-4" type="checkbox" name="obj2" /><span className="mx-3 opacity-75">Melhoria do Bem-Estar</span></label>
                                    <label className="flex items-center text-sm my-1 hover:cursor-pointer"><input className="size-4" type="checkbox" name="obj3" /><span className="mx-3 opacity-75">Alcance de Metas Específicas</span></label>
                                </div>
                                <br />
                                <input className="w-3/4 p-3 border border-cor4 bg-cor4 font-semibold text-branco text-xl rounded-xl hover:bg-transparent hover:text-preto transition-colors duration-200" type="submit" value={"Criar Conta"} />
                            </form>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}