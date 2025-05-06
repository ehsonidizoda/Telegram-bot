import os
import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

TOKEN = os.getenv("TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=["start"])
def send_welcome(message):
    markup = InlineKeyboardMarkup()
    markup.row(
        InlineKeyboardButton("Фото", callback_data="photo"),
        InlineKeyboardButton("Видео", callback_data="video")
    )
    markup.add(InlineKeyboardButton("Канал", url="https://t.me/yourchannel"))
    bot.send_message(message.chat.id, "Добро пожаловать! Выберите:", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data in ["photo", "video"])
def handle_callback(call):
    if call.data == "photo":
        bot.send_message(call.message.chat.id, "Вот фото (заглушка)")
    elif call.data == "video":
        bot.send_message(call.message.chat.id, "Вот видео (заглушка)")

bot.infinity_polling()
