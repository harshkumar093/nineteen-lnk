function responseBack(status = null, body = null, message = null, res) {
  console.log(JSON.stringify({ status, body, message }));
  res.status(status).json({ status, body, message });
}

module.exports = {
  responseBack,
};
