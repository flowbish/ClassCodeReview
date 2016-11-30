/**
 * LDAP auth from: https://github.com/kevinwang/attendance
 */
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import ldap from 'ldapjs';

/**
 * Retrieve user from the database or create it if it doesn't exist.
 */
var getAuthenticatedUser = function(netid, callback) {
  callback(null, {netid: netid});
};

/**
 * Authenticate with UIUC Active Directory using an LDAP simple bind.
 */
passport.use(new LocalStrategy(function(username, password, done) {
  var client = ldap.createClient({
    url: 'ldap://ad.uillinois.edu:389'
  });

  // XXX: Prod server has a problem with the AD server's TLS cert for some
  // reason. Connect anyway.
  var tlsOptions = { rejectUnauthorized: false };
  client.starttls(tlsOptions, null, function(err) {
    var dn = username + '@illinois.edu';
    client.bind(dn, password, function(err, user) {
      if (err) {
        if (err.name === 'InvalidCredentialsError') {
          return done(null, false);
        }
        return done(err);
      }

      return getAuthenticatedUser(username, done);
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.netid);
});

passport.deserializeUser(function(netid, done) {
  done(null, {netid: netid});
});

export default passport;
