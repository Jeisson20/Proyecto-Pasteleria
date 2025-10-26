import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth.jsx";
import { useNavigate, Link } from "react-router-dom";
import fondoPasteleria from "../../assets/fondoPasteleria.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";
import "./authPages.css";

function LoginPage() {
  // Inicializamos react-hook-form
  const {
    register, // registra inputs en el formulario
    handleSubmit, // función que maneja el submit
    formState: { errors }, // errores de validación
  } = useForm();

  // Extraemos funciones y estados del contexto de autenticación
  const { signIn, isAuthenticated, errors: signinErrors } = useAuth();

  // Hook de navegación
  const navigation = useNavigate();

  // Si el usuario ya está autenticado, redirigimos al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigation("/dashboard");
    }
  }, [isAuthenticated, navigation]);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = handleSubmit(async (values) => {
    await signIn(values); // Llama a signIn con email y password
  });

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {/* Mostramos errores de autenticación si existen */}
        {signinErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}

        {/* Formulario de login */}
        <form onSubmit={onSubmit}>
          <h1>Iniciar Sesión</h1>

          {/* Input de email */}
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

          {/* Input de contraseña */}
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

          {/* Botón de submit */}
          <button type="submit">Iniciar Sesión</button>

          {/* Link a registro */}
          <div className="auth-link">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="a-Link">
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
