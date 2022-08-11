// form management common function
export const formReducer = (
  form,
  { target: { name, value, type, checked } }
) => {
  return { ...form, [name]: type === "checkbox" ? checked : value };
};
