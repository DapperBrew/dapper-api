import postmark from 'postmark';

// Send an email:
const client = new postmark.Client(process.env.POSTMARK_SERVER_API);

export const emailForgotPassword = async (options) => {
  const sendMail = client.sendEmailWithTemplate({
    From: 'dan@dapperbrew.com',
    To: options.user.email,
    TemplateId: 2720802,
    TemplateModel: {
      action_url: options.resetURL,
    },
  });

  return sendMail;
};

// emailForgotPassword();
