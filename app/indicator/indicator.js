
const Decimal = require('decimal.js');


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

module.exports = {
    sma_indicator_ct,
    rsi_indicator_ct
}