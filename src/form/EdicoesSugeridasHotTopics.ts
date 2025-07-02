import { Form } from "./Form";
import { Hidden } from "./item/prebuilt/Hidden";
import { Conteudo } from "./item/prebuilt/Conteudo";

// nao esta sendo usado (preciso do id do hot topic e do id do estudante que só tem no cliente)

const formItems = [
  new Conteudo({ entity: "edicoes_sugeridas_hot_topics" }),
  new Hidden({ entity: "edicoes_sugeridas_hot_topics", name: "id_hot_topic", defaultValue: "1"  }),
  new Hidden({ entity: "edicoes_sugeridas_hot_topics", name: "id_estudante", defaultValue: "9"  }),
];
const form = new Form(formItems, "below");

export default form;
