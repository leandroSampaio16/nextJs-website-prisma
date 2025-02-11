import React, { useEffect, useState } from 'react';
import Navbar1 from "@/Components/navbar";
import { CarouselComponent } from "@/Components/carouselComponent";
import ScrollToTopButton from "@/Components/scrollButton";
import Footer from "@/Components/footer"
import VideoModal from "@/Components/videoModal";
import Head from 'next/head';
import Alerta from '@/Components/alerta';
import Image, { StaticImageData } from 'next/image';
import quemECatia from "@/public/quemECatia.jpg";
import videoImage from "@/public/videoImage.jpg";
import filipe from "@/public/example1.jpg";
import elisabete from "@/public/example2.jpg";
import marisa from "@/public/example3.jpg";

export default function Home() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const cardsData = [

        {
            titulo1: "RECUPERE O SEU PODER ",
            titulo2: "Ao processar as emoções que lhe causaram dor no passado recupera espaço interior para reconhecer o seu valor.",

        },

        {
            titulo1: "CONECTE-SE COM A SUA INTUIÇÃO ",
            titulo2: "Ao conectar-se com a sua intuição tomará decisões mais alinhadas com a sua essência.",

        },

        {
            titulo1: "SINTA-SE MERECEDOR ",
            titulo2: "Ao remover as barreiras que criou dentro de si sentir-se-á livre para viver a vida que merece viver.",

        }

    ]



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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openVideoModal = () => {
        setIsModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsModalOpen(false);
    };




    const info = [
        ["Deixe-nos ajudá-lo nesta jornada", "Conte com a orientação especializada da Cátia e das suas ferramentas, nesta jornada de mentorado. Não hesite, inicie hoje mesmo a transformação que você merece!",
            "\n" +
            "\n" +
            "A Catia é um anjo em minha vida, trazendo serenidade e sabedoria. Com empatia e justiça, ela é a amiga constante que sempre oferece o apoio certo. Como mãe dedicada, sua presença é como uma \"cuidadora\" exemplar. Desde o dia chuvoso em que nos conhecemos, ela é um anjinho que ilumina minha jornada.",
            filipe, "Filipe Simões", 8],


        ["Deixe-nos ajudá-lo nesta jornada", "Conte com a orientação especializada da Cátia e das suas ferramentas",
            "Falar da minha Cátia, é falar do meu porto seguro, do meu farol, do meu ninho, de \"casa\", onde realmente me sinto bem. \n" +
            "Já são muitos anos de amizade, mas o que tenho crescido ao teu lado,  representa uma vida.  \n" +
            "Posso dizer com orgulho que és e serás sempre o meu ponto de luz. \n" +
            "Obrigada por estares na minha vida.",
            marisa, "Marisa Aguiar", 7],


        ["Deixe-nos ajudá-lo nesta jornada", "Conte com a orientação especializada da Cátia e das suas ferramentas",
            "Elisabete Bessa superou medos e inibições desde a infância, impactados por uma educação rígida. Ao ler um artigo compartilhado por Cátia Marina, encontrou inspiração para se libertar das emoções negativas. Tomando decisões adiadas, experimentou uma transformação profunda, agradecendo a Cátia Marina por essa conquista inestimável.",
            elisabete, "Elisabete Bessa", 6]
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const values = info[currentIndex];

    const handleArrowClick = (direction: string) => {
        // Update the current index based on the direction (left or right)
        if (direction === 'left') {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? info.length - 1 : prevIndex - 1));
        } else {
            setCurrentIndex((prevIndex) => (prevIndex === info.length - 1 ? 0 : prevIndex + 1));
        }
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increment index to move to the next testimonial
            setCurrentIndex((prevIndex) => (prevIndex === info.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentIndex, info.length]);


    return (
        <>
            <Head>
                <title>Cátia Marina</title>
            </Head>
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <style jsx>{`


                .tituloCatiaDiv {


                    @media (max-width: 640px) {
                        // Styles for screens smaller than 640px
                        // Add more styles as needed
                    }

                    @media (min-width: 641px) and (max-width: 768px) {
                        // Styles for screens between 641px and 768px
                        margin-top: 1vh !important;
                        margin-left: 14vw !important;
                        // Add more styles as needed
                    }
                    @media (min-width: 769px) and (max-width: 1024px) {
                        // Styles for screens between 769px and 1024px
                        margin-top: -2vh !important;
                        margin-left: 8vw !important;
                        // Add more styles as needed
                    }
                    @media (min-width: 1024px) and (max-width: 1550px) {
                        // Styles for screens larger than 1025px

                    }

                    @media (min-width: 1550px) {
                        // Styles for screens larger than 1025px
                        margin-left: 15vw !important;
                        // Add more styles as needed
                    }
                }


                .fontQuemCatia {


                    @media (max-width: 640px) {
                        // Styles for screens smaller than 640px
                        font-size: 60px;
                        // Add more styles as needed
                    }

                    @media (min-width: 641px) and (max-width: 768px) {
                        // Styles for screens between 641px and 768px
                        font-size: 30px;
                        // Add more styles as needed
                    }
                    @media (min-width: 769px) and (max-width: 1024px) {
                        // Styles for screens between 769px and 1024px
                        font-size: 40px !important;
                        margin-left: 17vw !important;
                        // Add more styles as needed
                    }
                    @media (min-width: 1024px) and (max-width: 1550px) {
                        // Styles for screens larger than 1025px
                        font-size: 60px;
                        margin-left: 13vw;
                    }

                    @media (min-width: 1550px) {
                        // Styles for screens larger than 1025px
                        font-size: 80px;
                        // Add more styles as needed
                    }
                }


                .fontCatia {


                    @media (max-width: 640px) {
                        // Styles for screens smaller than 640px
                        font-size: 80px;
                        // Add more styles as needed
                    }

                    @media (min-width: 641px) and (max-width: 768px) {
                        // Styles for screens between 641px and 768px
                        font-size: 50px !important;
                        // Add more styles as needed
                    }

                    @media (min-width: 769px) and (max-width: 1024px) {
                        // Styles for screens between 769px and 1024px
                        font-size: 60px;
                        // Add more styles as needed
                    }

                    @media (max-width: 1550px) {
                        // Styles for screens larger than 1025px
                        font-size: 80px;

                        // Add more styles as needed
                    }

                    @media (min-width: 1024px) and (max-width: 1550px) {
                        // Styles for screens larger than 1025px
                        font-size: 80px;

                        // Add more styles as needed
                    }

                    @media (min-width: 1550px) {
                        // Styles for screens larger than 1025px
                        font-size: 120px;
                        // Add more styles as needed
                    }
                }
                
                .imagemCatia{
                    @media(max-height: 800px){
                        margin-top: 2vh !important;
                    }
                }

                .textoCatia {
                    font-family: 'Inter', sans-serif;

                    @media (max-width: 640px) {
                        margin-top: 8vh !important;
                        /* Add more styles as needed */
                    }

                    @media (min-width: 641px) and (max-width: 768px) {
                        margin-top: 12vh !important;
                        /* Add more styles as needed */
                    }

                    @media (min-width: 769px) and (max-width: 1024px) {
                        margin-top: 12vh !important;
                        /* Add more styles as needed */
                    }

                    @media (min-width: 1024px) and (max-width: 1550px) {
                        margin-top: 18vh;
                        /* Add more styles as needed */
                    }

                    @media (min-width: 1550px) and (max-width: 1800px) {
                        padding-top: 24vh !important;
                        /* Add more styles as needed */
                    }

                    @media (min-width: 1800px) {
                        margin-top: 20vh !important;
                        font-size: 1.5em;
                    }
                    
                    @media(max-height: 800px){
                        margin-top: 26vh !important;
                    }
                }


                @media (min-width: 1020px) and (max-width: 1300px) {
                    .textoPequenoTestemunhos{
                        font-size: .7em !important;
                    }
                    .divTestemunhos{
                        margin-top: 0em !important;
                        height: 27vh !important;
                    }
                }



                @media (min-width: 900px) and (max-width: 1280px) {

                    .divTestemunhos{

                        margin-left: 2em!important;
                    }

                    .firstCircle{
                        width: 10em;
                        height: 10em;
                    }
                    .circle{
                        width: 10em;
                        height: 10em;

                    }
                    .parentDiv{
                        width: 25%;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                    }
                    .titulo2{
                        font-size: .6em !important;
                        width: 100% !important;
                    }
                    .titulo1{
                        padding-bottom: 0vh !important;
                        width: 100% !important;
                    }
                }

                @media (min-width: 300px) and (max-width: 640px) {
                    .arrows{
                        margin-left: 15% !important;
                        margin-right: -3%!important;
                    }

                    .divTestemunhos{
                        width: 65vw;
                        margin-right: 12em!important;
                        margin-left: -4em!important;
                    }
                    .firstCircle{
                        width: 8em;
                        height: 8em;
                    }
                    .circle{
                        width: 8em;
                        height: 8em;

                    }
                    .parentDiv{
                        width: 70%;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        margin-top: 0vh;
                    }
                    .titulo2{
                        font-size: .6em !important;
                        width: 100% !important;

                    }
                    .titulo1{
                        padding-bottom: 0vh !important;
                        font-size: 1.6em !important;
                        width: 90% !important;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                    }
                }

                @media(max-height: 800px){
                    
                    .divTestemunhos {
                        
                        height: 80% !important;

                    }
                }
                @media (min-width: 300px) and (max-width: 620px) {




                    .vereditosParentDiv {
                        width: 90% !important;

                    }

                    .divTestemunhos{
                        width: 65vw;
                        margin-right: 10em!important;
                        margin-left: -3em!important;
                        font-size: .65em;
                        height: 70vw!important;
                    }
                }
                @media (min-width: 560px) and (max-width: 640px) {
                    .divTestemunhos{
                        width: 65vw;
                        margin-right: 10em!important;
                        margin-left: -6em!important;
                        font-size: .8em;
                        height: 40vw!important;
                    }
                }

                @media (min-width: 640px) and (max-width: 900px) {

        

                    .divTestemunhos{
                        width: 65vw;
                        margin-right: 12em!important;
                        margin-left: -4em!important;
                    }
                    .firstCircle{
                        width: 8em;
                        height: 8em;
                    }
                    .circle{
                        width: 8em;
                        height: 8em;

                    }
                    .parentDiv{
                        width: 70%;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        margin-top: 0vh;
                    }
                    .titulo2{
                        font-size: .6em !important;
                        width: 100% !important;

                    }
                    .titulo1{
                        padding-bottom: 0vh !important;
                        font-size: 1.6em !important;
                        width: 90% !important;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                    }
                }


                @media (min-width: 1420px) and (max-width: 1550px) {
                    .divTestemunhos{

                        height: 80% !important;
                    }
                }

                @media (min-width: 1300px) and (max-width: 1420px) {
                    .divTestemunhos{

                        height: 80% !important;
                    }
                }

                @media (min-width: 1550px) and (max-width: 1600px) {

                    .divTestemunhos{

                        height: 80% !important;
                    }
                }


                @media (min-width: 1600px) {

                    .firstCircle{
                        margin-left: 2vw;
                    }
                    .circle{
                        margin-left: 2vw;
                    }

                    .divTestemunhos{

                        height: 80% !important;
                    }
                }



            `}</style>

            <Navbar1 />
            <ScrollToTopButton />
            <CarouselComponent />

            <div style={{ paddingTop: "15vh", paddingBottom: "10vh", width: "100%", alignContent: "center" }}>
                {!isMobile ? (
                    <div style={{ display: "flex", justifyContent: "center" }} id={"percurso"}>
                        <div style={{ marginRight: "5vw" }} className="xl:w-2/6 lg:w-2/5 md:w-1/3 sm:w-1/2">
                            <Image src={quemECatia} className="h-auto w-full rounded-lg imagemCatia" alt="Example" />
                        </div>
                        <div style={{ marginLeft: "2vw", position: "absolute", display: "inline-block", marginTop: "3vh" }}
                            className={"tituloCatiaDiv"}>
                            <div style={{
                                color: "#000",
                                fontFamily: "Manrope",

                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal",
                                display: "inline",
                                paddingRight: ".5em" // or display: "inline-block"
                            }} className={"fontQuemCatia"}>
                                QUEM É A
                            </div>
                            <div style={{
                                color: "#91C8E4",
                                fontFamily: "Manrope",

                                fontStyle: "normal",
                                fontWeight: 800,
                                lineHeight: "normal",
                                display: "inline"  // or display: "inline-block"
                            }} className={"fontCatia"}>
                                CÁTIA
                            </div>
                        </div>

                        <div style={{
                            marginRight: "0px",

                            color: "#000",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "2em"
                        }}
                            className="mr-0 text-black font-inter w-2/5 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/3 text-base sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-xl font-normal leading-8 sm:leading-8 md:leading-9 lg:leading-8 xl:leading-8 textoCatia">

                            Sou apaixonada pela vida, determinada e sonhadora, com uma ligação profunda ao mar e ao sol. Ao longo de duas décadas, trabalhei com crianças, jovens e famílias, promovendo práticas educativas centradas na aprendizagem ativa. Nos últimos anos, concentrei-me na formação e consultoria a adultos, e no acompanhamento pedagógico de jovens. A minha paixão é apoiar as pessoas nos seus processos de transformação, guiando-as de volta ao seu ser autêntico. Não ofereço soluções prontas, mas uma abordagem prática e intuitiva, adaptada a cada indivíduo. A minha missão é ajudar as pessoas a encontrar suas próprias respostas e viver de forma mais autêntica.

                        </div>

                    </div>
                ) : (

                    <div style={{ display: "flex", justifyContent: "center" }} id={"percurso"}>
                        <div className={"w-4/5"}>
                            <p style={{
                                color: '#000',
                                fontFamily: 'Roboto Flex',
                                fontSize: '34px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                            }}>QUEM É A</p>

                            <p style={{
                                color: '#91C8E4',
                                fontFamily: 'Roboto Flex',
                                fontSize: '44px',
                                fontStyle: 'normal',
                                fontWeight: 800,
                                lineHeight: 'normal',
                                paddingTop: ".2em"
                            }}>CÁTIA</p>

                            <p style={{
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '32px',
                                paddingTop: "1.5em"
                            }}>Sou apaixonada pela vida, determinada e sonhadora, com uma ligação profunda ao mar e ao sol. Ao longo de duas décadas, trabalhei com crianças, jovens e famílias, promovendo práticas educativas centradas na aprendizagem ativa. Nos últimos anos, concentrei-me na formação e consultoria a adultos, e no acompanhamento pedagógico de jovens. A minha paixão é apoiar as pessoas nos seus processos de transformação, guiando-as de volta ao seu ser autêntico. Não ofereço soluções prontas, mas uma abordagem prática e intuitiva, adaptada a cada indivíduo. A minha missão é ajudar as pessoas a encontrar suas próprias respostas e viver de forma mais autêntica.
                            </p>
                        </div>

                    </div>
                )}
            </div>


            <center>
                <div style={{ marginBottom: "5vh", marginTop: "12vh" }}>
                    <div
                        className="text-center text-black font-inter text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold w-5/7 sm:w-5/7 md:w-3/4 lg:w-4/5 xl:w-5/6"
                        style={{ marginBottom: "4vh" }}>
                        UM MINDSET ILIMITADO PARA UMA JORNADA TRANSCENDENTE

                    </div>

                    <div
                        className="text-center text-black font-inter text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-normal w-4/6 sm:w-4/6 md:w-4/6 lg:w-3/5 xl:w-2/4 2xl:w-2/4">
                        Reconecte-se com a sua verdadeira essência, alargando a consciência do seu ser. Transcenda as suas limitações e crie espaço para uma transformação significativa.

                    </div>
                </div>
            </center>






            <div className="flex flex-wrap justify-center" style={{ marginTop: "5vh" }}>

                {cardsData.map((data, index) => (

                    <div
                        key={index}
                        className="flex flex-col m-6 overflow-hidden w-3/5 sm:w-3/5 md:w-2/5 lg:w-2/5 xl:w-1/4  p-8 parentDiv">

                        <div
                            className={`align-center text-center flex items-center justify-center w-[15em] h-[15em] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-white shadow-inner drop-shadow-md backdrop-filter backdrop-blur-sm m-4 ${index === 0 ? 'firstCircle' : 'circle'}`}
                            style={{
                                fill: '#FFF',
                                boxShadow: '-4px 1px 4px 0px rgba(0, 0, 0, 0.10) inset',
                                filter: 'drop-shadow(-4px 4px 4px rgba(0, 0, 0, 0.10))',
                                backdropFilter: 'blur(2px)',
                                background: "white",
                            }}
                        >

                            {index === 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="55%" height="55%" viewBox="0 0 48 48"
                                    fill="none">
                                    <path
                                        d="M8.444 27L24 42L39.556 27C42.256 24.967 44 21.744 44 18.111C44 11.978 39.022 7 32.889 7C29.256 7 26.022 8.756 24 11.456C21.978 8.756 18.744 7 15.111 7C8.978 7 4 11.978 4 18.111C4 21.744 5.744 24.967 8.444 27ZM15.111 9C17.961 9 20.685 10.366 22.399 12.654L24 14.792L25.601 12.655C27.315 10.366 30.039 9 32.889 9C37.913 9 42 13.087 42 18.111C42 20.999 40.671 23.657 38.352 25.402L38.255 25.475L38.167 25.56L24 39.222L9.833 25.56L9.745 25.475L9.648 25.402C7.33 23.657 6 20.999 6 18.111C6 13.087 10.087 9 15.111 9Z"
                                        fill="#4682A9" />
                                </svg>
                            ) : index === 1 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="55%" height="55%" viewBox="0 0 111 111"
                                    fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M55.1625 6.31541L53.0333 19.242C50.1768 36.5843 36.5843 50.1768 19.242 53.0333L6.31541 55.1625L19.242 57.2917C36.5843 60.1483 50.1768 73.7407 53.0333 91.0831L55.1625 104.01L57.2917 91.0831C60.1483 73.7407 73.7407 60.1483 91.0831 57.2917L104.01 55.1625L91.0831 53.0333C73.7407 50.1768 60.1483 36.5843 57.2917 19.242L55.1625 6.31541ZM51.0599 18.9169L54.1758 0L56.1492 7.45058e-08L59.2651 18.917C61.9824 35.4133 74.9118 48.3427 91.4081 51.0599L110.325 54.1758V56.1492L91.4081 59.2651C74.9118 61.9824 61.9824 74.9118 59.2651 91.4081L56.1492 110.325H54.1758L51.0599 91.4081C48.3427 74.9118 35.4133 61.9824 18.9169 59.2651L0 56.1492L7.45058e-08 54.1758L18.917 51.0599C35.4133 48.3427 48.3427 35.4133 51.0599 18.9169Z"
                                        fill="#4682A9" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="55%" height="55%" viewBox="0 0 151 149"
                                    fill="none">
                                    <path
                                        d="M75.6777 0.56897L76.946 34.7898C77.722 55.726 94.521 72.5164 115.458 73.2817L150.678 74.569L115.458 75.8563C94.521 76.6215 77.722 93.4119 76.946 114.348L75.6777 148.569L74.4094 114.348C73.6335 93.4119 56.8345 76.6215 35.8979 75.8563L0.677734 74.569L35.8979 73.2817C56.8345 72.5164 73.6335 55.726 74.4094 34.7898L75.6777 0.56897Z"
                                        fill="#4682A9" />
                                    <path
                                        d="M112.678 10.483L96.6657 40.7533C86.8696 59.2726 93.0227 82.213 110.772 93.344L140.63 112.069L109.484 95.5737C90.9702 85.7681 68.0266 91.9095 56.8865 109.653L38.6777 138.655L54.6898 108.385C64.4859 89.8653 58.3328 66.9248 40.5837 55.7938L10.7258 37.0689L41.871 53.5642C60.3853 63.3698 83.3288 57.2283 94.4689 39.485L112.678 10.483Z"
                                        fill="#4682A9" />
                                    <path
                                        d="M139.764 37.569L110.762 55.7778C93.0183 66.9179 86.8769 89.8614 96.6825 108.376L113.178 139.521L94.4528 109.663C83.3218 91.914 60.3814 85.7608 41.8621 95.5569L11.5919 111.569L40.5938 93.3602C58.3372 82.2201 64.4786 59.2765 54.673 40.7623L38.1777 9.61706L56.9026 39.475C68.0336 57.224 90.9741 63.3771 109.493 53.581L139.764 37.569Z"
                                        fill="#4682A9" />
                                </svg>
                            )}

                        </div>

                        <div className={"titulo1"}
                            style={{
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: '1.7em',
                                fontStyle: 'normal',
                                fontWeight: 800,
                                lineHeight: 'normal',
                                width: "17vw",
                                textAlign: "center",
                                marginTop: "2vh"
                            }}
                        >
                            {data.titulo1}
                            <p
                                className={"titulo2"}
                                style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    marginTop: "4vh",
                                    textAlign: "center",
                                }}
                            >
                                {data.titulo2}
                            </p>
                        </div>

                    </div>

                ))}
            </div>







            <center>
                <div
                    className="text-center text-black font-inter text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold w-2/7 sm:w-6/7 md:w-3/4 lg:w-4/5 xl:w-5/6"
                    style={{ marginBottom: "4vh", marginTop: "8vh" }} id={"vereditos"}>
                    TESTEMUNHOS
                </div>


                <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl max-w-lg vereditosParentDiv py-4 mx-auto border-radius-25 bg-white shadow-inner backdrop-filter-blur-2"
                    style={{ borderRadius: "20px", marginTop: "7vh", marginBottom: "12vh", background: "#FFF" }}>
                    <div className="flex flex-wrap justify-center">

                        <div className="flex flex-col lg:w-1/2 xl:w-1/2 relative w-full">
                            <Image src={videoImage} className="h-auto w-full rounded-[1.7rem]" alt="videoImage" />

                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full" onClick={openVideoModal}
                                style={{ background: 'rgba(116, 155, 194, 0.50)', width: '4em', height: '4em' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="36" fill="none">
                                    <path d="M1.61932 2.60299L28.3432 18.6603L1.07521 33.7752L1.61932 2.60299Z"
                                        fill="#91C8E4" stroke="#4682A9" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex-shrink-0 w-1/2 relative">


                            <div className="flex items-center space-x-4 arrows" style={{ marginLeft: "45%" }}>
                                <button
                                    style={{ fontSize: "1.8rem", cursor: "pointer" }}
                                    onClick={() => handleArrowClick('left')}
                                    className="rounded-full border-0.5 border-black bg-white p-2 focus:outline-none">
                                    {/* Left Arrow Icon */}
                                    &larr;
                                </button>
                                <button
                                    style={{ fontSize: "1.8rem", cursor: "pointer" }}
                                    onClick={() => handleArrowClick('right')}
                                    className="rounded-full border-0.5 border-black bg-white p-2 focus:outline-none">
                                    {/* Right Arrow Icon */}
                                    &rarr;
                                </button>
                            </div>

                            <div
                                className="rounded-xl w-2/3 lg:w-2/3 sm:w-[100%] p-4 bg-branco mt-10 border border-preto border-opacity-50 divTestemunhos"
                                style={{
                                    borderRadius: '16px',
                                    border: '0.5px solid rgba(0, 0, 0, 0.70)',
                                    background: 'rgba(238,242,246,0.7)',
                                    paddingRight: "2em",
                                    height: "25vh",
                                    marginTop: "1em"
                                }}>

                                <p className="lg:text-[.8rem] md:text-[.5rem] sm:text-[0.6rem] xl:text-[1rem]  2xl:text-[1rem] py-4 sm:py-2 pb-0 textoPequenoTestemunhos">{values[2].toString()}</p>
                                <div className="flex items-center p-4">
                                    <Image src={values[3] as StaticImageData} alt="IMG CLIENTE"
                                        className="rounded-full md:size-14 size-10 sm:size-10" />
                                    <div className="flex flex-col items-start ml-2">
                                        <p className="font-bold md:text-[0.85rem] sm:text-[0.7rem]">{values[4].toString()}</p>
                                        <p className="text-xs text-cor3 font-medium md:text-[0.75rem] sm:text-[0.6rem]">{values[5].toString()} sessões
                                        </p>
                                    </div>
                                </div>


                            </div>


                        </div>

                    </div>

                </div>

            </center>
            {isModalOpen && <VideoModal onClose={closeVideoModal} />}
            <Footer />
        </>
    );
}
