import React, { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Form, FormContext } from "../Form";

import betterInterests from "../../data/interests";
import FormInput from "../FormInput";
export default function InterestsDropdown({ label, placeholder, name }) {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;
  const defaultValues = betterInterests.filter((item) => {
    const interestsArray =
      typeof form.interests === "string"
        ? form.interests.split(",")
        : form.interests;
    return interestsArray.includes(item.title);
  });
  return (
    <Autocomplete
      multiple
      value={defaultValues || null}
      options={betterInterests}
      onChange={(event, newValue) => {
        const values = newValue.map((value) => value.title);
        handleFormChange(undefined, { name: name, value: values || null });
      }}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.key}>
            {option.title}
          </li>
        );
      }}
      renderInput={(params) => (
        <FormInput {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
