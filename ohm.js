let I=0
      let lasttime=null;
      let muitenX=0;
      let muitenV=0;
      let running=false;
      const muiten=document.getElementById("muiten");
    function tinhtoan(){
      const U=parseFloat(document.getElementById("U").value);
      const R=parseFloat(document.getElementById("R").value);
      if(R<=0){
        alert("Điện trở phải >0");
        return;
      }
      const I=U/R;
      document.getElementById("info").textContent="Cường độ dòng điện I="+I.toFixed(2)+"A";
      muitenX=0;
      muitenV=I*40;
      running=true;
      lasttime=null;
      requestAnimationFrame(chuyendong);
    }
    function chuyendong(time){
      if(!running) return;
  
      if(!lasttime) lasttime=time;
      const dt=(time-lasttime)/1000;
      lasttime=time;
      muitenX+=muitenV*dt;
      muiten.setAttribute("transform",`translate(${muitenX},-30)`);
      if(muitenX<50){
      requestAnimationFrame(chuyendong);
    }
    else{muitenX=0;
      muiten.setAttribute("transform",`translate(${muitenX},-30)`);
      requestAnimationFrame(chuyendong);
    }
  }