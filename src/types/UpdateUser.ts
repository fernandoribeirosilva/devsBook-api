export type UpdateUser = {
  name: string;
  birthdate: string;
  email: string;
  city?: string;
  work?: string;
  password?: string;
  passwordConfirm: string;
};
