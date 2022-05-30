function contentTypeTransformMiddleware(req, res, next) {
  setTimeout(async function () {
    const method = req.method.toUpperCase();
    if (method !== 'POST' && method !== 'PUT' && method !== 'PATCH') {
      next();
      return;
    }
    let contentType = 'text/plain';
    if (contentType.startsWith('application/json') || contentType.startsWith('text/')) {
      let body = req.body;
      if (Buffer.isBuffer(body)) {
        body = body.toString('utf-8');
      }

      if (typeof body === 'string') {
        if (body.startsWith('{') && body.endsWith('}')) {
          req.body = JSON.parse(body);
          contentType = 'application/json; charset=utf-8';
        } else if (req.url !== '/iot/v1/sessions') {
          logger.warn(`Not a JSON content, contentType=${contentType}, body=${body}`, {
            req: { url: req.url, method: req.method, ip: req.realIP, body },
          });
        }
      }
      req.header('content-type', contentType);
    }
    next();
  }, 10);
}

module.exports = {
  contentTypeTransformMiddleware,
};
