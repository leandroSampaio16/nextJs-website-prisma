import Image, { StaticImageData } from "next/image"
import { useCallback, useEffect, useRef, useState } from "react";
import lampada from "@/public/lampada.png";
import filipe from "@/public/example1.jpg";
import elisabete from "@/public/example2.jpg";
import marisa from "@/public/example3.jpg";

export default function Carrossel() {

    //carrossel
    const [mudar, setMudar] = useState(0);
    const btn0 = useRef<HTMLButtonElement>(null)
    const btn1 = useRef<HTMLButtonElement>(null)
    const btn2 = useRef<HTMLButtonElement>(null)
    const info = [
        [
            "Beneficie da orientação especializada da Cátia Marina nesta jornada de auto-conhecimento. Não hesite, comece agora mesmo a transformação que merece!",
            "A Catia é um anjo em minha vida, trazendo serenidade e sabedoria. Com empatia e justiça, ela é a amiga constante que sempre oferece o apoio certo. Como mãe dedicada, sua presença é como uma \"cuidadora\" exemplar. Desde o dia chuvoso em que nos conhecemos, ela é um anjinho que ilumina minha jornada.",
            filipe,
            "Filipe Simões",
            8
        ],


        [
            "Beneficie da orientação especializada da Cátia Marina nesta jornada de auto-conhecimento. Não hesite, comece agora mesmo a transformação que merece!",
            "Falar da minha Cátia, é falar do meu porto seguro, do meu farol, do meu ninho, de \"casa\", onde realmente me sinto bem. Já são muitos anos de amizade, mas o que tenho crescido ao teu lado,  representa uma vida.  Posso dizer com orgulho que és e serás sempre o meu ponto de luz. Obrigada por estares na minha vida.",
            marisa, "Marisa Aguiar", 7],


        [
            "Beneficie da orientação especializada da Cátia Marina nesta jornada de auto-conhecimento. Não hesite, comece agora mesmo a transformação que merece!",
            "Elisabete Bessa superou medos e inibições desde a infância, impactados por uma educação rígida. Ao ler um artigo compartilhado por Cátia Marina, encontrou inspiração para se libertar das emoções negativas. Tomando decisões adiadas, experimentou uma transformação profunda, agradecendo a Cátia Marina por essa conquista inestimável.",
            elisabete, "Elisabete Bessa", 6
        ]
    ] //descricao, msg, link_imagem, nome, num_sessoes
    const [desc, setDesc] = useState<string>(info[0][0].toString())
    const [msg, setMsg] = useState<string>(info[0][1].toString())
    const [img, setImg] = useState<StaticImageData>(info[0][2] as StaticImageData)
    const [nome, setNome] = useState<string>(info[0][3].toString())
    const [numS, setNumS] = useState<number>(Number(info[0][4]))
    const mudarElementoCarrosel = useCallback((index: number) => {
        if (index == 0) {
            btn1.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
            btn2.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
            btn0.current!.style!.backgroundColor! = "rgba(145, 200, 228, 0.4)"
        }
        else if (index == 1) {
            btn0.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
            btn1.current!.style!.backgroundColor! = "rgba(145, 200, 228, 0.4)"
            btn2.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
        }
        else {
            btn0.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
            btn1.current!.style!.backgroundColor! = "rgba(0,0,0,0.1)"
            btn2.current!.style!.backgroundColor! = "rgba(145, 200, 228, 0.4)"
        }
        setDesc(info[index][0].toString())
        setMsg(info[index][1].toString())
        setImg(info[index][2] as StaticImageData)
        setNome(info[index][3].toString())
        setNumS(Number(info[index][4]))
    }, [])
    useEffect(() => {
        document.body.style.overflow = "hidden"
        mudarElementoCarrosel(0)
    }, [mudarElementoCarrosel])
    useEffect(() => {
        const timer = setInterval(() => {
            mudarElementoCarrosel(mudar)
            if (mudar == 2) {
                setMudar(0)
            }
            else {
                setMudar(mudar + 1)
            }
        }, 3000)
        return () => clearInterval(timer)
    })
    return (
        <div className="hidden lg:block m-5 w-1/2 rounded-2xl" style={{ height: "calc(100% - 2*1.25rem)", backgroundColor: "rgba(116, 155, 194, 0.15)" }}>
            <header className="flex justify-between w-full">
                <div className="flex-1 opacity-50">
                    <Image src={lampada} alt="Lâmpada" width={151 / 6} height={203 / 6} className="m-5 absolute" />
                </div>
                <div className="flex-1 flex justify-center items-center mt-6">
                    <button className="size-4 rounded-full m-2" ref={btn0} onClick={(e) => { mudarElementoCarrosel(0) }}></button>
                    <button className="size-4 rounded-full m-2" ref={btn1} onClick={(e) => { mudarElementoCarrosel(1) }}></button>
                    <button className="size-4 rounded-full m-2" ref={btn2} onClick={(e) => { mudarElementoCarrosel(2) }}></button>
                </div>
                <div className="flex-1"></div>
            </header>
            <section className="text-preto px-4 mt-7 mx-auto w-full flex items-center flex-col justify-between h-4/5">
                <h2 className="mt-5 mx-4 overflow-hidden font-light text-base first-letter:font-medium first-letter:text-xl" style={{ flex: "2 2 0%", fontFamily: "\"Roboto Serif\", serif" }}>{desc}</h2>
                <div className="rounded-xl w-full m-4 bg-branco mt-10 border border-preto border-opacity-50">
                    <p className="text-xs p-4 pb-0">{msg}</p>
                    <div className="flex items-center p-4">
                        <Image src={img} alt="IMG CLIENTE" className="rounded-full size-14" />
                        <div className="flex flex-col items-start ml-2">
                            <p className="font-bold text-[0.85rem]">{nome}</p>
                            <p className="text-xs text-cor3 font-medium text-[0.75rem]">{numS} sessões</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}