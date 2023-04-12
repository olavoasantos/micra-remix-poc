import {useFetcher, FormProps as RFormProps} from '@remix-run/react';
import {useEffect, useRef} from 'react';

export interface FormProps extends RFormProps {
  autoReset?: boolean;
}

export function Form({autoReset = true, ...props}: FormProps) {
  const handler = useFetcher();
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (handler.state === 'idle' && handler.data?.ok && autoReset) {
      ref.current?.reset();
    }
  }, [handler]);

  return <handler.Form ref={ref} {...props} />;
}
