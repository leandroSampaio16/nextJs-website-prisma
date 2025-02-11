import { tb_contas } from '@/services/firestore';
import { sendMail } from '@/services/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';

function obterCodigoOtp(max: number) {
    return Math.floor(Math.random() * max);
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (req.method === "GET" && req.query["email"] && regex.test(req.query["email"].toString())) {
        const email = req.query["email"].toString()
        const pin = obterCodigoOtp(10000)
        const texto = `
            <center><h1>Código OTP: ${pin.toLocaleString("en-US", { minimumIntegerDigits: 4 }).replace(",", "")}</h1>
            <h2>Válido por 10 minutos</h2><center>
            `
        const resAlt = await tb_contas.alterar({
            pin_otp: pin,
            dia_hora_otp: (new Date())
        }, email)
        await sendMail("Código OTP", String(email), texto)
        res.redirect("/login/otp?email=" + email).end()
    }
    else {
        res.status(405).end()
    }
}