const TelegramApi = require("node-telegram-bot-api");
const { startOptions } = require("./options");
// const sequelize = require('./db');
// const UserModel = require('./models');
const axios = require("axios");

const token = "6547194363:AAHKUCBZeqbhccIjTVKm_8ZpFZUrYrJH8MA";

const bot = new TelegramApi(token, { polling: true });

let globalUserName;
let chatId2;

const start = async () => {
  bot.setMyCommands([{ command: "/start", description: "начать трекать" }]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    chatId2 = chatId;

    try {
      if (text === "/start") {
        return bot.sendMessage(
          chatId,
          `отправь свой логин и пароль через пробел в одном сообщении ,хотя пароль можешь прислать липовый, так как если сервис не работает то он  любой пароль не приймет`
        );
      } else {
        globalUserName = text;
        console.log(globalUserName);
        return bot.sendMessage(
          chatId,
          `нажми сюда если ты все правильно ввел, если ошибся то просто введи снова ничего не нажимая`,
          startOptions
        );
      }
    } catch (e) {
      return bot.sendMessage(chatId, "сорри, все слетело к хуям((");
    }
  });

  async function intervalFunc() {
    let status;
    let html;

    console.log("it works")
    try {
      let response = await axios.get(
        "https://lift-api.vfsglobal.com/user/login",
        {
          username: globalUserName,
          password: globalUserName,
        }
      );

      console.log("res: ", response.status);
    } catch (e) {
      // console.log(e.response.status);
      // console.log(e.response.statusText);
      bot.sendMessage(
        chatId2,
        `statusCode: ${e.response.status}, стату можешь сам загуглить`
      );
      bot.sendMessage(chatId2, ` ${e.response.statusText}`);
    }
  }
  //
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
         setInterval(intervalFunc, 120000);
    }
  });
};

start();
