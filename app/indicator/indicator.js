
const Decimal = require('decimal.js');
const tulind = require('tulind');
const { promisify } = require('util');

const sma_async = promisify(tulind.indicators.sma.indicator);
const ema_async = promisify(tulind.indicators.ema.indicator);
const macd_async = promisify(tulind.indicators.macd.indicator);
const rsi_async = promisify(tulind.indicators.rsi.indicator);

const ema_indicator_ct_lib = async (data, period) => {
    const closePrices = data.map((d) => d.close);
    const results = await ema_async([closePrices], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    return d3;
};

const sma_indicator_ct_lib = async (data, period) => {
    const closePrices = data.map((d) => d.close);
    const results = await sma_async([closePrices], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    return d3;
};

const sma_indicator_ct = (data, period) => {
    const SMA_period = period;
    const avgPrices = data.map((day) =>
        Number(parseFloat(new Decimal(day.open).plus(day.close).plus(day.low).plus(day.high).dividedBy(4)).toFixed(8))
    );
    // const avgPrices = data.map((day) => (day.open + day.close + day.low + day.high) / 4);
    const SMA = []
    for (let i = 0; i < avgPrices.length; i++) {
        if (i < SMA_period) {
            SMA.push(null) // Chưa đủ dữ liệu để tính
        } else {
            let sum = 0
            for (let j = i - SMA_period + 1; j <= i; j++) {
                sum += avgPrices[j]
            }
            SMA.push(sum / SMA_period)
        }
    }
    return SMA;
}

const rsi_indicator_ct = (data, period) => {
    const prices = data, RSI_period = period;

    // Khởi tạo mảng lưu các mức chênh lệch giá
    const changes = []

    // Tính chênh lệch giá giữa các ngày
    for (let i = 1; i < prices.length; i++) {
        changes.push(prices[i].close - prices[i - 1].close)
    }

    // Khởi tạo biến lưu tổng mức tăng và giảm
    let ups = 0, downs = 0

    // Tính tổng giá trị tăng và giảm
    for (let i = 0; i < changes.length; i++) {
        if (changes[i] > 0) {
            ups += changes[i]
        } else {
            downs -= changes[i]
        }
    }

    // Tính RS đầu tiên 
    let rs = ups / downs
    let rsi = 100 - (100 / (1 + rs))

    // Khởi tạo mảng lưu các giá trị RSI
    const RSI_values = [rsi]

    // Tính RSI cho các ngày còn lại
    for (let i = 1; i < prices.length - RSI_period; i++) {

        // Xóa phần tử đầu mảng changes
        changes.shift()

        // Thêm phần tử mới vào cuối 
        changes.push(prices[i + RSI_period].close - prices[i + RSI_period - 1].close)

        // Tính lại ups, downs
        ups = 0; downs = 0
        for (let j = 0; j < changes.length; j++) {
            if (changes[j] > 0) {
                ups += changes[j]
            } else {
                downs -= changes[j]
            }
        }

        // Tính lại RS, RSI
        rs = ups / downs
        rsi = 100 - (100 / (1 + rs))

        // Thêm vào mảng RSI
        RSI_values.push(rsi)
    }

    return RSI_values;

}

const ema_indicator_ct = (data, period) => {
    const EMA_period = period;
    const smoothing = 2 / (EMA_period + 1)
    const avgPrices = data.map((day) =>
        Number(parseFloat(new Decimal(day.open).plus(day.close).plus(day.low).plus(day.high).dividedBy(4)).toFixed(8))
    );

    // Tính EMA
    const EMA = []
    let prevEMA = null

    for (let i = 0; i < avgPrices.length; i++) {

        if (i < EMA_period) {
            EMA.push(null)
        } else {
            const currEMA = (avgPrices[i] - prevEMA) * smoothing + prevEMA
            EMA.push(currEMA)
            prevEMA = currEMA
        }
    }

    return EMA;
}
const macd_indicator_ct = (data, shortPeriod, longPeriod, signalPeriod) => {

    // const EMA_short = [];
    // const EMA_long = [];
    // const MACD_Line = [];

    // let emaShort = shortPeriod;
    // let emaLong = longPeriod;
    // if (data.length < longPeriod) {
    //     return null; // Không đủ dữ liệu để tính MACD Line
    // }
    // const multiplier = 2 / (shortPeriod + 1);

    // for (let i = 0; i < data.length; i++) {
    //     const closePrice = Number(parseFloat(new Decimal(data[i].close).toFixed(8)));

    //     // Tính đường EMA ngắn hạn (EMA12)
    //     if (i < shortPeriod) {
    //         emaShort += closePrice;
    //         EMA_short.push(null); // Chưa đủ dữ liệu để tính EMA
    //     } else {
    //         if (i === shortPeriod) {
    //             emaShort /= shortPeriod;
    //         } else {
    //             emaShort = (closePrice - emaShort) * multiplier + emaShort;
    //         }
    //         EMA_short.push(emaShort);
    //     }

    //     // Tính đường EMA dài hạn (EMA26)
    //     if (i < longPeriod) {
    //         emaLong += closePrice;
    //         EMA_long.push(null); // Chưa đủ dữ liệu để tính EMA
    //     } else {
    //         if (i === longPeriod) {
    //             emaLong /= longPeriod;
    //         } else {
    //             emaLong = (closePrice - emaLong) * multiplier + emaLong;
    //         }
    //         EMA_long.push(emaLong);
    //     }

    //     // Tính đường MACD Line
    //     if (EMA_short[i] !== null && EMA_long[i] !== null) {
    //         MACD_Line.push(EMA_short[i] - EMA_long[i]);
    //     } else {
    //         MACD_Line.push(null); // Chưa đủ dữ liệu để tính MACD Line
    //     }
    // }

    // // console.log(MACD_Line);
    // return MACD_Line;

    let closePrices = data.map((day) => day.close);


    // Tính EMA ngắn hạn
    const shortEma = []
    let prevShortEma = null
    for (let i = 0; i < closePrices.length; i++) {
        if (i < shortPeriod) {
            shortEma.push(null)
        } else {
            const currentEma = (closePrices[i] - prevShortEma) * (2 / (shortPeriod + 1)) + prevShortEma
            shortEma.push(currentEma)
            prevShortEma = currentEma
        }
    }
    // Tính EMA dài hạn 
    const longEma = []
    let prevLongEma = null
    for (let i = 0; i < closePrices.length; i++) {
        if (i < longPeriod) {
            longEma.push(null)
        } else {
            const currentEma = (closePrices[i] - prevLongEma) * (2 / (longPeriod + 1)) + prevLongEma
            longEma.push(currentEma)
            prevLongEma = currentEma
        }
    }

    // Tính đường MACD 
    const macdLine = []
    for (let i = 0; i < longEma.length; i++) {
        macdLine.push(shortEma[i] - longEma[i])
    }

    // Tính đường Signal 
    const signalLine = []
    let prevSignal = null
    for (let i = 0; i < macdLine.length; i++) {
        if (i < signalPeriod) {
            signalLine.push(null)
        } else {
            const currentSignal = (macdLine[i] - prevSignal) * (2 / (signalPeriod + 1)) + prevSignal
            signalLine.push(currentSignal)
            prevSignal = currentSignal
        }
    }

    return { signalLine, shortEma, longEma };
}

const rsi_indicator_ct_lib = async (data, period) => {
    const closePrices = data.map((d) => d.close);
    const results = await rsi_async([closePrices], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    return d3;
}

const macd_indicator_ct_lib = async (data, shortPeriod, longPeriod, signalPeriod) => {

    const closePrices = data.map((day) => day.close);
    const result = await macd_async([closePrices], [shortPeriod, longPeriod, signalPeriod]);
    const diff = data.length - result[0].length;
    const empty = [...new Array(diff)].map((d) => '');

    const macd_fast = [...empty, ...result[0]];
    const macd_slow = [...empty, ...result[1]];
    const macd_histogram = [...empty, ...result[2]];
    //console.log('sadasdas',macd_histogram)
    return { macd_fast, macd_slow, macd_histogram };
}

module.exports = {
    sma_indicator_ct,
    rsi_indicator_ct,
    rsi_indicator_ct_lib,
    ema_indicator_ct,
    macd_indicator_ct,
    macd_indicator_ct_lib
}
