const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
        let user =await User.findOne({ googleId: profile.id });

        if(user){
            return cb(null,user);
        }
        
        user = await User.findOne({email : profile.emails[0].value});

        if(user){
            user.googleId = profile.id;
            user.avatar = profile.photos?.[0]?.value || "";
            user.displayName = profile.displayName;
            await user.save();
            return cb(null,user);
        }
        user = new User({
            username : profile.emails[0].value,
            email : profile.emails[0].value,
            googleId : profile.id,
            avatar : profile.photos?.[0]?.value || "",
            displayName : profile.displayName
        });
        await user.save();
        return cb(null,user);
    }catch(err){
        return cb(err,null);
    }
  }
));