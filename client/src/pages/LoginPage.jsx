import { useForm } from "react-hook-form";
import { useAuth } from "../hook/useAuth.jsx";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    await signIn(values);
  });

  return (
    <div>
      {signinErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>El email es requerido</span>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        {errors.password && <span>La contraseña es requerida</span>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;
