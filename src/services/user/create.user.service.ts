import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import validator from "validator";

import { FormatDate } from "../../helpers/format.date";
import UserRepository from "../../repositories/user.repository";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  token: string;
}

class CreateUseService {
  async signinAction(data: UserProps) {
    if (!validator.isEmail(data.email)) {
      throw new Error(`Email invalido. field: email`);
    }

    if (validator.isEmpty(data.password)) {
      throw new Error(`Senha invalida. field: password`);
    }

    // Chamar o repositório
    const user = await UserRepository.emailExists(data.email);
    if (!user) {
      throw new Error("Email e/ou senha errados.");
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new Error("Email e/ou senha errados.");
    }

    const payload = (Math.random() + Date.now()).toString();
    const tokenUser = await bcrypt.hash(payload, 10);

    await UserRepository.updateToken(user.email, tokenUser);

    const token = JWT.sign(
      { token: tokenUser },
      process.env.JWT_SECRET as string,
      {
        subject: String(tokenUser),
        expiresIn: "1d",
      }
    );

    return token;
  }

  async signupAction(data: UserProps) {
    const dataUser = {} as UserProps;

    if (validator.isEmpty(data.name)) {
      throw new Error("O nome não pode estar vazio. field: name");
    }

    if (!validator.isEmail(data.email)) {
      throw new Error(`Email invalido. field: email`);
    }

    if (validator.isEmpty(data.password)) {
      throw new Error(`Senha invalida. field: password`);
    }

    if (
      !validator.isDate(data.birthDate as string, {
        format: "DD-MM-YYYY",
        delimiters: ["/", "-"],
      })
    ) {
      throw new Error(`Data de nascimento invalida. field: birthDate`);
    }

    let birthDate = FormatDate.execute(data.birthDate as string, "YYYY-MM-DD");

    const existsEmail = await UserRepository.emailExists(data.email);
    if (existsEmail) {
      throw new Error("Email já cadastrado!");
    }

    dataUser.name = data.name;
    dataUser.email = data.email;
    dataUser.password = await bcrypt.hash(data.password, 10);
    dataUser.birthDate = birthDate;

    const payload = (Math.random() + Date.now()).toString();
    const tokenUser = await bcrypt.hash(payload, 10);

    dataUser.token = tokenUser;

    // Chamar o repositório
    const user = await UserRepository.save(dataUser);

    const token = JWT.sign(
      { token: user.token },
      process.env.JWT_SECRET as string,
      {
        subject: String(user.token),
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { CreateUseService };
