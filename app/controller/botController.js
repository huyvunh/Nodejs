const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });

const moment = require('moment-timezone');


exports.sendMessage = (req, res, next) => {

    try {
        const currentDate = new Date();
        const currentDateTimestamp = moment.tz('Asia/Ho_Chi_Minh').unix();
        const chatId = -4075927560;
        let message = "Bây giờ là : " + moment.unix(currentDateTimestamp).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm:ss');
        console.log("Bây giờ là : " + moment.unix(currentDateTimestamp).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm:ss'))

        bot.sendMessage(chatId, message)
    } catch (error) {
        console.log(error)
    }




    return res.status(200).json({
        isSuccess: true,
        status: 200,
        data: 'Hello World!!'
    });
}
