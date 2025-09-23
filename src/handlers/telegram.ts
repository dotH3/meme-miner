import TelegramBot from "node-telegram-bot-api"
import dotenv from "dotenv"
dotenv.config()

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string

const whiteList = [7208010064]

export const startBot = async () => {
    console.log("Starting Telegram Bot...")
    const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, {
        polling: true
    })
    console.log("Telegram Bot started.")

    bot.on("message", (msg) => {
        if (whiteList.includes(msg.chat.id) === false) {
            console.log("Usuario no autorizado:", msg.chat.id)
            return
        } else {
            bot.sendMessage(msg.chat.id, "¡Hola! " + msg.chat.first_name)
            if (msg.reply_to_message) {
                console.log("➡️ Chat ID:", msg.chat.id)
                console.log("Usuario que respondió:", msg.from?.id)
                console.log("Texto del reply:", msg.text)
                console.log("Mensaje al que respondió:", msg.reply_to_message.caption)
            }
        }
    })

    return bot

}