export type CadastroState = {
sucess:boolean;
message?:string;
erros?:{
	nome?: string[];
	email?: string[];
	senha?: string[]:
}
}
sxport async function CADASTRARaCTION(): Promise