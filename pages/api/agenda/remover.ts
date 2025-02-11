import { tb_contas, tb_sessoes } from '@/services/firestore'
import { sendMail } from '@/services/mailer'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        if (typeof req.body["titulo"] === "string" && typeof req.body["dia_e_hora"] === "string" && typeof req.body["id_cliente"] === "string") {
            const dt = new Date(req.body["dia_e_hora"])
            const dadosSessao = await tb_sessoes.obterUmaSessao({
                dia_e_hora: dt,
                id_cliente: Number(req.body["id_cliente"]),
                mensagem: req.body["titulo"]
            })
            if (dadosSessao) {
                const dadosConta = await tb_contas.getByID(Number(req.body["id_cliente"]))
                if (dadosConta) {
                    await tb_sessoes.apagar(dadosSessao.id)
                    await tb_contas.alterar({
                        creditos: (dadosConta.creditos + 1)
                    }, dadosConta.email)
                    sendMail("Sessão cancelada", process.env.EMAIL_CATIA!, `
                    <center><p>Sessão cancelada para o dia <b>${dt.getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${(dt.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${dt.getUTCFullYear().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}</b> às <b>${dt.getHours().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}:${dt.getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}</b></p>
                    <p>Esta sessão destinava-se ao cliente <b>${dadosConta.nome}</b> de email: <b>${dadosConta.email}</b></p></center>
                    `)
                    res.send("Sessão cancelada e crédito retornado!")
                }
                else {
                    res.status(500).send("Problema no servidor!")
                }
            }
            else {
                res.status(400).send("Sessão não existe!")
            }
        }
        else {
            res.status(400).end()
        }
    }
    else {
        res.status(405).end()
    }
}