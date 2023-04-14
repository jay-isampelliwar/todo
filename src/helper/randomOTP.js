randomOtp = () => {
  let otp = 0;

  for (let i = 1; i <= 6; i++) {
    const v = Math.random() * 10;
    otp = otp * 10 + Math.floor(v);
  }

  return otp;
};

module.exports = randomOtp;
