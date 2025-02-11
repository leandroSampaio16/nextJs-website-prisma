import Alerta from "@/Components/alerta";
import Navbar from "@/Components/navbar";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

function arrayIsEmpty(array: any) {
    if (!Array.isArray(array)) {
        return false
    }
    if (array.length == 0) {
        return true
    }
    return false
}
export function Post({ id, titulo, mensagem, img_url, data }: { id: number, titulo: string, mensagem: string, img_url: string, data: Date }) {
    return (
        <div className="w3-card-4 w3-margin w3-white !mb-8">
            <img src={img_url} alt="Imagem Post" className="w-full" />
            <div className="w3-container">
                <h3 className="text-2xl my-3"><b>{titulo}</b></h3>
                <h5 className="my-3"><span>{(new Date(data)).getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 })}/{((new Date(data)).getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 })}/{((new Date(data)).getFullYear().toLocaleString("en-US", { minimumIntegerDigits: 4 })).replace(",", "")}</span><span className="w3-opacity">&nbsp;-&nbsp;Cátia Marina</span></h5>
            </div>

            <div className="w3-container">
                <div className="w3-row">
                    <div className="w3-col m8 s12">
                        <p><Link href={"/blog/" + id} className="w3-button w3-padding-large w3-white w3-border my-3 transition duration-500 cursor-pointer hover:!scale-105"><b>LER »</b></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function Blog() {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")

    //obter alguns posts
    const [postsI, setPostsI] = useState<{ id: number, titulo: string, mensagem: string, img_url: string, data: Date }[]>([])
    const [posts, setPosts] = useState<{ id: number, titulo: string, mensagem: string, img_url: string, data: Date }[]>([])
    useEffect(() => {
        const obterPosts = async () => {
            const reqPosts = await fetch("/api/blog/obter-posts")
            const posts = await reqPosts.json()
            setPostsI(posts)
            setPosts(posts)
            if (arrayIsEmpty(posts) === true) {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Não existem posts no blog, volte mais tarde.")
            }
        }
        obterPosts()
    }, [])
    return (
        <>
            <Head>
                <title>Blog</title>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </Head>
            <Navbar />
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <main className="w-full">
                <footer className="flex justify-center my-8 mb-12">

                </footer>
            </main>
            <div className="w3-content max-w-[1400px]">
                <header className="w3-container w3-center w3-padding-32 mx-auto">
                    <h1 className="text-4xl"><b>Blog</b></h1>
                    <p className="text-lg">Bem-vindo ao blog da <span className="w3-tag">Cátia Marina</span></p>
                    <section className="w-full flex justify-center mt-5">
                        <div className="w3-col l8 s12 flex justify-center md:justify-end">
                            <TextField label="Pesquisa aqui..." variant="outlined" className="max-w-[90%] w-[20rem]" onChange={(e) => {
                                setPosts(postsI.filter((postI) => postI.titulo.toUpperCase().includes(e.target.value.toUpperCase())))
                            }} InputProps={{
                                endAdornment: <Search />
                            }} />
                        </div>
                    </section>
                </header>
                <div className="w3-row flex flex-col justify-center">
                    <div className="w3-col l8 s12 mx-auto">
                        {posts && posts.map((valor) => {
                            return (
                                <>
                                    <Post key={valor.id} id={valor.id} titulo={valor.titulo} mensagem={valor.mensagem} img_url={valor.img_url} data={new Date(valor.data)} />
                                </>
                            )
                        })}
                        {!posts &&
                            <>
                                <h1>Sem posts no blog!</h1>
                                <h2>Volte mais tarde</h2>
                            </>
                        }
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}