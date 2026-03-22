import emailjs from "@emailjs/browser";

export const sendEmail = async (form: HTMLFormElement) => {
  return emailjs.sendForm(
    import.meta.env.VITE_EMAIL_SERVICE as string,
    import.meta.env.VITE_EMAIL_TEMPLATE as string,
    form,
    import.meta.env.VITE_EMAIL_KEY as string
  );
};