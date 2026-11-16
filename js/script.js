// Código consolidado até a Parte 7 (tema: Colônia Selene).
import { perguntas } from "./perguntas.js";
import { aleatorio, nome } from "./aleatorio.js";
import { personagens, desenhaPersonagem } from "./personagens.js";

// 1. Elementos do HTML.
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const tituloResultado = document.querySelector(".titulo-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");

// Elementos da escolha de personagem.
const telaPersonagens = document.querySelector(".tela-personagens");
const listaPersonagens = document.querySelector(".lista-personagens");
const retrato = document.querySelector(".retrato");

// Elementos da tela de créditos.
const botaoCreditos = document.querySelector(".creditos-btn");
const telaCreditos = document.querySelector(".tela-creditos");
const botaoVoltarInicio = document.querySelector(".voltar-inicio-btn");

// 2. Estado da partida.
let atual = 0;
let historiaFinal = "";
let faseDaPartida = "inicio";
let jogador = nome; // nome do personagem escolhido

// 3. Eventos (registrados uma única vez).
botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", reiniciaJogo);
botaoCreditos.addEventListener("click", mostraCreditos);
botaoVoltarInicio.addEventListener("click", reiniciaJogo);

// Cria um botão para cada personagem da tela de escolha.
for (const personagem of personagens) {
    const botao = document.createElement("button");
    botao.className = "personagem-btn";
    const rotulo = document.createElement("span");
    rotulo.textContent = personagem.nome;
    botao.append(desenhaPersonagem(personagem), rotulo);
    botao.addEventListener("click", function () {
        escolhePersonagem(personagem);
    });
    listaPersonagens.appendChild(botao);
}

// O botão Iniciar leva à escolha do personagem.
function iniciaJogo() {
    reiniciaJogo();
    faseDaPartida = "escolha";

    telaInicial.style.display = "none";
    telaPersonagens.style.display = "block";
}

// Ao escolher o personagem, a história começa.
function escolhePersonagem(personagem) {
    if (faseDaPartida !== "escolha") {
        return;
    }

    jogador = personagem.nome;
    faseDaPartida = "jogando";

    const rotulo = document.createElement("span");
    rotulo.textContent = personagem.nome;
    retrato.replaceChildren(desenhaPersonagem(personagem), rotulo);

    telaPersonagens.style.display = "none";
    retrato.style.display = "flex";
    caixaPerguntas.style.display = "block";
    caixaAlternativas.style.display = "flex";

    mostraPergunta();
}

function reiniciaJogo() {
    // A tentativa anterior é descartada por completo.
    atual = 0;
    historiaFinal = "";
    faseDaPartida = "inicio";

    caixaPerguntas.textContent = "";
    caixaAlternativas.replaceChildren();
    tituloResultado.textContent = "";
    textoResultado.textContent = "";

    telaInicial.style.display = "block";
    telaPersonagens.style.display = "none";
    retrato.style.display = "none";
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "none";
    telaCreditos.style.display = "none";
    botaoCreditos.style.display = "none";
    botaoJogarNovamente.style.display = "inline-block";
}

// 4. Exibe a pergunta da posição atual e cria seus botões.
function mostraPergunta() {
    const perguntaAtual = perguntas[atual];

    // Vitória somente quando uma etapa final é alcançada.
    if (perguntaAtual.final === "vitoria") {
        mostraVitoria(perguntaAtual.enunciado);
        return;
    }

    caixaPerguntas.textContent =
        perguntaAtual.enunciado.replace(/você/gi, jogador);
    caixaAlternativas.replaceChildren();

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.disabled = alternativa.disponivel === false;

        botao.addEventListener("click", function () {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

// 5. Lê a escolha e muda a posição atual.
function respostaSelecionada(opcaoSelecionada) {
    // Só é possível escolher durante uma partida em andamento.
    if (faseDaPartida !== "jogando") {
        return;
    }

    if (opcaoSelecionada.disponivel === false) {
        return;
    }

    // A derrota não precisa de uma posição em proxima.
    // Por isso, ela é tratada antes da conferência do destino numérico.
    if (opcaoSelecionada.tipo === "gameover") {
        const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
        historiaFinal += afirmacao + " ";
        mostraGameOver(opcaoSelecionada.mensagem);
        return;
    }

    const destino = opcaoSelecionada.proxima;

    if (!Number.isInteger(destino) || perguntas[destino] === undefined) {
        console.error("Destino inválido:", destino);
        return;
    }

    const origem = perguntas[atual];
    const chegada = perguntas[destino];
    const mudouDeCaminho = origem.caminho !== chegada.caminho;

    // A primeira pergunta pode iniciar qualquer uma das narrativas.
    // Depois dela, só uma alternativa do tipo trocar pode mudar de caminho.
    if (atual !== 0 && mudouDeCaminho && opcaoSelecionada.tipo !== "trocar") {
        console.error("Mudança de caminho sem o tipo trocar.");
        return;
    }

    // Uma alternativa do tipo trocar deve apontar para outro caminho.
    if (opcaoSelecionada.tipo === "trocar" && !mudouDeCaminho) {
        console.error("A troca deve levar a outro caminho.");
        return;
    }

    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + " ";

    atual = destino;
    mostraPergunta();
}

function mostraGameOver(mensagem) {
    faseDaPartida = "gameover";
    retrato.style.display = "none";

    caixaPerguntas.style.display = "none";
    caixaAlternativas.replaceChildren();
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "block";

    tituloResultado.textContent = "GAME OVER";
    textoResultado.textContent =
        mensagem + "\n\nSuas escolhas nesta tentativa:\n" + historiaFinal;
    botaoJogarNovamente.textContent = "Recomeçar do início";
    botaoJogarNovamente.style.display = "inline-block";
    botaoCreditos.style.display = "none";
    telaCreditos.style.display = "none";
}

function mostraVitoria(mensagem) {
    // Esta função não pode transformar uma pergunta comum em vitória.
    if (faseDaPartida !== "jogando" || perguntas[atual].final !== "vitoria") {
        return;
    }

    faseDaPartida = "vitoria";
    retrato.style.display = "none";
    caixaPerguntas.style.display = "none";
    caixaAlternativas.replaceChildren();
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "block";

    tituloResultado.textContent = "THE END";
    textoResultado.textContent =
        mensagem + "\n\nSeu percurso nesta partida:\n" + historiaFinal;
    // Depois da vitória, o próximo passo é abrir os créditos.
    botaoJogarNovamente.style.display = "none";
    botaoCreditos.style.display = "inline-block";
    telaCreditos.style.display = "none";
}

function mostraCreditos() {
    // Game Over e perguntas comuns não dão acesso aos créditos.
    if (faseDaPartida !== "vitoria") {
        return;
    }

    faseDaPartida = "creditos";
    telaInicial.style.display = "none";
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    caixaResultado.style.display = "none";
    telaCreditos.style.display = "block";
}

// Estado inicial da página.
reiniciaJogo();