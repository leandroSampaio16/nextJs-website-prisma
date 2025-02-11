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
            const id = Number(req.body["id_cliente"])
            const dadosConta = await tb_contas.getByID(id)
            if (dadosConta) {
                if (dadosConta.creditos > 0) {
                    await tb_sessoes.add({
                        id_cliente: Number(req.body["id_cliente"]),
                        dia_e_hora: dt,
                        mensagem: req.body["titulo"]
                    })
                    const creditos = Number(dadosConta.creditos) - 1
                    await tb_contas.alterar({
                        creditos: creditos
                    }, dadosConta.email)
                    sendMail("Sessão criada", process.env.EMAIL_CATIA!, `
                    <center><p>Sessão criada para o dia <b>${dt.getUTCDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${(dt.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}/${dt.getUTCFullYear().toLocaleString("en-US", { minimumIntegerDigits: 4, useGrouping: false }).replace(",", "")}</b> às <b>${dt.getHours().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}:${dt.getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}</b></p>
                    <p>Esta sessão destina-se ao cliente <b>${dadosConta.nome}</b> de email: <b>${dadosConta.email}</b></p></center>
                    `)
                    res.send("Sessão criada!")
                }
                else {
                    res.status(400).send("Não tem créditos suficientes!")
                }
            }
            else {
                res.status(401).send("Faça login!")
            }
        }
        else {
            res.status(400).send("Ocorreu um erro, tente novamente!")
        }
    }
    else {
        res.status(405).send("Ocorreu um erro, tente novamente!")
    }
}