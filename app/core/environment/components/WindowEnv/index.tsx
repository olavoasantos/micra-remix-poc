import {useLoaderData} from '@remix-run/react';

export function WindowEnv() {
  const data = useLoaderData<{ENV: Application.PublicEnvironmentVariables}>();

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(data.ENV ?? {})}`,
      }}
    />
  );
}
