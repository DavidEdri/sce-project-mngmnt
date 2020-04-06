import mongoose from "mongoose";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const User = mongoose.model("users");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default passport => {
  passport.use(
    new JWTStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);

        if (user) return done(null, user);

        return done(null, false);
      } catch (error) {
        console.log(error);
      }
    })
  );
};
