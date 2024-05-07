import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useAuth } from "./useLogin.tsx";

const schema: RJSFSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      title: "Email",
      format: "email",
    },
    password: {
      type: "string",
      title: "Mot de passe",

      minLength: 6,
    },
  },
};

const Login = () => {
  const { login } = useAuth();
  return (
    <main className="flex h-screen p-5  bg-gradient-to-tr from-primary-300 from-0% via-white via-50% to-white to-100%  ">
      <div className=" rounded-xl flex-1  ">
        <img
          src="src\assets\create-a-vibrant-and-engaging-digital-illustration.png"
          className="h-full object-cover w-full rounded-xl "
        />
      </div>
      <div className=" flex-1 flex content-center align-middle justify-center">
        <div className="flex flex-col m-auto w-96 gap-10 ">
          <img
            src="src\assets\finance-master-high-resolution-logo.svg"
            className="h-10"
            alt="logo"
          />
          <Form
            onSubmit={(e) => login(e.formData.email, e.formData.password)}
            className="form "
            schema={schema}
            validator={validator}
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
