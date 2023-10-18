const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });

const moment = require('moment-timezone');
const Decimal = require('decimal.js')

const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
});

const { sma_indicator_ct, rsi_indicator_ct } = require('../indicator/indicator')

const sma_inc = (data, period) => {
    const result = sma_indicator_ct(data, period);
    return data = data.map((d, i) => ({ ...d, sma: result[i] == null ? '' : result[i] }));
}

const rsi_inc = (data, period) => {
    const result = rsi_indicator_ct(data, period);
    return data = data.map((d, i) => ({ ...d, rsi: result[i] == null ? '' : result[i] }));
}


exports.LongShortBinance = async () => {
    console.log("1231423432432432")
    const chatId = -4075927560;

    binance.futuresChart('ETHUSDT', '1m', async (symbol, interval, chart) => {
        const data = Object.entries(chart);
        //console.log(data)
        let chartData = data.map((d) => ({
            symbol: symbol,
            interval: interval,
            time: d[1].time / 1000,
            timestamp: moment.unix(d[1].time / 1000).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss'),
            open: parseFloat(d[1].open),
            close: parseFloat(d[1].close),
            high: parseFloat(d[1].high),
            low: parseFloat(d[1].low),
            volume: parseFloat(d[1].volume),
        }))
        // console.log(chartData)
        chartData = sma_inc(chartData, 100)
        chartData = rsi_inc(chartData, 14)
        console.table(chartData)

    })


}

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
}

exports.LiquidationStream = async () => {
    const chatId = -4075927560;
    binance.futuresLiquidationStream(async (data) => {
        const changeSymbol = data.symbol.slice(0, -4);
        if (data.orderType == 'LIMIT' && data.eventType == 'forceOrder' && data.timeInForce == 'IOC') {
            const totalLiquidationAmount = Number(parseFloat(new Decimal(data.origAmount).times(data.avgPrice)).toFixed(8));
            if (totalLiquidationAmount > 1000) {
                const formatLiquidation = kFormatter(totalLiquidationAmount);
                if (data.side == 'BUY') {
                    if (totalLiquidationAmount > 10000) {
                        bot.sendMessage(chatId, '🟢 #' + changeSymbol + ' Liquidated Short: $' + formatLiquidation + ' 🔥 at $' + parseFloat(data.avgPrice))
                    } else {
                        bot.sendMessage(chatId, '🟢 #' + changeSymbol + ' Liquidated Short: $' + formatLiquidation + ' at $' + parseFloat(data.avgPrice))
                    }

                }
                if (data.side == 'SELL') {
                    if (totalLiquidationAmount > 10000) {
                        bot.sendMessage(chatId, '🔴 #' + changeSymbol + ' Liquidated Long: $' + formatLiquidation + ' 🔥 at $' + parseFloat(data.avgPrice));
                    } else {
                        bot.sendMessage(chatId, '🔴 #' + changeSymbol + ' Liquidated Long: $' + formatLiquidation + ' at $' + parseFloat(data.avgPrice));
                    }
                }
            }
        }
    });

}