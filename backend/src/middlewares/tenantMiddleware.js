const tenantMiddleware = (req, res, next) => {
  req.companyId = req.user.companyId;
  next();
};

export default tenantMiddleware;
