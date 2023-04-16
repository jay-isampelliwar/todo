randomOtp = () => {
  let otp = Math.floor(Math.random() * 9 + 1);

  for (let i = 1; i < 6; i++) {
    const v = Math.random() * 10;
    otp = otp * 10 + Math.floor(v);
  }

  return otp;
};

module.exports = randomOtp;
