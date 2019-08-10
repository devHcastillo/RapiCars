# RapiCars
Para esta plataforma existe en la base de datos (firebase realtime) un usuario administador con el  email: admin@admin.com | passcode: 12345678 |  Este admin puede hacer el CRUD de autos, además del manejo del estado del auto(si está disponible o no).

Los demás usuarios deberán registrarse para usar la aplicación, ellos se serán redirigidos a una vista home con un mensaje. Existe un navbar con una opción de “autos” que hará una redirección hacia otra vista donde se muestran todos los autos, y para los que están disponibles aparecerá un botón para hacer el formulario de alquiler. En el formulario se desplegará data del auto y usuario, cuando se presiona el botón de "alquilar" se actualizará el estado del auto de disponible a no disponible y se creare un registro con el id del auto y el email del usuario con la cantidad de semana a alquilar.

Cabe resaltar que la aplicación maneja autenticación, pero la autorización no la maneja.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
