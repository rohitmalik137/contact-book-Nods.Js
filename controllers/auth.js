const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if(!user){
        req.flash('error', 'Invalid Email or password');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if(doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              if(err) console.log(err);
              else res.redirect('/');
            });
          }
          req.flash('error', 'Invalid Email or password');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login')
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
    .then(user => {
      if(user){
        req.flash('error', 'Email already exists! Please try another!');
        return res.redirect('signup');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const userAdd = new User({
            email: email,
            password: hashedPassword
          });
          return userAdd.save();
        })
        .then(() => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'bpsrohitmalik@gmail.com',
            subject: 'Signup Succeeded!',
            html: '<h1>You Successfully Signed Up!</h1>'
          });
        })
        .then(() => {
          console.log('Success!!');
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email})
      .then(user => {
        if(!user){
          req.flash('error', 'No Account with that Email Account found');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        return transporter.sendMail({
          to: req.body.email,
          from: 'bpsrohitmalik@gmail.com',
          subject: 'Password Reset',
          html: `
            <p>Reset Your Password by clicking <a href="http://localhost:3000/reset/${token}">here</a></p>
          `
        });
      })
      .then(() => {
        console.log('Reset Email Sent');
      })
      .catch(err => {
        console.log(err);
      })
  });
}

exports.getResetPassword = (req, res, next) => {
  const gottoken = req.params.tokenId;
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
  User.findOne({resetToken: gottoken})
    .then(user => {
      const myemail = user.email;
      res.render('auth/resetpassword', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message,
        myemail: myemail
      });
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postResetPassword = (req, res, next) => {
  const myemail = req.body.email;
  const newpassword = req.body.password;
  console.log(newpassword);
  return bcrypt.hash(newpassword, 12)
    .then(hashedPassword => {
      User.findOne({email: myemail})
        .then(user => {
          console.log(user.password);
          user.password = hashedPassword;
          return user.save();
        })
        .then(() => {
          console.log('reset succesfully!');
          res.redirect('/login');
        })
    })
}