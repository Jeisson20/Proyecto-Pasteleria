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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/dashboard");
    }
  }, [isAuthenticated, navigation]);

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values);
  });

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {registerErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <h1>Regístrate</h1>
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
            <BiLockAlt className="icon" />
            <input
              type="password"
              {...register("password", { required: true })}
              required
            />
            <label>Contraseña</label>
          </div>
          {errors.password && <span>La contraseña es requerida</span>}
          <button type="submit">Registrarse</button>

          <div className="auth-link">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="link">
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
