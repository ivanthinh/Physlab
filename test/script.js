  display flex;
  flex-direction column;
  align-items center;
  gap 20px;
  margin-top 50px;
}

.frame {
  width 200px;
  height 400px;
  border 3px solid #333;
  position relative;
  overflow hidden;
}

#ball {
  width 40px;
  height 40px;
  background red;
  border-radius 50%;
  position absolute;
  top 0;
  left 50%;
  transform translateX(-50%);
}
Bảo
const ball = document.getElementById(ball);
const frame = document.querySelector(.frame);

let positionY = 0;
let velocity = 0;
let gravity = 0.6;
let animation;

function drop() {
  cancelAnimationFrame(animation);
  positionY = 0;
  velocity = 0;
  ball.style.top = 0px;
  fall();
}

function fall() {
  velocity += gravity;       tăng tốc do trọng lực
  positionY += velocity;     cập nhật vị trí

  const ground =
    frame.clientHeight - ball.clientHeight;

  if (positionY = ground) {
    positionY = ground;      tiếp đất
    ball.style.top = positionY + px;
    return;
  }

  ball.style.top = positionY + px;
  animation = requestAnimationFrame(fall);
}