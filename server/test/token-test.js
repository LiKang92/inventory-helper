/* 
test token / token creation/ verify token
*/
const jwt = require('jsonwebtoken')

// create token
function makeToken(userId) { // kang_token
  const token = jwt.sign({id: userId}, 'kang_token', { expiresIn: '5 s' })
  return token
}

// verify token
function verifyToken(token) {
  jwt.verify(token, 'kang_token', (error, data) => {
    if (error) {
      console.log('Failed to verify', error.message)
    } else {
      console.log('Successfully verify', data.id)
    }
  })
}

function test() {
  const token = makeToken(12)
  console.log('create token', token)
  // test within valid period
  setTimeout(() => {
    verifyToken(token)
  }, 4000);

  // verify after valid period expires
  setTimeout(() => {
    verifyToken(token)
  }, 5000);
}

test()