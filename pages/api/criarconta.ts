import { tb_contas } from '@/services/firestore'
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const email = req.body["email"]
        const senhaEncriptada = createHash("sha256").update(req.body["senha"]).digest("hex")
        const nomeCliente = req.body["nome"]
        const genero = req.body["genero"]
        const nascimento = new Date(req.body["nascimento"])
        var objetivos = ""
        if (req.body["obj1"] === "on") {
            objetivos += "Desenvolvimento Profissional"
        }
        if (req.body["obj2"] === "on") {
            objetivos += ", Melhoria do Bem-Estar"
        }
        if (req.body["obj3"] === "on") {
            objetivos += ", Alcance de Metas Específicas"
        }
        const dados = await tb_contas.add({
            email: email,
            password: senhaEncriptada,
            nome: nomeCliente,
            genero: genero,
            nascimento: nascimento,
            motivos: objetivos,
        })
        if(dados){
            res.redirect("/?erro=false&ms=Conta criada!").end()
        }
        else{
            res.redirect("/?erro=true&msg=J%C3%A1 existe uma conta com esse email").end()
        }
    }
    else {
        res.status(405).end()
    }
}