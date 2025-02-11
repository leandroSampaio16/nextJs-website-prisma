
import React from "react";
import Footer from "@/Components/footer";
import Navbar1 from "@/Components/navbar";
import ScrollToTopButton from "@/Components/scrollButton";
import Head from "next/head";
import Image from "next/image";
import sobreMimImage from "@/public/sobreMimImage.jpg";
import mentor from "@/public/mentor.jpeg";
import mentor1 from "@/public/mentor1.jpg";
import filipe from "@/public/example1.jpg";
import marisa from "@/public/example3.jpg";
import elisabete from "@/public/example2.jpg";

const About = () => {
    return (
        <>
            <Head>
                <title>Sobre mim</title>
            </Head>
            <Navbar1 />
            <ScrollToTopButton />

            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4"
                style={{ fontFamily: "Inter" }}>

                <style jsx>{`

                    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
                `}</style>


                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-x-16" style={{ marginTop: "5vh" }}>

                    <div className="w-full lg:w-8/12 ">
                        <Image className="w-full rounded-lg hidden lg:block w-[100%] h-auto" src={sobreMimImage}
                            alt="A group of People" />
                    </div>

                    <div className="w-full  justify-center ">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-9 text-gray-800 pb-4">SOBRE MIM</h1>
                        <p className="font-normal text-base text-xl lg:text-xl leading-6 text-gray-600 py-4">Poderia
                            partilhar as capacidades
                            cognitivas e o conhecimento que adquiri, mas acredito que isso apenas define o que fiz e
                            pouco
                            revela sobre quem sou. Em vez de apresentar o meu currículo, vou dar a conhecer o meu SER e
                            um
                            pouco do meu percurso.</p>
                        <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl">Sou apaixonada
                            pela
                            vida, irrequieta, inconformada, determinada, sonhadora, idealista e perseverante.
                            Socialmente,
                            sou bastante envergonhada e tenho uma incapacidade inata para fazer conversa de
                            circunstância!
                            Adoro o mar e sentir a areia da praia nos meus pés. Amo o sol e posso passar horas
                            infindáveis
                            sozinha a contemplar as ondas do mar. Só consigo aprender verdadeiramente quando sou capaz
                            de
                            experienciar o que aprendi. O que me faz vibrar e sentir viva é cuidar, ajudar, aconchegar,
                            nutrir, encontrar soluções e ouvir os outros. Não concebo viver uma vida sem fazer o que amo
                            e
                            sou incapaz de permanecer onde não há espaço para ser autêntica e genuína. Não faço muitas
                            coisas, mas amo tudo aquilo que faço.
                        </p>

                    </div>

                </div>

                <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12 lg:gap-x-16"
                    style={{ marginTop: "5vh" }}>

                    <div className="w-full lg:w-8/12 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-9 text-gray-800 py-12">A MINHA
                            HISTÓRIA</h1>
                        <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl">Ao longo das
                            últimas
                            duas décadas,
                            tive a oportunidade de trabalhar com crianças e jovens desde os 4 meses aos 18 anos de
                            idade.
                            Colaborei com diversas famílias na sua jornada parental e dei formação a educadores e
                            professores no sentido de promover o desenvolvimento de práticas educativas centradas na
                            aprendizagem ativa e no desenvolvimento holístico das crianças. Na última década, a minha
                            prática esteve mais direcionada para a formação e consultoria a adultos e, mais
                            recentemente,
                            faço o acompanhamento pedagógico de jovens com idades compreendidas entre os 14 e os 24
                            anos.</p>

                        <p className="font-normal text-base leading-6 text-gray-600 py-4 text-xl lg:text-xl">Apoiar,
                            acompanhar e ajudar as pessoas
                            durante os seus processos de transformação é aquilo que faz vibrar a minha alma e é aquilo
                            que
                            me proponho a fazer com todos aqueles que estiverem disponíveis para fazer aquela que é a
                            maior
                            viagem das suas vidas: A viagem de regresso a quem são de verdade, ao seu mais autêntico
                            SER.
                        </p>
                        <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl ">
                            Não trago um conjunto de ferramentas prontas a serem replicadas nem nenhum comprimido
                            mágico, a
                            minha abordagem é baseada na minha intuição e é extremamente prática e completamente
                            adaptada à
                            realidade de cada um. A minha intenção não é transmitir conhecimento, é, através da
                            formulação
                            de questões ajudar cada uma das pessoas a encontrar dentro de si as suas próprias respostas,
                            a
                            sua própria verdade e o alinhamento com as suas decisões verdadeiras, para que possam viver
                            a
                            vida que merecem viver.

                        </p>
                    </div>


                    <div className="w-full lg:w-8/12 lg:pt-8">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-12 py-6">Mentores</h1>
                        <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">

                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden rounded-md h-[156px] w-[156px]"
                                    src="https://yt3.googleusercontent.com/qcfgtupEef5c6SW1wCKuluOf3njGMG99QkjNPIAn3LRj-Vj6LSfRrnFLvOa_CoBt9yQofyXk_g=s900-c-k-c0x00ffffff-no-rj"
                                    alt="featured Img" />
                                <img className="md:hidden block rounded-lg w-full h-auto"
                                    src="https://yt3.googleusercontent.com/qcfgtupEef5c6SW1wCKuluOf3njGMG99QkjNPIAn3LRj-Vj6LSfRrnFLvOa_CoBt9yQofyXk_g=s900-c-k-c0x00ffffff-no-rj"
                                    alt="featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Amir Zoghi</p>
                            </div>

                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <Image className="md:block hidden rounded-md h-[156px] w-[156px]"
                                    width={156}
                                    height={156}
                                    src={mentor}
                                    alt="featured Img" />
                                <Image className="md:hidden block rounded-lg w-full h-auto"
                                    width={156}
                                    height={156}
                                    src={mentor}
                                    alt="featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Jamie Gonzalez</p>
                            </div>

                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden rounded-md h-[156px] w-[156px]"
                                    src="https://media.licdn.com/dms/image/C4D03AQHuGskts20fsA/profile-displayphoto-shrink_800_800/0/1658605189006?e=2147483647&v=beta&t=NDdEVxjK0lOEo4i6nCznqHHVVIXHTgG3W0B-G5qI3js"
                                    alt="featured Img" />
                                <img className="md:hidden block rounded-lg w-full h-auto"
                                    src="https://media.licdn.com/dms/image/C4D03AQHuGskts20fsA/profile-displayphoto-shrink_800_800/0/1658605189006?e=2147483647&v=beta&t=NDdEVxjK0lOEo4i6nCznqHHVVIXHTgG3W0B-G5qI3js"
                                    alt="featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Christina Tindale</p>
                            </div>

                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <Image className="md:block hidden rounded-md h-[156px] w-[156px]"
                                    width={156}
                                    height={156}
                                    src={mentor1}
                                    alt="featured Img" />
                                <Image className="md:hidden block rounded-lg w-full h-auto"
                                    width={156}
                                    height={156}
                                    src={mentor1}
                                    alt="featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Anna Hesler Tunney</p>
                            </div>

                        </div>
                    </div>


                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-9 text-gray-800 py-12"
                    style={{ marginTop: "8vh" }}>A MINHA ABORDAGEM</h1>

                <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl ">
                    A minha intenção é oferecer-lhe a oportunidade de nos encontrarmos, seja presencialmente ou numa
                    sessão online, para que possamos conversar sobre as áreas da sua vida onde gostaria de ganhar alguma
                    clareza. O que considero verdadeiramente poderoso nestas sessões são as questões e a capacidade de
                    utilizar a intuição para trazer à superfície emoções não expressas e as razões subjacentes às suas
                    decisões de vida, ajudando-o(a) assim, a compreender-se a um nível mais profundo.

                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-2xl lg:text-2xl py-6">
                    <strong>Como Funcionam as Sessões:</strong>

                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl ">
                    Pode partilhar comigo o que está a acontecer na sua vida ou onde procura clareza. À medida que
                    partilha, a minha intuição irá guiar-me com perguntas específicas para si e que eu lhe colocarei ao
                    longo da sessão. Cada pergunta é como um íman, conduzindo-o(a) à reflexão. O objetivo é que, após
                    cada sessão, reserve tempo para ponderar sobre essas questões, permitindo que as respostas surjam
                    naturalmente dentro de si.
                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-2xl lg:text-2xl py-6">
                    <strong> O Objetivo das Perguntas: </strong>

                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl ">
                    Em primeiro lugar, as perguntas visam ajudá-lo a compreender o que está a impedir o seu
                    alinhamento
                    com a sua própria intuição. A grande maioria das vezes, tomamos decisões com base no que
                    pensamos
                    ser o certo e influenciados pelo mundo ao nosso redor. As perguntas visam libertar a dor e
                    emoções
                    não expressas, permitindo que ganhe clareza e espaço para as suas verdadeiras respostas poderem
                    emergir. A minha intenção é criar espaço e apoiá-lo(a) para que consiga chegar ao cerne do que
                    está
                    a acontecer o mais rápido possível.
                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-2xl lg:text-2xl py-6 ">
                    <strong> Se Esta Jornada É Para Si:</strong>

                </p>
                <p className="font-normal text-base leading-6 text-gray-600 text-xl lg:text-xl ">
                    Se sente que este caminho é para si, se está disposto(a) a fazer o trabalho em si mesmo(a) e
                    procura
                    ganhar clareza em áreas como carreira, relacionamentos, negócios ou autoconhecimento, então
                    marque a
                    sua sessão e embarque nesta jornada de descoberta e autorrealização.
                </p>


                <div className="container my-24 mx-auto md:px-6" style={{ marginTop: "15vh" }}>
                    <section className="mb-32 text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Testemunhos</h1>

                        <div className="grid gap-x-6 lg:grid-cols-3 lg:gap-x-16">


                            <div className="mb-12 md:mb-0 shadow-lg rounded-md" style={{

                                padding: "3%",
                                paddingTop: "15%",
                                borderRadius: "15px",
                                marginTop: "5vh"
                            }}>
                                <div className="mb-6 flex justify-center">
                                    <Image
                                        src={filipe}
                                        alt="Filipe"
                                        className="w-32 rounded-full shadow-lg dark:shadow-black/20"
                                    />
                                </div>
                                <h5 className="mb-2 text-lg font-bold">Filipe Simões</h5>
                                <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
                                    8 SESSÕES
                                </h6>
                                <p className="mb-4">
                                    A minha Cátia.
                                    (sim minha, não no sentido possessivo da palavra mas na noção de partilha e de que
                                    as
                                    pessoas boas….ficam em nós para sempre!).

                                    No dia em que conheci a Catia, caia uma chuva batente, estávamos em pleno Outono. Só
                                    mais tarde, passados meses e até anos, soube o quanto aquele dia iria ser importante
                                    para mim. Alguém de muito especial tinha “caído” em cheio na minha vida.
                                    Um ser lindo e bondoso. Um ser de luz com a palavra certa no momento certo e mais do
                                    que
                                    isso, o tom adequado. Foi fácil “enamorar-me” pela ideia de que a presença dela na
                                    minha
                                    vida seria algo de gratificante.
                                    A presença da Cátia na minha vida e a partilha que vamos tendo de quando em vez
                                    trazem-me serenidade e sapiência. A Cátia é aquela amiga que queremos ter sempre.
                                    Aquela
                                    amiga que, independentemente do espaço-tempo que a separa da última partilha, está
                                    sempre lá com a atitude certa….e o seu sorriso característico e singular.
                                    Uma mulher extremamente querida, amorosa e bem intencionada. Com um bom-senso
                                    extremamente apurado, assim como o enorme sentido de justiça. Provam-no as várias
                                    vezes
                                    em que acorri á Cátia para uma ajuda ou simples amparo de consciência. Mulher
                                    intuitiva
                                    e de uma empatia transbordante.
                                    O seu papel de mãe dedicada e presente comprovam a ideia que tenho da Cátia, que é
                                    um
                                    ser com o propósito de cuidar. É uma “cuidadora” em todo o seu esplendor.
                                    Como no dia chuvoso em que a conheci, a Cátia caiu na minha vida como…um anjinho!

                                    Grato a ti Cátia, meu anjo ✨

                                </p>

                            </div>
                            <div className="mb-12 md:mb-0 shadow-lg rounded-md" style={{

                                padding: "3%",
                                paddingTop: "15%",
                                borderRadius: "15px",
                                marginTop: "5vh"
                            }}>
                                <div className="mb-6 flex justify-center">
                                    <Image
                                        src={marisa}
                                        alt="Marisa"
                                        className="w-32 rounded-full shadow-lg dark:shadow-black/20"
                                    />
                                </div>
                                <h5 className="mb-2 text-lg font-bold">Marisa Aguiar</h5>
                                <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
                                    4 SESSÕES
                                </h6>
                                <p className="mb-4">
                                    &quot;Falar da minha Cátia, é falar do meu porto seguro, do meu farol, do meu ninho, de
                                    &quot;casa&quot;, onde realmente me sinto bem.
                                    Já são muitos anos de amizade, mas o que tenho crescido ao teu lado, representa uma
                                    vida.
                                    Posso dizer com orgulho que és e serás sempre o meu ponto de luz.
                                    Obrigada por estares na minha vida.&quot;
                                    Marisa Aguiar
                                </p>

                            </div>
                            <div className="mb-12 md:mb-0 shadow-lg rounded-md" style={{

                                padding: "3%",
                                paddingTop: "15%",
                                borderRadius: "15px",
                                marginTop: "5vh"
                            }}>
                                <div className="mb-6 flex justify-center">
                                    <Image src={elisabete}
                                    alt="Elisabete"
                                        className="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                                </div>
                                <h5 className="mb-2 text-lg font-bold">Elisabete Bessa</h5>
                                <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
                                    5 SESSÕES
                                </h6>
                                <p className="mb-4">
                                    Desde menina, sempre fui atormentada por medos, que transportei para a adolescência
                                    e
                                    mantive na idade adulta. Fui tendo consciência das minhas capacidades, mas, sempre
                                    inibida (falta de autoconfiança) que associava à educação rígida que tive. Ao longo
                                    dos
                                    anos, fui perseguida por esse &quot;fantasma&quot; que interferiu na minha vida pessoal e
                                    profissional, prejudicou-me de alguma forma, estagnando alguns progressos, até em
                                    tomada
                                    de decisões. Medo de ferir suscetibilidades, agir no momento adequado, em particular
                                    com
                                    os afetos mais próximos, talvez com o medo de perder, porque não tive uma vida fácil
                                    nessa área, por várias circunstâncias, crucificando-me de forma atroz. Um dia,
                                    estava a
                                    ler um artigo partilhado no Facebook(e nada é por acaso) pela Cátia Marina, que
                                    despertou a minha atenção, e encaixava na perfeição na minha &quot;teia de emoções&quot;!…
                                    Li,
                                    reli, e fez-se luz na minha mente!… Tanto conteúdo negativo acumulado, tinha que me
                                    libertar dessa teia e depois de muita reflexão, ganhei coragem para tomar decisões,
                                    há
                                    muitos anos adiadas e foi uma libertação total, que transformou a minha pessoa, num
                                    ser
                                    livre, como se tivesse ganho uma alma nova. Foi efetivamente uma imensurável
                                    conquista,
                                    que muito agradeço à Cátia Marina, pois, por muita leitura que tenha devorado ao
                                    longo
                                    dos anos, nunca consegui ter coragem de tomar iniciativas. A minha gratidão será
                                    eterna.
                                    Elisabete Bessa.
                                </p>

                            </div>


                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
