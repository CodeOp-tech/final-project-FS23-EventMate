import React, { useState, createContext } from "react";

export const FormContext = createContext({
  form: {},
});
/**
 * <Form></Form>
 * Helper Component that uses Context to manage state between various form elements
 * Children - Child Form Elements
 * formInitialValues - Defaults for form after submit
 * submit - CB that can be passed in once form is submitted
 */
export default function Form({
  children,
  formInitialValues,
  submit,
  onFormChange,
}) {
  const [form, setForm] = useState(formInitialValues);
  const handleFormChange = (event, formData) => {
    // If user is clicking on html el instead of form el,
    // take formData values not event.target
    // If it equals ""
    let value;
    if (formData !== undefined) {
      value = formData.value;
    } else if (event.target.value === "") {
      value = event.target.value;
    } else {
      value = event.target.value;
    }
    const updatedForm = {
      ...form,
      [event?.target.name || formData.name]: value,
    };
    console.log("Form updated", updatedForm);
    //Callback
    onFormChange && onFormChange(updatedForm);
    // Update state
    setForm(updatedForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form);
    setForm(formInitialValues);
    return form;
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider
        value={{
          form,
          handleFormChange,
          handleSubmit,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}
