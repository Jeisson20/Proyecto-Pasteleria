import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaUserPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import fondoPasteleria from "../../assets/fondoPasteleria.png";
import "./authPages.css";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      className="container-auth"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="container-form">
        {registerErrors.map((error, i) => (
          <div key={i} className="error">
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <FaUserPlus className="logo-auth" />

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              {...register("username", { required: true })}
              required
            />
            <label>Usuario</label>
          </div>

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

          <button type="submit">Registrarse</button>

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
