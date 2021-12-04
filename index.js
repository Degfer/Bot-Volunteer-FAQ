import {} from 'dotenv/config';
import TelegramBot from "node-telegram-bot-api";
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_URL = process.env.BOT_URL;
const port = 3000;

const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(`${BOT_URL}/bot${BOT_TOKEN}`);

const app = new Koa();

const router = Router();
router.post(`/bot${BOT_TOKEN}`, ctx => {
    const { body } = ctx.request;
    bot.processUpdate(body);
    ctx.status = 200;
});

app.use(bodyParser());
app.use(router.routes());

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

// bot.on('message', msg => {
//     const { chat: { id }} = msg;
//     bot.sendMessage(id, 'Pong');
// });

// bot.onText(/\/start (.+)/, (msg, [source, match]) => {
//     const { chat: {id}} = msg;
//     bot.sendMessage(id, match);
// });

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Привет! Я бот-помошник, который поможет тебе разобраться во всех тонкостях FAQ для волнтеров. Выбери интирисующую тебя группу.", {
    "reply_markup": {
        "keyboard": [["Заявки", "О путешествии"],   ["Об удобствах"]]
        }
    });

});

// bot.on('message', (msg) => {

//     let Hi = "hi";
//     if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//         bot.sendMessage(msg.chat.id,"<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
//     }

// });


bot.on('message', (msg) => {
    const { chat: {id}} = msg;

    let clear = "назад"

    let groupe1 = "заявки";
    let groupe2 = "о путешествии";
    let groupe3 = "об удобствах";

    let gr1_task1 = "как подать заявку?/как стать волонтером в кроноцком заповеднике?"

    // msg for groupe1
    if (msg.text.toString().toLowerCase() == groupe1) {
        bot.sendMessage(id, "Возможные вопросы по этой теме.", {
            "reply_markup": {
                "keyboard": [["Как подать заявку?/Как стать волонтером в Кроноцком заповеднике?"], ["Назад"]]
                }
            });
    }

    // msg for groupe2
    if (msg.text.toString().toLowerCase() == groupe2) {
        bot.sendMessage(id,"Тест группа 2");
    }

    // msg for groupe3
    if (msg.text.toString().toLowerCase() == groupe3) {
        bot.sendMessage(id,"Тест группа 3");
    }
    




    // groupe1 tasks
    if (msg.text.toString().toLowerCase() == gr1_task1) {
        bot.sendMessage(msg.chat.id,"<b>Тест</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
    }

    //clear
    if (msg.text.toString().toLowerCase() == clear) {
        bot.sendMessage(msg.chat.id, "Хорошо! Ты вернулся домой.", {
            "reply_markup": {
                "keyboard": [["Заявки", "О путешествии"],   ["Об удобствах"]]
                }
        });
    }

});

// Groupe1 Заявки
// bot.on('message', (msg) => {

//     let groupe1 = 'Заявки 🤣';
//     if (msg.text.toString().toLowerCase().indexOf(groupe1) === 0) {
//         bot.sendMessage(msg.chat.id,"<b>Заявки</b> \n <i>italic</i> \n <em>italic with em</em> <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
//     }

// });

// Groupe2 О путешествии
// bot.on('message', (msg) => {
//     let groupe2 = 'О путешествии';
//     if (msg.text.toString().toLowerCase().includes(groupe2)) {
//         bot.sendMessage(msg.chat.id,"<b>О путешествии</b> \n <i>italic</i> \n <em>italic with em</em> <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
//     }

// });

// Groupe3 Об удобствах
// bot.on('message', (msg) => {
//     let groupe3 = 'Об удобствах';
//     if (msg.text.toString().toLowerCase().includes(groupe3)) {
//         bot.sendMessage(msg.chat.id,"<b>Об удобствах</b> \n <i>italic</i> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
//     }

// });