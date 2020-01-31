module.exports = {
  theme: {
    extend: {},
    customForms: theme => ({
      dark: {
        "input, textarea, multiselect, checkbox, radio": {
          backgroundColor: theme("colors.gray.900")
        },
        select: {
          backgroundColor: theme("colors.gray.600")
        }
      }
    })
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")]
};
