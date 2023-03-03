const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');

let horas = 0
let minutos = 0
let segundos = 0
let setTimer;
let timer = '00:00:00'
let start = false

iniciar.addEventListener('click', function (e) {
    if (!start) {
        start = true
        console.log('start Timer')
        iniciarTimer()
        relogio.style.color = 'black'
    }
});

pausar.addEventListener('click', function (e) {
    if (start) {
        start = false
        console.log('pause Timer')
        clearInterval(setTimer)
        relogio.style.color = 'red'
    }
});

zerar.addEventListener('click', function (e) {
    if (relogio.innerHTML !== '00:00:00') {
        clearInterval(setTimer)
        relogio.innerHTML = '00:00:00'
        horas = 0, minutos = 0, segundos = 0
        console.log('clean Timer')
        start = false
    }
});

function iniciarTimer() {

    setTimer = setInterval(() => {
        segundos++
        if (segundos == 59) {
            segundos = 0;
            var context = new AudioContext();
            var oscillator = context.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = 600;
            oscillator.connect(context.destination);
            oscillator.start();
            setTimeout(function () {
                oscillator.stop();
            }, 50);
            minutos++
        }

        if (minutos == 59) {
            minutos = 0;
            horas++
        }

        let h, m, s;
        if (horas < 24) { } else { horas = 0, minutos = 0, segundos = 0 }

        horas < 10 ? h = `0${horas}` : h = horas
        minutos < 10 ? m = `0${minutos}` : m = minutos
        segundos < 10 ? s = `0${segundos}` : s = segundos

        timer = `${h}:${m}:${s}`

        relogio.innerHTML = timer

    }, 1000)

}



