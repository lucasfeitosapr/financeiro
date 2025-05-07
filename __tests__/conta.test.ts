import { ContaBancaria } from '../src/contaBancaria';

describe('ContaBancaria', () => {
    let conta: ContaBancaria;

    beforeEach(() => {
        conta = new ContaBancaria('Conta Corrente');
    });

    test('deve criar uma conta com saldo zero', () => {
        expect(conta).toBeInstanceOf(ContaBancaria);
        expect(conta['saldo']).toBe(0);
    });

    test('deve adicionar um depósito', () => {
        conta.adicionarTransacao(100, 'Salário');
        expect(conta.getSaldo()).toBe(100);
    });

    test('deve subtrair um saque', () => {
        conta.adicionarTransacao(1000, 'Depósito Inicial');
        conta.adicionarTransacao(-200, 'Compras');
        expect(conta.getSaldo()).toBe(800);
    });

    test('deve retornar o histórico de transações', () => {
        conta.adicionarTransacao(1000, 'Salário');
        conta.adicionarTransacao(-200, 'Mercado');
        
        const historico = conta.obterHistorico();
        expect(historico).toHaveLength(2);
        expect(historico[0]).toEqual({
            valor: 1000,
            descricao: 'Salário',
            data: expect.any(Date)
        });
    });
});
