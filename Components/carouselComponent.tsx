import { Carousel, Typography } from "@material-tailwind/react";
import carousel1 from "@/public/carousel1.jpg"
import carousel2 from "@/public/carousel2.jpg"
import carousel3 from "@/public/carousel3.jpg"
import Image from "next/image";

export function CarouselComponent() {
    return (
        <Carousel
            placeholder={"Carousel"}
            className=""
            loop={true}
            autoplayDelay={5000}
            autoplay={true}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className="block h-1 cursor-pointer rounded-2xl transition-all"
                            style={{
                                width: activeIndex === i ? "8rem" : "4rem", // Adjust the width as needed
                                backgroundColor: activeIndex === i ? "#ffffff" : "rgba(255, 255, 255, 0.5)", // Adjust the colors as needed
                            }}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <div className="h-[90vh] w-full object-cover relative">
                <Image
                    src={carousel3}
                    priority
                    alt="Imagem 3"
                    className="h-[92vh] w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold xl lg:text-5xl"
                        >
                            &quot;A nossa tarefa não é encontrar o amor, mas sim encontrar todas as barreiras dentro de nós que construímos contra ele.&quot;
                        </Typography>

                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold"
                        >
                            Rumi
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="h-[92vh] w-full object-cover relative">
                <Image
                    src={carousel1}
                    priority
                    alt="Imagem 1"
                    className="h-[92vh] w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold xl lg:text-5xl"
                        >
                            &quot;O amor é tudo o que existe. Tudo o resto é o seu julgamento do que é.&quot;

                        </Typography>

                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold"
                        >
                            Amir Zoghi
                        </Typography>
                    </div>
                </div>
            </div>


            <div className="h-[92vh] w-full object-cover relative">
                <Image
                    src={carousel2}
                    priority
                    alt="Imagem 2"
                    className="h-[92vh] w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">

                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold xl lg:text-5xl"
                        >
                            &quot;Você não precisa de nada para ser feliz – você precisa de algo para ficar triste.&quot;

                        </Typography>

                        <Typography
                            placeholder={"Descubra o auge da qualidade"}
                            variant="lead"
                            style={{ color: "#fff" }}
                            className="mb-12 opacity-80 font-semibold"
                        >
                            Mooji

                        </Typography>

                    </div>
                </div>
            </div>
        </Carousel>
    );
}