import React, { useEffect, useState } from 'react';
import Navbar1 from "@/Components/navbar";
import DatePicker from "@/Components/datepicker";
import { hasCookie } from 'cookies-next';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography, styled } from '@mui/material';
import { Close, Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import Alerta from '@/Components/alerta';
import Head from 'next/head';
import jquery from "jquery";
import { Button } from '@mui/material';
import { MRT_Table, MaterialReactTable, useMaterialReactTable } from "material-react-table";

interface PerfilI {
    id: number;
    email: string;
    nome: string;
    genero: string;
    nascimento: Date;
    motivos: string;
    foto_url: string | null;
    pin_otp: number | null;
    dia_hora_otp: Date | null;
    creditos: number;
    admin: boolean;
}
interface CompraI {
    id: number,
    email: string;
    qnt_sesssoes: number;
    data: Date;
    preco: number;
}
export default function Perfil() {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")
    //ver notificacao
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("erro") && urlParams.has("msg")) {
            const erro = Boolean(urlParams.get("erro"))
            const msg = urlParams.get("msg")
            setMostrar(true)
            setSucesso(erro)
            setMsgA(msg ? msg : "Erro")
        }
    }, [])
    //dadosConta
    const [dados, setDados] = useState<PerfilI | null>(null)
    //verificar se está com login
    useEffect(() => {
        if (!hasCookie("__session")) {
            window.location.replace("/")
        }
        else {
            const dadosConta = async () => {
                const reqConta = await fetch("/api/obterinfoconta")
                if (reqConta.ok && reqConta.status === 200) {
                    const dConta = await reqConta.json()
                    if (dConta.admin === true) {
                        window.location.replace("/admin")
                    }
                    setDados(dConta)
                    setNascimento(new Date(dConta.nascimento))
                }
            }
            dadosConta()
        }
    }, [])
    //compras
    const [compras, setCompras] = useState<CompraI[]>([])
    useEffect(() => {
        const dadosCompras = async () => {
            const reqCompras = await fetch("/api/compras/obter-compras")
            if (reqCompras.ok && reqCompras.status === 200) {
                const dCompras = await reqCompras.json()
                setCompras(dCompras)
            }
            else {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Não foi possível obter as transações!")
            }
        }
        dadosCompras()
    }, [])
    //formularios
    const [senha, setSenha] = useState<string>("")
    const [nascimento, setNascimento] = useState<Date>(new Date())
    const [verSenha, setVerSenha] = useState<boolean>(false)
    //escondido
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    })
    //dialog de alterar senha
    const [mostDialog, setMostDialog] = useState<boolean>(false)
    const [verSenhaDialog, setVerSenhaDialog] = useState<boolean>(false)
    //filtrar
    const [filtrar, setFiltrar] = useState<boolean>(false)
    const tabelaCompras = useMaterialReactTable({
        data: compras,
        columns: [{
            accessorKey: "id",
            header: "ID (da tabela)",
        },
        {
            accessorKey: "qnt_sessoes",
            header: "Qtd. sessões",
        },
        {
            accessorKey: "data",
            header: "Data",
            Cell: ({ cell, table }) => {
                const data = `${new Date(cell.getValue()).getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2 })}/${(new Date(cell.getValue()).getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 })}/${(new Date(cell.getValue()).getUTCFullYear().toLocaleString("en-US", { minimumIntegerDigits: 4 })).replace(",", "")}`
                return (
                    <span>{data}</span>
                )
            },
        },
        {
            accessorKey: "preco",
            header: "Preço",
            Cell: ({ cell, table }) => {
                return (
                    <span>{Number(cell.getValue()).toFixed(2)} €</span>
                )
            }

        }]
    })
    return (
        <>
            <Head>
                <title>O seu perfil</title>
            </Head>

            <Navbar1 />
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Dialog open={mostDialog} onClose={(e) => setMostDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle className='flex justify-between items-center'>
                    <Box component={"span"}>Alterar a senha</Box>
                    <IconButton
                        aria-label="close"
                        onClick={(e) => setMostDialog(false)}
                    ><Close /></IconButton></DialogTitle>
                <Box component={"form"} method='POST' action={"/api/conta/alterar-senha?admin=false"} className='w-full'>
                    <DialogContent>
                        <FormControl variant="filled" required className="w-full" sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>

                            <InputLabel htmlFor="adornment-senha">Senha</InputLabel>
                            <FilledInput id="adornment-senha" name="senha" type={verSenhaDialog ? "text" : "password"} required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="ver senha"
                                            onClick={(e) => { setVerSenhaDialog(!verSenhaDialog) }}
                                            onMouseDown={(e) => { e.preventDefault() }}
                                            edge="end"
                                        >
                                            {verSenhaDialog ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <TextField variant="filled" label="Repetir Senha" name="rsenha" type={verSenhaDialog ? "text" : "password"} required className="w-full" sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />

                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>Alterar!</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <form action="/api/conta/logout" className='flex justify-end mt-2 mr-2'>
                <Button
                    className="m-2 w-24 sm:w-1/5 md:w-1/6 lg:w-2/12 xl:w-2/12 2xl:w-1/12 text-xs md:text-lg py-2 rounded-full font-bold  h-[3em]"
                    style={{ borderRadius: '15px', background: '#D21404', color: 'white', fontFamily: "Inter" }}
                    type='submit'
                >
                    LOGOUT
                </Button>
            </form>
            <center>
                <form action="/api/conta/alterar-dados" method="post" encType="multipart/form-data">
                    <div className="mx-auto xl:w-1/2 lg:w-2/5 w-11/12 flex items-center justify-between" style={{ marginTop: "10vh" }}>
                        <p className="text-black font-inter xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Informações</p>

                        <Button
                            className="w-1/3 md:w-1/4 lg:w-4/12 xl:w-3/12 text-xs md:text-lg py-2 rounded-full font-bold mt-4 md:mt-0 h-[3em]"
                            style={{ borderRadius: '15px', background: '#5BBBEC', color: 'white', fontFamily: "Inter" }}
                            type='submit'
                            onClick={(e) => {
                                localStorage.setItem("img", (document.getElementById('pfp')! as HTMLImageElement).src)
                            }}
                        >
                            Guardar
                        </Button>
                    </div>
                    <div className="xl:w-1/2 lg:w-2/5 w-11/12 mx-auto"
                        style={{ marginTop: "3vh", background: "rgba(0, 0, 0, 0.20)", height: "1px" }}>

                    </div>


                    <div className="flex items-center justify-center mt-14 flex-col md:flex-row">


                        <div className="xl:w-2/6 lg:w-2/5 md:w-1/2 w-3/4">


                            <div className="xl:w-80 lg:w-60 md:w-48 xl:text-2xl text-center md:text-left lg:text-left"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: "500",
                                }}>
                                Dados da conta
                            </div>
                            <div className="xl:w-80 lg:w-60 md:w-52 md:mt-12 lg:mt-20">
                                {dados &&
                                    <input type="email" placeholder="Email" name="email" defaultValue={dados.email} required
                                        className="my-1 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10 w-full text-xl"
                                    />
                                }
                                <div className="xl:w-80 lg:w-60 md:w-52"
                                    style={{ marginTop: "5vh", background: "rgba(0, 0, 0, 0.20)", height: "1px" }}>

                                </div>
                            </div>


                            <div className="xl:w-80 lg:w-60 md:w-48 xl:text-2xl text-center md:text-left lg:text-left"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: "500",
                                    marginTop: "5vh"
                                }}>
                                Alterar senha
                            </div>
                            <div className="xl:w-80 lg:w-60 md:w-52 md:mt-12 lg:mt-20">
                                <div className="my-1 w-full flex items-center justify-end">
                                    <input className="flex-grow mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10 w-full text-xl" type={verSenha ? "text" : "password"} placeholder="Senha atual" value={senha} onChange={(e) => {
                                        setSenha(e.target.value)
                                    }} />
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
                                <Button
                                    className="w-full text-lg lg:px-6 md:px-4 py-2 rounded-full font-bold mt-4 md:mt-0 h-[3em]"
                                    style={{
                                        borderRadius: '15px',
                                        background: '#5BBBEC',
                                        color: 'white',
                                        fontFamily: "Inter",
                                        marginTop: "3vh"
                                    }}
                                    type='button'
                                    onClick={async (e) => {
                                        const setReq = {
                                            "url": "/api/conta/verificar-senha",
                                            "method": "POST",
                                            "timeout": 0,
                                            "headers": {
                                                "Content-Type": "application/x-www-form-urlencoded"
                                            },
                                            "data": {
                                                "senha": senha
                                            }
                                        }
                                        if (senha !== "") {
                                            jquery.ajax(setReq)
                                                .done((texto, textStatus, jqXHR) => {
                                                    setMostDialog(true)
                                                })
                                                .fail((jqXHR, textStatus, errorThrown) => {
                                                    setMostrar(true)
                                                    setSucesso(false)
                                                    setMsgA(jqXHR.responseText)
                                                })
                                        }
                                        else {
                                            setMostrar(true)
                                            setSucesso(false)
                                            setMsgA("Coloque a sua senha anterior primeiro.")
                                        }
                                    }}
                                >
                                    Guardar
                                </Button>

                            </div>


                        </div>

                        <div className="xl:w-2/6 lg:w-2/5 md:w-1/2 w-3/4 md:mt-0 md:mr-3 mt-10 mr-0">


                            <div className="xl:w-80 lg:w-60 md:w-48 xl:text-2xl md:mb-7 mb-3 md:text-left text-center font-medium"
                                style={{
                                    fontFamily: "Inter",
                                }}>
                                Informações Pessoais
                            </div>
                            <div className="xl:w-80 lg:w-60 md:w-52"
                                style={{}}>
                                <div className='size-36 md:size-40 lg:size-52 xl:size-64 relative'>
                                    {dados &&
                                        <img
                                            width={144}
                                            height={144}
                                            id="pfp"
                                            src={dados.foto_url ? dados.foto_url : "/nopfp.jpg"}
                                            alt="Imagem de Perfil"
                                            className="size-36 sm:size-36 md:size-40 lg:size-52 xl:size-64 rounded-full object-cover"
                                            style={{ marginBottom: "3vh" }}
                                        />
                                    }

                                    <Fab component="label" color='primary' size='small' aria-label='change' className='bg-[#5BBBEC] !absolute bottom-0 right-0 !size-10 md:!size-12 lg:!size-14 xl:!size-16 !z-10'>
                                        <Edit />
                                        <VisuallyHiddenInput type="file" accept="image/*" name="img" onChange={(e) => {
                                            if (e.target.files) {
                                                (document.getElementById('pfp')! as HTMLImageElement).src = window.URL.createObjectURL(e.target.files[0])
                                            }
                                        }} />
                                    </Fab>
                                </div>
                                {dados &&
                                    <>
                                        <input type="text" placeholder="Nome" name="nome" defaultValue={dados?.nome} required
                                            className="mt-7 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10 w-full text-xl"
                                        />
                                        <select required name="genero" defaultValue={dados?.genero} className="my-2 mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10 w-full text-xl">
                                            <option value={"Masculino"}>Masculino</option>
                                            <option value={"Feminino"}>Feminino</option>
                                            <option value={"Outro"}>Outro</option>
                                        </select>
                                        <input type="hidden" name="data" required value={nascimento.toISOString()} readOnly />
                                        <DatePicker
                                            className="w-full mx-auto p-1 px-3 rounded-2xl outline-none border-2 border-preto border-opacity-10 text-xl"
                                            placeholder="Data de nascimento" alterar={(d: string) => setNascimento(new Date(d))} value={new Date(dados.nascimento)}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </form>

                <div className="mx-auto xl:w-1/2 lg:w-2/5 w-11/12 flex items-center justify-between" style={{ marginTop: "15vh" }}>
                    <p className="text-black font-inter xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Movimentos</p>

                    <Button
                        className="w-1/3 md:w-1/4 lg:w-4/12 xl:w-3/12 text-xs md:text-lg py-2 rounded-full font-bold mt-4 md:mt-0 h-[3em]"
                        style={{ borderRadius: '15px', background: '#5BBBEC', color: 'white', fontFamily: "Inter" }}
                        onClick={(e) => setFiltrar(!filtrar)}
                    >
                        Filtrar
                    </Button>
                </div>

                <div className="xl:w-1/2 lg:w-2/5 w-11/12 mx-auto"
                    style={{ marginTop: "3vh", background: "rgba(0, 0, 0, 0.20)", height: "1px" }}>
                </div>
                <div className="xl:w-1/2 lg:w-2/5 w-11/12 mx-auto my-6 !z-20 !overflow-x-scroll">
                    <center>{filtrar ? <MaterialReactTable table={tabelaCompras} /> : <MRT_Table table={tabelaCompras} />}</center>
                </div>
                <br />
            </center >
        </>
    );
}
