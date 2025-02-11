// Import necessary modules and components
import React, { Fragment, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import Navbar1 from "@/Components/navbar";
import { Input } from "@nextui-org/react";
import Alerta from '@/Components/alerta';
import jquery from "jquery";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Head from 'next/head';

// Your React component and other logic go here


interface Event {
    title: string;
    start: Date | string;
    end: Date | string;
    allDay: boolean;
    id: number;
    color?: string;
}
type MinhaMarcacao = {
    id: string,
    title: string,
    data: Date
}
function diffDays(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
export default function Home() {
    //alerta
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [sucesso, setSucesso] = useState<boolean>(false)
    const [msgA, setMsgA] = useState<string>("")
    //obter dados da conta
    const [temLogin, setTemLogin] = useState<boolean>(false)
    const [dadosLogin, setDadosLogin] = useState<any>(null)
    useEffect(() => {
        const func = async () => {
            const dados = await fetch("/api/obterinfoconta")
            if (dados.ok) {
                setTemLogin(true)
                const dConta = await dados.json()
                setDadosLogin(dConta)
                const agenda = await fetch("/api/agenda/obter")
                const dAgenda = await agenda.json()
                setAllEvents(dAgenda.map((v: any, i: number): Event => {
                    const start = new Date(v.dia_e_hora)
                    const end = new Date(start)
                    end.setHours(start.getHours() + 1)
                    if (v.id_cliente == dConta.id!) {
                        return {
                            id: i,
                            title: v.mensagem,
                            start: start,
                            end: end,
                            allDay: false
                        }
                    }
                    return {
                        id: i,
                        title: "Vaga ocupada!",
                        start: start,
                        end: end,
                        allDay: false,
                        color: "#8B8000"
                    }
                }))
                setEvents(dAgenda.map((v: any, i: number): MinhaMarcacao | null => {
                    const start = new Date(v.dia_e_hora)
                    if (v.id_cliente == dConta.id! && (new Date()) < start) {
                        return {
                            id: i.toString(),
                            title: v.mensagem,
                            data: start
                        }
                    }
                    return null
                }))
            } else {
                setTemLogin(false)
                setDadosLogin(null)
            }
        }
        func()
    }, [])

    const [events, setEvents] = useState<(MinhaMarcacao | null)[] | null>(null)
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        end: '',
        allDay: false,
        id: 0
    })


    function handleDateClick(arg: { date: Date, allDay: boolean }) {
        const start = arg.date;
        const end = new Date(start);
        end.setHours(start.getHours() + 1);

        if (temLogin) {
            const dtAtual = new Date()
            if (start.getUTCDate() === dtAtual.getUTCDate() && start.getUTCMonth() === dtAtual.getUTCMonth() && start.getUTCFullYear() === dtAtual.getUTCFullYear()) {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Não pode marcar uma sessão no mesmo dia!")
            }
            else if (start < dtAtual) {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Não pode marcar uma sessão num dia anterior!")
            }
            else {
                setNewEvent({
                    ...newEvent,
                    start: start,
                    end: end,
                    allDay: arg.allDay,
                    id: new Date().getTime(),
                });
                setShowModal(true);
            }
        } else {
            setMostrar(true)
            setSucesso(false)
            setMsgA("Faça login para marcar uma sessão!")
            const t = setTimeout(() => {
                window.location.replace("/login")
                clearTimeout(t)
            }, 1000)

        }
    }


    function addEvent(data: DropArg) {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime()
        }
        setAllEvents([...allEvents, event])
    }

    function handleDeleteModal(data: { event: { id: string } }) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))
    }

    function handleDelete() {
        allEvents.forEach(async (value: Event) => {
            if (value.id === Number(idToDelete) && value.color !== "#8B8000" && diffDays(new Date(), new Date(value.start)) >= 2) {
                var settings = {
                    url: "/api/agenda/remover",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "titulo": value.title,
                        "dia_e_hora": value.start,
                        "id_cliente": dadosLogin.id!
                    }
                }
                jquery.ajax(settings)
                    .done((texto, textStatus, jqXHR) => {
                        setMostrar(true)
                        setSucesso(true)
                        setMsgA(jqXHR.responseText)
                        const t = setTimeout(() => {
                            window.location.replace("/agenda")
                            clearTimeout(t)
                        }, 1000)
                    })
                    .fail((jqXHR, textStatus, errorThrown) => {
                        setMostrar(true)
                        setSucesso(false)
                        setMsgA(jqXHR.responseText)
                    })
            }
            else if (value.id === Number(idToDelete) && value.color === "#8B8000") {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Só consegue cancelar as suas sessões!")
            }
            else if (value.id === Number(idToDelete) && diffDays(new Date(), new Date(value.start)) < 2) {
                setMostrar(true)
                setSucesso(false)
                setMsgA("Só consegue cancelar sessões com dois dias de antecedência!")
            }
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            end: '',
            allDay: false,
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        var settings = {
            url: "/api/agenda/adicionar",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                "titulo": newEvent.title,
                "dia_e_hora": newEvent.start,
                "id_cliente": dadosLogin.id!
            }
        }
        jquery.ajax(settings)
            .done((texto, textStatus, jqXHR) => {
                setMostrar(true)
                setSucesso(true)
                setMsgA(jqXHR.responseText)
                const t = setTimeout(() => {
                    window.location.replace("/agenda")
                    clearTimeout(t)
                }, 1000)
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                setMostrar(true)
                setSucesso(false)
                setMsgA(jqXHR.responseText)
            })
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            end: '',
            allDay: false,
            id: 0
        })
    }

    const isServer = typeof window === 'undefined';

    const [isMobile, setIsMobile] = useState(!isServer && window.innerWidth < 560);
    const height = isMobile ? '80vh' : '70vh';
    const flag = isMobile ? false : true;

    useEffect(() => {
        if (!isServer) {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 560);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isServer]);


    return (
        <>
            <Head>
                <title>Agenda</title>
            </Head>
            <Navbar1 />
            <Alerta mostrar={mostrar} sucesso={sucesso} msg={msgA} fecharF={() => {
                setMostrar(!mostrar)
            }} />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="grid grid-cols-10 fundoCalendario" style={{
                    borderRadius: '20px',
                    background: 'rgba(116, 155, 194, 0.25)',
                    padding: "2em",

                }}>
                    <div className="xl:col-span-8 md:col-span-12 lg:col-span-12 calendario" style={{}}>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: flag ? 'prev,next today' : 'prev next',
                                center: 'title',
                                right: flag ? 'timeGridWeek,timeGridDay prevYear,nextYear' : 'timeGridDay today',
                            }}
                            events={allEvents as EventSourceInput}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            drop={(data) => addEvent(data)}
                            eventClick={(data) => handleDeleteModal(data)}
                            initialView={flag ? 'timeGridWeek' : 'timeGridDay'}
                            views={{
                                timeGridWeek: {
                                    allDaySlot: false,
                                    slotMinTime: '09:00',
                                    slotMaxTime: '18:50',
                                    slotDuration: '00:20',
                                },
                                timeGridDay: {
                                    slotMinTime: '09:00',
                                    slotMaxTime: '18:50',
                                    slotDuration: '00:20',
                                },
                            }}
                            longPressDelay={0}
                            height={height}
                            hiddenDays={[2]}
                        />



                    </div>
                    <div id="draggable-el"
                        className="ml-8 w-full p-10 rounded-md mt-16 lg:h-1/2 bg-violet-50 eventosProximos" style={{
                            background: "white",
                            boxShadow: "-3px 3px 2px 0px rgba(0, 0, 0, 0.10) inset, -3px 2px 2px 0px rgba(0, 0, 0, 0.10)",
                            width: "15vw",
                            height: "60%",
                            color: "black",
                            borderRadius: "20px",
                        }}>
                        <h1 className="font-bold text-lg text-center"
                            style={{ fontSize: "1.6em", paddingBottom: "4vh" }}>Próximas Sessões</h1>

                        <div className="max-w-2xl mx-auto" style={{ overflowY: "auto", height: "80%" }}>
                            {events && events.map((event) => event && (
                                <Accordion key={event.id} style={{ maxHeight: "100%", overflowY: "auto", paddingBottom: ".5em" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-${event.id}-content`}
                                        id={`panel-${event.id}-header`}
                                    >
                                        <Typography>{event.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {event.data.getUTCHours()}:{event.data.getUTCMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })} {event.data.getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/{(event.data.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/{event.data.getUTCFullYear()}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>

                        <style jsx>{`

                /* For WebKit browsers (Chrome, Safari) */
                ::-webkit-scrollbar {
                    width: 8px; /* Adjust the width as needed */
                }

                ::-webkit-scrollbar-thumb {
                    background-color: #888; /* Adjust the color as needed */
                }

                ::-webkit-scrollbar-track {
                    background-color: #f1f1f1;
                }

            `}</style>

                    </div>
                </div>

                <Transition.Root show={showDeleteModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"

                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"

                                        style={{
                                            borderRadius: '20px',
                                            minHeight: '20vh',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '-4px 4px 4px 0px rgba(0, 0, 0, 0.10) inset, -4px 4px 4px 0px rgba(0, 0, 0, 0.10)',
                                            color: 'black',
                                            padding: ".5%"

                                        }}


                                    >

                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"

                                                >
                                                    <ExclamationTriangleIcon className="h-10 w-10 text-red-600"
                                                        aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                        className="text-base font-semibold leading-6 text-gray-900"
                                                        style={{
                                                            padding: "3%",
                                                            fontFamily: 'Inter, sans-serif',
                                                            fontSize: '2em'

                                                        }}>
                                                        Apagar Sessão
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500"

                                                            style={{
                                                                paddingTop: "5%",
                                                                paddingBottom: "5%",
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontSize: '1em',
                                                                color: "#000000B2"

                                                            }}>
                                                            Tem a certeza que deseja cancelar esta sessão?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}

                                                style={{
                                                    borderRadius: '10px',

                                                    width: "7vw",
                                                    height: "4vh",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: '#FF0000B2',
                                                }}
                                            >
                                                Apagar
                                            </button>
                                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={handleCloseModal}


                                                style={{
                                                    borderRadius: '10px',

                                                    width: "5vw",
                                                    height: "4vh",
                                                    alignItems: "center",
                                                    justifyContent: "center",

                                                }}
                                            >
                                                Voltar
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>


                <Transition.Root show={showModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel

                                        style={{
                                            borderRadius: '20px',
                                            minHeight: '20vh',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '-4px 4px 4px 0px rgba(0, 0, 0, 0.10) inset, -4px 4px 4px 0px rgba(0, 0, 0, 0.10)',
                                            color: 'black',
                                            padding: "2.5%"

                                        }}

                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div
                                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon className="h-9 w-9 text-blue-500" aria-hidden="true"
                                                    style={{ color: "#4682A9" }} />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"

                                                    style={{
                                                        padding: "3%",
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontSize: '2em',
                                                        paddingBottom: "5vh"

                                                    }}>
                                                    Marcar Sessão
                                                </Dialog.Title>
                                                <form action="submit" onSubmit={handleSubmit}>


                                                    <Input

                                                        type="Text"


                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-inset focus:ring-violet-600
                            sm:text-sm sm:leading-6"
                                                        style={{ fontSize: "1.5em", border: "none" }}
                                                        value={newEvent.title} onChange={(e) => handleChange(e)}
                                                    />


                                                    <div
                                                        className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                            disabled={newEvent.title === ''}

                                                            style={{
                                                                borderRadius: '10px',

                                                                width: "7vw",
                                                                height: "4vh",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                background: '#FF0000B2',
                                                            }}

                                                        >
                                                            Marcar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className=" inline-flex w-full justify-center rounded-md bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                            onClick={handleCloseModal}
                                                            style={{
                                                                borderRadius: '10px',
                                                                width: "7vw",
                                                                height: "4vh",
                                                                alignItems: "center",
                                                                justifyContent: "center",

                                                            }}
                                                        >

                                                            Voltar
                                                        </button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </main>


        </>
    )

}