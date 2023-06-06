/**
 * A plugin (module) that provides common and encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */

async function routes(fastify, options) {
  const title = process.env.TITLE_MESSAGE;

  const MyQueue = require("../data-structures/queue.js");

  const queue = new MyQueue();
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

  fastify.get("/queue", async (req, res) => {
    return { message: "Queue", queue };
  });

  fastify.get("/queue/array", async (req, res) => {
    // TODO: Gets the array form of the queue
    // returns:
    //      @array: Array of the queue
    return { message: "Queue as Array", array: [] };
  });

  fastify.post("/queue", opts, async (req, res) => {
    // TODO: Enqueues the value from the request body to the queue. Body is JSON
    // returns:
    //      @value: Value from the req body that will be enqueued
    //      @action: True if value has been correctly enqueued, otherwise false

    return {
      message: "Processed queue enqueue action.",
      value: 0,
      action: false,
    };
  });

  fastify.delete("/queue", async (req, res) => {
    // TODO: Dequeues from the queue.
    // returns:
    //      @value: Value from dequeue the Queue

    return { message: "Processed queue dequeue action.", value: 0 };
  });
}

module.exports = routes;
