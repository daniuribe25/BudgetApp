import { Injectable } from '@angular/core';

@Injectable()
export class Res_es{

    Enter = "Entrar";
    Log_in = "Ingresar";
    Name = "Nombre";
    LastName = "Apellido";
    Login = "Usuario";
    Password = "Contraseña";
    RepeatPass = "Repetir contraseña";
    Email = "Correo Electronico";
    Btn_Register = "Registrarme";

    //Messages
    NoValidFormLogin = "Debe ingresar un usuario y password valido";
    NoUserFound = "El usuario o contraseña ingresado no fueron encontrados";
    UserAlreadyExist = "El usuario ya se encuentra registrado";
    PassNoMatch = "Password y Repetir Password no coinciden";
    EmailFormatNovalid = "Debe tener un formato valido";
    LoaderMessage = "Por favor, espere un momento..";
    Error = "Ha ocurrido un error, intentelo de nuevo";

    //validation errors
    IsRequired = "es un campo obligatorio."
}