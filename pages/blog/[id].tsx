import Alerta from "@/Components/alerta";
import Navbar from "@/Components/navbar";
import { marked } from "marked";
import Image from "next/image";
import { sanitize } from "isomorphic-dompurify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import parse from "html-react-parser";

export default function Post() {
    const router = useRouter()
    const id = router.query["id"]
    //dados
    const [titulo, setTitulo] = useState<string>("")
    const [data, setData] = useState<Date>(new Date())
    const [imgUrl, setImgUrl] = useState<string>("")
    const [conteudoP, setConteudoP] = useState<string>("")
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")
    useEffect(() => {
        const obterPost = async () => {
            const reqPost = await fetch("/api/blog/obter-post?id=" + id)
            if (reqPost.ok && reqPost.status !== 204) {
                const post = await reqPost.json()
                if (post) {
                    setTitulo(post.titulo)
                    setData(new Date(post.data))
                    const conteudo = await marked.parse(post.mensagem)
                    setConteudoP(conteudo)
                    setImgUrl(post.img_url)
                }
                else {
                    setMostrar(true)
                    setSucesso(false)
                    setMsgA("Erro ao demonstrar dados!")
                }
            }
            else {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Este post não existe!")
            }
        }
        if (id) {
            obterPost()
        }
    }, [id])
    return (
        <>
            <Head>
                <title>{titulo !== "" ? titulo : "Post não existente"}</title>
            </Head>
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Navbar />
            <main className="w-3/4 mx-auto mt-9">
                <h1 className="text-2xl font-extrabold md:text-4xl md:font-bold">{titulo}</h1>
                <div className="my-4 mb-6 text-xs md:text-sm font-medium opacity-50">
                    <h2>Publicado em {data.getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/{(data.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/{data.getUTCFullYear().toLocaleString("en-US", { minimumIntegerDigits: 4, useGrouping: false })}</h2>
                    <h2>Cátia Marina</h2>
                </div>
                {imgUrl &&
                    <img src={imgUrl} width={1600} height={900} alt="Imagem do post" className="w-full aspect-video rounded-xl" />
                }
                <article className="prose-sm max-w-none md:prose md:max-w-none lg:prose-xl lg:max-w-none w-full font-normal mx-auto my-6 prose-a:underline prose-a:text-azul">{parse(sanitize(conteudoP))}</article>
            </main>
        </>
    )
}