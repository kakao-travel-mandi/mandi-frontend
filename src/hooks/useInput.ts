import { useState } from "react";

interface UseInputProps<T extends Record<string, any>> {
  initialValues: T;
  handleValidate: (name: keyof T, value: T[keyof T]) => string;
}

const useInput = <T extends Record<string, any>>({
  initialValues,
  handleValidate,
}: UseInputProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleError = (name: keyof T, value: T[keyof T]) => {
    const error = handleValidate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const validateAll = () => {
    const newErrors = {} as Record<keyof T, string>;
    let hasError = false;

    for (const name in values) {
      const value = values[name];
      const error = handleValidate(name, value);
      if (error) hasError = true;
      newErrors[name] = error;
    }

    setErrors(newErrors);

    return hasError;
  };

  return {
    values,
    errors,
    handleChange,
    handleError,
    validateAll,
  };
};

export default useInput;
