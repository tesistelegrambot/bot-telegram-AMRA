require("dotenv").config();
//requerimos dotenv y lo configuramos para recibir variables delicadas, es decir Tokens o información que no
//se debe compartir con nadie

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

//declaramos una constante proveniente de el archivo .env(información delicada) que usaremos para inicializar
//el bot, este token nos lo provee el botfather al crear nuestro bot

const telegramBot = require("node-telegram-bot-api");

//declaramos una constante proveniente de la librería "node-telegram-bot-api" que nos permitirá inicializar
//y hacer lo que necesitemos para nuestro bot usando nodeJs

const bot = new telegramBot(TELEGRAM_TOKEN, { polling: true });

//declaramos una instancia de telegramBot, basicamente estamos inicializando el bot, pasandole el token y
//configurando el "polling" en true(verdadero), que significa que constantemente está escuchando mensajes que
//le enviemos a nuestro bot

bot.onText(/\/start$/, (msg) => {
  //le decimos al bot que escuche el comando de /start (inicio)
  const chatId = msg.chat.id;
  //declaramos el id del chat para saber a quien enviarle el mensaje, en este caso
  //respondemos a la persona que nos escribe, por eso guardamos el id del chat
  const opciones = {
    //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Horario", callback_data: "/horario" }],
        //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
        [{ text: "Constancias", callback_data: "/constancias" }],
        [{ text: "Misa", callback_data: "/misa" }],
        [{ text: "Fiesta", callback_data: "/fiesta" }],
        [{ text: "Boletín", callback_data: "/boletin" }],
      ],
    }),
  };
  bot.sendMessage(chatId, "Buenas tardes! ¿En qué puedo ayudarle?", opciones);
  //aqui estamos respondiendo a /start (botón de inicio), el saludo dependerá del horario y le pasamos
  //las opciones
});
bot.on("callback_query", (callbackQuery) => {
  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  //este es el comando enviado, por ejemplo /horario o /misa
  if (comando === "/horario") {
    //comprobamos si el comando es igual a x, en este caso si es igual a /horario hacemos lo siguiente
    bot.sendMessage(chatId, "Información sobre el horario");
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando === "/constancias") {
    bot.sendMessage(chatId, "Información sobre constancias");
  } else if (comando === "/misa") {
    bot.sendMessage(chatId, "Información sobre misas");
  } else if (comando === "/fiesta") {
    bot.sendMessage(chatId, "Información sobre fiestas");
  } else if (comando === "/boletin") {
    bot.sendMessage(chatId, "Información sobre boletin");
  }
});
