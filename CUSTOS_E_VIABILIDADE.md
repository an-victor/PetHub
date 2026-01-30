# Relatório de Viabilidade Técnica e Custos - PetHub
**Data:** 26/01/2026
**Objetivo:** Levantamento de funcionalidades, infraestrutura e custos operacionais para validação do modelo de negócio (Assinatura R$ 19,90/mês).

---

## 1. Infraestrutura Atual (Fase MVP)
Atualmente, o PetHub está construído para operar com **Custo Zero** inicial, utilizando as camadas gratuitas (Free Tier) de serviços modernos.

| Componente | Tecnologia | Custo Atual | Limites do Plano Gratuito |
| :--- | :--- | :--- | :--- |
| **Frontend/Hospedagem** | Vercel | R$ 0,00 | 100GB de banda/mês (aprox. 50k a 100k acessos). |
| **Banco de Dados** | Supabase (PostgreSQL) | R$ 0,00 | 500MB de dados. (Suficiente para ~10k usuários iniciais sem imagens pesadas). |
| **Autenticação** | Clerk | R$ 0,00 | 10.000 usuários ativos mensais (MAU). |
| **Mapas & Localização** | Leaflet + OpenStreetMap | R$ 0,00 | Uso ilimitado (política de uso justo, sem cobrança por visualização). |
| **Imagens** | Supabase Storage | R$ 0,00 | 1GB de armazenamento. |

**Status**: O app é **100% funcional** hoje sem custos fixos mensais.

---

## 2. Funcionalidades Planejadas (Avançadas)
Para atingir o nível "Premium" desejado (dados reais do Google, fotos atualizadas de locais), é necessário integrar APIs pagas.

### A. Google Maps Platform (O Grande Custo)
Para mostrar o "Google Maps Real" e dados de estabelecimentos ("Google Meu Negócio").

1.  **Maps JavaScript API**: Para mostrar o mapa oficial do Google no fundo (ao invés do OpenStreetMap).
    *   *Custo*: ~$7.00 USD (R$ 40,00) a cada 1.000 carregamentos de mapa.
    *   *Crédito Grátis*: O Google dá $200/mês (cobre ~28.000 carregamentos).

2.  **Places API (New)**: Para buscar "Veterinários próximos", pegar fotos, telefone, horário de funcionamento e avaliações.
    *   *Custo (Busca de Texto)*: ~$17.00 USD a cada 1.000 requisições. (Busca básica).
    *   *Custo (Detalhes do Local - Foto, Site, Tel)*: ~$17.00 USD adicionais a cada 1.000 requisições.
    *   *Impacto*: Cada vez que um usuário abre a tela "Veterinários" e o app carrega 10 clínicas com fotos, isso conta como requisições.

### B. Scraping vs API Oficial
Você mencionou "Scraping" (raspar dados) do Google Meu Negócio.
*   **Risco**: O Google bloqueia agressivamente raspagem de dados. Manter um scrapper funcionando exige proxys e manutenção constante, o que pode sair mais caro que a API oficial em pequena escala, além de ser instável.
*   **Recomendação**: Usar a **Places API Oficial** com cache inteligente (guardar os dados no seu banco para não pagar duas vezes pela mesma clínica).

---

## 3. Cenários de Custo vs. Receita
Considerando a assinatura de **R$ 19,90/mês**.

### Cenário 1: Uso Ingênuo (Sem Otimização)
Usuário abre o app todo dia, carrega o mapa do Google e busca clínicas.
*   Custos de API por usuário/mês: Podem chegar a R$ 5,00 - R$ 10,00 facilmente se ele usar muito o mapa.
*   Margem: Baixa ou Negativa.

### Cenário 2: Otimizado (Híbrido - Recomendado)
*   **Mapa Visual**: Continuar usando **OpenStreetMap/Leaflet** (Custo Zero). O usuário vê o mapa, mas os dados vêm do seu banco ou do Google Places apenas quando necessário.
*   **Dados de Veterinários**:
    1.  O app busca no Google Places **uma única vez** por região e salva no **Supabase**.
    2.  Quando o usuário busca, ele lê do **Supabase** (Custo Zero).
    3.  Atualizamos os dados apenas 1x por semana ou mês.
    *   Isso derruba o custo da API do Google para centavos por usuário.

---

## 4. Estratégias para Redução de Custo (Mantendo R$ 19,90)

1.  **Cache de Places (Ouro)**:
    *   Ao invés de o usuário chamar o Google toda vez, seu servidor chama o Google, pega a lista de "Vets em Curitiba", salva no banco de dados e serve para todos os usuários de Curitiba.
    *   *Economia*: 99%.

2.  **Mapas Híbridos**:
    *   Use o visual do **Mapbox** ou **OpenStreetMap** (que são muito mais baratos ou grátis) e plote os pinos dos veterinários em cima. O usuário quer *encontrar o vet*, ele não se importa se o fundo do mapa é Google ou OSM, desde que seja bonito e preciso.

3.  **Supabase Pro**:
    *   Quando passar de 10.000 usuários, você pagará ~$25 USD/mês fixo no Supabase. Isso é irrelevante se você tiver 10k assinantes (Faturamento R$ 200k).

## 5. Conclusão para a IA Financeira
Para pedir o cálculo, use o seguinte prompt:

> "Considere um app SaaS B2C com assinatura de R$ 19,90.
> **Custos Fixos de Infra**: R$ 150,00/mês (Supabase Pro + Vercel Pro - futuro).
> **Custos Variáveis (API Google)**: Otimizado para R$ 0,50 por usuário ativo/mês (usando cache de Places API e Mapas OpenSource).
> **Impostos/Taxas Pagamento**: ~10% (Gateway + NF).
>
> Calcule o Ponto de Equilíbrio (Break-even) e a margem de lucro com 1.000, 5.000 e 10.000 usuários."
