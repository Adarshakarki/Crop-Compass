import nodemailer from "nodemailer";

const getEnv = (key) => process.env[key] && process.env[key].trim();

const smtpConfig = () => {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || 0);
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = getEnv("SMTP_FROM") || user;

  return { host, port, user, pass, from };
};

export const canSendMail = () => {
  const { host, port, user, pass, from } = smtpConfig();
  return Boolean(host && port && user && pass && from);
};

export const sendMail = async ({ to, subject, text, html }) => {
  if (!canSendMail()) {
    return { skipped: true, reason: "SMTP not configured" };
  }

  const { host, port, user, pass, from } = smtpConfig();
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return { skipped: false, messageId: info.messageId };
};
