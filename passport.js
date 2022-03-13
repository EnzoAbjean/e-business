const express = require('express')
const app = express()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const users = [{ email: 'axel.bonnefous@hotmail.fr', password: 'axel' }]

passport.use(
  new JwtStrategy(jwtOptions, function(payload, next) {
    const user = users.find(user => user.email === payload.email)

    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
)

app.use(passport.initialize())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/public', (req, res) => {
  res.send('public')
})

app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('private. user:' + req.user.email)
})


// Info passé par formulaire, simple vérif des champs.
app.post('/login', (req, res) => { 
  const email = req.body.email 
  const password = req.body.password

  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }

  // usually this would be a database call:
  // On cherche l'objet users qui correspond aux données du formulaire
  const user = users.find(user => user.email === email)

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ email: user.email }, secret)

  res.json({ jwt: userJwt })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})