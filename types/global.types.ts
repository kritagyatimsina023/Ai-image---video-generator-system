export interface GenerateTypes {
  model: string;
  prompt: string;
  ratio: string;
}
export interface GenerateResponse {
  message: string;
  url: string;
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
}
