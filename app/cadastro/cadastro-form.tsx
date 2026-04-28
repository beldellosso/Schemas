"use client";

import { useActionState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastrarAction } from "../../app/actions/cadastrar"; 
import { perfilSchema, type PerfilInput } from "../lib/schemas/perfil";

// 3. O CadastroState você deve importar da Action (onde ele foi criado)
import { type CadastroState } from "../../app/actions/cadastrar";

const estadoInicial: CadastroState = { sucess: false };

export function CadastroForm() {
  const [state, formAction, isPending] = useActionState(
    cadastrarAction,
    estadoInicial
  );

  const { register, handleSubmit, formState: { errors } } = useForm<PerfilInput>({
    resolver: zodResolver(perfilSchema),
    mode: "onBlur"
  });

  const onSubmit = (data: PerfilInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // Garante que valores nulos ou vazios não quebrem o envio
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    
    startTransition(() => {
      formAction(formData);
    });
  };

  const inputStyle = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      
      {/* Nome Completo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
        <input {...register("nomeCompleto")} placeholder="Ex: Rebeca Santos" className={inputStyle} />
        {errors.nomeCompleto && <p className="text-red-500 text-xs mt-1">{errors.nomeCompleto.message}</p>}
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <input {...register("email")} placeholder="rebeca@exemplo.com" className={inputStyle} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        {state.erros?.email && <p className="text-orange-500 text-xs mt-1">{state.erros.email[0]}</p>}
      </div>

    
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
          <input {...register("cep")} placeholder="00000-000" className={inputStyle} />
          {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep.message}</p>}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
          <input {...register("cidade")} placeholder="Sua Cidade" className={inputStyle} />
          {errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade.message}</p>}
        </div>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Biografia (Opcional)</label>
        <textarea {...register("biografia")} rows={3} placeholder="Conte um pouco sobre você..." className={inputStyle} />
        {errors.biografia && <p className="text-red-500 text-xs mt-1">{errors.biografia.message}</p>}
      </div>

      
      <button 
        type="submit" 
        disabled={isPending} 
        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
          isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md"
        }`}
      >
        {isPending ? "Salvando informações..." : "Salvar Perfil"}
      </button>

      {state.message && (
        <div className={`p-3 rounded-md text-center text-sm font-medium ${
          state.sucess ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
        }`}>
          {state.message}
        </div>
      )}
    </form>
  );
}