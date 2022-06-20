const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input.', function () {
    assert.equal(convertHandler.getNum('5L'), 5);
  });
  test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(convertHandler.getNum('5.2km'), 5.2);
  });
  test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(convertHandler.getNum('1.2/2gal'), 0.6);
  });
  test('convertHandler should correctly return an error on a double-fraction.', function () {
    assert.isUndefined(convertHandler.getNum('3/2/3gal'));
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum('L'), 1);
  });
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convertHandler.getUnit('L'), 'L');
    assert.equal(convertHandler.getUnit('7km'), 'km');
    assert.equal(convertHandler.getUnit('80gal'), 'gal');
    assert.equal(convertHandler.getUnit('1/2kg'), 'kg');
  });
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.isUndefined(convertHandler.getUnit('atm'));
  });
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convertHandler.getUnit('gal'), 'gal');
    assert.equal(convertHandler.getUnit('L'), 'L');
    assert.equal(convertHandler.getUnit('mi'), 'mi');
    assert.equal(convertHandler.getUnit('kg'), 'kg');
    assert.equal(convertHandler.getUnit('km'), 'km');
    assert.equal(convertHandler.getUnit('lbs'), 'lbs');
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
  });
  test('convertHandler should correctly convert gal to L', function () {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    assert.equal(convertHandler.convert(0.5, 'gal'), 1.89271);
  });
  test('convertHandler should correctly convert L to gal.', function () {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    assert.equal(convertHandler.convert(0.5, 'L'), 0.13209);
  });
  test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    assert.equal(convertHandler.convert(0.5, 'mi'), 0.80467);
  });
  test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    assert.equal(convertHandler.convert(0.5, 'km'), 0.31069);
  });
  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    assert.equal(convertHandler.convert(0.5, 'lbs'), 0.2268);
  });
  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    assert.equal(convertHandler.convert(0.5, 'kg'), 1.10231);
  });
});
