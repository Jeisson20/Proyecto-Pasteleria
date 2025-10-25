import { useForm } from "react-hook-form";
import { useAuth } from "../hook/useAuth.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/");
    }
  }, [isAuthenticated, navigation]);

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
  });

  return (
    <div>
      {registerErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          {...register("username", { required: true })}
        />
        {errors.username && <span>El nombre es requerido</span>}
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
