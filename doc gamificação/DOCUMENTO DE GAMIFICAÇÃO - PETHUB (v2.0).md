# **DOCUMENTO DE GAMIFICAÇÃO: PETHUB (v2.0)**

**Status:** Validado para Sustentabilidade Financeira

**Versão:** 2.0 (Ajuste de ROI e UI/UX)

## **I. FILOSOFIA E PRINCÍPIOS FUNDAMENTAIS**

### **1.1 Objetivo Estratégico**

Transformar obrigações de cuidado pet em comportamentos recompensadores e viciantes, criando um ciclo de feedback positivo onde o bem-estar do animal gera valor tangível para o tutor, garantindo ao mesmo tempo que o custo das recompensas seja coberto pelo LTV (Lifetime Value) do usuário.

### **1.2 Princípios Anti-Fraude ("Zero Trust")**

* **"Nenhum ponto sem prova":** Fotos, localização (GPS), timestamps e validação de terceiros são obrigatórios para ações de alto valor.  
* **Limite de Frequência:** Travas rígidas de sistema para impedir "farm" de pontos (repetição excessiva).  
* **Auditoria Humana:** Ações que geram prêmios físicos passam por review manual antes da liberação.  
* **Sistema de Reputação:** Usuários reportados ou com comportamento de bot têm pontuação congelada.

### **1.3 Distinção Estratégica: Free vs Premium**

Para garantir a sustentabilidade financeira, as recompensas são separadas pela natureza do custo:

* **Usuário Free:** Tem acesso a **Soft Rewards** (Descontos, Conteúdo Digital, Badges, Status). São recompensas que não geram custo direto de caixa para o app.  
* **Usuário Premium:** Tem acesso exclusivo a **Hard Rewards** (Produtos Físicos, Vouchers Monetários, Serviços Pagos). A mensalidade subsidia esses custos.  
* **Acelerador:** Premium ganha **1.5x** pontos em todas as ações.

---

## **II. SISTEMA DE PONTUAÇÃO "PET SCORE"**

**Unidade:** Patinhas (🐾)

**Valor Percebido Estimado:** 1.000 🐾 ≈ R$ 5,00 a R$ 8,00 (em valor de troca/produtos).

### **2.1 Tabela Geral de Pontuação (Balanceada)**

| Ação | Free | Premium | Frequência | Prova Requerida |
| :---- | :---- | :---- | :---- | :---- |
| **Registrar vacina** | 50 🐾 | 75 🐾 | 2x/ano por tipo | Foto carteira \+ Lote \+ Data |
| **Agendar consulta** | 10 🐾 | 15 🐾 | 1x/mês | Integração ou Print |
| **Comparecer consulta (Check-in)** | **100 🐾** | **150 🐾** | \- | GPS na clínica (Obrigatório) |
| **Ler dica rápida** | 2 🐾 | 3 🐾 | 3x/dia | Scroll até o fim \+ 30s tela |
| **Doar para abrigo** | 50 🐾 | 75 🐾 | 1x/mês | Comprovante fiscal |
| **Banho e Tosa (Check-in)** | 30 🐾 | 45 🐾 | 2x/mês | Foto fiscal/recibo |
| **Avaliar serviço** | 10 🐾 | 15 🐾 | 1x/serviço | Texto \> 15 caracteres |
| **Indicar amigo (Cadastro)** | 10 🐾 | 15 🐾 | 5x/mês | Amigo valida e-mail |
| **Indicar amigo (Assinou Premium)** | **300 🐾** | **500 🐾** | Ilimitado | Pagamento confirmado |
| **Completar perfil 100%** | 50 🐾 | 75 🐾 | Único | Todos os dados preenchidos |
| **Reportar animal abandonado** | 50 🐾 | 75 🐾 | 2x/mês | Foto \+ GPS (Validado) |
| **Manter peso atualizado** | 20 🐾 | 30 🐾 | 1x/mês | Foto do pet na balança |

### **2.2 Decaimento de Pontos (Anti-Spam)**

Para evitar abusos, ações repetidas perdem valor rapidamente dentro do mesmo período.

**Fórmula:** pontos\_recebidos \= base\_pontos \* (0.5 ^ (repeticoes \- 1))

* *Exemplo:* 1ª foto no fórum \= 5 pts; 2ª foto \= 2 pts; 3ª foto \= 1 pt.

---

## **III. NÍVEIS E PROGRESSÃO VISUAL (UI/UX)**

### **3.1 Tabela de Níveis**

O progresso segue uma curva exponencial, tornando o início rápido e os níveis altos desafiadores.

| Nível | Patinhas Totais | Benefício Desbloqueado |
| :---- | :---- | :---- |
| **Filhote** | 0 🐾 | Acesso básico ao app |
| **Adulto I** | 800 🐾 | Desbloqueia Marketplace de Cupons |
| **Adulto II** | 2.500 🐾 | Badge "Tutor Dedicado" no perfil |
| **Sênior I** | 6.000 🐾 | Acesso a Sorteios Mensais |
| **Sênior II** | 12.000 🐾 | **Status VIP** (Suporte priorizado) |
| **Pet Lenda** | 30.000 🐾 | Hall da Fama \+ Kit Físico Exclusivo |

### **3.2 UI/UX: A Barra de Progresso Gratificante**

Como a jornada para prêmios físicos é longa, a UI deve recompensar o progresso micro.

* **Sub-níveis (Milestones):** A barra de nível principal é dividida em 5 fragmentos. Ao completar 20%, o usuário ganha um "Baú Surpresa" (animação na tela \+ recompensa simbólica, ex: 10 pts bônus ou um sticker digital).  
* **Feedback Visual:** Ao ganhar pontos, as patinhas devem "voar" para a barra, que brilha e emite som satisfatório.  
* **Reforço Positivo:** Mensagens como *"Falta pouco para seu cupom de banho\!"* em vez de *"Faltam 5.000 pontos"*.

---

## **IV. SISTEMA DE MISSÕES**

### **4.1 Missões Permanentes (Gamificação de Longo Prazo)**

| Missão | Requisito | Recompensa (Free / Premium) |
| :---- | :---- | :---- |
| **Imunidade Total** | Registrar 3 vacinas essenciais no ano | 200 / 300 🐾 \+ Badge "Imune" |
| **Influencer Pet** | 5 amigos cadastrados e ativos | 300 / 450 🐾 \+ 1 mês Premium |
| **Check-up Anual** | 1 Check-in em Vet \+ 1 Exame registrado | 250 / 375 🐾 \+ Badge "Saudável" |
| **Guardião** | Doar 3x para abrigos parceiros | 400 / 600 🐾 \+ Destaque no Perfil |

---

## **V. MARKETPLACE DE RECOMPENSAS (Sustentabilidade)**

A sustentabilidade do app depende desta tabela. Prêmios que custam dinheiro real ("Hard Rewards") são precificados para exigir retenção alta do usuário.

### **5.1 Tabela de Resgate**

| Prêmio | Custo (🐾) | Tipo | Disponibilidade | Custo Real Est. (App) |
| :---- | :---- | :---- | :---- | :---- |
| **Cupom 10% (Parceiros)** | 300 🐾 | Soft | Todos | R$ 0,00 |
| **E-book: Receitas Pet** | 600 🐾 | Soft | Todos | R$ 0,00 |
| **Badge "Super Doador"** | 800 🐾 | Soft | Todos | R$ 0,00 |
| **1 Mês Premium** | 4.000 🐾 | Soft | Apenas Free | Custo Oportunidade |
| \*\*Doação (R$ 5,00)\*\* | 1.000 🐾 | Hard | Todos | R$ 5,00 |
| **Brinquedo Pet (Pequeno)** | **6.500 🐾** | Hard | **Premium Only** | \~R$ 15,00 \+ Frete |
| **Kit Banho (Shampoo+)** | **8.000 🐾** | Hard | **Premium Only** | \~R$ 25,00 \+ Frete |
| \*\*Voucher R$ 50 Consultas\*\* | **9.000 🐾** | Hard | **Premium Only** | R$ 50,00 |
| **Ensaio Fotográfico** | **15.000 🐾** | Hard | **Premium Only** | Parceria/Permuta |
| **Fim de Semana Pet Hotel** | **35.000 🐾** | Hard | Sorteio/Premium | R$ 200,00+ |

**Regra de Trava (Lock-in):**

* Para resgatar qualquer item físico (Hard Reward), o usuário deve ter **mínimo de 3 meses de assinatura Premium ativa** ou histórico de 6 meses de uso contínuo comprovado.

---

## **VI. SISTEMA ANTI-FRAUDE TÉCNICO**

### **6.1 Camadas de Segurança**

1. **Geofencing:** Check-ins em veterinários/petshops só são validados se a geolocalização do dispositivo estiver a menos de 50 metros do estabelecimento cadastrado no Google Maps.  
2. **Validação de Imagem (IA/OCR):** O sistema analisa fotos enviadas buscando metadados e textos. Fotos duplicadas (hash check) ou baixadas da internet são rejeitadas automaticamente.  
3. **Análise de Padrão:** Contas que acumulam o limite máximo de pontos por 3 dias seguidos entram em "Shadowban" para revisão humana.

---

## **VII. ANÁLISE DE ROI (Unit Economics)**

### **7.1 Cenário do Usuário Premium Típico**

* **Receita Gerada:** R$ 19,90/mês x 12 \= \*\*R$ 238,80/ano\*\*.  
* **Pontos Acumulados:** Média de 400 a 600 🐾/mês (uso normal sem "grind"). Total anual: \~6.000 🐾.  
* **Custo de Resgate:** Com 6.000 pontos, o usuário pode resgatar um Brinquedo (Custo R$ 15,00) ou acumular mais 6 meses para o Voucher de R$ 50,00.  
* **Margem de Lucro:** Receita (R$ 238\) \- Custo Prêmios (R$ 15 a R$ 50\) \= **Lucro positivo.**

### **7.2 Estratégia de Parcerias (B2B)**

O objetivo é reduzir o custo dos "Hard Rewards" para zero através de parcerias.

* *Voucher R$ 50 Consulta:* Negociar com clínicas como CAC (Custo de Aquisição de Cliente). A clínica dá o desconto para receber um cliente novo do App. Se a parceria for firmada, o custo para o app é zero.

---

## **VIII. DOCUMENTAÇÃO TÉCNICA (Backend)**

### **8.1 Estrutura do Banco de Dados (Sugestão SQL)**

SQL  
\-- Tabela de Carteira de Pontos  
CREATE TABLE wallet\_points (  
  user\_id UUID REFERENCES users(id),  
  balance\_current INTEGER DEFAULT 0, \-- Saldo atual para gastar  
  balance\_lifetime INTEGER DEFAULT 0, \-- Total histórico (para nível)  
  last\_activity TIMESTAMP,  
  is\_frozen BOOLEAN DEFAULT FALSE \-- Trava anti-fraude  
);

\-- Tabela de Histórico (Ledger \- Razão)  
CREATE TABLE points\_ledger (  
  id UUID PRIMARY KEY,  
  user\_id UUID,  
  action\_type VARCHAR(50), \-- ex: 'VACINA', 'CHECKIN\_VET'  
  amount INTEGER,  
  source\_proof VARCHAR(255), \-- URL da foto ou coordenadas GPS  
  is\_premium\_bonus BOOLEAN DEFAULT FALSE,  
  status VARCHAR(20) DEFAULT 'PENDING', \-- PENDING, APPROVED, REJECTED  
  created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Tabela de Resgates  
CREATE TABLE redemptions (  
  id UUID PRIMARY KEY,  
  user\_id UUID,  
  reward\_id UUID,  
  points\_cost INTEGER,  
  monetary\_cost DECIMAL(10,2), \-- Custo para o App (controle interno)  
  status VARCHAR(20),  
  shipped\_at TIMESTAMP  
);  
