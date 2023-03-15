import React, { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormContext } from "../Form";
import languages from "../../data/languages";
import FormInput from "../FormInput";

export default function LanguageDropdown({ label, placeholder, name }) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  return (
    <>
      <Autocomplete
        multiple
        onChange={(event, newValue) => {
          const values = newValue.map((value) => value.name);
          handleFormChange(event, { name: name, value: values });
        }}
        options={languages}
        getOptionLabel={(option) => option && option.name}
        renderInput={(params) => (
          <FormInput {...params} label={label} placeholder={placeholder} />
        )}
      />
    </>
  );
}