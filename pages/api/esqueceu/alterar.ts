import { tb_contas } from '@/services/firestore';
import { sendMail } from '@/services/mailer';
import { createHash } from 'crypto';
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
        const password = req.body["senha"]
        const repPass = req.body["rsenha"]
        if (password === repPass) {
            const resAlterar = await tb_contas.alterar({
                password: createHash("sha256").update(req.body["senha"]).digest("hex")
            }, email)
            if (resAlterar) {
                sendMail("Senha alterada", email, "<center><h1>⚠A sua senha foi alterada!⚠</h1></center>")
                res.redirect("/?erro=false&msg=Senha alterada!").end()
            }
            else {
                res.redirect("/?erro=true&msg=Erro, tente novamente!").end()
            }
        }
        else {
            res.redirect("/alterar-password?email=" + email + "&erro=" + true + "&msg=" + "Senha e a respetiva repetição não coincidem!").end()
        }
    }
    else {
        res.status(405).end()
    }
}