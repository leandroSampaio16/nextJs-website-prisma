
import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "@/public/logo.png";
import nopfp from "@/public/nopfp.jpg";

export default function Navbar() {
    useEffect(() => {
        const $targetEl = document.getElementById('navbar1');
        const $triggerEl = document.querySelector('[data-collapse-toggle="navbar1"]');
        const options = {
            onCollapse: () => {
                return
            },
            onExpand: () => {
                return
            },
            onToggle: () => {
                return
            },
        };
        const instanceOptions = {
            id: 'navbar1',
            override: true,
        };

        const Collapse = require('flowbite').Collapse;
        const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);
        return () => {

        };
    }, []);
    //verificar se está com login
    useEffect(() => {
        if (hasCookie("__session")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
            localStorage.removeItem("img")
            localStorage.removeItem("creditos")
        }
    })
    //obter foto e creditos se nao tiver ainda
    useEffect(() => {
        if (!localStorage.getItem("img") && hasCookie("__session")) {
            const dadosConta = async () => {
                const reqConta = await fetch("/api/obterinfoconta")
                if (reqConta.ok && reqConta.status === 200) {
                    const dConta = await reqConta.json()
                    if (dConta.foto_url) {
                        localStorage.setItem("img", dConta.foto_url)
                    }
                    else {
                        localStorage.setItem("img", "/nopfp.jpg")
                    }
                    localStorage.setItem("creditos", dConta.creditos)
                }
            }
            dadosConta()
        }
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 bg-branco text-preto shadow-2xl !font-sans">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 md:px-40">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={logo} className="w-auto h-16" alt="Logo" priority/>
                </Link>
                <button
                    data-collapse-toggle="navbar1"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar1"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full xl:flex xl:w-auto" id="navbar1">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-xl bg-gray-50 xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-white dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/sobre"
                                className="block py-2 px-3 text-gray-900 text-sm rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-white xl:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                                <span className="md:!text-sm xl:!text-xl">JORNADA</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/pacotes"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-white xl:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                                <span className="md:!text-sm xl:!text-xl">PACOTES</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-white xl:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                                <span className="md:!text-sm xl:!text-xl">BLOG</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/agenda"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-white xl:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                                <span className="md:!text-sm xl:!text-xl">AGENDA</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={isLoggedIn ? "/perfil" : "/login"}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-white xl:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                                <span className="md:!text-sm xl:!text-xl">
                                    {isLoggedIn ?
                                        <div className='flex flex-row items-center justify-center'>
                                            <span className='inline-flex md:hidden'>PERFIL</span>
                                            {localStorage.getItem("img") !== null ?
                                                <img className='hidden md:inline-flex size-16 rounded-full' src={localStorage.getItem("img")!} alt='Imagem Perfil' />
                                                :
                                                <Image className='hidden md:inline-flex size-16 rounded-full' src={nopfp} alt='Imagem Perfil' />
                                            }
                                            <span className='inline-flex ml-3'>
                                                <span className='inline-flex md:hidden'>(</span>
                                                <span
                                                    title="Sessões não utilizadas"
                                                    className='inline-flex text-cor4'
                                                >
                                                    COINS: {localStorage.getItem("creditos")}
                                                </span>
                                                <span className='inline-flex md:hidden'>)</span>
                                            </span>
                                        </div>

                                        :
                                        "LOGIN"}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
