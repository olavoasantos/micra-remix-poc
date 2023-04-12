export class KernelConfig {
  port = Number(env('PORT', '3000'));

  stage: 'production' | 'development' | 'test' = env('NODE_ENV', 'production');
}
