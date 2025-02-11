import * as crypto from "crypto"
const key = process.env.COOKIE_PW!
const iv = process.env.COOKIE_IV!
export function encryptAES(data: string): string {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(data, "utf8", "hex")
    encrypted += cipher.final("hex")
    return encrypted
}
export function decryptAES(data: string): string {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    let decrypted = decipher.update(data, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
}