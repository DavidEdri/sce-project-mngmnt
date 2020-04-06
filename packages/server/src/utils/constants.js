// eslint-disable-next-line import/prefer-default-export
export const transporterOpts = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export const registerEmail = (email, token) => ({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Activate Your account",
  text: `${process.env.SITE_URL}activate/${token}`,
});

export const resetPasswordEmail = (email, token) => ({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Password reset",
  text: `${process.env.SITE_URL}passwordreset/${token}`,
});
