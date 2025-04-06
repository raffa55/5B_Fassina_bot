const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const token = conf.key;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;

   if (text === "/start") {
      bot.sendMessage(chatId, "benvenuto nel bot per il reminder di attività");
   }
   
   if (text.startsWith("/add")) {
    const reminder = text.substring(5);
    if (!reminder) {
        bot.sendMessage(chatId, "scrivi un attività");
    } else {
        if (!reminder[chatId]) {
            reminder[chatId] = [];
        }
        reminder[chatId].push(reminder);
        bot.sendMessage(chatId, "promenoria aggiunto: ", {reminder});
    }
   }

   if (text === "/list") {
    user_reminder = reminder[chatId] || [];
    if (user_reminder.length === 0) {
        bot.sendMessage(chatId, "non ci sono promemoria");
    } else {
        let response = "ecco i tuoi promemoria: ";
        user_reminder.forEach((reminder, index) => {
            response += ([index, +1] [reminder]);
        });
        bot.sendMessage(chatId, response);
    }
   }

}); 