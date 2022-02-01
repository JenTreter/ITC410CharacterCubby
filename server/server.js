const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

exports.server = async function () { //inside run so we can use the await keyword, pausing it, since it's async
  const app = express()
  
  // Any paths defined in your openapi.yml will validate and parse the request
  // before it calls your route code.
  const openapiPath = path.resolve(__dirname, '../OpenAPIDocumentation.yml')
  const enforcer = await Enforcer(openapiPath)
  const enforcerMiddleware = EnforcerMiddleware(enforcer)

  // app.use(enforcerMiddleware.init()) //what does app.use do? calls the middleware function on ALL routes. adds enforcer property to req
  
  // // Catch errors
  // enforcerMiddleware.on('error', err => {
  //   console.error(err)
  //   process.exit(1)
  // }) 
  
  //  // Tell the route builder to handle routing requests.
  //  app.use(enforcerMiddleware.route({
  //   // The "users" is mapped to via the "x-controller" value.
  //   users: {
  //     // The "listUsers" is mapped to via the "x-operation" or "operationId" value.
  //     async listUsers (req, res) {
  //       const { rows } = dbClient.query('SELECT * FROM users')
  //       const users = rows.map(row => {
  //         return {
  //           id: row.id,
  //           name: row.name,
  //           email: row.email
  //         }
  //       })
  //       res.enforcer.send(users)
  //     }
  //   }
  // }))
    
  // add fallback mocking middleware here. After the defined routes to make sure it runs implemented routes before sending a mock
  app.use(enforcerMiddleware.mock())
  
  return app
}