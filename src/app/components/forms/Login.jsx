"use client";

import { EmailField, PasswordField } from "@public/global/js/Fields/index";
import useFormState from "@/app/hooks/global/useFormState";
import useValidation from "@/app/hooks/global/useValidation";
import useSubmit from "@/app/hooks/global/useSubmit";

export default function Login({}) {
  const fieldsConfig = [new EmailField({ name: "email" }), new PasswordField({ name: "password" })];

  const onSubmit = async () => {
    alert("aaaaa");
  };

  const { data, setFieldValue, errors, setErrors } = useFormState(fieldsConfig);
  const validate = useValidation(fieldsConfig, data);
  const { loading, submitError, handleSubmit } = useSubmit(onSubmit, data, errors);

  const handleChange = (e) => {
    setFieldValue(e.target.name, e.target.value);
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit}>
      {fieldsConfig.map((field, index) => {
        return field.render({
          onChange: handleChange
        });
      })}
      <button type="submit" disabled={loading}>
        enviar
      </button>
      {submitError && <div>{submitError}</div>}
    </form>
  );
}
