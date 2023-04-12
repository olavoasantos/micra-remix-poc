import {record, string} from '~/core/validation';
import {email} from '~/core/validation/rules/email';
import {isRequired} from '~/core/validation/rules/isRequired';

export const FindUserByEmailDto = record<Application.FindUserByEmailDto>({
  email: string(isRequired(), email()),
});
