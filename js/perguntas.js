// Dados das duas narrativas da Colônia Selene.
// caminho: "A" (explorar e construir) ou "B" (investigar o sinal de rádio).
// tipo: entrada, avancar, salto, trocar ou gameover (a escolha que mata o personagem).
// proxima: posição da próxima pergunta na lista (a contagem começa em 0).
export const perguntas = [
  { // 0 - pergunta inicial
    caminho: "inicio",
    enunciado:
      "Você pousou na Lua. O oxigênio da nave dura 3 dias e a Colônia Selene ainda não existe. " +
      "O que faz primeiro?",
    alternativas: [
      { texto: "Ir à cratera buscar gelo de água.",
        afirmacao: ["Foi à cratera buscar gelo de água."],
        tipo: "entrada", proxima: 1 },
      { texto: "Investigar o sinal de rádio estranho.",
        afirmacao: ["Decidiu investigar o sinal de rádio estranho."],
        tipo: "entrada", proxima: 2 }
    ]
  },
  { // 1 - A1
    caminho: "A",
    enunciado:
      "Você está na cratera. O gelo está a 200 metros e seu oxigênio dura 4 horas. Qual é o plano?",
    alternativas: [
      { texto: "Coletar uma amostra pequena e voltar.",
        afirmacao: ["Coletou uma amostra pequena de gelo."],
        tipo: "avancar", proxima: 3 },
      { texto: "Seguir o mapa da equipe até o ponto seguro.",
        afirmacao: ["Seguiu o mapa da equipe até o ponto seguro."],
        tipo: "salto", proxima: 4 },
      { texto: "Ignorar o gelo e seguir o sinal de rádio.",
        afirmacao: ["Deixou o gelo e foi atrás do sinal de rádio."],
        tipo: "trocar", proxima: 2, disponivel: true }
    ]
  },
  { // 2 - B1
    caminho: "B",
    enunciado:
      "O rádio recebe uma mensagem atribuída ao comandante: abandonar a base agora. " +
      "A voz parece estranha. O que você faz?",
    alternativas: [
      { texto: "Confirmar a origem da mensagem antes de agir.",
        afirmacao: ["Confirmou a origem da mensagem antes de agir."],
        tipo: "avancar", proxima: 7 },
      { texto: "Ligar para o centro de controle na Terra.",
        afirmacao: ["Ligou para o centro de controle na Terra."],
        tipo: "salto", proxima: 8 },
      { texto: "Ignorar a ordem e sair para a cratera.",
        afirmacao: ["Ignorou a ordem e saiu para a cratera."],
        tipo: "trocar", proxima: 1, disponivel: true }
    ]
  },
  { // 3 - A2
    caminho: "A",
    enunciado:
      "A amostra de gelo solta uma fumaça estranha e o sensor acusa gás tóxico. O que você faz?",
    alternativas: [
      { texto: "Selar a amostra e analisar no laboratório da base.",
        afirmacao: ["Selou a amostra e levou ao laboratório."],
        tipo: "avancar", proxima: 4 },
      { texto: "Descartar a amostra e coletar outra em local seguro.",
        afirmacao: ["Descartou a amostra e voltou a coletar."],
        tipo: "salto", proxima: 1 },
      { texto: "Abrir o frasco e cheirar para conferir.",
        afirmacao: ["Abriu o frasco para cheirar o gás."],
        tipo: "gameover", disponivel: true,
        mensagem:
          "O gás tóxico encheu seu capacete em segundos. Você morreu na cratera." }
    ]
  },
  { // 4 - A3
    caminho: "A",
    enunciado:
      "A base precisa de energia. Há um painel solar pronto e um reator com defeito. Qual você usa?",
    alternativas: [
      { texto: "Instalar o painel solar e testar o sistema.",
        afirmacao: ["Instalou o painel solar e testou o sistema."],
        tipo: "avancar", proxima: 5 },
      { texto: "Usar o gerador já aprovado pela equipe.",
        afirmacao: ["Usou o gerador aprovado pela equipe."],
        tipo: "salto", proxima: 6 },
      { texto: "Reunir os colonos para um treinamento de segurança.",
        afirmacao: ["Reuniu os colonos para um treinamento de segurança."],
        tipo: "trocar", proxima: 8, disponivel: true }
    ]
  },
  { // 5 - A4
    caminho: "A",
    enunciado:
      "O medidor de oxigênio da base marca 40% e uma válvula está vazando. O que você faz?",
    alternativas: [
      { texto: "Consertar a válvula e refazer o teste.",
        afirmacao: ["Consertou a válvula e refez o teste."],
        tipo: "avancar", proxima: 6 },
      { texto: "Voltar ao laboratório e conferir as medições.",
        afirmacao: ["Voltou ao laboratório para conferir as medições."],
        tipo: "salto", proxima: 3 },
      { texto: "Ignorar o alerta e dormir. Amanhã você resolve.",
        afirmacao: ["Ignorou o alerta de oxigênio e foi dormir."],
        tipo: "gameover", disponivel: true,
        mensagem:
          "O oxigênio acabou durante a noite. Você morreu dormindo." }
    ]
  },
  { // 6 - A5
    caminho: "A",
    enunciado:
      "Hoje é a inauguração da base. Falta confirmar os sistemas de segurança. O que você faz?",
    alternativas: [
      { texto: "Conferir todos os sistemas e abrir a base.",
        afirmacao: ["Conferiu todos os sistemas e abriu a base."],
        tipo: "avancar", proxima: 11 },
      { texto: "Revisar a válvula de oxigênio mais uma vez.",
        afirmacao: ["Revisou a válvula de oxigênio mais uma vez."],
        tipo: "salto", proxima: 5 },
      { texto: "Levar o plano à reunião de segurança dos colonos.",
        afirmacao: ["Levou o plano à reunião de segurança dos colonos."],
        tipo: "trocar", proxima: 10, disponivel: true }
    ]
  },
  { // 7 - B2
    caminho: "B",
    enunciado:
      "A mensagem manda abrir a escotilha externa, mas não tem origem identificada. Como continuar?",
    alternativas: [
      { texto: "Consultar os canais oficiais da base.",
        afirmacao: ["Consultou os canais oficiais da base."],
        tipo: "avancar", proxima: 8 },
      { texto: "Voltar ao rádio e buscar outras mensagens parecidas.",
        afirmacao: ["Voltou ao rádio e buscou outras mensagens parecidas."],
        tipo: "salto", proxima: 2 },
      { texto: "Abrir a escotilha como a mensagem pede.",
        afirmacao: ["Abriu a escotilha externa sem confirmar."],
        tipo: "gameover", disponivel: true,
        mensagem:
          "O ar da base escapou pela escotilha aberta. Você morreu no vácuo." }
    ]
  },
  { // 8 - B3
    caminho: "B",
    enunciado:
      "O centro de controle confirma que a mensagem é falsa. Os colonos estão com medo. Como você age?",
    alternativas: [
      { texto: "Preparar um aviso oficial para todos.",
        afirmacao: ["Preparou um aviso oficial para todos."],
        tipo: "avancar", proxima: 9 },
      { texto: "Usar o comunicado já aprovado e chamar uma reunião.",
        afirmacao: ["Usou o comunicado aprovado e chamou uma reunião."],
        tipo: "salto", proxima: 10 },
      { texto: "Treinar a equipe de engenharia para emergências.",
        afirmacao: ["Treinou a equipe de engenharia para emergências."],
        tipo: "trocar", proxima: 4, disponivel: true }
    ]
  },
  { // 9 - B4
    caminho: "B",
    enunciado:
      "No aviso, alguém pergunta quem enviou a mensagem falsa. Você não sabe. O que responde?",
    alternativas: [
      { texto: "Explicar o que é certo e o que ainda é desconhecido.",
        afirmacao: ["Explicou o que era certo e o que era desconhecido."],
        tipo: "avancar", proxima: 10 },
      { texto: "Voltar à investigação para descobrir a origem.",
        afirmacao: ["Voltou à investigação para descobrir a origem."],
        tipo: "salto", proxima: 7 },
      { texto: "Culpar um colega para acalmar todos.",
        afirmacao: ["Culpou um colega sem provas."],
        tipo: "gameover", disponivel: true,
        mensagem:
          "A base se dividiu e ninguém ouviu o alarme de vazamento. Você morreu com a base." }
    ]
  },
  { // 10 - B5
    caminho: "B",
    enunciado:
      "A reunião com os colonos começa em 10 minutos. O que precisa ser feito antes?",
    alternativas: [
      { texto: "Organizar o esclarecimento e as dicas de verificação.",
        afirmacao: ["Organizou o esclarecimento e as dicas de verificação."],
        tipo: "avancar", proxima: 12 },
      { texto: "Revisar o aviso mais uma vez.",
        afirmacao: ["Revisou o aviso mais uma vez."],
        tipo: "salto", proxima: 9 },
      { texto: "Subir ao teto sem traje para melhorar o sinal.",
        afirmacao: ["Subiu ao teto da base sem traje."],
        tipo: "gameover", disponivel: true,
        mensagem:
          "Sem traje, seu corpo não resistiu ao vácuo. Você morreu no teto da base." }
    ]
  },
  { // 11 - final A (vitória)
    caminho: "A",
    final: "vitoria",
    enunciado:
      "Você revisou todos os sistemas de segurança, abriu a base e a Colônia Selene foi " +
      "inaugurada com todos vivos. Você venceu!",
    alternativas: []
  },
  { // 12 - final B (vitória)
    caminho: "B",
    final: "vitoria",
    enunciado:
      "Você ensinou os colonos a verificar mensagens falsas. A base ficou unida e segura, " +
      "e a Colônia Selene foi inaugurada. Você venceu!",
    alternativas: []
  }
];