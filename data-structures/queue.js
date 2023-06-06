class ListNode {
  constructor(value = null) {
    this.next = null;
    this.value = value;
  }
}

class MyQueue {
  constructor() {
    // TODO: Constructor of the Stack MyStack
  }

  enqueue(value = null) {
    // TODO: Enqueue function for the Queue Data Structure
    // If the value is null or not a digit should not be enqueued
  }

  dequeue() {
    // TODO: Dequeue function for the Queue Data Structure
  }

  toArray() {
    // TODO: Convert the queue into array.
    // If queue has enqueued, in order, 0 1 2. The returned array should be [0,1,2]
  }
}
module.exports = MyQueue;
