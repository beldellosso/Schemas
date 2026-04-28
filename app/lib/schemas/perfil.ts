import { z } from "zod";

export const perfilSchema = z.object({
 
  nomeCompleto: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cidade: z.string().min(1, "A cidade é obrigatória"),

  
  cep: z.string()
    .regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido (ex: 01234-567)")
    .refine((val) => val.replace("-", "").length === 8, "O CEP deve ter exatamente 8 números"),


  biografia: z.string().max(200, "A bio deve ter no máximo 200 caracteres").optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
});


export type PerfilInput = z.infer<typeof perfilSchema>;

/**
 * Testes com dados documentados:
 * * DADO VÁLIDO:
 * { nomeCompleto: "Rebeca Santos", email: "rebeca@email.com", cep: "01310-100", cidade: "São Paulo" }
 * * DADO INVÁLIDO (CEP):
 * { cep: "1234" } -> Erro: "Formato de CEP inválido"
 * * DADO INVÁLIDO (Nome Curto):
 * { nomeCompleto: "Re" } -> Erro: "O nome deve ter no mínimo 3 caracteres"
 */