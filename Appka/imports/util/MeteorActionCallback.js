export default ({ header, message, errorMessage }, successAction) => (error) => {
  if (error) {
    Push.create(header, {
      body: errorMessage,
      icon: '/img/error3.png',
      timeout: 6000,
    });
  } else {
    Push.create(header, {
      body: message,
      icon: '/img/success.jpg',
      timeout: 6000,
    });

    if (successAction) {
      successAction();
    }
  }
};

