"use client";

import { CadastroForm } from "./cadastro/cadastro-form";
import { validarCadastro } from "../missao-2/validador";

export default function CadastroPage() {
  console.log(validarCadastro({ nomeCompleto: "Re", email: "erro" }));
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Meu Perfil
          </h1>
          <p className="text-gray-500 mt-2">
            Construção de interface com validação Zod
          </p>
        </header>

        <CadastroForm />

        <footer className="mt-8 text-center text-sm text-gray-400">
          Senac • Missão Prática • 2026
        </footer>
      </div>
    </main>
  );
}