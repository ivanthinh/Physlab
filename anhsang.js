const canvas = document.getElementById("opticscanvas");
const ctx = canvas.getContext("2d");


const elements = {
    inputN1: document.getElementById("n1"),
    inputN2: document.getElementById("n2"),
    inputGocToi: document.getElementById("goctoi"),
    valN1: document.getElementById("val_n1"),
    valN2: document.getElementById("val_n2"),
    valGocToi: document.getElementById("val_goctoi"),
    txtKetQua: document.getElementById("ketqua")
};


const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;
const RAY_LENGTH = 90;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;


const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const COLORS = {
    ENV_1: "#ffff",
    ENV_2: "#b2ebf2",
    SEPARATOR: "#333",
    TEXT: "#000",
    INCIDENT_RAY: "#e74c3c",    
    REFRACTED_RAY: "#e74c3c",   
    TOTAL_REFLECTION: "#f39c12", 
    PARTIAL_REFLECTION: "rgba(231, 76, 60, 0.3)" 
};


let state = {
    n1: 1.0,
    n2: 1.5,
    theta1Deg: 30,
    sinTheta1: 0,
    cosTheta1: 0
};

function updateState() {
    state.n1 = parseFloat(elements.inputN1.value);
    state.n2 = parseFloat(elements.inputN2.value);
    state.theta1Deg = parseFloat(elements.inputGocToi.value);
    const theta1Rad = state.theta1Deg * DEG_TO_RAD;
    state.sinTheta1 = Math.sin(theta1Rad);
    state.cosTheta1 = Math.cos(theta1Rad);
}

function updateDisplay() {
    elements.valN1.textContent = state.n1.toFixed(2);
    elements.valN2.textContent = state.n2.toFixed(2);
    elements.valGocToi.textContent = state.theta1Deg + "°";
}

function drawEnvironment() {
    ctx.fillStyle = COLORS.ENV_1;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CENTER_Y);
    
    // Môi trường 2 (nửa dưới)
    ctx.fillStyle = COLORS.ENV_2;
    ctx.fillRect(0, CENTER_Y, CANVAS_WIDTH, CANVAS_HEIGHT - CENTER_Y);
    
    // Mặt phân cách
    ctx.strokeStyle = COLORS.SEPARATOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, CENTER_Y);
    ctx.lineTo(CANVAS_WIDTH, CENTER_Y);
    ctx.stroke();
    
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CENTER_X, 0);
    ctx.lineTo(CENTER_X, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = "14px Arial";
    ctx.fillText(`Môi trường 1 (n₁ = ${state.n1.toFixed(2)})`, 20, 30);
    ctx.fillText(`Môi trường 2 (n₂ = ${state.n2.toFixed(2)})`, 20, CANVAS_HEIGHT - 20);
}

function drawIncidentRay() {
    const xStart = CENTER_X - RAY_LENGTH * state.sinTheta1;
    const yStart = CENTER_Y - RAY_LENGTH * state.cosTheta1;
    
    ctx.strokeStyle = COLORS.INCIDENT_RAY;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(CENTER_X, CENTER_Y);
    ctx.stroke();
}

function drawRefraction() {
    const sinTheta2 = (state.n1 * state.sinTheta1) / state.n2;
    
    if (sinTheta2 > 1) {
        drawTotalInternalReflection();
    } else {
        drawNormalRefraction(sinTheta2);
    }
}

function drawTotalInternalReflection() {
    elements.txtKetQua.textContent = "Hiện tượng: Phản xạ toàn phần (Không có tia khúc xạ đi vào môi trường 2).";
    
    const xReflect = CENTER_X + RAY_LENGTH * state.sinTheta1;
    const yReflect = CENTER_Y - RAY_LENGTH * state.cosTheta1;
    
    ctx.strokeStyle = COLORS.TOTAL_REFLECTION;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.lineTo(xReflect, yReflect);
    ctx.stroke();
}

function drawNormalRefraction(sinTheta2) {
    const theta2Rad = Math.asin(sinTheta2);
    const theta2Deg = theta2Rad * RAD_TO_DEG;
    
    elements.txtKetQua.textContent = `Góc khúc xạ (θ₂): ${theta2Deg.toFixed(1)}°`;
    
    const xRefract = CENTER_X + RAY_LENGTH * Math.sin(theta2Rad);
    const yRefract = CENTER_Y + RAY_LENGTH * Math.cos(theta2Rad);
    
    ctx.strokeStyle = COLORS.REFRACTED_RAY;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.lineTo(xRefract, yRefract);
    ctx.stroke();
    
    const xPartialReflect = CENTER_X + RAY_LENGTH * state.sinTheta1;
    const yPartialReflect = CENTER_Y - RAY_LENGTH * state.cosTheta1;
    
    ctx.strokeStyle = COLORS.PARTIAL_REFLECTION;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.lineTo(xPartialReflect, yPartialReflect);
    ctx.stroke();
}
function renderSimulation() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    updateState();
    updateDisplay();
    drawEnvironment();
    drawIncidentRay();
    drawRefraction();
}

function debounceRender() {
    let rafId;
    return () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(renderSimulation);
    };
}

const optimizedRender = debounceRender();

elements.inputN1.addEventListener("input", optimizedRender);
elements.inputN2.addEventListener("input", optimizedRender);
elements.inputGocToi.addEventListener("input", optimizedRender);

renderSimulation();