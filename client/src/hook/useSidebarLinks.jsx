import { useAuth } from "./useAuth";

export function useFilteredLinks(array) {
  const { user } = useAuth();

  return array.filter(({ roles, permisoKey }) => {
    const tieneRol = !roles || roles.includes(user?.rol);
    const tienePermiso = !permisoKey || user?.permisos?.[permisoKey];
    return tieneRol && tienePermiso;
  });
}
