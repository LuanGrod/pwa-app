// Teste simples para verificar se a URL do upload está correta
console.log('Testando construção de URL do Upload...');

// Simulando o comportamento
const mockProps = {
  entity: "estudantes",
  uploadField: "url-imagem",
  body: new FormData()
};

const apiUrl = "http://localhost:3000/api";
const expectedUrl = `${apiUrl}/upload/${mockProps.entity}/${mockProps.uploadField}`;

console.log('URL esperada:', expectedUrl);
console.log('Deveria ser: http://localhost:3000/api/upload/estudantes/url-imagem');

// Verificação
if (expectedUrl === 'http://localhost:3000/api/upload/estudantes/url-imagem') {
  console.log('✅ URL construída corretamente!');
} else {
  console.log('❌ URL incorreta!');
}
