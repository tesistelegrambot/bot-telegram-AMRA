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
const port = process.env.PORT || 8080;
const express = require("express");
const app = express();
app.get("/health", (req, res) => {
  res.sendStatus(200);
});

const sectionSelector = (name) => {
  return {
    //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Sección 'A'", callback_data: `/${name},A` }],
        //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
        [{ text: "Sección 'B'", callback_data: `/${name},B` }],
      ],
    }),
  };
};

const opciones_inicio = {
  //opciones vienen siendo las interacciones luego de "En que puedo ayudarte?"
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Horario", callback_data: "/section,horario" }],
      //por ejemplo esta interacción se llama Horario y ejecuta el comando /horario el cual te responderá algo
      [{ text: "Constancias", callback_data: "/section,constancias" }],
      [{ text: "Misa", callback_data: "/section,misa" }],
      [{ text: "Fiesta", callback_data: "/section,fiesta" }],
      [{ text: "Boletín", callback_data: "/section,boletin" }],
    ],
  }),
};

bot.onText(/\/start$/, (msg) => {
  try {
    const now = new Date();
    const options = {
      timeZone: "America/Caracas",
      hour: "numeric",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("es-VE", options);
    const hour = formatter.format(now);

    let saludo;
    if (hour >= 6 && hour < 12) {
      saludo = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      saludo = "Buenas tardes";
    } else {
      saludo = "Buenas noches";
    }
    //le decimos al bot que escuche el comando de /start (inicio)
    const chatId = msg.chat.id;
    //declaramos el id del chat para saber a quien enviarle el mensaje, en este caso
    //respondemos a la persona que nos escribe, por eso guardamos el id del chat

    bot.sendMessage(
      chatId,
      `${saludo} ¿En qué puedo ayudarle?`,
      opciones_inicio
    );
    //aqui estamos respondiendo a /start (botón de inicio), el saludo dependerá del horario y le pasamos
    //las opciones
  } catch (error) {
    console.log(error);
  }
});

// declarando opciones
const opciones_horario = {
  A: {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información del lunes",
            callback_data: "/actividad1,A",
          },
        ],
        [
          {
            text: "Más información del martes",
            callback_data: "/actividad2,A",
          },
        ],
        [
          {
            text: "Más información del miércoles",
            callback_data: "disabled",
            callback_game: {},
          },
        ],
        [
          {
            text: "Más información del jueves",
            callback_data: "/actividad4,A",
          },
        ],
        [
          {
            text: "Más información del viernes",
            callback_data: "/actividad5,A",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información del lunes",
            callback_data: "/actividad1,B",
          },
        ],
        [
          {
            text: "Más información del martes",
            callback_data: "/actividad2,B",
          },
        ],
        [
          {
            text: "Más información del miércoles",
            callback_data: "disabled",
            callback_game: {},
          },
        ],
        [
          {
            text: "Más información del jueves",
            callback_data: "/actividad4,B",
          },
        ],
        [
          {
            text: "Más información del viernes",
            callback_data: "/actividad5,B",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
const opciones_constancias = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información",
            callback_data: "/constancia1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información",
            callback_data: "/constancia1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
const opciones_misa = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre la misa 1",
            callback_data: "/misa1",
          },
        ],
        [
          {
            text: "Más información sobre la misa 2",
            callback_data: "/misa2",
          },
        ],
        [
          {
            text: "Más información sobre la misa 3",
            callback_data: "/misa3",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre la misa 1",
            callback_data: "/misa1",
          },
        ],
        [
          {
            text: "Más información sobre la misa 2",
            callback_data: "/misa2",
          },
        ],
        [
          {
            text: "Más información sobre la misa 3",
            callback_data: "/misa3",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
const opciones_fiesta = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre la fiesta 1",
            callback_data: "/fiesta1",
          },
        ],
        [
          {
            text: "Más información sobre la fiesta 2",
            callback_data: "/fiesta2",
          },
        ],
        [
          {
            text: "Más información sobre la fiesta 3",
            callback_data: "/fiesta3",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre la fiesta 1",
            callback_data: "/fiesta1",
          },
        ],
        [
          {
            text: "Más información sobre la fiesta 2",
            callback_data: "/fiesta2",
          },
        ],
        [
          {
            text: "Más información sobre la fiesta 3",
            callback_data: "/fiesta3",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
const opciones_boletin = {
  //Botones que vienen en la opción de horario"
  A: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el boletín",
            callback_data: "/boletin1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
  B: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Más información sobre el boletín",
            callback_data: "/boletin1",
          },
        ],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  },
};
//
//
//
//
//Escuchando comandos principales = /horario, /misa, etc...
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  //escuchando todas las acciones que vienen de presionar botones

  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  //este es el comando enviado, por ejemplo /horario o /misa
  const section = comando.split(",")[1];
  console.log(section);
  if (comando.startsWith("/section")) {
    bot.editMessageText(`Seleccione una sección`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: sectionSelector(section).reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/horario")) {
    bot.editMessageText(
      `🏫 Información sobre horarios de la sección '${section}': \n\n🟢Lunes, de 7:00AM hasta 12:00PM\n\n🟢Martes, de 7:00AM hasta 5:00PM\n\n🔴Miércoles, no hay clases\n\n🟢Jueves, de 7:00AM hasta 9:00AM\n\n🟢Viernes, de 10:00AM hasta 12:00PM
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_horario[section].reply_markup,
      }
    );
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/constancias")) {
    bot.editMessageText("Información sobre constancias...", {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_constancias[section].reply_markup,
    });
  } else if (comando.startsWith("/misa")) {
    bot.editMessageText(
      `Información sobre misas de la sección ${section}... \n
      misa 1 - fecha xx/xx/xx xx:xx \n
      misa 2 - fecha xx/xx/xx xx:xx \n
      misa 2 - fecha xx/xx/xx xx:xx \n
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta")) {
    bot.editMessageText(
      `Información sobre las fiestas de la sección ${section}... \n
      fiesta 1 - fecha xx/xx/xx xx:xx \n
      fiesta 2 - fecha xx/xx/xx xx:xx \n
      fiesta 2 - fecha xx/xx/xx xx:xx \n
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin")) {
    bot.editMessageText(
      `Información sobre boletin de la sección ${section}...`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
  } else if (comando === "/volver") {
    const now = new Date();
    const options = {
      timeZone: "America/Caracas",
      hour: "numeric",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("es-VE", options);
    const hour = formatter.format(now);

    let saludo;
    if (hour >= 6 && hour < 12) {
      saludo = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      saludo = "Buenas tardes";
    } else {
      saludo = "Buenas noches";
    }
    bot.editMessageText(`${saludo} ¿En qué puedo ayudarle?`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_inicio.reply_markup,
    });
  }
});
//
//
//
//
//Escuchando comandos secundarios = /actividad1, /misa1, etc...
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  //escuchando todas las acciones que vienen de presionar botones
  const opciones_actividad = {
    A: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_constancias = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a constancias", callback_data: "/constancias" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };
  const opciones_misa = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a misas", callback_data: "/misa" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };
  const opciones_fiesta = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a fiestas", callback_data: "/fiesta" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };
  const opciones_boletin = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a boletin", callback_data: "/boletin" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };

  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  const section = comando.split(",")[1];

  //este es el comando enviado, por ejemplo /horario o /misa
  if (comando.startsWith("/actividad1")) {
    bot.editMessageText(`Materias del dia lunes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/actividad2")) {
    bot.editMessageText(`Materias del dia martes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando.startsWith("/actividad4")) {
    bot.editMessageText(`Materias del dia jueves:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
  } else if (comando.startsWith("/actividad5")) {
    bot.editMessageText(`Materias del dia viernes:...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad[section].reply_markup,
    });
  } else if (comando.startsWith("/constancia1")) {
    bot.editMessageText(`Más Información sobre las constancias`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_constancias.reply_markup,
    });
  } else if (comando === "/misa1") {
    bot.editMessageText(`Más información sobre misa 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/misa2") {
    bot.editMessageText(`Más información sobre misa 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/misa3") {
    bot.editMessageText(`Más información sobre misa 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/fiesta1") {
    bot.editMessageText(`Información sobre la fiesta 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/fiesta2") {
    bot.editMessageText(`Información sobre la fiesta 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/fiesta3") {
    bot.editMessageText(`Información sobre la fiesta 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/boletin1") {
    bot.editMessageText(`Mas información sobre los boletines...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
  }
});
//
//
//
//
//Escuchando comandos de volver desde un comando secundario a un comando principal
//
//
//
//
bot.on("callback_query", (callbackQuery) => {
  //escuchando todas las acciones que vienen de presionar botones
  const opciones_actividad = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a horario", callback_data: "/horario,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_constancias = {
    //Botones que vienen en la opción de horario"
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancia,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancia,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_misa = {
    //Botones que vienen en la opción de horario"

    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a misas", callback_data: "/misa" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };
  const opciones_fiesta = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a fiestas", callback_data: "/fiesta" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };
  const opciones_boletin = {
    //Botones que vienen en la opción de horario"
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Volver a boletin", callback_data: "/boletin" }],
        [{ text: "Volver al inicio", callback_data: "/volver" }],
      ],
    }),
  };

  const messageId = callbackQuery.message.message_id;
  //el id del mensaje lo podemos usar para editar/borrar mensajes
  const chatId = callbackQuery.message.chat.id;
  const comando = callbackQuery.data;
  //este es el comando enviado, por ejemplo /horario o /misa
  if (comando === "/actividad1") {
    bot.editMessageText(`Más información sobre actividad 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando === "/actividad2") {
    bot.editMessageText(`Más información sobre actividad 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
    //respondemos esto y le pasamos un botón con el que puede volver
  } else if (comando === "/actividad3") {
    bot.editMessageText(`Más información sobre actividad 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_actividad.reply_markup,
    });
  } else if (comando === "/constancia1") {
    bot.editMessageText(`Más Información sobre las constancias`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_constancias.reply_markup,
    });
  } else if (comando === "/misa1") {
    bot.editMessageText(`Más información sobre misa 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/misa2") {
    bot.editMessageText(`Más información sobre misa 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/misa3") {
    bot.editMessageText(`Más información sobre misa 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_misa.reply_markup,
    });
  } else if (comando === "/fiesta1") {
    bot.editMessageText(`Información sobre la fiesta 1...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/fiesta2") {
    bot.editMessageText(`Información sobre la fiesta 2...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/fiesta3") {
    bot.editMessageText(`Información sobre la fiesta 3...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_fiesta.reply_markup,
    });
  } else if (comando === "/boletin1") {
    bot.editMessageText(`Mas información sobre los boletines...`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: opciones_boletin.reply_markup,
    });
  }
});
//
//
//
//
//Escuchando comandos principales desde el Menú = /horario, /misa, etc...
//
//
//
//

bot.onText(/^\/sec/, (msg) => {
  const chatId = msg.chat.id;
  const section = msg.text.split("_")[1];
  console.log(section);
  console.log(msg.text);
  try {
    bot.sendMessage(chatId, "Seleccione una sección", sectionSelector(section));
  } catch (error) {}
});
app.listen(port, () => {
  console.log(`Bot corriendo correctamente, puerto ${port}`);
});
