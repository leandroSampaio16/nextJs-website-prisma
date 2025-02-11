import { tb_contas, timestampToDate } from '@/services/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

function compareDates(date1: Date, date2: Date): number {
    return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (req.method === "POST" && req.body["email"] && regex.test(req.body["email"])) {
        const email = req.body["email"].toString()
        const cod = Number(req.body["num1"] + req.body["num2"] + req.body["num3"] + req.body["num4"])
        const infoConta = await tb_contas.getByEmail(email)
        const dAtual = new Date()
        if (infoConta) {
            const minutosDiff = compareDates(dAtual, timestampToDate(infoConta.dia_hora_otp!))
            if (infoConta?.pin_otp === cod && minutosDiff <= 10) {
                res.redirect("/login/alterar-password?email=" + email).end()
            }
            else {
                const msg = "Pin OTP não coincide ou tempo excedido!"
                res.status(401).redirect("/login?erro=true&msg=" + msg).end()
            }
        }
        else {
            res.status(401).redirect("/login?erro=true&msg=Erro desconhecido, tente novamente!").end()
        }
    }
    else {
        res.status(405).end()
    }
}