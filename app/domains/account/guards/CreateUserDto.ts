import {record, string} from '~/core/validation';
import {email} from '~/core/validation/rules/email';
import {isRequired} from '~/core/validation/rules/isRequired';

export const CreateUserDto = record<Application.CreateUserDto>({
  email: string(isRequired(), email()),
  name: string(isRequired()),
});
