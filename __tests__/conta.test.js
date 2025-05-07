const { ContaBancaria } = require('../contaBancaria');

describe('ContaBancaria', () => {
    test('deve criar uma conta com saldo zero', () => {
        const conta = new ContaBancaria('Conta Corrente');
        expect(conta.titulo).toBe('Conta Corrente');
        expect(conta.saldo).toBe(0);
    });

    test('deve adicionar um depósito', () => {
        const conta = new ContaBancaria('Conta Corrente');
        conta.adicionarTransacao(100, 'Salário');
        expect(conta.saldo).toBe(100);
    });

    test('deve subtrair um saque', () => {
        const conta = new ContaBancaria('Conta Corrente');
        conta.adicionarTransacao(1000, 'Depósito Inicial');
        conta.adicionarTransacao(-200, 'Compras');
        expect(conta.saldo).toBe(800);
    });

    test('deve retornar o histórico de transações', () => {
        const conta = new ContaBancaria('Conta Corrente');
        conta.adicionarTransacao(1000, 'Salário');
        conta.adicionarTransacao(-200, 'Mercado');
        
        const historico = conta.obterHistorico();
        expect(historico).toHaveLength(2);
        expect(historico[0]).toEqual({ valor: 1000, descricao: 'Salário', data: expect.any(Date) });
    });
});
