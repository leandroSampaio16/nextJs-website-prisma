import Alerta from "@/Components/alerta";
import Navbar from "@/Components/navbar";
import FullCalendar from "@fullcalendar/react";
import timeGridWeek from "@fullcalendar/timegrid";
import { CloudUpload, Create, Delete, Download, Edit, Logout, Loop, OpenInNew, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Popover, Select, TextField, Typography, styled } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import * as commands from "@uiw/react-md-editor/commands";
import Head from "next/head";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { sanitize } from "isomorphic-dompurify";
import { marked } from "marked";
import parse from "html-react-parser";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
)
export default function Admin() {
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
    //validacao admin
    useEffect(() => {
        const conta = async () => {
            if (hasCookie("__session")) {
                const reqDadosConta = await fetch("/api/obterinfoconta")
                const dadosConta = await reqDadosConta.json()
                if (dadosConta.admin) {
                    if (dadosConta.admin === false) {
                        window.location.replace("/")
                    }
                }
                else {
                    window.location.replace("/")
                }
            }
            else {
                window.location.replace("/")
            }
        }
        conta()
    }, [])
    //posts do blog
    const [posts, setPosts] = useState<{ id: number, titulo: string, mensagem: string, img_url: string }[]>([])
    //sessoes
    const [sessoes, setSessoes] = useState<{ title: string, start: Date, end: Date }[]>([])
    //compras
    const [compras, setCompras] = useState<{ id: number, id_cliente: number, qnt_sessoes: string, data: string, preco: number }[]>([])
    //contas
    const [contas, setContas] = useState<{ id: number, email: string, nome: string, genero: string, nascimento: Date, motivos: string, creditos: number, admin: boolean }[]>([])
    //obter posts e sessoes
    useEffect(() => {
        const postsBlog = async () => {
            const reqPosts = await fetch("/api/blog/obter-posts")
            const posts = await reqPosts.json()
            setPosts(posts)
        }
        const obterSessoes = async () => {
            const reqSessoes = await fetch("/api/agenda/obter")
            const sessoes = await reqSessoes.json()
            setSessoes(sessoes.map((v: any): { title: string, start: Date, end: Date } => {
                const titulo = v.mensagem ? v.mensagem : ""
                const start = new Date(v.dia_e_hora)
                const end = new Date(start)
                end.setHours(start.getHours() + 1)
                return {
                    title: titulo,
                    start: start,
                    end: end,
                }
            }))
        }
        const obterCompras = async () => {
            const reqCompras = await fetch("/api/admin/obter-compras")
            const compras = await reqCompras.json()
            setCompras(compras)
        }
        const obterContas = async () => {
            const reqContas = await fetch("/api/admin/obter-contas")
            const contas = await reqContas.json()
            setContas(contas)
        }
        postsBlog()
        obterSessoes()
        obterCompras()
        obterContas()
    }, [])
    //mostrar senha
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
    //conteudo para submeter novo post
    const [id, setId] = useState<number | null>(null)
    const [data, setData] = useState<Date | null>(null)
    const [titulo, setTitulo] = useState<string>("")
    const [conteudo, setConteudo] = useState<string | undefined>()
    //mostrar conteudo do post
    const [textoAMostrar, setTextoAMostrar] = useState<string>("")
    const [abrirDialog, setAbrirDialog] = useState<boolean>(false)
    function handleClickOpen(texto: string) {
        setTextoAMostrar(texto)
        setAbrirDialog(true)
    }

    function handleClose() {
        setAbrirDialog(false)
    }
    return (
        <>
            <Head>
                <title>Administração</title>
            </Head>
            <Navbar />
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Rodal visible={abrirDialog} onClose={handleClose} animation="fade" width={700} height={600}>
                <div className="prose lg:prose-xl w-full max-w-none mt-5 m-2 overflow-y-scroll h-[550px]">{parse(sanitize(marked.parse(textoAMostrar).toString()))}</div>
            </Rodal>
            <form action={"/api/conta/logout"} className="flex justify-end m-2">
                <Button type="submit" variant="outlined" color="secondary" endIcon={<Logout />}>
                    Logout
                </Button>
            </form>
            <Box component={"div"} className="w-full flex flex-row justify-evenly my-14">
                <Box
                    component={"form"}
                    method="POST"
                    action={"/api/conta/alterar-senha?admin=true"}
                    className="flex flex-col justify-center items-center w-1/4 m-2"
                >
                    <Typography variant="body1">Alterar Senha:</Typography>
                    <FormControl variant="filled" required className="w-full !m-2">
                        <InputLabel htmlFor="adornment-senha">Senha</InputLabel>
                        <FilledInput id="adornment-senha" name="senha" type={verSenha ? "text" : "password"} required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="ver senha"
                                        onClick={(e) => { setVerSenha(!verSenha) }}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                        edge="end"
                                    >
                                        {verSenha ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField variant="filled" label="Repetir Senha" name="rsenha" type={verSenha ? "text" : "password"} required className="w-full !m-2" />
                    <Button variant="outlined" color="secondary" type="submit" endIcon={<Loop />}>
                        Alterar
                    </Button>
                </Box>
                <Box
                    component={"form"}
                    method="POST"
                    action={"/api/admin/adicionar-post"}

                    encType="multipart/form-data"
                    className="flex flex-col justify-center items-center w-2/4 !m-2"
                    data-color-mode="light">
                    <Typography variant="body1">Colocar Post:</Typography>
                    <input type="hidden" name="id" value={id !== null ? id : -1} readOnly />
                    <input type="hidden" name="data" value={data !== null ? data.toISOString() : -1} readOnly />
                    <Box component={"div"} className="w-full flex flex-row">
                        <TextField variant="filled" name="titulo" label="Título" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-3/4 !m-2" />
                        <Button component="label" variant="outlined" startIcon={<CloudUpload />} className="w-1/4 !m-2" aria-required>
                            Imagem *
                            <VisuallyHiddenInput type="file" required accept="image/*" name="img" />
                        </Button>
                    </Box>
                    <MDEditor
                        value={conteudo}
                        onChange={(valor: string | undefined) => {
                            if (!document.getElementsByClassName("w-md-editor-preview")[0].classList.contains("prose")) {
                                document.getElementsByClassName("w-md-editor-preview")[0].classList.add("prose")
                                document.getElementsByClassName("w-md-editor-preview")[0].classList.add("max-w-none")
                            }
                            setConteudo(valor)
                            if (valor && valor !== "") {
                                if (document.getElementById("editor")?.classList.contains("border-vermelho")) {
                                    document.getElementById("editor")?.classList.remove("border-vermelho")
                                }
                            }
                            else {
                                if (!document.getElementById("editor")?.classList.contains("border-vermelho")) {
                                    document.getElementById("editor")?.classList.add("border-vermelho")
                                }
                            }
                        }}
                        id="editor"
                        className="w-full !m-2 border-2 border-vermelho"
                    />
                    <textarea name="conteudo" value={conteudo} readOnly className="hidden"></textarea>
                    <div className="flex flex-row justify-center">
                        <Button type="button" className="!mr-2" variant="outlined" color="secondary" startIcon={<Delete />} onClick={(e) => {
                            window.location.reload()
                        }}>
                            Dar reset
                        </Button>
                        <Button type="submit" className="!ml-2" variant="outlined" color="success" endIcon={<Create />}>
                            {id !== null ? "Alterar" : "Colocar"}
                        </Button>
                    </div>

                </Box>
            </Box>
            <Box component={"div"} className="w-full flex flex-row justify-evenly my-14 items-center">
                <Box component={"div"} className="w-2/4">
                    <DataGrid style={{ width: "100%", height: 400 }}
                        columns={[
                            {
                                field: "id", headerName: "ID", minWidth: 150, renderCell: (params: GridRenderCellParams<any, number>) => {
                                    return (
                                        <Box component={"div"} className="flex items-center">
                                            <Typography>{params.value !== undefined ? params.value.toString() : ""}</Typography>
                                            <IconButton aria-label="Abrir" href={params.value !== undefined ? "/blog/" + params.value.toString() : ""} target="_blank"><OpenInNew /></IconButton>
                                        </Box>
                                    )
                                }
                            },
                            {
                                field: "titulo", headerName: "Título", minWidth: 300, width: 500, maxWidth: 1000
                            },
                            {
                                field: "data", headerName: "Data", minWidth: 200, renderCell: (params: GridRenderCellParams<any, number>) => {
                                    const data = new Date(params.value ? params.value : "")
                                    const str = data.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + (data.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + data.getFullYear().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
                                    return (
                                        <Typography>{params.value ? str : ""}</Typography>
                                    )
                                }
                            },
                            {
                                field: "img_url", headerName: "Imagem", renderCell: (params: GridRenderCellParams<any, string>) => {
                                    return (
                                        <IconButton color="secondary" size="small" href={params.value ? params.value : "/"} target="_blank" className="m-1">
                                            <Download />
                                        </IconButton>
                                    )
                                }
                            },
                            {
                                field: "mensagem", headerName: "Conteúdo", renderCell: (params: GridRenderCellParams<any, string>) => {
                                    return (
                                        <IconButton color="primary" size="small" onClick={() => {
                                            handleClickOpen(params.value ? params.value : "")
                                        }} className="m-1">
                                            <Visibility />
                                        </IconButton>
                                    )
                                }
                            },
                            {
                                field: "alterar", headerName: "Ações", renderCell: (params: GridRenderCellParams<any, undefined>) => {
                                    return (
                                        <IconButton color="primary" size="small" onClick={() => {
                                            if (params.row) {
                                                setSucesso(true)
                                                setMsgA("Dirija-se a formulário \"Adicionar Post\" para concluir a alteração")
                                                setId(params.row["id"])
                                                setData(new Date(params.row["data"]))
                                                setTitulo(params.row["titulo"])
                                                setConteudo(params.row["mensagem"])
                                            }
                                            else {
                                                setSucesso(false)
                                                setMsgA("Erro")
                                            }
                                            setMostrar(true)
                                        }} className="m-1">
                                            <Edit />
                                        </IconButton>
                                    )
                                }
                            }
                        ]}
                        rows={posts}
                        slots={{
                            toolbar: GridToolbar
                        }}
                    />
                </Box>
                <Box component={"form"} method="POST" action={"/api/admin/remover-post"} className="w-1/4 flex flex-col items-center justify-start">
                    <Typography variant="body1">Remover Post:</Typography>
                    <FormControl variant="outlined" className="!m-2 w-3/4">
                        <InputLabel id="label-id-post-remover">ID do post a remover</InputLabel>
                        <Select labelId="label-id-post-remover" label="ID do post a remover" name="id" required defaultValue={""}>
                            <MenuItem disabled defaultValue={""}></MenuItem>
                            {posts && posts.map((v) => {
                                return (
                                    <MenuItem key={v.id} value={v.id}>
                                        {v.id}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" type="submit" startIcon={<Delete />} className="!m-2">Remover</Button>
                </Box>
            </Box>
            <Box component={"div"} className="w-full flex flex-row justify-center my-14 items-center">
                <Box component={"div"} className="w-2/4">
                    <DataGrid style={{ width: "100%", height: 400 }}
                        columns={[
                            {
                                field: "id", headerName: "ID"
                            },
                            {
                                field: "id_cliente", headerName: "ID do Cliente"
                            },
                            {
                                field: "qnt_sessoes", headerName: "Qtd. Sessões",
                            },
                            {
                                field: "data", headerName: "Data", width: 200, renderCell: (params: GridRenderCellParams<any, number>) => {
                                    const data = new Date(params.value ? params.value : "")
                                    const str = data.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + (data.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + data.getFullYear().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
                                    return (
                                        <Typography>{params.value ? str : ""}</Typography>
                                    )
                                }
                            },
                            {
                                field: "preco", headerName: "Preço (em €)", renderCell: (params: GridRenderCellParams<any, number>) => {
                                    return (
                                        <Typography>{params.value ? params.value.toFixed(2) + " €" : ""}</Typography>
                                    )
                                }
                            },
                        ]}
                        rows={compras}
                        slots={{
                            toolbar: GridToolbar
                        }}
                    />
                </Box>
            </Box>
            <Box component={"div"} className="w-full flex flex-row justify-evenly my-14 items-center">
                <Box component={"div"} className="w-2/4">
                    <DataGrid style={{ width: "100%", height: 400 }}
                        columns={[
                            {
                                field: "id", headerName: "ID"
                            },
                            {
                                field: "email", headerName: "Email", width: 250,

                            },
                            {
                                field: "nome", headerName: "Nome", width: 200
                            },
                            {
                                field: "genero", headerName: "Género"
                            },
                            {
                                field: "nascimento", headerName: "Nascimento", renderCell: (params: GridRenderCellParams<any, number>) => {
                                    const data = new Date(params.value ? params.value : "")
                                    const str = data.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + (data.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }) + "/" + data.getFullYear().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
                                    return (
                                        <Typography>{params.value ? str : ""}</Typography>
                                    )
                                }
                            },
                            {
                                field: "motivos", headerName: "Motivos", width: 557
                            },
                            {
                                field: "creditos", headerName: "Créditos"
                            },
                            {
                                field: "admin", headerName: "Admin", renderCell: (params: GridRenderCellParams<any, boolean>) => {
                                    return (
                                        <Typography>{params.value ? "Sim" : "Não"}</Typography>
                                    )
                                }
                            },
                        ]}
                        rows={contas}
                        slots={{
                            toolbar: GridToolbar
                        }}
                    />
                </Box>
                <Box component={"form"} method="POST" action={"/api/admin/alterar-creditos"} className="w-1/4 flex flex-col items-center justify-start">
                    <Typography variant="body1">Alterar Créditos:</Typography>
                    <FormControl variant="outlined" className="!m-2 w-3/4">
                        <InputLabel id="label-email-conta-altcreditos">Email da conta</InputLabel>
                        <Select labelId="label-email-conta-altcreditos" label="Email da conta" name="email" required defaultValue={""}>
                            <MenuItem disabled defaultValue={""}></MenuItem>
                            {contas && contas.map((v) => {
                                return (
                                    <MenuItem key={v.id} value={v.email}>
                                        {v.email}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField className="!m-2 w-3/4" label="Nova qtd. de créditos" variant="outlined" name="creditos" />
                    <Button variant="outlined" type="submit" startIcon={<Edit />} className="!m-2">Alterar</Button>
                </Box>
            </Box>
            <Box component={"div"} className="my-14 w-full flex justify-center h-[40rem]">
                <FullCalendar
                    plugins={[timeGridWeek]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay prevYear,nextYear',
                    }}
                    views={{
                        timeGridWeek: {
                            allDaySlot: false,
                            slotMinTime: '09:00',
                            slotMaxTime: '18:50',
                            slotDuration: '00:20',
                        }
                    }}
                    events={sessoes}
                    editable={false}
                    height={"30rem"}
                />
            </Box>
        </>
    )
}