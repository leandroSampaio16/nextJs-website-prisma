import type { NextApiResponse } from 'next'
import { hasCookie, getCookie, setCookie } from "cookies-next"
import { decryptAES, encryptAES } from '@/services/session'
import { FormNextApiRequest, getConfig, withFileUpload } from 'next-multiparty'
import mimeTypes from "mime-types"
import uploadFicheiroFireBase from '@/services/uploadFirebase'
import { tb_contas } from '@/services/firestore'

export const config = getConfig()
export default withFileUpload(async function handler(
    req: FormNextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST" && hasCookie("__session", { req, res }) && req.fields["email"] && req.fields["nome"] && req.fields["genero"] && req.fields["data"]) {
        res.setHeader('Cache-Control', 'private');
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dadosConta = await tb_contas.getByEmail(email)
        if (dadosConta) {
            const contaComEmail = await tb_contas.getByEmail(req.fields["email"])
            if (contaComEmail && req.fields["email"] !== email) {
                res.status(401).redirect("/perfil?erro=true&msg=Existe uma conta com esse email!").end()
            }
            else {
                await tb_contas.alterar({
                    email: req.fields["email"],
                    nome: req.fields["nome"],
                    genero: req.fields["genero"],
                    nascimento: new Date(req.fields["data"])
                }, email)
                if (req.file && req.file.size > 0) {
                    const ficheiroEnhancedF = req.file
                    const nomeF = ficheiroEnhancedF.originalFilename + "_" + ficheiroEnhancedF.newFilename + "." + mimeTypes.extension(ficheiroEnhancedF.mimetype!)
                    const bufferFicheiro = await ficheiroEnhancedF.toBuffer()
                    const url = await uploadFicheiroFireBase("fotos_perfil/" + nomeF, bufferFicheiro)
                    await tb_contas.alterar({
                        foto_url: url
                    }, email)
                    setCookie("__session", encryptAES(req.fields["email"]), { req, res })
                    res.setHeader("Cache-Control", "private")
                    res.redirect("/perfil?erro=false&msg=Atualizado!").end()
                }
                else {
                    setCookie("__session", encryptAES(req.fields["email"]), { req, res })
                    res.setHeader("Cache-Control", "private")
                    res.redirect("/perfil?erro=false&msg=Atualizado (sem imagem)!").end()
                }
            }
        }
        else {
            res.status(401).redirect("/perfil?erro=true&msg=Tente novamente!").end()
        }
    }
    else {
        res.status(401).redirect("/perfil?erro=true&msg=Preencha todos os dados!").end()
    }
})