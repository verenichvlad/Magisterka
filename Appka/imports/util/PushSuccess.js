export default (header, message) => {
  Push.create(header, {
    body: message,
    icon: '/img/success.jpg',
    timeout: 6000,
  });
};
