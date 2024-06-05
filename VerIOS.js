const {getColor,tap,appState,openURL,appInfo,touchDown,touchUp,touchMove,keyDown,keyUp,inputText,exec,usleep,toast,appRun,appKill,rootDir} = at

const axios = require('axios');
const math = require('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.4.1/math.js');
const bdlApp = 'com.apple.AppStore';



const log = 1;
let arrCards = [329480];



function waitXYC(x,y,iColor,iTime){
    let timeRemain = 0;
    let [result] =[];
    while (1){
        [result] = getColor(x,y);
        if (log==1) console.log(x +":" +y +" " + result[0]);
        if (result[0]==iColor) {
            usleep(1000000)
            return 1;//Ok
        }
        usleep(1000000);
        timeRemain += 1;
        if (timeRemain>=iTime) {
            return 0;//Lag
        }
    }
}

function ranInt(a,b){
    return math.floor(math.random(a,b));
}

function _pressHome(){
    keyDown(KEY_TYPE.HOME_BUTTON);
    usleep(80000);
    keyUp(KEY_TYPE.HOME_BUTTON);    
    usleep(200000)
}
function _swpieUp(){
    touchDown(0,600,900);
    usleep(80000)
    for (let y =900; y>600; y-=30) {
        usleep(8000);
        touchMove(0,600,y)
    }
    touchUp(0,600,600);
    usleep(300000)
}

function _closeApp(){
	let strState = '';
	
    _pressHome();
    _pressHome();
    usleep(500000);
	while (1){
		strState = appState('com.apple.AppStore')
        if (strState =='NOT RUNNING') break;
		_swpieUp();
		usleep(1000000);
        
		
	}
    _pressHome();
}

function tapR(x,y){
    touchDown(1,x,y);
    usleep(ranInt(80000,120000));
    touchUp(1,x,y);
    usleep(50000)
}




function _openApp(){
    let iCheck = null;
    appRun(bdlApp);
    iCheck = waitXYC(673,169,31487,30)
    usleep(1000000)
    tapR(673,169);
    iCheck = waitXYC(321,216,15921911,30)
    tapR(227,312);
    iCheck = waitXYC(640,1065,3458905,30)
    tapR(213,570)
    iCheck = waitXYC(88,313,4408132,30)
}

function _done() {
    usleep(1000000);
    tapR(82,133);
    usleep(ranInt(2000000,2200000));
    iCheck = waitXYC(285,558,0,30)
    if (iCheck == 0) return 0;
    tapR(ranInt(150,250),560);
    usleep(ranInt(2000000,2200000))
    iCheck = waitXYC(108,326,329480,30)//cards
    if (iCheck == 0) return 0;
    usleep(ranInt(2000000,2200000))
    tapR(ranInt(100,200),306);
    usleep(ranInt(1000000,1500000))
    iCheck = waitXYC(212,242,461066,30);
    if (iCheck == 0) return 0;
    usleep(ranInt(1000000,1500000))
    tapR(ranInt(670,680),140);
    usleep(2000000);
}

let vt = 0;
let iCheck = null;
while(1) {
    if (vt==0) {
        iCheck = _openApp();
        if (iCheck==0) _closeApp();
        vt++;
    }
    else {
        iCheck = _done();
        if (iCheck ==0) {
            vt =0;
            _closeApp();
        }
    }
    usleep(1000000)
}