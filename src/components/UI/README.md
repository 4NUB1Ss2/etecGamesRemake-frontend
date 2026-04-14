# ETECGames — Design System

## Estrutura

```
src/
  tokens.css          ← variáveis CSS globais (cores, fontes, espaços)
  components.css      ← classes CSS reutilizáveis
  components/
    UI/
      index.jsx       ← componentes React prontos
      ui.css          ← importa tokens + components
```

---

## Setup

No seu `main.jsx`, importe os tokens e componentes globais:

```jsx
import './tokens.css'
import './components.css'
```

---

## Componentes disponíveis

```jsx
import { Btn, Input, Textarea, Badge, Avatar, GameCard, GameCardSkeleton,
         Card, Alert, Spinner, EmptyState, SectionHeader } from '../components/UI'
```

### Btn
```jsx
<Btn variant="primary" size="lg" onClick={fn}>Publicar jogo</Btn>
<Btn variant="outline">Cancelar</Btn>
<Btn variant="ghost" size="sm">Ver mais</Btn>
<Btn variant="danger">Deletar</Btn>
<Btn disabled><Spinner /> Salvando...</Btn>
```

### Input / Textarea
```jsx
<Input label="Nome do jogo" placeholder="Ex: Shadow Quest" value={v} onChange={fn} />
<Input label="E-mail" error="E-mail inválido" />
<Textarea label="Descrição" rows={4} value={v} onChange={fn} />
```

### Badge
```jsx
<Badge variant="purple">Aluno</Badge>
<Badge variant="blue">🏫 ETEC Centro</Badge>
<Badge variant="green">Publicado</Badge>
<Badge variant="red">Inativo</Badge>
```

### Avatar
```jsx
<Avatar name="João Silva" size="lg" />          // placeholder com inicial
<Avatar name="João" src={url} size="xl" />      // com foto
// sizes: sm (32px) | md (48px) | lg (80px) | xl (110px)
```

### GameCard / GameCardSkeleton
```jsx
<GameCard game={game} onClick={() => navigate(`/games/${game.id}`)} />
<GameCardSkeleton />   // para loading
```

### Card
```jsx
<Card>conteúdo simples</Card>
<Card hover>card com hover animado</Card>
```

### Alert
```jsx
<Alert variant="error">Erro ao salvar</Alert>
<Alert variant="success">Jogo publicado!</Alert>
```

### Spinner
```jsx
<Spinner />
// ex: dentro de um botão
<Btn disabled><Spinner /> Carregando...</Btn>
```

### EmptyState
```jsx
<EmptyState
  icon="🎮"
  title="Sem jogos ainda"
  desc="Publique seu primeiro jogo para aparecer aqui"
  action={<Btn variant="primary" onClick={fn}>+ Publicar jogo</Btn>}
/>
```

### SectionHeader
```jsx
<SectionHeader title="🕹️ Últimos Lançamentos" action={<Btn size="sm">Ver todos</Btn>} />
```

---

## Classes CSS utilitárias

### Layout
```css
.page          /* fundo bg + padding-top navbar */
.page-deep     /* fundo bg-deep */
.container     /* max-width 1200px centralizado */
.container-sm  /* max-width 720px */
```

### Decoração
```css
.glow-purple   /* radial gradient roxo */
.grid-pattern  /* grid de linhas sutis */
.divider       /* linha separadora */
```

### Skeleton
```css
.skeleton           /* animação shimmer */
.skeleton-circle    /* circular */
.skeleton-text      /* linha de texto */
.skeleton-title     /* linha de título */
.skeleton-img       /* aspect-ratio 16:9 */
```

---

## Variáveis CSS (tokens)

### Cores
```css
var(--bg)            /* #0f1117 fundo */
var(--surface)       /* #13151f cards */
var(--surface-2)     /* #1c1e2e bordas */
var(--purple)        /* #6e42ca primária */
var(--purple-light)  /* #a67eec accent */
var(--text)          /* #f0f0f8 texto principal */
var(--text-muted)    /* #7b7f96 secundário */
var(--text-faint)    /* #555878 terciário */
```

### Espaçamento
```css
var(--space-2)  /* 8px  */
var(--space-4)  /* 16px */
var(--space-6)  /* 24px */
var(--space-8)  /* 32px */
var(--space-12) /* 48px */
var(--space-16) /* 64px */
```

### Bordas
```css
var(--radius-sm)   /* 6px  */
var(--radius-md)   /* 8px  */
var(--radius-lg)   /* 12px */
var(--radius-xl)   /* 16px */
var(--radius-full) /* 100px (pills) */
```