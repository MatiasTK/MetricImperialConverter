function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    let withoutUnit = input.replace(/[^\d.\/]/g, '');

    if ((withoutUnit.match(/\//g) || []).length > 1) {
      result = undefined;
    } else if (withoutUnit.length === 0) {
      result = 1;
    } else {
      result = eval(withoutUnit);
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    let withoutNumber = input.replace(/[\d\/.]/g, '');

    if (/^gal$|^L$|^mi$|^km$|^kg$|^lbs$|^l$|^GAL$|^MI$|^KM$|^KG$|^LBS$/.test(withoutNumber)) {
      result = withoutNumber;
      if (result === 'l') {
        result = result.toUpperCase();
      } else if (result !== 'L') {
        result = result.toLowerCase();
      }
    } else {
      result = undefined;
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L' || 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }

    if (result) {
      result = parseFloat(result).toFixed(5);
      result = Number(result);
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
