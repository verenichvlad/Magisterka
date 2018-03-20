export default (header, message) => {
  Push.create(header, {
    body: message,
    icon: '/img/error3.png',
    timeout: 6000,
  });
};
