# Estratégia de Branches

Este documento descreve a estratégia de branches utilizada no projeto.

## Branches Principais

- `main` - Contém o código de produção. Protegido contra pushes diretos.
- `develop` - Branch de integração para features. Todas as features são mescladas aqui antes de irem para produção.

## Branches de Suporte

### Feature Branches
- **Formato**: `feature/nome-da-feature`
- **Exemplo**: `feature/autenticacao-usuario`
- **Uso**: Desenvolvimento de novas funcionalidades
- **Merge**: Para `develop` via Pull Request

### Bugfix Branches
- **Formato**: `bugfix/descricao-do-bug`
- **Exemplo**: `bugfix/corrigir-calculo-saldo`
- **Uso**: Correção de bugs na branch `develop`
- **Merge**: Para `develop` via Pull Request

### Hotfix Branches
- **Formato**: `hotfix/descricao-do-hotfix`
- **Exemplo**: `hotfix/corrigir-erro-critico`
- **Uso**: Correções críticas na produção
- **Merge**: Para `main` e `develop` via Pull Request

### Release Branches
- **Formato**: `release/versao`
- **Exemplo**: `release/1.0.0`
- **Uso**: Preparação de uma nova versão de produção
- **Merge**: Para `main` e `develop`

## Workflow Básico

1. Crie uma branch a partir de `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nova-funcionalidade
   ```

2. Desenvolva sua feature, fazendo commits atômicos

3. Atualize sua branch com as últimas mudanças
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/nova-funcionalidade
   git merge develop
   ```

4. Abra um Pull Request para `develop`

5. Após aprovação e merge, delete a branch da feature

## Convenções de Commit

Utilize o padrão Conventional Commits:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc (não altera código)
- `refactor`: Refatoração de código
- `test`: Adicionando testes
- `chore`: Atualização de tarefas, configuração do projeto, etc

Exemplo:
```
feat: adiciona autenticação de usuário
fix: corrige cálculo de saldo na dashboard
```
