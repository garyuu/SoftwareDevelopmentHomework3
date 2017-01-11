//================================
// Basic number input and display
//================================
QUnit.module('Basic number input and display', {
    before: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    },
    after: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    }
});
QUnit.test("Decimal input", function(assert) {
    // Input 158
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#5').trigger('click');
    $('.btn-normal#8').trigger('click');
    assert.deepEqual($('.value#hex').text(), '9E', 'HEX = 9E');
    assert.deepEqual($('.value#dec').text(), '158', 'DEC = 158');
    assert.deepEqual($('.value#oct').text(), '236', 'OCT = 236');
    assert.deepEqual($('.value#bin').text(), '10011110', 'BIN = 10011110');
});
QUnit.test("Hex input", function(assert) {
    // Convert to hex
    $('.convert-normal#hex').trigger('click');
    assert.deepEqual($('#main').text(), '9E', 'Main = 9E');
    // Input E2(Total 9EE2)
    $('.btn-normal#E').trigger('click');
    $('.btn-normal#2').trigger('click');
    assert.deepEqual($('.value#hex').text(), '9EE2', 'HEX = 9EE2');
    assert.deepEqual($('.value#dec').text(), '-24862', 'DEC = -24862');
    assert.deepEqual($('.value#oct').text(), '117342', 'OCT = 117342');
    assert.deepEqual($('.value#bin').text(), '1001111011100010', 'BIN = 1001111011100010');
});
QUnit.test("Oct input", function(assert) {
    // Convert to oct
    $('.convert-normal#oct').trigger('click');
    assert.deepEqual($('#main').text(), '117342', 'Main = 117342');
    // Clear
    $('.btn-mark#C').trigger('click');
    assert.deepEqual($('#main').text(), '0', 'Main = 0');
    // Input 73
    $('.btn-normal#7').trigger('click');
    $('.btn-normal#3').trigger('click');
    assert.deepEqual($('.value#hex').text(), '3B', 'HEX = 3B');
    assert.deepEqual($('.value#dec').text(), '59', 'DEC = 59');
    assert.deepEqual($('.value#oct').text(), '73', 'OCT = 73');
    assert.deepEqual($('.value#bin').text(), '111011', 'BIN = 111011');
});
QUnit.test("Bin input", function(assert) {
    // Convert to bin
    $('.convert-normal#bin').trigger('click');
    assert.deepEqual($('#main').text(), '111011', 'Main = 111011');
    // Clear
    $('.btn-mark#C').trigger('click');
    assert.deepEqual($('#main').text(), '0', 'Main = 0');
    // Input 100011
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#1').trigger('click');
    assert.deepEqual($('.value#hex').text(), '23', 'HEX = 23');
    assert.deepEqual($('.value#dec').text(), '35', 'DEC = 35');
    assert.deepEqual($('.value#oct').text(), '43', 'OCT = 43');
    assert.deepEqual($('.value#bin').text(), '100011', 'BIN = 100011');
});
//=================
// Basic calculate
//=================
QUnit.module('Basic calculate', {
    before: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    },
    after: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    }
});
QUnit.test("Dec plus Hex", function(assert) {
    // Input 45+DB=
    $('.btn-normal#4').trigger('click');
    $('.btn-normal#5').trigger('click');
    $('.btn-mark#\\+').trigger('click');
    $('.convert-normal#hex').trigger('click');
    $('.btn-normal#D').trigger('click');
    $('.btn-normal#B').trigger('click');
    $('.btn-mark#\\=').trigger('click');
    assert.deepEqual($('#main').text(), '108', 'Main = 108');
    assert.deepEqual($('.value#hex').text(), '108', 'HEX = 108');
    assert.deepEqual($('.value#dec').text(), '264', 'DEC = 264');
    assert.deepEqual($('.value#oct').text(), '410', 'OCT = 410');
    assert.deepEqual($('.value#bin').text(), '100001000', 'BIN = 100001000');
});
QUnit.test("Oct multiple bin", function(assert) {
    // Convert to oct
    $('.convert-normal#oct').trigger('click');
    assert.deepEqual($('#main').text(), '410', 'Main = 410');
    // Clear
    $('.btn-mark#C').trigger('click');
    assert.deepEqual($('#main').text(), '0', 'Main = 0');
    // Input 42x10011=
    $('.btn-normal#4').trigger('click');
    $('.btn-normal#2').trigger('click');
    $('.btn-mark#x').trigger('click');
    $('.convert-normal#bin').trigger('click');
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#1').trigger('click');
    $('.btn-mark#\\=').trigger('click');
    assert.deepEqual($('#main').text(), '1010000110', 'Main = 1010000110');
    assert.deepEqual($('.value#hex').text(), '286', 'HEX = 286');
    assert.deepEqual($('.value#dec').text(), '646', 'DEC = 646');
    assert.deepEqual($('.value#oct').text(), '1206', 'OCT = 1206');
    assert.deepEqual($('.value#bin').text(), '1010000110', 'BIN = 1010000110');
});
//=====================
// Complex calculation
//=====================
QUnit.module('Basic calculate', {
    before: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    },
    after: function() {
        $('.btn-mark#C').trigger('click');
        $('.convert-normal#dec').trigger('click');
    }
});
QUnit.test("Long expression", function(assert) {
    // Input 56
    $('.btn-normal#5').trigger('click');
    $('.btn-normal#6').trigger('click');
    // Convert to oct
    $('.convert-normal#oct').trigger('click');
    // Input -
    $('.btn-mark#\\-').trigger('click');
    // Input -26
    $('.btn-normal#2').trigger('click');
    $('.btn-normal#6').trigger('click');
    $('.btn-mark#±').trigger('click');
    // Convert to hex
    $('.convert-normal#hex').trigger('click');
    // Input *
    $('.btn-mark#\\x').trigger('click');
    // Input F87
    $('.btn-normal#F').trigger('click');
    $('.btn-normal#8').trigger('click');
    $('.btn-normal#7').trigger('click');
    // Clear current
    $('.btn-mark#CE').trigger('click');
    // Input F
    $('.btn-normal#F').trigger('click');
    // Input +
    $('.btn-mark#\\+').trigger('click');
    // Convert to bin
    $('.convert-normal#bin').trigger('click');
    // Input %
    $('.btn-mark#\\%').trigger('click');
    // Input 101
    $('.btn-normal#1').trigger('click');
    $('.btn-normal#0').trigger('click');
    $('.btn-normal#1').trigger('click');
    // Input =
    $('.btn-mark#\\=').trigger('click');
    assert.deepEqual($('#main').text(), '1001101', 'Main = 1001101');
    assert.deepEqual($('.value#hex').text(), '4D', 'HEX = 4D');
    assert.deepEqual($('.value#dec').text(), '77', 'DEC = 77');
    assert.deepEqual($('.value#oct').text(), '115', 'OCT = 115');
    assert.deepEqual($('.value#bin').text(), '1001101', 'BIN = 1001101');
});