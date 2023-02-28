const startbtn = document.getElementById("start");
const stopbtn = document.getElementById("stop");
const rstbtn = document.getElementById("reset");
const timer = document.getElementById("countdown");

let startTime;
let timeInterval;
let TimeLeft;

function startCountDown() {
    const text = timer.textContent;
    let hr,min,sec;
    if(text == `00:00:00`){
        hr = document.getElementById("hours").value;
        min = document.getElementById("minutes").value;
        sec = document.getElementById("seconds").value;
    }else{
        const val = text.split(":");
        hr = parseInt(val[0]);
        min = parseInt(val[1]);
        sec = parseInt(val[2]);
    }

    if(hr<0||min<0||sec<0){
        alert("Please provide valid input");
        timer.textContent = `00:00:00`;
    }else if(min>59||sec>59){
        alert("Minutes and Seconds have to be in the range of 0-59 only");
        timer.textContent = `00:00:00`;
    }else{
        const milli = (hr*60*60*1000)+(min*60*1000)+(sec*1000);

        startTime = Date.now();
        TimeLeft = milli;

        timeInterval = setInterval(() => {
            const elapTime = Date.now() - startTime;
            TimeLeft = milli - elapTime;

            if(TimeLeft<=0){
                clearInterval(timeInterval);
                TimeLeft = 0;
                var sound = document.getElementById("sound");
                sound.play();

                
                while (alert("TIME'S UP!!")) {}

                sound.pause();
                sound.currentTime = 0;

            }

            const remsecs = Math.floor(TimeLeft/1000)%60;
            const remmins = Math.floor(TimeLeft/1000/60)%60;
            const remhrs = Math.floor(TimeLeft/1000/60/60);

            const disphrs = remhrs.toString().padStart(2, "0");
            const dispmin = remmins.toString().padStart(2, "0");
            const dispsec = remsecs.toString().padStart(2, "0");

            timer.textContent = `${disphrs}:${dispmin}:${dispsec}`;
        }, 10);

    }
}

function stopCountDown() {
    clearInterval(timeInterval);
}

// Reset function works only when timer is stopped
function resetCountDown() {
    const hr = document.getElementById("hours").value;
    const min = document.getElementById("minutes").value;
    const sec = document.getElementById("seconds").value;
    const disphrs = hr.toString().padStart(2, "0");
    const dispmin = min.toString().padStart(2, "0");
    const dispsec = sec.toString().padStart(2, "0");

    timer.textContent = `${disphrs}:${dispmin}:${dispsec}`;
}

startbtn.addEventListener("click", startCountDown);
stopbtn.addEventListener("click", stopCountDown);
rstbtn.addEventListener("click", resetCountDown);

