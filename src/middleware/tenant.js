const tenant = (req, res, next) => {
    if (req.user && req.user.orgId) {
      req.tenant = req.user.orgId;
      next();
    } else {
      res.status(400).json({ message: 'Tenant information missing.' });
    }
  };
  
  module.exports = tenant;
  