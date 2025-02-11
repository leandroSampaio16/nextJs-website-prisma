import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import insta from "@/public/insta.png";
import tiktok from "@/public/tiktok.png";
import yt from "@/public/yt.png";
const Footer = () => {

    useEffect(() => {
        if (hasCookie("__session")) {
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    })
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (

        <center>
            <footer className="bg-gray-200 py-8" style={{background: "rgba(0, 0, 0, 0.06)"}}>

                <style jsx>{`


                    @media (max-width: 600px) {

                        .apagar {
                            display: none;
                        }
                    }
                `}</style>

                <div className="container mx-auto flex flex-col items-center">


                    <div className="grid gap-x-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-16 w-full justify-center bg-center" style={{fontFamily: "Lato", fontWeight: "400"}}>
                        <Link href="/sobre"
                              className="text-gray-600 apagar hover:text-blue-500 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl py-2">JORNADA</Link>
                        <Link href="/pacotes"
                              className="text-gray-600 apagar hover:text-blue-500 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl py-2">PACOTES</Link>
                        <Link href="/blog"
                              className="text-gray-600 apagar hover:text-blue-500 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl py-2">BLOG</Link>
                        <Link href="/agenda"
                              className="text-gray-600 apagar hover:text-blue-500 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl py-2">AGENDA</Link>
                        <Link href={isLoggedIn ? "/perfil" : "/login"}
                              className="text-gray-600 apagar hover:text-blue-500 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl py-2"> {isLoggedIn ? "PERFIL" : "LOGIN"}</Link>
                    </div>


                    <div className="flex space-x-4 mb-4 py-6">
                        <Link href="https://www.instagram.com/catia_marina_imc" target="_blank" rel="noopener noreferrer">
                            <Image src={insta} alt="Facebook" className="w-7 h-6"/>
                        </Link>
                        <Link href="https://www.twitter.com/catia_marina_imc" target="_blank" rel="noopener noreferrer">
                            <Image src={tiktok} alt="Twitter" className="w-6 h-6"/>
                        </Link>
                        <Link href="https://www.youtube.com/catia_marina_imc" target="_blank" rel="noopener noreferrer">
                            <Image src={yt} alt="Twitter" className="w-7 h-6"/>
                        </Link>
                    </div>

                    <p className="text-gray-600 text-center font-inter text-lg">
                        Rua Horácio Marçal, 4200-003 Porto -- +351 915131332
                    </p>
                    <Link href="mailto:catiamarina.imc@gmail.com" style={{color: "blue"}} className={"py-4"}
                          target="_blank" rel="noopener noreferrer">
                        catiamarina.imc@gmail.com
                    </Link>
                    <p className="text-gray-600 text-center font-inter text-sm ">
                        © 2023 CátiaMarina, Inc.
                    </p>
                </div>
            </footer>
            </center>
                );
                };

                export default Footer;
