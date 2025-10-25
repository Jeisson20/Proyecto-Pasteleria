import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth.jsx";
import { useNavigate, Link } from "react-router-dom";
import fondoPasteleria from "../../assets/fondoPasteleria.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";
import "./authPages.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuthenticated, errors: signinErrors } = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/dashboard");
    }
  }, [isAuthenticated, navigation]);

  const onSubmit = handleSubmit(async (values) => {
    await signIn(values);
  });

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {signinErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <h1>Iniciar Sesión</h1>

          <div className="input-box">
            <MdEmail className="icon" />
            <input
              type="text"
              {...register("email", { required: true })}
              required
            />
            <label>Correo</label>
          </div>

          {errors.email && <span>El email es requerido</span>}

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              {...register("password", { required: true })}
              required
            />
            <label>Contraseña</label>
          </div>

          {errors.password && <span>La contraseña es requerida</span>}

          <button type="submit">Iniciar Sesión</button>

          <div className="auth-link">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="link">
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
