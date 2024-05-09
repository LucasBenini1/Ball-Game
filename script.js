var startTime;
var IntervalGlobal;
var bola;
var speed;
var restartBtn;
var seconds;
var recordeAnterior;
var placar;
var divRec;
var topR = document.getElementById("topR");
var i = 0;
var stopTime;
var ConclusionTime;
var totalFuradas = 0;

//--------------Criacao das bolas----------------------------------------

function criarBola() {
    bola = document.createElement("div") 
    bola.setAttribute("class", "bola") 

    var x = Math.floor(Math.random() * 1300) 
    var y = Math.floor(Math.random() * 600)
    var w = Math.floor(Math.random() * (100 - 30 + 1)+ 30) 


    bola.setAttribute("style", "left:"+x+"px; top:"+y+"px; margin-top: 48px; width: "+w+"px; height:"+w+"px")
  
    bola.setAttribute("onclick", "furarBola(this)")

    document.body.appendChild(bola)

}

//--------------Furar Bolas----------------------------------------
function furarBola(objeto){
    document.body.removeChild(objeto) 
    totalFuradas++
} 

//--------------Configuracao e inicio do jogo----------------------------------------

function comecarJogo(){
    restartBtn = document.getElementById("restartBtn")
    var config = document.getElementById("config")

    restartBtn.style.display = 'none'
    topR.style.display = 'none'
    config.style.display = 'none'

    speed = document.getElementById("velo")

    if(speed.value == 0){
        alert("Digite uma dificuldade!")
        location.reload()
    } else if (speed.value < 0.5 || speed.value > 4){
        alert("Digite um valor de 0.5 a 4!")
        location.reload()
    }
    else{
        startTime = new Date()
        IntervalGlobal = setInterval(criarBola,(speed.value * 1000))
    }
} 

//--------------Parar o jogo (stop)----------------------------------------

function stop(){
    var stats = document.getElementById("stats")

    restartBtn.style.display = 'inline-block'
    
    stats.innerHTML = ''

    if(totalFuradas == 0){
        clearInterval(IntervalGlobal)
        stats.style.display = "block"
        topR.style.display = "inline-block"
        stats.innerHTML += "<br> FIM DE JOGO! <br><br> Você não estourou nenhuma bola!"

    }else{
         clearInterval(IntervalGlobal)
         stopTime = new Date()
         ConclusionTime = (stopTime - startTime)

         stats.style.display = "block"
         topR.style.display = "inline-block"

         seconds = Math.floor(ConclusionTime / 1000)

         stats.innerHTML += "<br> FIM DE JOGO <br><br> Bolas Estouradas: " + totalFuradas + " <br> Tempo: " + seconds + " segundos. <br> Velocidade: " + speed.value
         recordes()
    }
}


//--------------Reinicio(Refresh)----------------------------------------

function reiniciar() {
    location.reload()
}

//--------------Armazenamento, notificacao e calculo de recorde----------------------------------------

function recordes() {
    placar = document.getElementById("placar");
    var showRecord = document.getElementById("showRecord")
    var recorde = totalFuradas / (Number(speed.value) * seconds);

    recordeAnterior = localStorage.getItem("recorde");
    console.log(recorde)

    if (!recordeAnterior || recorde > Number(recordeAnterior)) {
        placar.style.display = 'block'

        localStorage.setItem("recorde", recorde.toFixed(3));
        showRecord.innerHTML = recorde.toFixed(3)

        setInterval(function(){
            placar.style.display = 'none'
        },2000)

    }
}

//--------------Botao de recorde----------------------------------------

function BtnShowRecord(){
    i++
    divRec = document.getElementById("div-BtnShowRecord")
    var showRec = document.getElementById("div-show-record")
    showRec.innerHTML = ''

    if(i % 2 == 1){
        divRec.style.display = 'block'
        var localShowRec = localStorage.getItem('recorde')
        showRec.innerHTML += "O recorde atual é:<br>" +  localShowRec
    } else{
        divRec.style.display = 'none'
    }


}