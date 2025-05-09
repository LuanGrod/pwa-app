import { EmailField, PasswordField } from "@public/global/js/Fields/index";
import useFormState from "@/app/hooks/global/useFormState";
import useValidation from "@/app/hooks/global/useValidation";
import useSubmit from "@/app/hooks/global/useSubmit";

export default function useLogin({onSuccess}) {
  const fieldsConfig = [new EmailField({ name: "email" }), new PasswordField({ name: "password" })];

  const onSubmit = async () => {
    alert("aaaaa");
  };

  const { data, errors, setErrors, setFieldValue } = useFormState(fieldsConfig);
  const validate = useValidation(fieldsConfig, data);
  const { handleSubmit, loading, submitError } = useSubmit(onSubmit, data, errors);
}
