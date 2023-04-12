export class AppConfigurations implements Application.AppConfigurations {
  name = env('APP_NAME', 'Micra')!;

  url = env('APP_URL', 'http://localhost')!;
}
