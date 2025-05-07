class ContaBancaria {
    constructor(titulo) {
        this.titulo = titulo;
        this.saldo = 0;
        this.transacoes = [];
    }

    adicionarTransacao(valor, descricao) {
        this.saldo += valor;
        this.transacoes.push({
            valor,
            descricao,
            data: new Date()
        });
    }

    obterHistorico() {
        return [...this.transacoes];
    }
}

module.exports = { ContaBancaria };
