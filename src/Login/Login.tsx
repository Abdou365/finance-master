import { useState } from "react";
import Button from "../components/Button/Button.tsx";
import FormComponent, { FieldType } from "../components/Form/Form.tsx";
import { useAuth } from "./useLogin.tsx";

const schema: FieldType[] = [
  {
    type: "email",
    label: "Email",
    format: "email",
    name: "email",
    description: "Entrez votre email",
  },
  {
    type: "password",
    label: "Mot de passe",
    format: "password",
    name: "password",
    description: "Entrez votre mot de passe",
  },
];

const Login = () => {
  const { login } = useAuth();
  const [formState, setFormState] = useState({ email: "", password: "" });
  return (
    <main className="flex h-screen p-5  bg-gradient-to-tr from-primary-300 dark:from-primary-800 from-0% via-white dark:via-primary-950 via-50% to-white dark:to-primary-950 to-100%  ">
      <div className=" rounded-xl flex-1  ">
        <img
          src="src\assets\create-a-vibrant-and-engaging-digital-illustration.png"
          className="h-full object-cover w-full rounded-xl "
        />
      </div>
      <div className=" flex-1 flex content-center align-middle justify-center">
        <div className="flex flex-col m-auto w-96 gap-4 ">
          <img src="" className="h-10" alt="logo" />
          <FormComponent
            fields={schema}
            data={formState}
            onChange={({ name, value }) => {
              setFormState((obj) => ({ ...obj, [name]: value }));
            }}
            onSubmit={() => login(formState.email, formState.password)}
          />
          <p>
            Tu es nouveau, <a className=" btn-primary-link">créer un compte</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
