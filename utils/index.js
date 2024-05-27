export function divideWithPrecision(dividend, divisor = 100) {
  // 执行除法运算
  var result = dividend / divisor

  // 将结果保留两位小数
  result = result.toFixed(2)

  // 将结果转换为字符串
  var resultString = result.toString()

  // 检查小数部分的长度，如果小于两位则补零
  var decimalIndex = resultString.indexOf('.')
  if (decimalIndex !== -1) {
    var decimalPart = resultString.substring(decimalIndex + 1)
    if (decimalPart.length < 2) {
      resultString += '0'
    }
  } else {
    // 如果结果是整数，则补上小数点和两个零
    resultString += '.00'
  }

  return resultString
}
