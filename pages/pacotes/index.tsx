
import Alerta from "@/Components/alerta";
import Navbar1 from "@/Components/navbar";
import { hasCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";


const Pacotes = () => {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")

    const cardsData = [

        {
            titulo1: "Sessão",
            titulo2: "Individual",
            numero: "1",
            precoAnterior: "54.99",
            precoNovo: "50",
            precoFinal: "50",
            link: "https://buy.stripe.com/8wM6oL2IXbja0vK5kk" //"https://buy.stripe.com/dR64gD97l9b20vKfZ1"<- teste 1€ || pacote 1 sessao->"https://buy.stripe.com/8wM6oL2IXbja0vK5kk",
        },

        {
            titulo1: "Jornada",
            titulo2: "Transformadora",
            numero: "4",
            precoAnterior: "49.99",
            precoNovo: "43",
            precoFinal: "172",
            link: "https://buy.stripe.com/8wMfZl97l0Ew6U8145",
        },

        {
            titulo1: "Revolução",
            titulo2: "Total",
            numero: "8",
            precoAnterior: "39.99",
            precoNovo: "37",
            precoFinal: "296",
            link: "https://buy.stripe.com/28odRdgzNcneemA6oq",
        }

    ]


    const vantagensData = [
        {
            text: 'Respostas imediata',
        },
        {
            text: 'Foco Pessoal',
        },
        {
            text: 'Avaliação Inicial Eficaz ',
        },
        {
            text: 'Clareza Imediata',
        },
        {
            text: 'Flexibilidade Horária',
        },
    ];

    const vantagensData2 = [
        {
            text: 'Transformação Profunda',
        },
        {
            text: 'Jornada Completa',
        },
        {
            text: 'Consistência na Transformação',
        },
        {
            text: 'Acompanhamento Contínuo',
        },
        {
            text: 'Prioridade no Agendamento',
        },
    ];

    const vantagensData1 = [
        {
            text: 'Desenvolvimento Progressivo',
        },
        {
            text: 'Estratégia Personalizada',
        },
        {
            text: 'Acompanhamento Regular',
        },
        {
            text: 'Reflexão Estruturada',
        },
        {
            text: 'Aprofundamento Emocional',
        },
    ];



    return (
        <>
            <Head>
                <title>Pacotes</title>
            </Head>
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <Navbar1 />
            <center>
                <div className="container">
                    <div className="centered-text">
                        <p className="text-3xl lg:text-5xl xl:text-6l sm:text-4xl bold bigText">
                            Descubra o mentorado da Cátia
                        </p>
                        <p className="text:lg sm:text-xl  w-2/3 sm:w-2/3 py-6 smallText">
                            Inicie agora a sua jornada de transformação, desbloqueie o seu potencial e trilhe o caminho
                            do sucesso.
                        </p>
                    </div>
                </div>
                <div className="image-container">
                    <img
                        src="/example3.jpg"
                        alt="Image 1"
                        className="circle-image"

                    />
                    <img
                        src="/example1.jpg"
                        alt="Image 2"
                        className="circle-image"

                    />
                    <img
                        src="/example2.jpg"
                        alt="Image 3"
                        className="circle-image"

                    />
                    <p className="text xClientes">Junte-se à nossa comunidade</p>
                </div>


            </center>


            <div className="flex flex-wrap justify-center" style={{ marginTop: "5vh" }}>


                {cardsData.map((data, index) => (

                    <div
                        key={index}
                        className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden cards sm:w-3/5 md:w-2/5 lg:w-2/5 xl:w-1/4  p-8"
                        style={{
                            borderRadius: "20px",
                            background: index === 1 ? '#FFF' : '#FFFFFFCC',
                            boxShadow:
                                "-4px 4px 4px 0px rgba(0, 0, 0, 0.10) inset, -4px 4px 4px 0px rgba(0, 0, 0, 0.10)",

                        }}>


                        {index === 1 ?
                            <div className="flex justify-end bg-opacity-10 rounded-md p-2 w-full">

                                <div className={"flex px-3 py-2 text-center items-center justify-center"} style={{
                                    borderRadius: "15px",
                                    background: "rgba(116, 155, 194, 0.10)",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em"
                                         viewBox="0 0 30 30"
                                         fill="none">
                                        <path
                                            d="M8.85 19H6C5.44772 19 5 18.5523 5 18V12C5 11.4477 5.44772 11 6 11H8.85C8.93284 11 9 11.0672 9 11.15V18.85C9 18.9328 8.93284 19 8.85 19Z"
                                            stroke="#4682A9" strokeWidth="2" strokeLinecap="round" />
                                        <path
                                            d="M9 11L10.8321 8.25192C10.9416 8.08766 11 7.89465 11 7.69722V5C11 4.44772 11.4477 4 12 4H13C14.1046 4 15 4.89543 15 6V11"
                                            stroke="#4682A9" strokeWidth="2" strokeLinecap="round" />
                                        <path
                                            d="M13 11H17.7655C18.9575 11 19.8849 12.0361 19.7532 13.2209L19.1977 18.2209C19.0851 19.2337 18.229 20 17.2099 20H13.4142C13.149 20 12.8946 19.8946 12.7071 19.7071L12.2929 19.2929C12.1054 19.1054 11.851 19 11.5858 19H9"
                                            stroke="#4682A9" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span className="ml-2 text-recommended text-lg">Recomendado</span>
                                </div>
                            </div>

                            : null

                        }

                        <div
                            style={{
                                color: "#000",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                marginBottom: "10px",
                                paddingTop: index === 1 ? '2vh' : '10vh',
                            }}
                            className={"2xl:text-5xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-5xl text-4xl titulo"}
                        >
                            {data.titulo1}<br />{data.titulo2}
                        </div>


                        <div
                            style={{
                                color: "#000",
                                fontFamily: "Inter",
                                fontSize: "1em",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "22px",
                                marginBottom: "10px", // Add margin to separate subtitle from prices
                            }}
                        >
                            Pacote de {data.numero} {data.numero === "1" ? "sessão" : "sessões"}
                        </div>


                        <div style={{ marginBottom: "10px" }}>

                            <div
                                style={{
                                    color: "rgba(0, 0, 0, 0.70)",
                                    fontFamily: "Inter",
                                    textDecoration: "line-through",
                                    paddingTop: "2vh",
                                    fontWeight: "400",
                                    lineHeight: "1.2em",
                                    display: "inline-block", // Make it inline to stay on the same line
                                }}
                                className={"2xl:text-3xl xl:text-2xl lg:text-3xl md:text-2xl sm:text-3xl text-xl precoAntes"}
                            >
                                De<br /> {data.precoAnterior}€
                            </div>


                            <div
                                style={{

                                    color: "#000",
                                    fontFamily: "Lato",

                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    paddingLeft: "2vw",
                                    lineHeight: "5px",
                                    display: "inline-block", // Make it inline to stay on the same line
                                }}
                                className={"2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-5xl text-4xl precoFinal"}
                            >
                                {data.precoNovo}€
                                <div
                                    style={{
                                        color: "#000",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        paddingLeft: "6vw",
                                        fontWeight: "500",
                                        lineHeight: "22px",
                                    }}

                                    className={"2xl:text-lg xl:text-sm lg:text-lg md:text-sm sm:text-lg text-lg Psessao"}
                                >
                                    /por sessão
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "4vh",
                                width: "100%",
                                height: "3px",
                                background: "rgba(0, 0, 0, 0.20)",
                            }}
                        />

                        <div
                            className="text-right text-black text-opacity-80 font-Inter text-md py-4 font-normal leading-5"
                            style={{ fontFamily: "Inter", }}>

                            {index !== 0 ? <div>Total de {data.precoFinal}€</div> : null}

                        </div>


                        <div
                            style={{
                                color: "#000",
                                fontFamily: "Inter",
                                fontSize: "2em",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                marginBottom: "10px",
                                paddingTop: "4vh",
                                paddingBottom: "2vh"
                            }}
                        >
                            Vantagens
                        </div>
                        {index === 0 ? (
                            vantagensData.map((vantagem, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-white p-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="10" fill="#749BC2" fillOpacity="0.25" />
                                        <path
                                            d="M10.625 13.75L13.6679 16.7929C14.0584 17.1834 14.6916 17.1834 15.0821 16.7929L24.375 7.5"
                                            stroke="#4682A9" strokeWidth="1.2" strokeLinecap="round"
                                        />
                                    </svg>
                                    <p className="text-lg"
                                       style={{
                                           fontFamily: "Inter",
                                           fontSize: "16px",
                                           paddingLeft: "1vw",
                                           fontWeight: "500",
                                           lineHeight: "22px",
                                           color: "black",
                                       }}
                                    >
                                        {vantagem.text}
                                    </p>
                                </div>
                            ))
                        ) : index === 1 ? (
                            vantagensData1.map((vantagem, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-white p-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="10" fill="#749BC2" fillOpacity="0.25" />
                                        <path
                                            d="M10.625 13.75L13.6679 16.7929C14.0584 17.1834 14.6916 17.1834 15.0821 16.7929L24.375 7.5"
                                            stroke="#4682A9" strokeWidth="1.2" strokeLinecap="round"
                                        />
                                    </svg>
                                    <p className="text-lg"
                                       style={{
                                           fontFamily: "Inter",
                                           fontSize: "16px",
                                           paddingLeft: "1vw",
                                           fontWeight: "500",
                                           lineHeight: "22px",
                                           color: "black",
                                       }}
                                    >
                                        {vantagem.text}
                                    </p>
                                </div>
                            ))
                        ) : (
                            vantagensData2.map((vantagem, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-white p-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30" fill="none">
                                        <circle cx="15" cy="15" r="10" fill="#749BC2" fillOpacity="0.25" />
                                        <path
                                            d="M10.625 13.75L13.6679 16.7929C14.0584 17.1834 14.6916 17.1834 15.0821 16.7929L24.375 7.5"
                                            stroke="#4682A9" strokeWidth="1.2" strokeLinecap="round"
                                        />
                                    </svg>
                                    <p className="text-lg"
                                       style={{
                                           fontFamily: "Inter",
                                           fontSize: "16px",
                                           paddingLeft: "1vw",
                                           fontWeight: "500",
                                           lineHeight: "22px",
                                           color: "black",
                                       }}
                                    >
                                        {vantagem.text}
                                    </p>
                                </div>
                            ))
                        )}


                        <Link
                            onClick={(e) => {
                                if (!hasCookie("__session")) {
                                    e.preventDefault();
                                    setMostrar(true);
                                    setSucesso(false);
                                    setMsgA("Faça login primeiro!");
                                    const timeoutId = setTimeout(() => {
                                        clearTimeout(timeoutId)
                                        window.location.replace("/login")
                                    }, 1000)
                                }
                            }}
                            href={data.link}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md align-center text-center flex items-center justify-center"
                            style={{
                                borderRadius: '10px',
                                marginTop: "8vh",
                                width: "100%",
                                height: "6vh",
                                color: "#FFF",
                                background: index === 1 ? '#5BBBEC' : '#91C8E4',
                                fontFamily: "Inter"
                            }}
                        >
                            Escolher
                        </Link>

                    </div>
                ))}


            </div>


            <style jsx>{`
                @media only screen and (max-width: 767px) {
                    .flex {
                        flex-direction: column;
                        align-items: center;
                    }

                }

                @media (min-width: 900px) and (max-width: 1280px) {
                    .Psessao {

                        padding-left: 10vw !important;

                    }
                    .precoFinal{
                        padding-left: 6vw !important;
                        font-size: 2.5em;
                    }
                    .precoAntes{
                        font-size: 1.5em;
                    }
                }
                @media (min-width: 800px) and (max-width: 900px) {
                    .Psessao {

                        padding-left: 9.6vw !important;
                        font-size: .4em;

                    }
                    .precoFinal{
                        padding-left: 3.8vw !important;
                        font-size: 2.3em;
                    }
                    .precoAntes{
                        font-size: 1.2em;
                    }
                }
                @media (min-width: 700px) and (max-width: 800px) {
                    .Psessao {

                        padding-left: 9vw !important;
                        font-size: .35em;

                    }
                    .precoFinal{
                        padding-left: 4vw !important;
                        font-size: 2.3em;
                    }
                    .precoAntes{
                        font-size: 1.2em;
                    }

                }

                @media (min-width: 690px) and (max-width: 700px) {
                    .Psessao {

                        padding-left: 12.5vw !important;
                        font-size: .35em;

                    }
                    .precoFinal{
                        padding-left: 8vw !important;
                        font-size: 2.9em;
                    }
                    .precoAntes{
                        font-size: 1.4em;
                    }
                }
                @media (min-width: 640px) and (max-width: 690px) {
                    .Psessao {
                        padding-left: 14vw !important;
                        font-size: .3em;

                    }
                    .precoFinal{
                        padding-left: 4vw !important;
                        font-size: 2.7em;
                    }
                    .precoAntes{
                        font-size: 1.1em;
                    }
                }


                @media (min-width: 450px) and (max-width: 550px) {
                    .Psessao {

                        padding-left: 30vw !important;
                        font-size: .3em;

                    }
                    .precoFinal{
                        padding-left: 5vw !important;
                        margin-left: 4vw;
                        font-size: 2.7em;
                    }
                    .precoAntes{
                        font-size: 1.4em;
                    }

                    .titulo {
                        font-size: 2.8em;
                        padding-top: 2vh;
                        padding-bottom: 2vh;
                    }
                }

                @media (min-width: 382px) and (max-width: 450px) {
                    .Psessao {

                        padding-left: 30vw !important;
                        font-size: .3em;
                        margin-left: 3vw;

                    }
                    .precoFinal{
                        padding-left: 1vw !important;
                        margin-left: 4vw;
                        font-size: 2.5em;
                        padding-right: 2vw !important;
                    }
                    .precoAntes{
                        font-size: 1.1em;
                    }

                    .titulo {
                        font-size: 2.8em;
                        padding-top: 2vh;
                        padding-bottom: 2vh;
                    }
                }

                @media (min-width: 300px) and (max-width: 382px) {
                    .Psessao {

                        padding-left: 30vw !important;
                        font-size: .27em;
                        margin-left: 3vw;

                    }
                    .precoFinal{
                        padding-left: 1vw !important;
                        margin-left: 4vw;
                        font-size: 2.3em;
                        padding-right: 2vw !important;
                    }
                    .precoAntes{
                        font-size: 1.05em;
                    }

                    .titulo {
                        font-size: 2.8em;
                        padding-top: 2vh;
                        padding-bottom: 2vh;
                    }
                }

                @media (min-width: 550px) and (max-width: 600px) {
                    .Psessao {

                        padding-left: 19vw !important;
                        font-size: .35em;

                    }
                    .precoFinal{
                        padding-left: 10vw !important;
                        font-size: 3.2em;
                    }
                    .precoAntes{
                        font-size: 1.4em;
                    }

                    .titulo {
                        font-size: 2.8em;
                        padding-top: 2vh;
                        padding-bottom: 2vh;
                    }
                }
            `}</style>

            <style jsx>{`

                @media (max-width: 640px) {
                    .cards {
                        width: 80vw;
                    }

                    .bigText {
                        font-size: 1.75em;
                        width: 80vw;
                    }

                    .smallText {
                        font-size: 1em;
                        width: 80vw;
                    }

                }


                .xClientes {
                    @media (max-width: 460px) {
                        font-size: 0.7em !important;
                        margin-left: 40vw !important;
                    }

                    @media (min-width: 460px) and (max-width: 800px) {
                        font-size: 0.8em !important;
                        margin-left: 30vw !important;
                    }
                }


                .titulo {
                    @media (min-width: 1540px) and (max-width: 1700px) {
                        font-size: 2.6em !important;
                    }
                    @media (min-width: 640px) and (max-width: 710px) {
                        font-size: 2.5em !important;
                    }
                    @media (max-width: 420px) {
                        font-size: 2em !important;
                    }


                }


                .Psessao {
                    @media (min-width: 1540px) and (max-width: 1700px) {
                        padding-left: 6vw;
                    }
                    @media (min-width: 640px) and (max-width: 710px) {
                        padding-left: 6vw;
                    }
                    @media (max-width: 800px) {
                        padding-left: 16vw !important;
                    }
                }

                .precoFinal {
                    @media (min-width: 1540px) and (max-width: 1700px) {
                        padding-left: 6vw;
                    }
                    @media (min-width: 640px) and (max-width: 710px) {
                        padding-left: 6vw;
                    }
                    @media (max-width: 800px) {
                        padding-right: 6vw !important;
                    }
                }

                .container {
                    font-family: 'Inter', sans-serif;
                    padding-top: 10vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .main-text {
                    color: #000;
                    font-size: 3em;
                    font-style: normal;
                    font-weight: bold;
                    line-height: normal;
                }

                .sub-text {
                    padding-top: 3.5vh;
                    width: 707px;
                    height: 108px;
                    flex-shrink: 0;
                    color: #000;
                    text-align: center;
                    font-size: 1.2em;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 30px;
                }


                .image-container {
                    padding-top: 3vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    margin-right: 17vw;
                }

                .circle-image {
                    border-radius: 50%;
                    width: 3em;
                    height: 3em;
                    position: absolute;

                    @media (max-width: 460px) {
                        margin-right: 35vw;
                        width: 2em;
                        height: 2em;
                    }

                    @media (min-width: 460px) and (max-width: 640px) {
                        margin-right: 45vw !important;
                        width: 2em;
                        height: 2em;
                    }

                    @media (min-width: 640px) and (max-width: 950px) {
                        margin-right: 20vw !important;
                        width: 2em;
                        height: 2em;
                    }
                    @media (min-width: 950px) and (max-width: 1400px) {
                        margin-right: 24vw !important;
                        width: 3em;
                        height: 3em;
                    }
                    @media (min-width: 1400px) and (max-width: 2500px) {
                        margin-right: 6vw !important;
                        width: 3em;
                        height: 3em;
                    }
                }

                .circle-image:nth-child(2) {
                    margin-left: 4vw;

                    @media (max-width: 460px) {
                        margin-left: 10vw;
                    }

                    @media (min-width: 460px) and (max-width: 640px) {
                        margin-left: 8vw !important;
                    }

                    @media (min-width: 640px) and (max-width: 768px) {
                        margin-left: 7vw;
                    }
                    @media (min-width: 950px) and (max-width: 1400px) {
                        margin-left: 7vw;
                    }
                }

                .circle-image:nth-child(3) {
                    margin-left: 8vw;

                    @media (max-width: 460px) {
                        margin-left: 20vw;
                    }

                    @media (min-width: 460px) and (max-width: 640px) {
                        margin-left: 18vw !important;
                    }

                    @media (min-width: 640px) and (max-width: 768px) {
                        margin-left: 15vw;
                    }
                    @media (min-width: 950px) and (max-width: 1400px) {
                        margin-left: 14vw;
                    }
                }

                .text-recommended {
                    color: rgba(145, 200, 228, 0.70);
                    font-family: 'Inter';
                    font-weight: 800;
                }


                .text {

                    margin-left: 25vw;
                    font-size: 1em;
                    color: black;
                    font-family: 'Inter', sans-serif;
                }
            `}</style>

        </>
    )
        ;
};

export default Pacotes;
