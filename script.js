let tabuleiro = ['', '', '', '', '', '', '', '', '']; 
let jogadorHumano = '';
let jogadorIA = '';

function escolherSimbolo(simbolo) {
    jogadorHumano = simbolo;
    jogadorIA = (simbolo === 'X') ? 'O' : 'X';
    console.log('Você escolheu jogar como ' + jogadorHumano);
    console.log('A IA jogará como ' + jogadorIA);
    alert('Você escolheu jogar como ' + jogadorHumano);
    iniciarJogo();
}

function iniciarJogo() {
    const celulas = document.querySelectorAll('.celula');
    
    celulas.forEach((celula, index) => {
        celula.addEventListener('click', () => {
            if (tabuleiro[index] === '' && verificarFimDeJogo(tabuleiro) === null) {
                tabuleiro[index] = jogadorHumano;
                atualizarTabuleiro();
                if (verificarFimDeJogo(tabuleiro) === null) {
                    fazerJogadaIA(tabuleiro, jogadorIA, jogadorHumano);
                    atualizarTabuleiro();
                }
            }
        });
    });
}

function atualizarTabuleiro() {
    const celulas = document.querySelectorAll('.celula');
    
    celulas.forEach((celula, index) => {
        celula.textContent = tabuleiro[index];
    });
    
    const resultado = verificarFimDeJogo(tabuleiro);
    if (resultado !== null) {
        if (resultado === jogadorIA) {
            console.log('Você perdeu!');
            alert('Você perdeu!');
        } else if (resultado === jogadorHumano) {
            console.log('Você venceu!');
            alert('Você venceu!');
        } else {
            console.log('Empate!');
            alert('Deu velha!');
        }
        celulas.forEach(celula => celula.removeEventListener('click'));
    }
}

function tabuleiroCheio(tabuleiro) {
    return tabuleiro.every(cell => cell !== '');
}

function verificarFimDeJogo(tabuleiro) {
 
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i] === tabuleiro[i + 3] && tabuleiro[i] === tabuleiro[i + 6] && tabuleiro[i] !== '') {
            return tabuleiro[i];
        }
    }
    for (let i = 0; i < 9; i += 3) {
        if (tabuleiro[i] === tabuleiro[i + 1] && tabuleiro[i] === tabuleiro[i + 2] && tabuleiro[i] !== '') {
            return tabuleiro[i];
        }
    }
    if (tabuleiro[0] === tabuleiro[4] && tabuleiro[0] === tabuleiro[8] && tabuleiro[0] !== '') {
        return tabuleiro[0];
    }
    if (tabuleiro[2] === tabuleiro[4] && tabuleiro[2] === tabuleiro[6] && tabuleiro[2] !== '') {
        return tabuleiro[2];
    }
    if (tabuleiroCheio(tabuleiro)) {
        return 'empate';
    }
    return null;
}
function fazerJogadaIA(tabuleiro, jogadorIA, jogadorHumano) {
    let melhorMovimento;
    let melhorPontuacao = -Infinity;
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === '') {
            tabuleiro[i] = jogadorIA;
            let pontuacao = minimax(tabuleiro, 0, false, jogadorIA, jogadorHumano);
            tabuleiro[i] = '';
            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao;
                melhorMovimento = i;
            }
        }
    }
    tabuleiro[melhorMovimento] = jogadorIA;
}

function minimax(tabuleiro, profundidade, maximizando, jogadorIA, jogadorHumano) {
    let resultado = verificarFimDeJogo(tabuleiro);
    if (resultado !== null) {
        if (resultado === jogadorIA) {
            return 10 - profundidade;
        } else if (resultado === jogadorHumano) {
            return -10 + profundidade;
        } else {
            return 0;
        }
    }

    if (maximizando) {
        let melhorPontuacao = -Infinity;
        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === '') {
                tabuleiro[i] = jogadorIA;
                let pontuacao = minimax(tabuleiro, profundidade + 1, false, jogadorIA, jogadorHumano);
                tabuleiro[i] = '';
                melhorPontuacao = Math.max(pontuacao, melhorPontuacao);
            }
        }
        return melhorPontuacao;
    } else {
        let melhorPontuacao = Infinity;
        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === '') {
                tabuleiro[i] = jogadorHumano;
                let pontuacao = minimax(tabuleiro, profundidade + 1, true, jogadorIA, jogadorHumano);
                tabuleiro[i] = '';
                melhorPontuacao = Math.min(pontuacao, melhorPontuacao);
            }
        }
        return melhorPontuacao;
    }
}
