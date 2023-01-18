import { useState } from "react";

export default function useInput(defultValue = null) {
  const [value, setValue] = useState<string | null>(defultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, onChange };
}
