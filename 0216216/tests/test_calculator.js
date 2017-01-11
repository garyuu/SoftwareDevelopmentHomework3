module('Basic number input and display', {
    setup: function() {
        $(.btn-mark#C).trigger('click');
        $(.convert-normal#oct).trigger('click');
    }
});

QUnit.test("Decimal input", function(assert) {
    $(.btn-normal#1).trigger('click');
    $(.btn-normal#5).trigger('click');
    $(.btn-normal#8).trigger('click');
    assert.deepEqual($('.value#hex').text, '9E', 'HEX = 9E');
    assert.deepEqual($('.value#dec').text, '158', 'DEC = 158');
    assert.deepEqual($('.value#oct').text, '236', 'OCT = 236');
    assert.deepEqual($('.value#bin').text, '10011110', 'BIN = 10011110');
});
