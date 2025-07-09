module.exports = ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: '127.0.0.1',
        port: 1025,
        secure: false,
      },
      settings: {
        defaultFrom: 'no-reply@local.dev',
        defaultReplyTo: 'support@local.dev',
      },
    },
  },
  documentation: {
    enabled: false,
  },
});
