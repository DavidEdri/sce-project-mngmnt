export default {
  createTransport: () => ({
    sendMail: (_, f) => {
      f(false);
    }
  })
};
