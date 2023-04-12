import {date, record, string} from '~/core/validation';
import {email} from '~/core/validation/rules/email';
import {isRequired} from '~/core/validation/rules/isRequired';
import {uuid} from '~/core/validation/rules/uuid';

export const User = record<Application.User>({
  id: string(isRequired(), uuid()),
  email: string(isRequired(), email()),
  name: string(isRequired()),
  createdAt: date(isRequired()),
  updatedAt: date(isRequired()),
});
