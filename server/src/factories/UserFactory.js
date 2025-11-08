
class User {
    constructor({ id, nombre, email, rol, permisos }) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.permisos = permisos;
    }
}

export function UserFactory(data) {
    return new User(data);
}