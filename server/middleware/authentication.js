const jwt = require("jsonwebtoken");
const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token; // .Assuming the token is stored in cookies

    if (!token) return res.status(401).json({ message: "No token found" });

    jwt.verify(token, "dsfnsjfjsf", (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      // Check if user is from dashboardUser or vendor table
      const { role } = decoded;

      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (role === "admin") {
        req.middleware_userId = decoded._id;
        req.middleware_role = "admin";
        req.middleware_id = decoded._id;
        req.middleware_hospitalname = decoded.hospitalname;
        req.middleware_registeras = decoded.registeras;
        req.middleware_email = decoded.email;
        req.middleware_phone = decoded.phone;
      } else if (role === "user") {
        req.middleware_id = decoded._id;
        req.middleware_role = "user";
        req.middleware_hospitalname = decoded.hospitalname;
        req.middleware_registeras = decoded.registeras;
        req.middleware_email = decoded.email;
        req.middleware_phone = decoded.phone;
        req.middleware_verified = decoded.verified;
      } else {
        req.middleware_id= decoded._id;
        req.middleware_role= "inventorymanager";
        req.middleware_userid= decoded.userid;
        req.middleware_email= decoded.email;
        req.middleware_phone= decoded.phone;
      }

      next();
    });
  };
};
module.exports = verifyToken;
// mo