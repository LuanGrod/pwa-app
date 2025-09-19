# ## 📋 Progresso Geral
- [x] **Task 1**: Criar Sistema de Condições *(4/4 subtasks)* ✅
- [x] **Task 2**: Estender Sistema de Configuração *(4/4 subtasks)* ✅
- [x] **Task 3**: Criar Hook useConditionalVisibility *(4/4 subtasks)* ✅
- [x] **Task 4**: Modificar useForm para Suporte Condicional *(3/3 subtasks)* ✅
- [x] **Task 5**: Atualizar Componente Form *(3/3 subtasks)* ✅
- [x] **Task 6**: Criar Classes Prebuilt Específicas *(4/4 subtasks)* ✅
- [x] **Task 7**: Implementar FormularioPergunta Template *(3/3 subtasks)* ✅
- [ ] **Task 8**: Criar Componentes Especializados para Escala Linear *(0/4 subtasks)*ação de Campos Condicionais - TODO

---

## Task 1: Criar Sistema de Condições 🎯 ✅
**Objetivo**: Implementar interfaces e tipos para definir condições específicas para formulários

### Subtasks:
- [x] **1.1** Criar tipo `FormConditionalOperator` específico para formulários (`eq`, `neq`) ✅
- [x] **1.2** Criar interface `FieldCondition` para definir condições de campos ✅
- [x] **1.3** Criar type `ConditionalConfig` para configuração simplificada ✅
- [x] **1.4** Documentar tipos criados com exemplos de uso ✅

### Entregáveis:
```typescript
// ✅ global/type/form/conditional/FormConditionalOperator.ts
export type FormConditionalOperator = "eq" | "neq";

// ✅ global/form/conditional/FieldCondition.ts
interface FieldCondition {
  dependsOn: string;
  operator: FormConditionalOperator;
  value: string | number;
}

// ✅ global/type/form/conditional/ConditionalConfig.ts
type ConditionalConfig = 
  | { condition: FieldCondition; conditions?: never }
  | { conditions: FieldCondition[]; condition?: never };
```

---

## Task 2: Estender Sistema de Configuração 🔧 ✅
**Objetivo**: Modificar classes existentes para suportar condições

### Subtasks:
- [x] **2.1** Estender `AbstractItem` com propriedade `condition?: FieldCondition` ✅
- [x] **2.2** Modificar `ItemDef` type para incluir condições ✅
- [x] **2.3** Implementar método `evaluateCondition(formValues: object): boolean` na `AbstractItem` ✅
- [x] **2.4** Atualizar classes prebuilt existentes para aceitar condições ✅

### Entregáveis:
```typescript
// ✅ ItemDef atualizado com condition
export type ItemDef = {
  // ... propriedades existentes
  condition?: FieldCondition | null;
};

// ✅ AbstractItem com suporte a condições
abstract class AbstractItem {
  public condition: FieldCondition | null = null;
  
  // Método para avaliar condições
  evaluateCondition(formValues: { [key: string]: string | number }): boolean {
    if (!this.condition) return true;
    
    const { dependsOn, operator, value } = this.condition;
    const dependentValue = formValues[dependsOn];
    
    switch (operator) {
      case "eq": return dependentValue === value;
      case "neq": return dependentValue !== value;
      default: return false;
    }
  }
}

// ✅ Classes prebuilt atualizadas (Email, Senha, etc.)
```

---

## Task 3: Criar Hook useConditionalVisibility ⚡ ✅
**Objetivo**: Gerenciar visibilidade de campos com base em condições

### Subtasks:
- [x] **3.1** Criar arquivo `useConditionalVisibility.ts` ✅
- [x] **3.2** Implementar lógica de avaliação de condições ✅
- [x] **3.3** Retornar array de campos visíveis filtrado ✅
- [x] **3.4** Otimizar com `useMemo` baseado em valores de dependência ✅

### Entregáveis:
```typescript
// ✅ useConditionalVisibility.ts - Hook principal
function useConditionalVisibility(
  items: ItemInterface[],
  formValues: { [key: string]: string | number }
): ItemInterface[]

// ✅ useConditionalVisibilityWithStats.ts - Hook com estatísticas
function useConditionalVisibilityWithStats(
  items: ItemInterface[],
  formValues: { [key: string]: string | number }
): {
  visibleItems: ItemInterface[];
  totalItems: number;
  hiddenItems: number;
  conditionalItems: number;
}

// ✅ useOptimizedConditionalVisibility.ts - Hook otimizado
function useOptimizedConditionalVisibility(
  items: ItemInterface[],
  formValues: { [key: string]: string | number }
): ItemInterface[]

// ✅ useFormValues.ts - Hook auxiliar para valores
function useFormValues(
  items: Item[],
  itemsConfig: any[]
): { [key: string]: string | number }

// ✅ useDependencyMapping.ts - Hook para debugging
function useDependencyMapping(
  items: ItemInterface[]
): { [dependentField: string]: string[] }
```

### Funcionalidades Implementadas:
- ✅ **Filtragem Condicional**: Remove campos que não atendem às condições
- ✅ **Performance Otimizada**: `useMemo` baseado em dependências específicas  
- ✅ **Debug Support**: Logs e estatísticas para desenvolvimento
- ✅ **Dependency Tracking**: Mapeamento de dependências entre campos
- ✅ **Type Safety**: Fortemente tipado com interfaces atualizadas

---

## Task 4: Modificar useForm para Suporte Condicional 🔄 ✅
**Objetivo**: Integrar visibilidade condicional no hook principal

### Subtasks:
- [x] **4.1** Integrar `useConditionalVisibility` no `useForm` ✅
- [x] **4.2** Coletar apenas valores de campos visíveis na submissão ✅
- [x] **4.3** Garantir que mudanças em selects triggem re-avaliação ✅

### Entregáveis:
```typescript
// ✅ useForm.ts - Hook principal atualizado
export function useForm<T>(itemsConfig, submitHandler, id?) {
  const formValues = useFormValues(items, itemsConfig);
  const visibleItemsConfig = useConditionalVisibility(itemsConfig, formValues);
  const visibleItems = // ... filtered items
  
  return { 
    items: visibleItems,      // Only visible items
    allItems: items,          // All items for debugging
    visibleItemsConfig,       // Visible configurations
    formValues,               // Current form values
    handleSubmit,             // Updated submit handler
    submitReturn, 
    loading 
  };
}

// ✅ useOptimizedForm.ts - Hook otimizado para performance
export function useOptimizedForm<T>(itemsConfig, submitHandler, id?) {
  // Performance-optimized implementation with:
  // - Memoized visible items mapping
  // - Optimized conditional visibility
  // - Callback-based submit handler
  // - Helper functions and statistics
}

// ✅ useConditionalDependencyTracker.ts - Tracking de mudanças
export function useConditionalDependencyTracker(
  items: ItemInterface[],
  formValues: { [key: string]: string | number },
  onDependencyChange?: (fieldName, newValue, oldValue) => void
)

// ✅ useSelectDependencyTracker.ts - Tracking específico para selects
export function useSelectDependencyTracker(
  items: ItemInterface[],
  formValues: { [key: string]: string | number }
): { forceReEvaluation: () => void }
```

### Funcionalidades Implementadas:
- ✅ **Integração Completa**: useForm agora suporta campos condicionais
- ✅ **Submissão Otimizada**: Apenas campos visíveis são validados e enviados
- ✅ **Re-avaliação Automática**: Mudanças em selects triggem re-avaliação
- ✅ **Performance Otimizada**: useOptimizedForm para formulários grandes
- ✅ **Dependency Tracking**: Rastreamento inteligente de mudanças
- ✅ **Debug Support**: Logs e estatísticas para desenvolvimento
- ✅ **Helper Functions**: getFieldValue, isFieldVisible, etc.
- ✅ **Error Handling**: Tratamento robusto de erros na submissão

---

## Task 5: Atualizar Componente Form 🎨 ✅
**Objetivo**: Renderizar apenas campos visíveis

### Subtasks:
- [x] **5.1** Modificar componente `Form` para usar campos filtrados ✅
- [x] **5.2** Implementar chaves únicas para evitar bugs de estado ✅
- [x] **5.3** Garantir limpeza de estado quando campos ficam invisíveis ✅

### Entregáveis:
```typescript
// ✅ Form.tsx - Componente principal atualizado
function Form<T>({ 
  formConfig, 
  submitHandler, 
  id, 
  submitLabel = "ENTRAR",
  enableConditionalFields = true  // New prop to enable/disable
}: FormProps) {
  const { items, visibleItemsConfig, handleSubmit, submitReturn, loading } = useForm<T>(
    formConfig.getItems(), 
    submitHandler, 
    id
  );

  const renderingItems = enableConditionalFields ? visibleItemsConfig : formConfig.getItems();
  
  return (
    <form onSubmit={handleSubmit}>
      {renderingItems.map((config, idx) => {
        const itemHook = items[idx];
        if (!itemHook) return null;

        return React.createElement(config.getItemType(), {
          key: `${config.getName()}-${idx}`, // Unique keys
          ...config.getItemProps(formConfig, itemHook)
        });
      })}
      // ... rest of component
    </form>
  );
}

// ✅ OptimizedForm.tsx - Componente otimizado
function OptimizedForm<T>({
  formConfig,
  submitHandler,
  showStats = false,  // Debug statistics
  onFieldVisibilityChange  // Callback for visibility changes
}: OptimizedFormProps) {
  // Advanced optimizations with useOptimizedForm
  // Automatic state cleanup tracking
  // Debug statistics display
}

// ✅ FormWithStateCleanup.tsx - Componente para limpeza de estado
export function useFieldStateCleanup(
  visibleItems: ItemInterface[],
  allItems: Item[],
  allItemsConfig: ItemInterface[]
) {
  // Automatically clears state when fields become invisible
  // Prevents inconsistent form state
}
```

### Funcionalidades Implementadas:
- ✅ **Renderização Condicional**: Apenas campos visíveis são renderizados
- ✅ **Backward Compatibility**: Prop `enableConditionalFields` para ativar/desativar
- ✅ **Chaves Únicas**: Keys com índice para evitar bugs de estado do React
- ✅ **Limpeza de Estado**: Hooks para limpar estado de campos invisíveis
- ✅ **Componente Otimizado**: OptimizedForm com performance melhorada
- ✅ **Debug Support**: Estatísticas de visibilidade em desenvolvimento
- ✅ **Estado Consistente**: Prevenção de vazamentos de estado entre campos
- ✅ **Error Mapping**: Mapeamento correto de erros para campos visíveis

---

## Task 6: Criar Classes Prebuilt Específicas 🧩 ✅
**Objetivo**: Componentes especializados para o caso de uso de perguntas

### Subtasks:
- [x] **6.1** Criar `AlternativeGroup` - grupo de 5 alternativas condicionais ✅
- [x] **6.2** Criar `LinearScaleGroup` - escala dinâmica baseada em min/max ✅
- [x] **6.3** Criar `MetricSelect` - select com unidades predefinidas ✅
- [x] **6.4** Criar `FreeTextDescription` - campo de descrição simples ✅

### Entregáveis:
```typescript
// ✅ AlternativeGroup - Múltipla escolha com escala Likert
import { AlternativeGroup } from "@global/form/item/prebuilt/AlternativeGroup";

const alternativa = new AlternativeGroup({
  entity: "pergunta",
  maxAlternatives: 5,
  condition: {
    dependsOn: "pergunta_tipo_resposta",
    operator: "eq",
    value: "multipla_escolha"
  }
});

// Multiple alternatives with automatic conditional
const alternativas = AlternativeGroup.createMultiple({
  count: 5,
  entity: "pergunta",
  dependsOn: "pergunta_tipo_resposta"
});

// ✅ LinearScaleGroup - Escala dinâmica 0-10
import { LinearScaleGroup } from "@global/form/item/prebuilt/LinearScaleGroup";

const escala = LinearScaleGroup.createConditional({
  minValue: 0,
  maxValue: 10,
  dependsOn: "pergunta_tipo_resposta"
});

// ✅ MetricSelect - Unidades de medida
import { MetricSelect } from "@global/form/item/prebuilt/MetricSelect";

const metrica = MetricSelect.createConditional({
  metricType: "length", // "length" | "weight" | "volume" | "area"
  dependsOn: "pergunta_tipo_resposta"
});

// ✅ FreeTextDescription - Descrição em texto livre
import { FreeTextDescription } from "@global/form/item/prebuilt/FreeTextDescription";

const descricao = FreeTextDescription.createConditional({
  descriptionType: "medium", // "short" | "medium" | "long" | "detailed"
  maxLength: 500,
  minLength: 10,
  dependsOn: "pergunta_tipo_resposta"
});
```

### Funcionalidades Implementadas:

#### AlternativeGroup:
- ✅ **Escala Likert Padrão**: -2 a 2 (Discordo Totalmente → Concordo Totalmente)
- ✅ **Factory Methods**: createConditional(), createMultiple()
- ✅ **Validação de Limite**: Máximo 5 alternativas recomendado
- ✅ **Customização**: setCustomScale() para escalas personalizadas
- ✅ **Conditional Logic**: Automatic condition for "multipla_escolha"

#### LinearScaleGroup:
- ✅ **Escala Dinâmica**: Gera opções baseado em min/max (0-10)
- ✅ **Validação de Limites**: Min 0, Max 10, Range máximo de 10 pontos
- ✅ **Update Dinâmico**: updateScale() regenera opções automaticamente
- ✅ **Escalas Recomendadas**: getRecommendedScales() com configurações padrão
- ✅ **Performance**: Otimizada para scales de até 11 pontos

#### MetricSelect:
- ✅ **Unidades Padrão**: metros, milímetros, quilômetros, gramas
- ✅ **Unidades Estendidas**: incluindo área, volume, peso detalhado
- ✅ **Filtragem por Tipo**: getUnitsByType() para comprimento, peso, volume, área
- ✅ **Símbolos**: getUnitSymbol() converte valores para símbolos (m, kg, L)
- ✅ **Custom Units**: addCustomUnit() para unidades específicas

#### FreeTextDescription:
- ✅ **Tipos de Descrição**: short (150), medium (500), long (1000), detailed (2000)
- ✅ **Validação de Texto**: validateTextLength() com limites configuráveis
- ✅ **Estatísticas**: getTextStatistics() com contagem de palavras, frases, tempo de leitura
- ✅ **Filtragem**: StripTags + Trim para limpeza automática
- ✅ **Placeholder Dinâmico**: Inclui limites de caracteres no placeholder

### Padrões Arquiteturais:
- ✅ **Herança Consistente**: Todas estendem classes base adequadas (Select, Textarea)
- ✅ **Factory Pattern**: Methods estáticos para criação com condições
- ✅ **Configuração Flexível**: Parâmetros opcionais com defaults sensatos
- ✅ **Type Safety**: Interfaces bem definidas para opções e configurações
- ✅ **Performance**: Validações e otimizações para escalas grandes
- ✅ **Extensibilidade**: Métodos para customização e extensão

---

## Task 7: Implementar FormularioPergunta Template 📋 ✅
**Objetivo**: Template específico para formulário de perguntas

### Subtasks:
- [x] **7.1** Criar classe `FormularioPergunta` que estende `Form` ✅
- [x] **7.2** Implementar configuração completa com campos fixos ✅
- [x] **7.3** Adicionar todos os campos condicionais baseados em tipo_resposta ✅

### Entregáveis:
```typescript
// ✅ FormularioPergunta - Template completo para formulários de perguntas
import { FormularioPergunta } from "@global/form/template/FormularioPergunta";

// Formulário simplificado (apenas múltipla escolha e texto livre)
const formularioSimples = FormularioPergunta.createSimplified("questao");

// Formulário completo (todos os tipos e opções avançadas)
const formularioCompleto = FormularioPergunta.createComplete("pergunta");

// Formulário customizado
const formularioCustom = FormularioPergunta.createCustom({
  entity: "avaliacao",
  questionTypes: ["escala_linear", "metrica"],
  includeAdvanced: true,
});

// ✅ FormularioPerguntaComponent - Componente React integrado
import { 
  FormularioPerguntaComponent,
  FormularioPerguntaSimples,
  FormularioPerguntaCompleto 
} from "@global/component/form/FormularioPerguntaComponent";

// Componente completo com todas as funcionalidades
<FormularioPerguntaCompleto
  entity="pergunta"
  onSubmit={submitHandler}
  showDebugInfo={true}
/>

// Componente simplificado para uso básico
<FormularioPerguntaSimples
  entity="questao"
  onSubmit={submitHandler}
/>

// ✅ Exemplos de Uso Completos
import { 
  exemploFormularioSimplificado,
  exemploFormularioCompleto,
  exemploSurveyAcademico,
  demonstracaoUsoComHooks
} from "@global/form/template/FormularioPerguntaExemplos";
```

### Funcionalidades Implementadas:

#### FormularioPergunta (Template Class):
- ✅ **Herança de Form**: Estende a classe Form mantendo compatibilidade
- ✅ **Campos Básicos**: Título e descrição da pergunta
- ✅ **Seletor de Tipo**: Select que controla visibilidade condicional
- ✅ **Campos Condicionais**: Integração com todas as classes prebuilt (Task 6)
- ✅ **Configuração Flexível**: Parâmetros para customizar comportamento
- ✅ **Factory Methods**: createSimplified(), createComplete(), createCustom()

#### Tipos de Pergunta Suportados:
- ✅ **Múltipla Escolha**: 
  - Seletor de quantidade de alternativas (2-5)
  - AlternativeGroup com escala Likert (-2 a 2)
  - Conditional on "multipla_escolha"

- ✅ **Escala Linear**: 
  - Seletores de valor mínimo (0-1) e máximo (2-10)
  - LinearScaleGroup com geração dinâmica
  - Conditional on "escala_linear"

- ✅ **Métrica**: 
  - Seletor de tipo de métrica (comprimento, peso, volume, área)
  - MetricSelect com unidades específicas
  - Conditional on "metrica"

- ✅ **Texto Livre**: 
  - Seletor de tipo de texto (curta, média, longa, detalhada)
  - FreeTextDescription com limites configuráveis
  - Conditional on "texto_livre"

#### FormularioPerguntaComponent (React Component):
- ✅ **Integração useForm**: Usa hooks otimizados para conditional fields
- ✅ **Renderização Condicional**: Apenas campos visíveis são renderizados
- ✅ **Debug Support**: Painel de debug com informações de estado
- ✅ **Question Type Info**: Painel informativo sobre tipo selecionado
- ✅ **Error Handling**: Tratamento de erros de submissão
- ✅ **Success Feedback**: Feedback visual de sucesso
- ✅ **Variantes**: Simples, Completo, e Customizável

#### Exemplos e Documentação:
- ✅ **FormularioPerguntaExemplos**: 6 exemplos de uso diferentes
- ✅ **Configuração por Contexto**: Survey acadêmico, medições científicas
- ✅ **Validação**: Helpers para validação de tipos de pergunta
- ✅ **Hook Integration**: Exemplo completo com processamento de dados

### Padrões Arquiteturais:
- ✅ **Template Pattern**: FormularioPergunta como template especializado
- ✅ **Factory Pattern**: Methods estáticos para criação de instâncias
- ✅ **Conditional Rendering**: Integração completa com sistema condicional
- ✅ **Separation of Concerns**: Template (lógica) + Component (apresentação)
- ✅ **Type Safety**: Interfaces bem definidas para todas as configurações
- ✅ **Performance**: Memoização e otimizações para formulários grandes
- ✅ **Extensibilidade**: Fácil adição de novos tipos de pergunta

### Casos de Uso Implementados:
- ✅ **Survey Acadêmico**: Múltipla escolha + escala linear
- ✅ **Medições Científicas**: Métrica + escala + texto livre
- ✅ **Questionário Simples**: Apenas básicos (múltipla escolha + texto)
- ✅ **Avaliação Completa**: Todos os tipos + opções avançadas
- ✅ **Configuração Manual**: Controle total sobre parâmetros

---

## Task 8: Criar Componentes Especializados para Escala Linear 📊
**Objetivo**: Implementar lógica complexa de escala dinâmica

### Subtasks:
- [ ] **8.1** Criar `LinearScaleGroup` que gera campos baseado em min/max
- [ ] **8.2** Implementar lógica para criar selects dinâmicos (-2 a 2)
- [ ] **8.3** Conectar mudanças de min/max com regeneração de campos
- [ ] **8.4** Garantir limpeza quando escala muda

### Entregáveis:
- Componente que gera campos dinamicamente
- Lógica para escala variável (1-3 = 3 selects, 0-10 = 11 selects, etc.)

---

## 🎯 Casos de Uso Específicos

### Tipos de Resposta Suportados:
1. **Múltipla Escolha** (`multipla_escolha`)
   - 5 alternativas máximo
   - Cada alternativa: texto + valor (-2 a 2)

2. **Escala Linear** (`escala_linear`)
   - Min: 0 ou 1, Max: 2 até 10
   - Gera selects baseado na quantidade (max - min + 1)

3. **Texto Livre** (`texto_livre`)
   - Apenas descrição do campo

4. **Métrica** (`metrica`)
   - Select com: metros, milímetros, quilômetros, gramas

---

## 📝 Notas de Implementação

### Operadores Suportados:
- `eq` (equals) - Igualdade
- `neq` (not equals) - Diferença

### Características:
- ✅ Apenas uma dependência por campo
- ✅ Sem animações (aparece/desaparece diretamente)
- ✅ Sem validação de campos invisíveis
- ✅ Campos invisíveis não são enviados ao backend

### Arquitetura:
```
FormularioPergunta → useForm + useConditionalVisibility → Conditional Rendering
```

---

*Atualizado em: 18 de Setembro, 2025*
*Status: Iniciando Task 1*
