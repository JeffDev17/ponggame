//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 6;


//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Raquete Oponente
let xRaqO = 585;
let yRaqO = 150;
let velocidadeYOponente;

//Pontos
let meusPontos = 0;
let pontosO = 0;

// sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("wii.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqO, yRaqO);
  movimentaRaqO();
  colisaoMinhaRaqueteBiblioteca(xRaqO, yRaqO)
  pontos();
  addPontos();
}
function pontos(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0))
  rect(130, 10, 40, 20);
  rect(430, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosO, 450, 26);
}

function addPontos(x, y){
  if (xBolinha > 595){
    meusPontos += 1;
    ponto.play();
    }
  if (xBolinha < 10){
    pontosO += 1;
    ponto.play();
    }
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoMinhaRaqueteBiblioteca(x,y){
  colidiu = 
  hit = collideRectCircle(x , y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){velocidadeXBolinha *= -1
   raquetada.play();
          }

}

function movimentaRaqO(){
  velocidadeYOponente = yBolinha - yRaqO - raqueteComprimento / 2 - 30; 
  yRaqO += velocidadeYOponente
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}
