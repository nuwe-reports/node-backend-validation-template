/**
 * A plugin (module) that provides common and encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const MyStack = require("../data-structures/stack.js");

  const stack = new MyStack();
  /**
   * @type {import('fastify').RouteShorthandOptions}
   * @const
   */
  const opts = {
    schema: {
      body: {
        type: "number",
      },
    },
  };

  fastify.get("/stack", async (req, res) => {
    return { message: "Stack", stack };
  });

  fastify.get("/stack/array", async (req, res) => {
    // TODO: Should return the Stack as an Array
    return { message: "Stack as Array", array: [] };
  });

  fastify.post("/stack", opts, async (req, res) => {
    // TODO: Pushes the value from the body to the stack
    // returns:
    //      @value: Value of the received value on the body as a JSON
    //      @action: either the push was successful or not
    // Should push to the stack the value
    return { message: "Processed stack push action.", value: 0, action: false };
  });

  fastify.delete("/stack", async (req, res) => {
    // TODO: Pop() from the stack
    // returns:
    //      @value: value from the pop()
    return { message: "Processed stack pop action.", value: 0 };
  });
}

module.exports = routes;
