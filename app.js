const canvas = document.getElementById("jsCanvas"); //canvas element grab
const ctx = canvas.getContext("2d"); // context: pixel control
const colors = document.getElementsByClassName("jsColor"); // querySelectorALl 하면 arrya로 반환
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

//give canvas's real pixel size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white"; // 초기 캔버스 bgcolor white 지정
ctx.fillRect(0, 0, canvas.width, canvas.height) // 초기 캔버스 bgcolor white 지정
ctx.fillStyle = INITIAL_COLOR; // fill color
ctx.strokeStyle = INITIAL_COLOR; //context inside stroke color
ctx.lineWidth = 2.5; // line width

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}
function startPainting() {
    if(filling === false) {
        painting = true;
    }
}

// path = line
function onMouseMove(e) { // 항상 움직이고 있음. painting === false;
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) { // 그리지 않고 있을 때. painting === false; !painting === !false === true
        ctx.beginPath(); // path start. 경로 생성
        ctx.moveTo(x, y); // 선 시작 좌표
        // move to x y coordinate. 마우스 움직이면서 계속 path 만듦
        //starting point 는 현재 마우스 위치한 곳
        //클릭하지 않아도 path는 마우스가 움직이면 계속 만들어짐
    } else { // mouseDown 상태. painting === true;
        ctx.lineTo(x, y); // sub-path에서 마지막 지점을 특정 좌표로 연결. 선 끝 좌표
        ctx.stroke(); // sub-path를 stroke sejrrnsmtyle로 획을 그음. 선 그리기
        //lineTo와 stroke는 마우스를 움직이는 내내 발생
        //ctx.closePath(); path닫음. 시작점이 beginPath/moveTo 지정한 점 1개
    }
}

function handleColorPick(e) {
    const color = e.target.style.backgroundColor; // target의 bgcolor를 받음
    ctx.strokeStyle = color; // 선택한 color를 strokeStyle로 변경
    ctx.fillStyle = color; // 선택한 color를 fillStyle로 변경
}

function handleRangeChange(e) {
    const brushSize = e.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const img = canvas.toDataURL("img");
    const link = document.createElement("a");
    link.href = img;
    link.download = "painting";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
//color btn을 array로 만들고 각각 addEventListener 실행
Array.from(colors).forEach(color => color.addEventListener("click", handleColorPick));

if(range) { // range가 true라면 실행. getElement 됐는지 이중체크
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}