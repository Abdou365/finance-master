import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/logo.svg";
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
  const { login, register } = useAuth();
  const [params, setParams] = useSearchParams();
  const [formState, setFormState] = useState({ email: "", password: "" });

  const step = params.get("step");
  const token = params.get("token");
  const isLogin = step === "login";
  const isRegister = step === "register";

  const render = () => {
    switch (true) {
      case step === "confirm" && typeof token === "string":
      case step === "confirm-login" && typeof token === "string":
      case step === "confirm-registration" && typeof token === "string":
        return <ConfirmAuth token={token} />;
      case step === "confirm-recover" && typeof token === "string":
        return <ConfirmRecover token={token} />;
      case step === "recover":
        return <RecoverPassword />;
      case step === "send":
        return <ConfirmSend email={formState.email} />;
      default:
        return (
          <div className="flex flex-col m-auto w-96 gap-4 ">
            <img src={logo} className="h-6" alt="logo" />
            <FormComponent
              fields={schema}
              data={formState}
              onChange={({ name, value }) => {
                setFormState((obj) => ({ ...obj, [name]: value }));
              }}
              onSubmit={async () => {
                if (!step || isLogin) {
                  const loginResponse = await login(
                    formState.email,
                    formState.password
                  );
                  if (loginResponse.statusCode === 201) {
                    setParams({ step: "send" });
                  }
                } else if (isRegister) {
                  register(formState.email, formState.password);
                  setParams({ step: "send" });
                }
              }}
            />
            <Button
              onClick={() => {
                setParams({ step: "recover" });
              }}
              variant="link"
              color="gray"
            >
              Mot de passe oublier
            </Button>
            <p>
              {isLogin ? "Tu es nouveau," : "Tu as déjà un compte,"}
              <a
                onClick={() => {
                  setParams({ step: isLogin ? "register" : "login" });
                  setFormState({ email: "", password: "" });
                }}
                className="text-primary-500 cursor-pointer hover:bg-gray-100 rounded dark:hover:bg-primary-900 p-2"
              >
                {isLogin ? "inscris-toi" : "connecte-toi"}
              </a>
            </p>
          </div>
        );
    }
  };

  return (
    <main className="flex h-screen p-5  bg-gradient-to-tr from-primary-300 dark:from-primary-800 from-0% via-white dark:via-primary-950 via-50% to-white dark:to-primary-950 to-100%  ">
      <div className=" rounded-xl flex-1  ">
        <img
          src="src\assets\create-a-vibrant-and-engaging-digital-illustration.png"
          className="h-full object-cover w-full rounded-xl "
        />
      </div>
      <div className=" flex-1 flex content-center align-middle justify-center">
        {/* {step === "confirm" && typeof token === "string" ? (
          <ConfirmAuth token={token} />
        ) : (
          <div className="flex flex-col m-auto w-96 gap-4 ">
            <img src={logo} className="h-6" alt="logo" />
            <FormComponent
              fields={schema}
              data={formState}
              onChange={({ name, value }) => {
                setFormState((obj) => ({ ...obj, [name]: value }));
              }}
              onSubmit={() => {
                if (isLogin) {
                  login(formState.email, formState.password);
                } else {
                  register(formState.email, formState.password);
                }
                login(formState.email, formState.password);
              }}
            />
            <p>
              Tu es nouveau,{" "}
              <a
                onClick={() => setIsLogin(!isLogin)}
                className=" text-primary-500 cursor-pointer hover:bg-gray-100 rounded dark:hover:bg-primary-900 p-2"
              >
                {isLogin ? "inscris-toi" : "connecte-toi"}
              </a>
            </p>
          </div>
        )} */}
        {render()}
      </div>
    </main>
  );
};

export default Login;
const ConfirmAuth: React.FC<{ token: string }> = (props) => {
  const { confirmRegistration, confirmLogin } = useAuth();
  const [params, setParams] = useSearchParams();

  const step = params.get("step");

  const handleSubmit = async (data: { code: number }) => {
    if (step === "confirm-register" || typeof props.token !== "string") {
      const res = await confirmRegistration(props.token, data.code);
      if (res.statusCode === 201) {
        window.location.replace("/");
      }
    } else if (step === "confirm-login" || typeof props.token === "string") {
      const res = await confirmLogin(props.token, data.code);
      if (res.statusCode === 201) {
        window.location.replace("/");
      }
    }
  };

  return (
    <div className="flex flex-col m-auto w-96 gap-4 border p-4 rounded dark:border-primary-600">
      <FormComponent
        fields={[
          {
            type: "number",
            label: "Code de confirmation",
            name: "code",
            description: "Entrez le code de confirmation",
          },
        ]}
        onSubmit={async (data) => {
          console.log(data);
          await handleSubmit(data);
        }}
      />
    </div>
  );
};

const ConfirmSend: React.FC<{ email: string }> = (props) => {
  return (
    <div className="flex flex-col m-auto w-96 gap-4 border p-4 rounded dark:border-primary-600">
      <p>
        Un email de confirmation a été envoyé à {props.email}. Veuillez vérifier
        votre boîte de réception.
      </p>
      <Button>Renvoyer le code</Button>
    </div>
  );
};

const RecoverPassword: React.FC = () => {
  const { recoverPassword } = useAuth();
  const [params, setParams] = useSearchParams();
  const [formState, setFormState] = useState({ email: "" });

  return (
    <div className="flex flex-col m-auto w-96 gap-4 border p-4 rounded dark:border-primary-600">
      <FormComponent
        fields={[
          {
            type: "email",
            label: "Email",
            format: "email",
            name: "email",
            description: "Entrez votre email",
          },
        ]}
        data={formState}
        onChange={({ name, value }) => {
          setFormState((obj) => ({ ...obj, [name]: value }));
        }}
        onSubmit={async () => {
          await recoverPassword(formState.email);
          setParams({ step: "send" });
        }}
      />
    </div>
  );
};

const ConfirmRecover: React.FC<{ token: string }> = ({ token }) => {
  const { confirmRecoverPassword } = useAuth();

  const handleSubmit = async (data: any) => {
    const res = await confirmRecoverPassword(
      token,
      data.code,
      data.password,
      data.password_confirmation
    );
    if (res.statusCode === 201) {
      window.location.replace("/");
    }
  };

  return (
    <div className="flex flex-col m-auto w-96 gap-4 border p-4 rounded dark:border-primary-600">
      <FormComponent
        fields={[
          {
            type: "password",
            label: "Nouveau mot de passe",
            format: "password",
            name: "password",
            description: "Entrez votre nouveau mot de passe",
          },
          {
            type: "password",
            label: "Confirmation du mot de passe",
            format: "password",
            name: "password_confirmation",
            description: "Confirmez votre mot de passe",
          },
          {
            type: "number",
            label: "Code de confirmation",
            name: "code",
            description: "Entrez le code de confirmation",
          },
        ]}
        onSubmit={async (data) => {
          console.log(data);
          await handleSubmit(data);
        }}
      />
    </div>
  );
};
