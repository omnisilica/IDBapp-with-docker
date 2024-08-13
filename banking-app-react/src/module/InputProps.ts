import { ChangeEvent } from "react";

interface InputProps {
    name: string;
    label?: string;
    error?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    info?: string;
    options?: any[];
    onChange?: (event: ChangeEvent<any>) => void;
  }

  export default InputProps;