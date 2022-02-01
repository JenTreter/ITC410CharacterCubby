const server = require('./server').server

async function run (){
  const app = await server()
  app.listen(3000, () => {
    console.log('the servr is running on port 3000')
  })
}
run().catch(console.error)