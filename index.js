// Author: Hector Alarcon (NUWE)
// Fastify as our API HTTP Web Server


// Setup dotfiles into process.env
require('dotenv').config()

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
    logger: false 
})

fastify.register(require('./routes/common-routes.js'))
fastify.register(require('./routes/queue-routes.js'))
fastify.register(require('./routes/stack-routes.js'))

// Run server
const start = async () => {
    try {
        await fastify.listen({ port : process.env.PORT || 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
