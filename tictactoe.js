var VAZIO = {
  simbolo:"_",
  valor:0
}

var jogadorX = {
  simbolo:"X",
  valor:1
}

var jogadorO = {
  simbolo:"O",
  valor:-1
}

var jogadorAtual = jogadorX;

var tabuleiro = [
  [VAZIO,VAZIO,VAZIO],
  [VAZIO,VAZIO,VAZIO],
  [VAZIO,VAZIO,VAZIO]
]

var numeroDeJogadas = 0;

var novaLinha = function() {
  var br = document.createElement("br");
  document.querySelector("#tabuleiro").appendChild(br);
}

var limparTela = function() {
  document.querySelector("#tabuleiro").innerHTML = '';
  document.querySelector("#status").innerHTML = '';

}

var alterarStatus = function(mensagem) {
  document.querySelector("#status").innerHTML = mensagem;
}

var criaBotaoTabuleiro = function(linha, coluna){
  var button = document.createElement("button");
  button.textContent = tabuleiro[linha][coluna].simbolo;
  button.classList.add("botaoTabuleiro");
  button.onclick = function eventoFazerJogada(){
    fazerJogada(linha, coluna)
  };
  document.querySelector("#tabuleiro").appendChild(button);
}

var desenharTabuleiro = function(){
  limparTela();
  for(var linha = 0; linha < 3; linha++) {
    for(var coluna = 0; coluna < 3; coluna++) {
      criaBotaoTabuleiro(linha, coluna);
    }
    novaLinha();
  }
}

var fazerJogada = function(linha, coluna){
  if(tabuleiro[linha][coluna] === VAZIO){
    tabuleiro[linha][coluna] = jogadorAtual;
    desenharTabuleiro();
    numeroDeJogadas++;
    verificarVencedor();
    proximoJogador();
  }
  else {
    alterarStatus("Jogada Inválida!");
  }
}

var proximoJogador = function() {
  if(jogadorAtual === jogadorX){
    jogadorAtual = jogadorO;
  } else {
    jogadorAtual = jogadorX;
  }
}

var verificarVencedor = function() {
  if(verificarLinhas() || verificarColunas() || verificarDiagonais()) {
    alterarStatus("Jogador " + jogadorAtual.simbolo + " venceu!");
  } 
  else if (numeroDeJogadas === 9) {
    alterarStatus("Empate!");
  }
}

var verificarLinhas = function() {
  if(checarTrilha(tabuleiro[0]) || checarTrilha(tabuleiro[1]) || checarTrilha(tabuleiro[2])) {
    return true;
  }
  return false;
}

var verificarColunas = function() {
  var arrayColunaUm = [tabuleiro[0][0], tabuleiro[1][0], tabuleiro[2][0]];
  var arrayColunaDois = [tabuleiro[0][1], tabuleiro[1][1], tabuleiro[2][1]];
  var arrayColunaTres = [tabuleiro[0][2], tabuleiro[1][2], tabuleiro[2][2]];
  
  if(checarTrilha(arrayColunaUm) || checarTrilha(arrayColunaDois) || checarTrilha(arrayColunaTres)) {
    return true;
  }
  return false;
}

var verificarDiagonais = function() {
  var arrayDiagonalPrincipal = [tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]];
  var arrayDiagonalSecundaria = [tabuleiro[0][2], tabuleiro[1][1], tabuleiro[2][0]];
  
  if(checarTrilha(arrayDiagonalPrincipal) || checarTrilha(arrayDiagonalSecundaria)) {
    return true;
  }
  return false;
}

var checarTrilha = function(trilha) {
  if(trilha[0].valor + trilha[1].valor + trilha[2].valor === jogadorAtual.valor * 3) {
    return true;
  }

  return false;
}