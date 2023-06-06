/**
 * A plugin (module) that provides common and encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const title = process.env.TITLE_MESSAGE | "This is a test title";

  fastify.get("/", async (req, res) => {
    return { title };
  });
}

module.exports = routes;
