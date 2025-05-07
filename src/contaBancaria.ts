interface Transacao {
    valor: number;
    descricao: string;
    data: Date;
}

export class ContaBancaria {
    private saldo: number;
    private transacoes: Transacao[];

    constructor(public readonly titulo: string) {
        this.saldo = 0;
        this.transacoes = [];
    }

    adicionarTransacao(valor: number, descricao: string): void {
        this.saldo += valor;
        this.transacoes.push({
            valor,
            descricao,
            data: new Date()
        });
    }

    obterHistorico(): Transacao[] {
        return [...this.transacoes];
    }

    getSaldo(): number {
        return this.saldo;
    }
}
