function criarTimer(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}
const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let segundos = 0;
let timer;

function iniciarRelogio() {
    timer = setInterval(() => {
        segundos++;
        relogio.innerHTML = criarTimer(segundos);
        var context = new AudioContext();
        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = 550;
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.value = 0.1; // define o volume em 50%
        oscillator.start();
        setTimeout(function () {
            oscillator.stop();
        }, 150);
    }, 1000)
}

iniciar.addEventListener('click', function (e) {
    clearInterval(timer)
    iniciarRelogio()
    relogio.style.color = 'black'
});

pausar.addEventListener('click', function (e) {
    clearInterval(timer)
    relogio.style.color = 'red'
});

zerar.addEventListener('click', function (e) {
    clearInterval(timer);
    relogio.innerHTML = '00:00:00';
    segundos = 0
});