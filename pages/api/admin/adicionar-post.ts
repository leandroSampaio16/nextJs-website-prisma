import type { NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { FormNextApiRequest, getConfig, withFileUpload } from 'next-multiparty'
import mimeTypes from "mime-types"
import { writeFile } from "fs"
import uploadFicheiroFireBase from '@/services/uploadFirebase'
import { tb_blog, tb_contas } from '@/services/firestore'

export const config = getConfig()
export default withFileUpload(async function handler(
    req: FormNextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST" && hasCookie("__session", { req, res })) {
        res.setHeader("Cache-Control", "private")
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dadosConta = await tb_contas.getByEmail(email)
        if (dadosConta) {
            if (dadosConta.admin === true) {
                const titulo = req.fields["titulo"]
                const conteudo = req.fields["conteudo"]
                var data = new Date()
                if (Number(req.fields["id"].toString()) !== -1) {
                    await tb_blog.removerPost(Number(req.fields["id"].toString()))
                    data = new Date(req.fields["data"].toString())
                }
                if (req.file && req.fields["conteudo"] !== "") {
                    const ficheiroEnhancedF = req.file
                    const nomeF = ficheiroEnhancedF.originalFilename + "_" + ficheiroEnhancedF.newFilename + "." + mimeTypes.extension(ficheiroEnhancedF.mimetype!)
                    const bufferFicheiro = await ficheiroEnhancedF.toBuffer()
                    const url = await uploadFicheiroFireBase("fotos_blog/" + nomeF, bufferFicheiro)
                    await tb_blog.adicionarPost({
                        titulo: titulo,
                        mensagem: conteudo,
                        img_url: url,
                        data: data
                    })
                    res.redirect("/admin?erro=false&ms=Post alterado/criado!").end()
                }
                else {
                    res.redirect("/admin?erro=true&msg=Adicione uma Imagem e texto detalhado!").end()
                }

            }
            else {
                res.status(400).redirect("/").end()
            }
        }
        else {
            res.status(500).redirect("/").end()
        }
    }
    else {
        res.status(401).end()
    }
})