var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function carregarContas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('dados.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Erro:', error);
            return [];
        }
    });
}
function criarElementoConta(conta) {
    const divConta = document.createElement('div');
    divConta.className = 'conta';
    if (!conta.parcelas) {
        divConta.classList.add('conta-unica');
    }
    else if (conta.atrasado) {
        divConta.classList.add('conta-atrasada');
    }
    const divTitulo = document.createElement('div');
    divTitulo.className = 'conta-titulo';
    const spanDescricao = document.createElement('span');
    spanDescricao.textContent = conta.descricao;
    const spanValor = document.createElement('span');
    spanValor.className = 'conta-valor';
    spanValor.textContent = formatarMoeda(conta.valorTotal);
    divTitulo.appendChild(spanDescricao);
    divTitulo.appendChild(spanValor);
    const divProgressContainer = document.createElement('div');
    divProgressContainer.className = 'progress-container';
    const divProgressBar = document.createElement('div');
    divProgressBar.className = 'progress-bar';
    if (conta.parcelas) {
        const parcelasPagas = conta.parcelasPagas || 0;
        const progresso = Math.min(100, (parcelasPagas / conta.parcelas) * 100);
        divProgressBar.style.width = `${progresso}%`;
        divProgressBar.textContent = `${parcelasPagas}/${conta.parcelas} parcela(s)`;
    }
    else {
        divProgressBar.style.width = '100%';
        divProgressBar.textContent = 'Conta única';
    }
    divProgressContainer.appendChild(divProgressBar);
    const divInfo = document.createElement('div');
    divInfo.className = 'conta-info';
    divInfo.textContent = `Vencimento: ${formatarData(conta.dataVencimento)}`;
    if (conta.pago) {
        const spanPago = document.createElement('span');
        spanPago.textContent = ' (Pago)';
        spanPago.style.color = '#2ecc71';
        divInfo.appendChild(spanPago);
    }
    else if (conta.atrasado) {
        const spanAtraso = document.createElement('span');
        spanAtraso.textContent = ' (Atrasado)';
        spanAtraso.style.color = '#e74c3c';
        divInfo.appendChild(spanAtraso);
    }
    divConta.appendChild(divTitulo);
    divConta.appendChild(divProgressContainer);
    divConta.appendChild(divInfo);
    return divConta;
}
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}
function inicializar() {
    return __awaiter(this, void 0, void 0, function* () {
        const contas = yield carregarContas();
        const container = document.getElementById('contas-container');
        if (container && contas.length > 0) {
            contas.forEach(conta => {
                container.appendChild(criarElementoConta(conta));
            });
        }
        else if (container) {
            container.textContent = 'Nenhuma conta encontrada.';
        }
    });
}
document.addEventListener('DOMContentLoaded', inicializar);
// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
// Aplica o tema salvo
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle)
        themeToggle.textContent = '☀️ Light Mode';
}
// Alternância de tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        if (activeTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });
}
