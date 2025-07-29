# Sistema de Componentes Customizados de Filtro

## Visão Geral

O sistema permite criar componentes customizados para renderizar itens de filtro com layouts específicos, em vez de usar o layout padrão simples.

## Como Usar

### 1. Definindo um Filtro com Componente Customizado

```typescript
new SelectFilter({
  entity: "provas",
  label: "Provas",
  queryField: "id_prova",
  idParamName: "provas_id",
  labelParamName: "provas_nome", // Não usado no componente customizado
  labelFields: ["estados_nome", "instituicoes_nome", "provas_ano"], // Campos disponíveis
  customComponent: "ProvaFilterItem", // Nome do componente customizado
})
```

### 2. Criando um Componente Customizado

```typescript
// ProvaFilterItem.tsx
import clsx from "clsx/lite";

type ProvaFilterItemProps = {
  opt: any; // Dados completos da API
  selected: any;
  filterKey?: string;
  optionId?: string;
  onToggleChild: (filterKey: any, childId: any) => any;
  selectionMode?: "multi" | "single";
};

export default function ProvaFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  onToggleChild,
  selectionMode = "multi",
}: ProvaFilterItemProps) {
  if(!filterKey || !optionId) {
    return null;
  }

  const isSelected = selected[filterKey].includes(opt[optionId]);

  return (
    <div className="custom-checkbox">
      <label>
        <input
          type={selectionMode === "single" ? "radio" : "checkbox"}
          name={selectionMode === "single" ? filterKey : undefined}
          checked={isSelected}
          onChange={() => onToggleChild(filterKey, opt[optionId])}
        />
        <span className={clsx("checkmark", isSelected && "checked")}></span>
      </label>
      
      {/* Layout customizado */}
      <div className="prova-label">
        <p className="institution">
          {opt.estados_nome}: {opt.instituicoes_nome}
        </p>
        <p className="acronym">(FMUSP)</p>
        <p className="year">Prova de {opt.provas_ano}</p>
      </div>
    </div>
  );
}
```

### 3. Registrando o Componente

Adicione o componente ao registry em `CustomFilterComponents.tsx`:

```typescript
import ProvaFilterItem from "./ProvaFilterItem";

export const customFilterComponents = {
  "ProvaFilterItem": ProvaFilterItem,
  "DefaultFilterItem": SimpleFilterItem,
};
```

## Estrutura de Dados

### API Response Example
```json
{
  "provas_id": "2",
  "instituicoes_nome": "Universidade de São Paulo",
  "provas_ano": "2025",
  "estados_nome": "SP"
}
```

### Componente Recebe
- `opt`: **Objeto completo da API** (quando `customComponent` está definido)
- `selected`: Estado atual das seleções
- `filterKey`: Chave do filtro
- `optionId`: Campo ID da opção
- `onToggleChild`: Função para alternar seleção
- `selectionMode`: "multi" ou "single"

### Comportamento dos Dados

**Com Componente Customizado:**
```typescript
// Todos os campos da API são preservados
opt = {
  "provas_id": "2",
  "instituicoes_nome": "Universidade de São Paulo", 
  "provas_ano": "2025",
  "estados_nome": "SP",
  "isParent": false
}
```

**Sem Componente Customizado (Padrão):**
```typescript
// Apenas campos específicos são preservados
opt = {
  "provas_id": "2",
  "provas_nome": "Prova USP 2025",
  "isParent": false
}
```

## Vantagens

1. **Flexibilidade Total**: Controle completo sobre a UI
2. **Dados Completos**: Acesso a todos os campos da API
3. **Reutilização**: Componentes podem ser reutilizados
4. **Backward Compatible**: Não quebra filtros existentes
5. **Estilização Independente**: Cada componente pode ter seu CSS

## Exemplo de Uso Completo

```typescript
// Em um wrapper de filtro
const filterDefinitions = [
  new SelectFilter({
    entity: "provas",
    label: "Provas",
    queryField: "id_prova",
    idParamName: "provas_id",
    labelParamName: "provas_nome",
    labelFields: ["estados_nome", "instituicoes_nome", "provas_ano"],
    customComponent: "ProvaFilterItem",
  }),
];
``` 