module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "localhost",
        port: 1025,
        secure: false,
      },
      settings: {
        defaultFrom: "no-reply@local.dev",
        defaultReplyTo: "support@local.dev",
      },
    },
  },
});
