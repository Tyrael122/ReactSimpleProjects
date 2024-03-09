import "./styles.css";

export default function LoginPage() {
  return (
    <div className="loginPage">
      <div className="loginPageColumn center-horizontally">
        <Header />

        <LoginForm />

        <Copyright />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <img className="logo" src="images/makeBotLogo.png" />
      <p className="slogan">A revolução em serviços de X.</p>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="loginForm">
      <FormInput placeholder="seuemail@exemplo.com.br" label="Email" />

      <Spacer height="25px" />

      <FormInput
        placeholder="Sua senha"
        label="Senha"
        actionText="Esqueceu sua senha?"
      />

      <Spacer height="25px" />

      <Footer />
    </div>
  );
}

function Copyright() {
  return <span className="copyright">© 2024 - MakeSoftware LTDA.</span>;
}

// TOP BOTTOM RIGHT LEFT
// VERTICAL HORIZONTAL

function FormInput({ placeholder, label, actionText }) {
  return (
    <div className="formInput">
      <div className="space-between">
        <span className="formInputLabel">{label}</span>
        <a className="formInputAction" href="">
          {actionText}
        </a>
      </div>

      <Spacer height="8px" />

      <input className="textInput" placeholder={placeholder} />
    </div>
  );
}

function Footer() {
  return (
    <div className="space-between">
      <div>
        <span>Não tem cadastro? </span>
        <a className="registerLink" href="">Cadastre-se</a>
      </div>

      <button className="loginButton">Login</button>
    </div>
  );
}

function Spacer({ height, width }) {
  if (width == null) width = 0;
  if (height == null) height = 0;

  return (
    <div
      style={{
        minHeight: `${height}`,
        minWidth: `${width}`,
      }}
    />
  );
}
