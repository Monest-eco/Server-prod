export class MonestError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }

  static checkEnvValue() {
    const envValue: string[] = [
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_DB',
      'PGADMIN_DEFAULT_EMAIL',
      'PGADMIN_DEFAULT_PASSWORD',
    ];
    for (const value of envValue) {
      if (!process.env[value]) {
        console.error(`🚨 => ${value} is not defined in .env file`);
        process.exit();
      }
    }
  }
}
