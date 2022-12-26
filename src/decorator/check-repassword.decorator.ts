import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
class IsValidRePasswordConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    if (
      validationArguments.object &&
      validationArguments.object['password'] &&
      value === validationArguments.object['password']
    )
      return true;
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `re-Password must match with password`;
  }
}

export function IsValidRePassword(validationOptions?: ValidatorOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRePasswordConstraint,
    });
  };
}
