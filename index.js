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
            text: "Más información sobre primaria",
            callback_data: "/constancia1,A",
          },
        ],
        [
          {
            text: "Más información sobre secundaria",
            callback_data: "/constancia2,A",
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
            text: "Más información sobre primaria",
            callback_data: "/constancia1,B",
          },
        ],
        [
          {
            text: "Más información sobre secundaria",
            callback_data: "/constancia2,B",
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
            text: "Más información sobre misa del Lunes",
            callback_data: "/misa1,A",
          },
        ],
        [
          {
            text: "Más información sobre misa del Jueves",
            callback_data: "/misa2,A",
          },
        ],
        [
          {
            text: "Más información sobre misa del Domingo",
            callback_data: "/misa3,A",
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
            text: "Más información sobre misa del Lunes",
            callback_data: "/misa1,B",
          },
        ],
        [
          {
            text: "Más información sobre misa del Jueves",
            callback_data: "/misa2,B",
          },
        ],
        [
          {
            text: "Más información sobre misa del Domingo",
            callback_data: "/misa3,B",
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
            text: "Más información sobre el carnaval",
            callback_data: "/fiesta1,A",
          },
        ],
        [
          {
            text: "Más información sobre semana santa",
            callback_data: "/fiesta2,A",
          },
        ],
        [
          {
            text: "Más información sobre Pre defensa del grupo 6",
            callback_data: "/fiesta3,A",
          },
        ],
        [
          {
            text: "Más información sobre defensa de tesis",
            callback_data: "/fiesta4,A",
          },
        ],
        [
          {
            text: "Más información sobre la graduación",
            callback_data: "/fiesta5,A",
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
            text: "Más información sobre el carnaval",
            callback_data: "/fiesta1,B",
          },
        ],
        [
          {
            text: "Más información sobre semana santa",
            callback_data: "/fiesta2,B",
          },
        ],
        [
          {
            text: "Más información sobre Pre defensa del grupo 6",
            callback_data: "/fiesta3,B",
          },
        ],

        [
          {
            text: "Más información sobre defensa de tesis",
            callback_data: "/fiesta4,B",
          },
        ],

        [
          {
            text: "Más información sobre la graduación",
            callback_data: "/fiesta5,B",
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
            callback_data: "/boletin1,A",
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
            callback_data: "/boletin1,B",
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
    bot.editMessageText(
      `Información sobre constancias...de la sección ${section}...\n\n*Primaria - Lunes y Martes (3$)\n\n*Secundaria - Jueves y viernes (5$)`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa")) {
    bot.editMessageText(
      `Información sobre misas de la sección ${section}...\n\n*Lunes\n\n*Jueves\n\n*Domingo
      `,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta")) {
    bot.editMessageText(
      `Información sobre las fiestas de la sección ${section}...\n\n*Carnavales - 12/02/2024 al 13/02/2024\n\n*Semana santa - 24/03/2024 al 30/03/2024 \n\n*Pre defensas de tesis\n\n*Defensa de tesis - 27/02/2024 al 29/02/2024\n\n*Graduación`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin")) {
    bot.editMessageText(
      `Información sobre boletin de la sección ${section}...\n\n*Viernes (10$)`,
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
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancias,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a constancias", callback_data: "/constancias,B" }],
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
          [{ text: "Volver a misas", callback_data: "/misa,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,B" }],
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
          [{ text: "Volver a fiestas", callback_data: "/fiesta,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,B" }],
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
          [{ text: "Volver a boletin", callback_data: "/boletin,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
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
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes de primaria! Les informamos que podrán retirar las constancias de estudio los días lunes y martes. Para obtener la constancia, se requerirá un pago de 3 dólares por cada copia. Este monto ayudará a cubrir los gastos administrativos asociados. Asegúrense de traer el dinero exacto al momento de recoger la constancia. Agradecemos su colaboración y les recordamos que la constancia es un documento importante para futuros trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/constancia2")) {
    bot.editMessageText(
      `¡Anuncio importante para los estudiantes de secundaria y sus familias! Les informamos que podrán retirar las constancias de estudio los días jueves y viernes. Para obtener la constancia, se requerirá un pago de 5 dólares por cada copia. Este monto contribuirá a cubrir los costos administrativos y de impresión. Por favor, asegúrense de traer la cantidad exacta al momento de recoger la constancia. Agradecemos su comprensión y apoyo en esta gestión. La constancia de estudio será un documento valioso para futuras solicitudes y trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa1")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa del día lunes! Los invitamos a unirse a nosotros en un momento de fe y reflexión. Durante esta celebración, nos reuniremos para orar juntos, escuchar la palabra de Dios y fortalecer nuestra espiritualidad. Esperamos que esta misa sea un espacio de paz y renovación para todos. ¡Los esperamos con alegría!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa2")) {
    bot.editMessageText(
      `Les recordamos que el día jueves tendremos una misa especial. Los invitamos a unirse a nosotros en este encuentro de fe y comunidad. Durante la misa, compartiremos momentos de oración, reflexión y alabanza. Es una oportunidad para reafirmar nuestra conexión con lo divino y encontrar consuelo en la palabra de Dios. ¡Esperamos contar con su presencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa3")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa dominical! Los invitamos a unirse a nosotros en este sagrado día de adoración y comunión. Durante la misa, nos reuniremos como comunidad para celebrar la presencia de Dios en nuestras vidas. Escucharemos lecturas bíblicas, entonaremos himnos de alabanza y compartiremos juntos la Eucaristía. Esperamos que esta misa sea un momento de inspiración espiritual y renovación para todos. ¡Les esperamos con los brazos abiertos!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta1")) {
    bot.editMessageText(
      `¡Ven y únete al increíble Carnaval del Liceo del 12 de febrero al 13 de de abril de 2024! Sumérgete en un mundo de magia, color y diversión sin límites. Disfruta de deslumbrantes desfiles de carnaval, emocionantes juegos, competencias de disfraces, música en vivo y una amplia variedad de comida y bebida. Además, celebra la diversidad cultural y promueve el compañerismo a través de talleres y actividades educativas. ¡No te pierdas esta fiesta inolvidable!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta2")) {
    bot.editMessageText(
      `¡Ven y celebra la Semana Santa en grande del 24 al 30 de marzo de 2024! Sumérgete en una experiencia llena de tradición, espiritualidad y diversión. Disfruta de procesiones religiosas, actividades culturales, concursos, música en vivo y una variedad de deliciosos platos típicos. Además, aprovecha para reflexionar y conectar con tu espiritualidad en este tiempo especial. ¡No te pierdas esta emocionante celebración de la Semana Santa!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta3")) {
    bot.editMessageText(
      `¡Atención a todos! Les informamos que se acerca la predefensa del Grupo 6. Prepárense para mostrar todo su esfuerzo y conocimiento en esta importante etapa. Durante la predefensa, tendrán la oportunidad de presentar sus proyectos, responder preguntas y recibir retroalimentación valiosa. Asegúrense de estar preparados y demostrar su mejor trabajo. ¡Buena suerte a todos en esta próxima etapa crucial!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta4")) {
    bot.editMessageText(
      `¡Anuncio importante para todos los interesados! Les informamos que se acerca la emocionante defensa de tesis, que se llevará a cabo del 27 al 29 de febrero de 2024. Es el momento culminante en el que nuestros estudiantes presentarán sus proyectos de investigación y compartirán los resultados de sus arduos esfuerzos. Acompáñennos para presenciar presentaciones innovadoras, debates académicos y la brillantez de nuestras mentes creativas. ¡No se pierdan esta oportunidad de celebrar el conocimiento y el logro académico!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta5")) {
    bot.editMessageText(
      `¡Es un honor compartir con todos ustedes la emocionante noticia de nuestra próxima graduación! Después de años de arduo trabajo, dedicación y perseverancia, nuestros estudiantes están listos para dar un gran paso hacia el futuro. La graduación será un momento especial en el cual celebraremos sus logros, reconociendo su esfuerzo y determinación. Será una ceremonia llena de alegría, orgullo y promesas de nuevos comienzos. Acompáñenos para aplaudir a nuestros graduados y desearles éxito en sus futuras aventuras. ¡No se pierdan este memorable evento de celebración y trascendencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes! Les informamos que podrán retirar los boletines de calificaciones el día viernes. Para obtener el boletín, se requerirá un pago de 10 dólares por cada copia. Este monto ayudará a cubrir los costos de impresión y administración. Asegúrense de traer el dinero exacto al momento de recoger su boletín. Agradecemos su comprensión y apoyo en esta importante gestión.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
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
    A: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a misas", callback_data: "/misa,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
  };
  const opciones_fiesta = {
    A: {
      //Botones que vienen en la opción de horario"
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a fiestas", callback_data: "/fiesta,B" }],
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
          [{ text: "Volver a boletin", callback_data: "/boletin,A" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
    B: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Volver a boletin", callback_data: "/boletin,B" }],
          [{ text: "Volver al inicio", callback_data: "/volver" }],
        ],
      }),
    },
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
  } else if (comando.startsWith("/constancia1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes de primaria! Les informamos que podrán retirar las constancias de estudio los días lunes y martes. Para obtener la constancia, se requerirá un pago de 3 dólares por cada copia. Este monto ayudará a cubrir los gastos administrativos asociados. Asegúrense de traer el dinero exacto al momento de recoger la constancia. Agradecemos su colaboración y les recordamos que la constancia es un documento importante para futuros trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/constancia2")) {
    bot.editMessageText(
      `¡Anuncio importante para los estudiantes de secundaria y sus familias! Les informamos que podrán retirar las constancias de estudio los días jueves y viernes. Para obtener la constancia, se requerirá un pago de 5 dólares por cada copia. Este monto contribuirá a cubrir los costos administrativos y de impresión. Por favor, asegúrense de traer la cantidad exacta al momento de recoger la constancia. Agradecemos su comprensión y apoyo en esta gestión. La constancia de estudio será un documento valioso para futuras solicitudes y trámites académicos.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_constancias[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa1")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa del día lunes! Los invitamos a unirse a nosotros en un momento de fe y reflexión. Durante esta celebración, nos reuniremos para orar juntos, escuchar la palabra de Dios y fortalecer nuestra espiritualidad. Esperamos que esta misa sea un espacio de paz y renovación para todos. ¡Los esperamos con alegría!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa2")) {
    bot.editMessageText(
      `Les recordamos que el día jueves tendremos una misa especial. Los invitamos a unirse a nosotros en este encuentro de fe y comunidad. Durante la misa, compartiremos momentos de oración, reflexión y alabanza. Es una oportunidad para reafirmar nuestra conexión con lo divino y encontrar consuelo en la palabra de Dios. ¡Esperamos contar con su presencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/misa3")) {
    bot.editMessageText(
      `¡Bienvenidos a nuestra misa dominical! Los invitamos a unirse a nosotros en este sagrado día de adoración y comunión. Durante la misa, nos reuniremos como comunidad para celebrar la presencia de Dios en nuestras vidas. Escucharemos lecturas bíblicas, entonaremos himnos de alabanza y compartiremos juntos la Eucaristía. Esperamos que esta misa sea un momento de inspiración espiritual y renovación para todos. ¡Les esperamos con los brazos abiertos!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_misa[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta1")) {
    bot.editMessageText(
      `¡Ven y únete al increíble Carnaval del Liceo del 12 de febrero al 13 de de abril de 2024! Sumérgete en un mundo de magia, color y diversión sin límites. Disfruta de deslumbrantes desfiles de carnaval, emocionantes juegos, competencias de disfraces, música en vivo y una amplia variedad de comida y bebida. Además, celebra la diversidad cultural y promueve el compañerismo a través de talleres y actividades educativas. ¡No te pierdas esta fiesta inolvidable!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta2")) {
    bot.editMessageText(
      `¡Ven y celebra la Semana Santa en grande del 24 al 30 de marzo de 2024! Sumérgete en una experiencia llena de tradición, espiritualidad y diversión. Disfruta de procesiones religiosas, actividades culturales, concursos, música en vivo y una variedad de deliciosos platos típicos. Además, aprovecha para reflexionar y conectar con tu espiritualidad en este tiempo especial. ¡No te pierdas esta emocionante celebración de la Semana Santa!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta3")) {
    bot.editMessageText(
      `¡Atención a todos! Les informamos que se acerca la predefensa del Grupo 6. Prepárense para mostrar todo su esfuerzo y conocimiento en esta importante etapa. Durante la predefensa, tendrán la oportunidad de presentar sus proyectos, responder preguntas y recibir retroalimentación valiosa. Asegúrense de estar preparados y demostrar su mejor trabajo. ¡Buena suerte a todos en esta próxima etapa crucial!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta4")) {
    bot.editMessageText(
      `¡Anuncio importante para todos los interesados! Les informamos que se acerca la emocionante defensa de tesis, que se llevará a cabo del 27 al 29 de febrero de 2024. Es el momento culminante en el que nuestros estudiantes presentarán sus proyectos de investigación y compartirán los resultados de sus arduos esfuerzos. Acompáñennos para presenciar presentaciones innovadoras, debates académicos y la brillantez de nuestras mentes creativas. ¡No se pierdan esta oportunidad de celebrar el conocimiento y el logro académico!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/fiesta5")) {
    bot.editMessageText(
      `¡Es un honor compartir con todos ustedes la emocionante noticia de nuestra próxima graduación! Después de años de arduo trabajo, dedicación y perseverancia, nuestros estudiantes están listos para dar un gran paso hacia el futuro. La graduación será un momento especial en el cual celebraremos sus logros, reconociendo su esfuerzo y determinación. Será una ceremonia llena de alegría, orgullo y promesas de nuevos comienzos. Acompáñenos para aplaudir a nuestros graduados y desearles éxito en sus futuras aventuras. ¡No se pierdan este memorable evento de celebración y trascendencia!`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_fiesta[section].reply_markup,
      }
    );
  } else if (comando.startsWith("/boletin1")) {
    bot.editMessageText(
      `¡Atención a todos los padres y estudiantes! Les informamos que podrán retirar los boletines de calificaciones el día viernes. Para obtener el boletín, se requerirá un pago de 10 dólares por cada copia. Este monto ayudará a cubrir los costos de impresión y administración. Asegúrense de traer el dinero exacto al momento de recoger su boletín. Agradecemos su comprensión y apoyo en esta importante gestión.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones_boletin[section].reply_markup,
      }
    );
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
