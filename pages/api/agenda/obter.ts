import { tb_sessoes } from '@/services/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && req.query["id"] && typeof req.query["id"] === "string") {
        const agendaCliente = await tb_sessoes.obterPorIDCliente(Number(req.query["id"]))
        if (agendaCliente) {
            res.send(agendaCliente)
        }
        else {
            res.send([])
        }
    }
    else if (req.method === "GET") {
        const agendaCliente = await tb_sessoes.obterTodas()
        if (agendaCliente) {
            res.send(agendaCliente)
        }
        else {
            res.send([])
        }
    }
    else {
        res.status(400).end()
    }
}