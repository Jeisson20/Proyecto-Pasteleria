import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth.jsx";
import { useNavigate, Link } from "react-router-dom";
import fondoPasteleria from "../../assets/fondoPasteleria.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./authPages.css";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const { signIn, isAuthenticated, errors: signinErrors } = useAuth();

  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
      className="container-auth"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {signinErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <FaUser className="logo-auth" />

          <div className="input-box">
            <MdEmail className="icon" />
            <input
              type="text"
              {...register("email", { required: true })}
              required
            />
            <label>Correo</label>
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              required
            />
            <label>Contraseña</label>

            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Iniciar Sesión</button>

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
