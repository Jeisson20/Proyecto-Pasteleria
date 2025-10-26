import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import fondoPasteleria from "../../assets/fondoPasteleria.png";
import "./authPages.css";

function RegisterPage() {
  // Inicializamos react-hook-form
  const {
    register, // registra inputs en el formulario
    handleSubmit, // función que maneja el submit
    formState: { errors }, // errores de validación
  } = useForm();

  // Extraemos funciones y estados del contexto de autenticación
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

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
    await signUp(values); // Llama a signUp con los datos del formulario
  });

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {/* Mostramos errores de registro si existen */}
        {registerErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}

        {/* Formulario de registro */}
        <form onSubmit={onSubmit}>
          <h1>Regístrate</h1>

          {/* Input de usuario */}
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              {...register("username", { required: true })}
              required
            />
            <label>Usuario</label>
          </div>
          {errors.username && <span>El nombre es requerido</span>}

          {/* Input de correo */}
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
            <BiLockAlt className="icon" />
            <input
              type="password"
              {...register("password", { required: true })}
              required
            />
            <label>Contraseña</label>
          </div>
          {errors.password && <span>La contraseña es requerida</span>}

          {/* Botón de submit */}
          <button type="submit">Registrarse</button>

          {/* Link a login */}
          <div className="auth-link">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="a-Link">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
