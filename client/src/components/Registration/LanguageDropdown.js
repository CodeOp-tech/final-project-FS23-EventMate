import React, { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormContext } from "../Form";
import languages from "../../data/languages";
import FormInput from "../FormInput";

export default function LanguageDropdown({ label, placeholder, name }) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  const defaultValues = languages.filter((item) => {
    const languageArray =
      typeof form.languages === "string"
        ? form.languages.split(",")
        : form.languages;
    return languageArray.includes(item.name);
  });
  return (
    <>
      <Autocomplete
        multiple
        onChange={(event, newValue) => {
          const values = newValue.map((value) => value.name);
          handleFormChange(undefined, { name: name, value: values || null });
        }}
        value={defaultValues || null}
        options={languages}
        getOptionLabel={(option) => option && option.name}
        renderInput={(params) => (
          <FormInput {...params} label={label} placeholder={placeholder} />
        )}
      />
    </>
  );
}
