function handler(req, res) {
  try {
    if (req) {
      throw new Error(`Should throw`);
    }
    res.end(`Should not print`);
  } catch (error) {
    res.end(error.stack);
  }
}

require('http').createServer(handler).listen(3000);
