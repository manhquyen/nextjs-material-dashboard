import numbro from 'numbro'


export const getFirstThreeNonZeroDecimals = (value, decimals) => {
    return value.toFixed(decimals).match(/^-?\d*\.?0*\d{0,2}/)[0]
  }

export const numeralFormat = (amount, decimals = 18, isFull = false, isInteger = true) => {
    if (amount === 0) {
      if (isInteger) {
        return '0'
      }
      return '0.00'
    }
  
    if (!amount) return '-'
  
    if (isFull) return numbro(amount).format(`0,0`);
  
    let stringFormat = `0,0[.][${'0'.repeat(2)}]`;
  
    if ( amount >= 1) {
      return numbro(amount).format(stringFormat);
    }
    if (amount < 0.00001) {
      return getFirstThreeNonZeroDecimals(amount, decimals)
    } if (amount < 0.0001) {
      stringFormat = `0,0[.][${'0'.repeat(7)}]`;
      return numbro(amount).format(stringFormat);
    } if (amount < 0.001) {
      stringFormat = `0,0[.][${'0'.repeat(6)}]`;
      return numbro(amount).format(stringFormat);
    } if (amount < 0.01) {
      stringFormat = `0,0[.][${'0'.repeat(5)}]`;
      return numbro(amount).format(stringFormat);
    } if (amount < 0.1) {
      stringFormat = `0,0[.][${'0'.repeat(4)}]`;
      return numbro(amount).format(stringFormat);
    }
    stringFormat = `0,0[.][${'0'.repeat(3)}]`;
    return numbro(amount).format(stringFormat);
  
  }