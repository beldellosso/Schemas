'use server';


import { perfilSchema, type PerfilInput } from "../lib/schemas/perfil";

export type CadastroState = {
  sucess: boolean;
  message?: string;
  erros?: { 
    
    [K in keyof PerfilInput]?: string[] 
  };
};

export async function cadastrarAction(
  _prevState: CadastroState, 
  formData: FormData
): Promise<CadastroState> {
  
  const dados = Object.fromEntries(formData);
  
  
  const resultado = perfilSchema.safeParse(dados);

  if (!resultado.success) {
    return {
      sucess: false,
      message: "Dados Incorretos",
      erros: resultado.error.flatten().fieldErrors, 
    };
  }

  try {
   
    console.log("Dados validados:", resultado.data);

    return {
      sucess: true,
      message: "Cadastro realizado com sucesso!",
    };
  } catch (e) {
    return {
      sucess: false,
      message: "Erro no servidor ao cadastrar.",
    };
  }
}