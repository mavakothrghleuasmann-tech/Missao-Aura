const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas complexos em estruturas e soluções tecnológicas robustas.",
        recomendacao: "Responsável por projetar a infraestrutura e reparar falhas mecânicas no habitar.",
        imgUrl: "imagens/Perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Cientista Planetário",
        categoria: "Pesquisa",
        descricao: "Investiga dados geológicos, atmosféricos e biológicos do novo mundo.",
        recomendacao: "Conduzir análises de solo e monitorar riscos ambientais desconhecidos.",
      imgUrl: "imagens/Perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Especialista em Comunicação",
        categoria: "Integração",
        descricao: "Mestre em decodificar sinais e manter o fluxo de dados seguro entre a equipe.",
        recomendacao: "Estabelecer links de transmissão e coordenar relatórios de status com a base orbital.",
        imgUrl: "imagens/Perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Explorador de Fronteira",
        categoria: "Operações Externas",
        descricao: "Corajoso, ágil e focado em mapear terrenos inóspitos e descobertas táticas.",
        recomendacao: "Liderar missões de reconhecimento em campo aberto e busca de recursos vitais.",
        imgUrl: "imagens/Perfil-4.jpg"
    }
];
let imagemResultado = null; // Variável global para guardar apenas a imagem do vencedor

// Variáveis de Estado
let tela = "formulario"; // 'formulario' ou 'resultado'
let inputNome, inputDataNasc;
let selectQ1, selectQ2, selectQ3, selectQ4;
let btnDescobrir, btnRefazer;

// Dados processados
let dadosUsuario = { nome: "", idade: 4 };
let perfilFinal = null;
let mensagemErro = "";

function setup() {
    let cnv = createCanvas(720, 620);
    cnv.parent("canvas-container");
    
    criarElementosFormulario();
}

function draw() {
    background(3, 7, 18);
    
    // Desenhar elementos visuais de fundo (HUD Sci-Fi)
    desenharHUD();

    if (tela === "formulario") {
        gerenciarTelaFormulario();
    } else if (tela === "resultado") {
        gerenciarTelaResultado();
    }
}

function criarElementosFormulario() {
    // Input Nome
    inputNome = createInput('');
    inputNome.attribute('placeholder', 'Nome completo do Cadete');
    inputNome.position(windowWidth / 2 - 150, 155);
    inputNome.size(300, 32);

    // Input Data de Nascimento
    inputDataNasc = createInput('', 'date');
    inputDataNasc.position(windowWidth / 2 - 150, 230);
    inputDataNasc.size(300, 32);

    // Pergunta 1: Abordagem diante de falha técnica
    selectQ1 = createSelect();
    preencherOpcoes(selectQ1, [
        {txt: "Escolha uma opção...", val: ""},
        {txt: "Desmontar e reconstruir o sistema do zero", val: "1"},
        {txt: "Analisar dados estatísticos do erro", val: "2"},
        {txt: "Avisar imediatamente a equipe e buscar consenso", val: "3"},
        {txt: "Ir direto ao campo inspecionar o hardware", val: "4"}
    ]);
    selectQ1.position(windowWidth / 2 - 150, 310);
    selectQ1.size(300, 32);

    // Pergunta 2: Ambiente de preferência
    selectQ2 = createSelect();
    preencherOpcoes(selectQ2, [
        {txt: "Escolha uma opção...", val: ""},
        {txt: "Laboratório de robótica e eletrônica", val: "1"},
        {txt: "Observatório de amostras e compostos", val: "2"},
        {txt: "Central de transmissão e redes", val: "3"},
        {txt: "Terreno externo desconhecido", val: "4"}
    ]);
    selectQ2.position(windowWidth / 2 - 150, 390);
    selectQ2.size(300, 32);

    // Pergunta 3: Ferramenta favorita
    selectQ3 = createSelect();
    preencherOpcoes(selectQ3, [
        {txt: "Escolha uma opção...", val: ""},
        {txt: "Chave universal e solda a plasma", val: "1"},
        {txt: "Espectrômetro e microscópio quântico", val: "2"},
        {txt: "Decodificador de frequências estelares", val: "3"},
        {txt: "Bússola magnética quântica e traje tático", val: "4"}
    ]);
    selectQ3.position(windowWidth / 2 - 150, 470);
    selectQ3.size(300, 32);

    // Pergunta 4: Lema pessoal
    selectQ4 = createSelect();
    preencherOpcoes(selectQ4, [
        {txt: "Escolha uma opção...", val: ""},
        {txt: "Criar engrenagens para mover mundos", val: "1"},
        {txt: "Conhecer as leis do universo", val: "2"},
        {txt: "Conectar mentes através do cosmos", val: "3"},
        {txt: "Desbravar o horizonte além das estrelas", val: "4"}
    ]);
    selectQ4.position(windowWidth / 2 - 150, 550);
    selectQ4.size(300, 32);

    // Botão Descobrir Perfil
    btnDescobrir = createButton('DESCOBRIR PERFIL');
    btnDescobrir.position(windowWidth / 2 - 110, 615);
    btnDescobrir.size(220, 40);
    btnDescobrir.mousePressed(processarFormulario);
    estilizarBotaoPrincipal(btnDescobrir);

    // Botão Refazer (inicialmente oculto)
    btnRefazer = createButton('-refaça-');
    btnRefazer.position(windowWidth / 2 - 100, 570);
    btnRefazer.size(200, 40);
    btnRefazer.mousePressed(resetarTeste);
    estilizarBotaoPrincipal(btnRefazer);
    btnRefazer.hide();
}

function preencherOpcoes(elementoSelect, lista) {
    for (let op of lista) {
        elementoSelect.option(op.txt, op.val);
    }
}

function estilizarBotaoPrincipal(btn) {
    btn.style('background', 'linear-gradient(45deg, #00f0ff, #00ff88)');
    btn.style('color', '#030712');
    btn.style('font-weight', '700');
    btn.style('border', 'none');
    btn.style('cursor', 'pointer');
    btn.style('border-radius', '6px');
}

function gerenciarTelaFormulario() {
    // Exibir campos do formulário
    mostrarElementosForm(true);

    // Textos do cabeçalho e labels
    textAlign(CENTER, TOP);
    fill(0, 240, 255);
    textSize(28);
    text("MISSÃO AURA (2089)", width / 2, 25);

    fill(148, 163, 184);
    textSize(14);
    text("Identificação de Perfil de Exploração Planetária", width / 2, 60);

    // Labels dos campos
    textAlign(LEFT, TOP);
    textSize(13);
    fill(0, 255, 136);
    text("NOME DO PARTICIPANTE:", width / 2 - 150, 135);
    text("DATA DE NASCIMENTO:", width / 2 - 150, 210);
    text("1. Abordagem diante de falha técnica:", width / 2 - 150, 290);
    text("2. Ambiente de preferência operacional:", width / 2 - 150, 370);
    text("3. Ferramenta ou equipamento favorito:", width / 2 - 150, 450);
    text("4. Lema pessoal no cosmos:", width / 2 - 150, 530);

    // Mensagem de Erro de Validação
    if (mensagemErro !== "") {
        fill(255, 75, 75);
        textSize(13);
        textAlign(CENTER, TOP);
        text(mensagemErro, width / 2, 590);
    }
}

function processarFormulario() {
    let nome = inputNome.value().trim();
    let dataNascStr = inputDataNasc.value();
    let q1 = selectQ1.value();
    let q2 = selectQ2.value();
    let q3 = selectQ3.value();
    let q4 = selectQ4.value();
    

    // Validações estritas (Requisito 2)
    if (!nome || !dataNascStr || !q1 || !q2 || !q3 || !q4) {
        mensagemErro = "Preencha todos os campos e selecione todas as respostas!";
        return;
    }

    let dataNasc = new Date(dataNascStr);
    let hoje = new Date();

    if (dataNasc > hoje) {
        mensagemErro = "Erro: A data de nascimento não pode ser no futuro!";
        return;
    }

    // Cálculo exato da idade considerando se o aniversário já ocorreu no ano atual (Requisito 2)
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    let m = hoje.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }

    dadosUsuario.nome = nome;
    dadosUsuario.idade = idade;

    // Calcular pontuação de cada perfil (Requisito 2)
    let pontuacoes = { 1: 0, 2: 0, 3: 0, 4: 0 };
    pontuacoes[q1]++;
    pontuacoes[q2]++;
    pontuacoes[q3]++;
    pontuacoes[q4]++;

    // Tratamento de empates e identificação de resultado por condicionais (Requisito 2 e 3)
    let maiorPontuacao = -1;
    let candidatosEmpatados = [];

    for (let idPerfil in pontuacoes) {
        if (pontuacoes[idPerfil] > maiorPontuacao) {
            maiorPontuacao = pontuacoes[idPerfil];
            candidatosEmpatados = [Number(idPerfil)];
        } else if (pontuacoes[idPerfil] === maiorPontuacao) {
            candidatosEmpatados.push(Number(idPerfil));
        }
    }

    // Tratamento de empate: se houver empate, escolhe o primeiro da lista de empatados ou prioriza o ID 1
    let idEscolhido = candidatosEmpatados[0];

    // Localizar dados do perfil no array de objetos (Requisito 3)
    perfilFinal = perfis.find(p => p.id === idEscolhido);
    imagemResultado = loadImage(perfilFinal.imgUrl);
    mensagemErro = "";
    mostrarElementosForm(false);
    tela = "resultado";
}

function gerenciarTelaResultado() {
        background(3, 7, 18);
    
        stroke(0, 240, 255);
        strokeWeight(2);
        noFill();
        rect(40, 30, width - 80, 520, 12); 
  
        noStroke();

       if (imagemResultado) {                                               image(imagemResultado, 50, 340, width - 100, 150);
    }

    noStroke();
    textAlign(CENTER, TOP);
    fill(0, 255, 136);
    textSize(24);
    text("RELATÓRIO DE PERFIL - MISSÃO AURA", width / 2, 45);

    
    textAlign(LEFT, TOP);
    textSize(16);
    fill(226, 232, 240);
    text(`Participante: ${dadosUsuario.nome}`, 70, 95);
    text(`Idade Calculada: ${dadosUsuario.idade} anos`, 70, 125);

    
    fill(0, 240, 255);
    textSize(18);
    text(`Perfil Identificado: ${perfilFinal.nome}`, 70, 165);
    fill(255, 180, 0);
    textSize(15);
    text(`Categoria: ${perfilFinal.categoria}`, 70, 195);

    
    fill(203, 213, 225);
    textSize(14);
    text(`Descrição: ${perfilFinal.descricao}`, 70, 230, width - 140, 60);

    
    fill(0, 255, 136);
    textSize(14);
    text(`Recomendação para a Missão: ${perfilFinal.recomendacao}`, 70, 295, width - 140, 70);

    btnRefazer.show();
    
}

function resetarTeste() {
    
    inputNome.value('');
    inputDataNasc.value('');
    selectQ1.value('');
    selectQ2.value('');
    selectQ3.value('');
    selectQ4.value('');
    imagemResultado = null;
    btnRefazer.hide();
    mensagemErro = "";
    tela = "formulario";
}

function mostrarElementosForm(visivel) {
    if (visivel) {
        inputNome.show();
        inputDataNasc.show();
        selectQ1.show();
        selectQ2.show();
        selectQ3.show();
        selectQ4.show();
        btnDescobrir.show();
    } else {
        inputNome.hide();
        inputDataNasc.hide();
        selectQ1.hide();
        selectQ2.hide();
        selectQ3.hide();
        selectQ4.hide();
        btnDescobrir.hide();
    }
}

function desenharHUD() {

    stroke(0, 240, 255, 40);
    strokeWeight(1);
    line(20, 20, width - 20, 20);
    line(20, height - 20, width - 20, height - 20);
}

function windowResized() {
  
    if (inputNome) {
        let xPos = width / 2 - 150;
        inputNome.position(xPos, 155);
        inputDataNasc.position(xPos, 230);
        selectQ1.position(xPos, 310);
        selectQ2.position(xPos, 390);
        selectQ3.position(xPos, 470);
        selectQ4.position(xPos, 550);
        btnDescobrir.position(width / 2 - 110, 615);
        btnRefazer.position(width / 2 - 100, 570);
    }
}