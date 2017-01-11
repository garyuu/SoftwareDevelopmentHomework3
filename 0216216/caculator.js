var current = 0;
var operand = [];
var operator = [];
var latestOp = false;
var lastOpnd = 0;
var lastOptr = '';
var currSys = 'dec';
const convertSys = {'hex':16, 'dec':10, 'oct':8, 'bin':2};

var precedence = function(a, b) { // return if a <= b
    if( '+-'.indexOf(a) === -1 ){
        if( '+-'.indexOf(b) === -1 ) return true; //a == b
        else return false; //a > b
    }
    else return true; // a <= b
}

var display = function(value) {
    let dis = value;
    if(value < 0){
        dis = 0xFFFF + value + 1;
    }
    let main = value.toString();
    if(currSys !== 'dec') main = dis.toString(convertSys[currSys]).toUpperCase()
    $('#main').text(main);
    $('.value#hex').text(dis.toString(16).toUpperCase());
    $('.value#dec').text(value);
    $('.value#oct').text(dis.toString(8));
    $('.value#bin').text(dis.toString(2));

    if(main.length > 18) $('#main').css('font-size','50%');
    else $('#main').css('font-size','100%');
    if(dis.toString(16) > 18) $('.value#hex').css('font-size','50%');
    else $('.value#hex').css('font-size','100%');
    if(value.toString().length > 18) $('.value#dec').css('font-size','50%');
    else $('.value#dec').css('font-size','100%');
    if(dis.toString(8).length > 18) $('.value#oct').css('font-size','50%');
    else $('.value#oct').css('font-size','100%');
    if(dis.toString(2).length > 18)  $('.value#bin').css('font-size','50%');
    else $('.value#bin').css('font-size','100%');
}

$( function() {
    $('.btn-mark').click(function() {
        let id = $(this).prop('id');
        console.log(id);
        if( '+-x%'.indexOf(id) >= 0 || id === 'Mod' ){
            //if prev is empty: add a 0 first
            //if prev is operator: cover it
            //if prev is number: store it
            if( operator.length > 0 && latestOp === true ){
                operator[operator.length-1] = id;
                latestOp = true;
            }
            else {
                latestOp = true;
                //check precedence
                while( operator.length > 0 && precedence(id, operator[operator.length-1]) ) {
                    //compute until id > top
                    let top = operator[operator.length-1];
                    let opnd = operand[operand.length-1];
                    operator.pop();
                    operand.pop();
                    if (top === '+') current = current + opnd;
                    if (top === '-') current = opnd - current;
                    if (top === 'x') current = current * opnd;
                    if (top === '%') current = parseInt(opnd / current);
                    if (top === 'Mod') current = opnd % current;
                    /*if(current > 32767 || current < -32768){
                        alert('The answer is overflow! Please use AC to clear and re-compute.');
                        return false;
                    }*/
                    //if(current > 0x7FFF) current = current - 0xFFFF - 1;
                    //if(current < -32768) current = current - 0xFFFF - 1;
                    current = current & 0xFFFF;
                    if(current > 0x7FFF) current = current - 0xFFFF - 1;
                    display(current);
                }
                operand.push(current);
                operator.push(id);
            }
        }
        if( id === 'CE' ){
            //only clear the latest key-in number (set as 0 at first, then can type other to cover)
            current = 0;
            display(current);
        }
        if( id === 'C' ){
            //clear stack and value
            current = 0;
            operand = [];
            operator = [];
            latestOp = false;
            lastOpnd = 0;
            lastOptr = '';
            display(current);
        }
        if( id === '←' ){
            if(latestOp === true || current.toString(convertSys[currSys]).length === 0) alert('Cant backtrack now!');
            else {
                let tmp = (current<0? 0xFFFF + current + 1 :current).toString(convertSys[currSys]);
                console.log(tmp);
                if(tmp.length === 1) current = 0;
                else current = parseInt(tmp.toString(convertSys[currSys]).substr(0,tmp.length-1), convertSys[currSys]);
                display(current);
            }
        }
        if(id === '='){
            latestOp = true;
            //start to compute
            //or repeat the latest oprate
            if ( operator.length === 0 ){
                console.log(lastOptr);
                console.log(lastOpnd);
                if (lastOptr === '+') current = current + lastOpnd;
                if (lastOptr === '-') current = current - lastOpnd;
                if (lastOptr === 'x') current = current * lastOpnd;
                if (lastOptr === '%') current = parseInt(current / lastOpnd);
                if (lastOptr === 'Mod') current = current % lastOpnd;
                /*if(current > 32767 || current < -32768){
                    alert('The answer is overflow! Please use AC to clean and re-compute.');
                    return false;
                }
                else*/
                current = current & 0xFFFF;
                if(current > 0x7FFF) current = current - 0xFFFF - 1;
                display(current);
            }
            var top, opnd;
            while( operator.length > 0 ) {
                top = operator[operator.length-1];
                opnd = operand[operand.length-1];
                operator.pop();
                operand.pop();

                lastOptr = top;
                lastOpnd = current;
                if (top === '+') current = current + opnd;
                if (top === '-') current = opnd - current;
                if (top === 'x') current = current * opnd;
                if (top === '%') current = parseInt(opnd / current);
                if (top === 'Mod') current = opnd % current;

                current = current & 0xFFFF;
                if(current > 0x7FFF) current = current - 0xFFFF - 1;
                display(current);
            }
        }
        if(id === '±'){
            //turn latest operand upside down
            current = -current;
            display(current);
        }
        return false;
    });
    $('.btn-normal').click(function() {
        let id = $(this).prop('id');
        console.log(id);

        if( '1234567890ABCDEF'.indexOf(id) >= 0 ){
            if( latestOp ) {
                current = 0;
                latestOp = false;
            }
            let tmp;
            if(current < 0) tmp = current * convertSys[currSys] - parseInt(id, convertSys[currSys]);
            else tmp = current * convertSys[currSys] + parseInt(id, convertSys[currSys]);
            console.log(tmp & 0xFFFF0000);
            if((currSys !== 'dec' && tmp & 0xFFFF0000) || (currSys === 'dec' && tmp > 32767 || tmp < -32768)){
                alert('You cannot type more!');
                return false;
            }

            current = tmp;
            if(current > 0x7FFF) current = current - 0xFFFF -1;
            display(current);
        }
        return false;
    });
    $('.convert-normal').click(function() {
        $(this).attr('disabled', true);
        $('#'+currSys).attr('disabled', false);
        currSys = $(this).attr('id');
        for(let i = 0; i < 16; i++){
            console.log(i.toString().toUpperCase(16));
            if( i < convertSys[currSys] ) $('.btn-normal#'+i.toString(16).toUpperCase()).attr('disabled', false);
            else $('.btn-normal#'+i.toString(16).toUpperCase()).attr('disabled', true);
        }
        display(current);
    });
});
