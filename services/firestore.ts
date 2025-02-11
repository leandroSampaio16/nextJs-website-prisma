import { db } from "./firebase";
import { doc, setDoc, Timestamp, collection, query, orderBy, limit, getDocs, where, updateDoc, deleteDoc } from "firebase/firestore";

interface tb_contasI {
    admin: boolean;
    creditos: number;
    dia_hora_otp: Timestamp | null;
    email: string;
    foto_url: string | null;
    genero: string;
    id: number;
    motivos: string;
    nascimento: Timestamp;
    nome: string;
    password: string;
    pin_otp: number | null;
}
interface tb_contasI_add {
    email: string;
    password: string;
    nome: string;
    genero: string;
    nascimento: Date;
    motivos: string;
}
interface tb_contasAlterarI {
    admin?: boolean;
    creditos?: number;
    dia_hora_otp?: Date;
    email?: string;
    foto_url?: string;
    genero?: string;
    motivos?: string;
    nascimento?: Date;
    nome?: string;
    password?: string;
    pin_otp?: number;
}
interface tb_comprasI {
    id: number;
    id_cliente: number;
    qnt_sessoes: number;
    data: Timestamp;
    preco: number;
}
interface tb_comprasI_add {
    id_cliente: number;
    qnt_sessoes: number;
    data: Date;
    preco: number;
}
interface tb_blogI {
    id: number;
    titulo: string;
    mensagem: string;
    img_url: string;
    data: Timestamp;
}
interface tb_blogI_add {
    titulo: string;
    mensagem: string;
    img_url: string;
    data: Date;
}
interface tb_sessoesI {
    id: number;
    dia_e_hora: Timestamp;
    id_cliente: number;
    mensagem: string;
}
interface tb_sessoesI_add {
    dia_e_hora: Date;
    id_cliente: number;
    mensagem: string;
}
const contasRef = collection(db, "tb_contas")
const comprasRef = collection(db, "tb_compras")
const blogRef = collection(db, "tb_blog")
const sessoesRef = collection(db, "tb_sessoes")

export function timestampToDate(ts: Timestamp) {
    return ts.toDate()
}
class TbContas {
    async jaExisteEmail(email: string) {
        const q = query(contasRef, where("email", "==", email))
        const docsQ = await getDocs(q)
        if (docsQ.empty) {
            return false
        }
        else {
            return true
        }
    }
    async getByID(id: number) {
        const q = query(contasRef, where("id", "==", id))
        const docsQ = await getDocs(q)
        if (docsQ.empty) {
            return false
        }
        else {
            return docsQ.docs[0].data() as tb_contasI
        }
    }
    async getByEmail(email: string) {
        const q = query(contasRef, where("email", "==", email))
        const docsQ = await getDocs(q)
        if (docsQ.empty) {
            return false
        }
        else {
            return docsQ.docs[0].data() as tb_contasI
        }
    }
    async add(dados: tb_contasI_add) {
        const q = query(contasRef, orderBy("id", "desc"), limit(1))
        const docsQ = await getDocs(q)
        var id: number = 0
        if (!docsQ.empty) {
            id = docsQ.docs[0].data()["id"] + 1
        }
        const jaExiste = await this.jaExisteEmail(dados.email)
        if (jaExiste === false) {
            await setDoc(doc(db, "tb_contas", id.toString()), {
                id: id,
                email: dados.email,
                password: dados.password,
                nome: dados.nome,
                genero: dados.genero,
                nascimento: Timestamp.fromDate(new Date(dados.nascimento)),
                motivos: dados.motivos,
                foto_url: null,
                pin_otp: null,
                dia_hora_otp: null,
                creditos: 0,
                admin: 0,
            })
            return true
        }
        else {
            return false
        }
    }
    async alterar(dados: tb_contasAlterarI, email: string) {
        const dadosAnteriores: tb_contasI | false = await this.getByEmail(email)
        if (dadosAnteriores) {
            const refConta = doc(contasRef, dadosAnteriores.id.toString())
            const jaExiste = await this.jaExisteEmail(dados.email ? dados.email : dadosAnteriores.email)
            if (jaExiste && dadosAnteriores.email !== dados.email && dados.email) {
                return false
            }
            const novosDados = {
                admin: dados.admin ? dados.admin : dadosAnteriores.admin,
                creditos: (dados.creditos !== undefined && dados.creditos >= 0) ? dados.creditos : dadosAnteriores.creditos,
                dia_hora_otp: dados.dia_hora_otp ? Timestamp.fromDate(new Date(dados.dia_hora_otp)) : dadosAnteriores.dia_hora_otp,
                email: dados.email ? dados.email : dadosAnteriores.email,
                foto_url: dados.foto_url ? dados.foto_url : dadosAnteriores.foto_url,
                genero: dados.genero ? dados.genero : dadosAnteriores.genero,
                motivos: dados.motivos ? dados.motivos : dadosAnteriores.motivos,
                nascimento: dados.nascimento ? Timestamp.fromDate(new Date(dados.nascimento)) : dadosAnteriores.nascimento,
                nome: dados.nome ? dados.nome : dadosAnteriores.nome,
                password: dados.password ? dados.password : dadosAnteriores.password,
                pin_otp: dados.pin_otp ? dados.pin_otp : dadosAnteriores.pin_otp,
            }
            await updateDoc(refConta, novosDados)
            return true
        }
        else {
            return false
        }
    }
    async verificarPassword(email: string, password: string) {
        const dados = await this.getByEmail(email)
        if (dados && String(password) === String(dados.password)) {
            return true
        }
        return false
    }
    async obterTodasAsContas() {
        const docsQ = await getDocs(contasRef)
        if (docsQ.empty) {
            return []
        }
        else {
            const res = docsQ.docs.map((v) => {
                const valor = v.data() as tb_contasI
                return valor
            })
            return res
        }
    }
}
class TbCompras {
    async add(dados: tb_comprasI_add) {
        const q = query(comprasRef, orderBy("id", "desc"), limit(1))
        const docsQ = await getDocs(q)
        var id: number = 0
        if (!docsQ.empty) {
            id = docsQ.docs[0].data()["id"] + 1
        }
        const novosDados = {
            id: id,
            id_cliente: dados.id_cliente,
            qnt_sessoes: dados.qnt_sessoes,
            data: Timestamp.fromDate(new Date(dados.data)),
            preco: dados.preco
        }
        await setDoc(doc(db, "tb_compras", id.toString()), novosDados)
        return true
    }
    async obterComprasCliente(id_cliente: number) {
        const q = query(comprasRef, where("id_cliente", "==", id_cliente), orderBy("data", "desc"))
        const docsQ = await getDocs(q)
        if (!docsQ.empty) {
            const res = docsQ.docs.map((v) => {
                const valor = v.data() as tb_comprasI
                return {
                    id: valor.id,
                    id_cliente: valor.id_cliente,
                    qnt_sessoes: valor.qnt_sessoes,
                    data: timestampToDate(valor.data),
                    preco: valor.preco
                }
            })
            return res
        }
        return []
    }
    async obterTodasAsCompras() {
        const q = query(comprasRef, orderBy("data", "desc"))
        const docsQ = await getDocs(q)
        if (!docsQ.empty) {
            const res = docsQ.docs.map((v) => {
                const valor = v.data() as tb_comprasI
                return {
                    id: valor.id,
                    id_cliente: valor.id_cliente,
                    qnt_sessoes: valor.qnt_sessoes,
                    data: timestampToDate(valor.data),
                    preco: valor.preco
                }
            })
            return res
        }
        return []
    }
}
class TbBlog {
    async obterUmPost(id: number) {
        const q = query(blogRef, where("id", "==", id), limit(1))
        const temp = await getDocs(q)
        if (!temp.empty) {
            const docsQ = temp.docs[0].data() as tb_blogI
            return docsQ
        }
        return false
    }
    async obterTodosPosts() {
        const q = query(blogRef, orderBy("data", "desc"))
        const temp = await getDocs(q)
        if (!temp.empty) {
            const posts = temp.docs.map((v) => {
                const valor = v.data() as tb_blogI
                return {
                    id: valor.id,
                    titulo: valor.titulo,
                    mensagem: valor.mensagem,
                    img_url: valor.img_url,
                    data: timestampToDate(valor.data)
                }
            })
            return posts
        }
        return []
    }
    async adicionarPost(dados: tb_blogI_add) {
        const q = query(blogRef, orderBy("id", "desc"), limit(1))
        const docsQ = await getDocs(q)
        var id: number = 0
        if (!docsQ.empty) {
            id = docsQ.docs[0].data()["id"] + 1
        }
        await setDoc(doc(db, "tb_blog", id.toString()), {
            id: id,
            titulo: dados.titulo,
            mensagem: dados.mensagem,
            img_url: dados.img_url,
            data: Timestamp.fromDate(dados.data)
        })
        return true
    }
    async removerPost(id: number) {
        await deleteDoc(doc(blogRef, id.toString()))
    }
}
class TbSessoes {
    async add(data: tb_sessoesI_add) {
        const q = query(sessoesRef, orderBy("id", "desc"), limit(1))
        const docsQ = await getDocs(q)
        var id: number = 0
        if (!docsQ.empty) {
            id = docsQ.docs[0].data()["id"] + 1
        }
        await setDoc(doc(db, "tb_sessoes", id.toString()), {
            id: id,
            id_cliente: data.id_cliente,
            dia_e_hora: Timestamp.fromDate(new Date(data.dia_e_hora)),
            mensagem: data.mensagem
        })
    }
    async obterTodas() {
        const q = query(sessoesRef)
        const temp = await getDocs(q)
        if (!temp.empty) {
            const sessoes = temp.docs.map((v) => {
                const valor = v.data() as tb_sessoesI
                return {
                    id: valor.id,
                    dia_e_hora: timestampToDate(valor.dia_e_hora),
                    id_cliente: valor.id_cliente,
                    mensagem: valor.mensagem,
                }
            })
            return sessoes
        }
        return []
    }
    async obterPorIDCliente(id_cliente: number) {
        const q = query(sessoesRef, where("id_cliente", "==", id_cliente))
        const temp = await getDocs(q)
        if (!temp.empty) {
            const sessoes = temp.docs.map((v) => {
                const valor = v.data() as tb_sessoesI
                return {
                    id: valor.id,
                    dia_e_hora: timestampToDate(valor.dia_e_hora),
                    id_cliente: valor.id_cliente,
                    mensagem: valor.mensagem,
                }
            })
            return sessoes
        }
        return false
    }
    async obterUmaSessao(dados: tb_sessoesI_add) {
        const q = query(sessoesRef, where("dia_e_hora", "==", Timestamp.fromDate(dados.dia_e_hora)), where("id_cliente", "==", dados.id_cliente), where("mensagem", "==", dados.mensagem))
        const temp = await getDocs(q)
        if (!temp.empty) {
            const valor = temp.docs[0].data() as tb_sessoesI
            return valor
        }
        return false
    }
    async apagar(id: number) {
        await deleteDoc(doc(sessoesRef, id.toString()))
    }
}

export const tb_contas = new TbContas()
export const tb_compras = new TbCompras()
export const tb_blog = new TbBlog()
export const tb_sessoes = new TbSessoes()