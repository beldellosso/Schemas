import { perfilSchema, type PerfilInput } from "../app/lib/schemas/perfil";
export function validarCadastro(dadosBrutos: unknown) {
  const resultado = perfilSchema.safeParse(dadosBrutos);

  if (resultado.success) {
    
    const dadosSeguros: PerfilInput = resultado.data; 
    console.log("✅ Dados validados com sucesso:", dadosSeguros);
    return { sucesso: true, dados: dadosSeguros };
  } else {
    
    const errosPorCampo = resultado.error.flatten().fieldErrors;
    console.log("❌ Erros de validação encontrados:", errosPorCampo);
    return { sucesso: false, erros: errosPorCampo };
  }
}

const testeSucesso = {
  nomeCompleto: "Rebeca Santos",
  email: "rebeca@email.com",
  cep: "01310-100",
  cidade: "São Paulo",
  biografia: "Desenvolvedora em evolução!"
};

const testeErroFormato = {
  nomeCompleto: "Re", // Curto demais
  email: "email-invalido",
  cep: "123",
  cidade: "SP"
};


const testeOpcionais = {
  nomeCompleto: "Rebeca Dellosso",
  email: "rebeca@teste.com",
  cep: "04571-010",
  cidade: "São Paulo"
 
};


console.log("--- Executando Testes de Validação ---");
validarCadastro(testeSucesso);
validarCadastro(testeErroFormato);
validarCadastro(testeOpcionais);