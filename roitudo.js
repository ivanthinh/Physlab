        const ball=document.getElementById("ball");
        const thongtin=document.getElementById("thongtin");
        const scale=50;
        const groundY=480;
        let lasttime=null;
        let h,v,g;
        let t=0;
        let running=false;
        function start(){
            h=parseFloat(document.getElementById("h0").value);
            g=parseFloat(document.getElementById("g").value);
            v=parseFloat(document.getElementById("v0").value);
            t=0;
            lasttime=null;
            running=true;
            requestAnimationFrame(update);
        }
        function stop(){
            running=false;
        }
        function resume(){
            if(!running && h>0){
                running=true;
                lasttime=null;
                requestAnimationFrame(update);
            }
        }
        function reset(){
            running=false;
            t=0;    
            h=parseFloat(document.getElementById("h0").value);
            v=parseFloat(document.getElementById("v0").value);
            const y=groundY-h*scale;
            ball.setAttribute("cy",y);
            thongtin.innerHTML="";
            requestAnimationFrame(update);
        }
        function update(time){
            if(!running) return;
            if(!lasttime) lasttime=time;
            const deltat=(time-lasttime)/1000;
            lasttime=time;
        /*Công thức vật lý*/ 
        v+=g*deltat;
        h-=v*deltat;
        t+=deltat;
        /*Thay đổi vị trí ball*/
        const scene=document.getElementById("scene");
        const chatdiem=groundY-h*scale;
        ball.setAttribute("cy",chatdiem);
        const viewheight=600;
        let cameraY=chatdiem-viewheight/2;
        scene.setAttribute(
          "viewBox",`0 ${cameraY} 400 ${viewheight}`
        );
        const y=groundY-h*scale;
        ball.setAttribute("cy",y);
        thongtin.innerHTML='Thời gian:'+t.toFixed(2)+" s | "+ "Độ cao:"+Math.max(h,0)+" m | "+"Vận tốc:"+v.toFixed(2)+"m/s";
        if (h>0){
            requestAnimationFrame(update);
        }
        else{
            running=false;
        }
    }