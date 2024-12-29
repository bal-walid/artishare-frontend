export default interface Fields<T> {
  labelText: string;
  labelFor: string;
  id: string;
  name: keyof T;
  type: string;
  placeholder: string;
  linkTo?: string;
  linkText?: string;
  value?: string;
  autoComplete?: string;
  required?: boolean;
  isHidden?: boolean;
  options?: { label: string; value: string }[];
}
