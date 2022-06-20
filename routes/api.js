'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    let finalUnit = convertHandler.getReturnUnit(unit);
    let finalNum = convertHandler.convert(num, unit);
    let finalString = convertHandler.getString(num, unit, finalNum, finalUnit);

    if (unit && num) {
      res.json({
        initNum: num,
        initUnit: unit,
        returnNum: finalNum,
        returnUnit: finalUnit,
        string: finalString,
      });
    } else if (!unit && !num) {
      res.send('invalid number and unit');
    } else if (!unit) {
      res.send('invalid unit');
    } else if (!num) {
      res.send('invalid number');
    }
  });
};
