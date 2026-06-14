        const ball=document.getElementById("ball");
        const thongtin=document.getElementById("thongtin");
        const scale=50;
        const groundY=480;
        let lasttime=null;
        let h,v,g;
        let t=0;
        let running=false;
        function vachmoc(){
            const h0=parseFloat(document.getElementById("h0").value);
            const ybandau=groundY-h0*scale;
            const linedocao=document.getElementById("linedocao");
            const docao=document.getElementById("docao");
            linedocao.setAttribute("y1",ybandau);
            linedocao.setAttribute("y2",ybandau);
            docao.setAttribute("y",ybandau-10);
            docao.textContent=h0+" m";
        }
        function start(){
            h=parseFloat(document.getElementById("h0").value);
            g=parseFloat(document.getElementById("g").value);
            v=parseFloat(document.getElementById("v0").value);
            t=0;
            lasttime=null;
            running=true;
            vachmoc();
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
            vachmoc();
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
        if(h<0) h=0;
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
        thongtin.innerHTML='Thời gian:'+t.toFixed(2)+" s | "+ "Độ cao:"+h.toFixed(2)+" m | "+"Vận tốc:"+v.toFixed(2)+"m/s";
        if (h>0){
            requestAnimationFrame(update);
        }
        else{
            running=false;
        }
    }
    vachmoc();
    
