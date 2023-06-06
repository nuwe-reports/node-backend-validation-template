const MyQueue = require('../data-structures/queue.js')
const fs = require('fs')

let myQueue;

let passedTests = 0;
let failedTests = 0;
let testStatus = false

beforeEach(()=>{
    myQueue = new MyQueue()
    testStatus = false
});

afterEach(() =>{
    myQueue = null
    passedTests += testStatus;
    failedTests += !testStatus;
    testStatus = false
});

afterAll( () =>{
    let testResults = {};
    testResults["pass"] = passedTests
    testResults["fail"] = failedTests
    fs.writeFileSync("./queue-tests.json", JSON.stringify(testResults, null, 2), 'utf-8');
});

test("check queue does not have any value at start", ()=>{
    let arr = myQueue.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check queue dequeue works when nothing is passed to", ()=>{
    let val = myQueue.dequeue()
    expect(val).toBe(null)
    testStatus = true
});

test("check queue does not queue non-digit values", ()=>{
    myQueue.enqueue("This is a test value")
    let arr = myQueue.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check queue enqueue does not do anything when no value is passed", ()=>{
    myQueue.enqueue(null)
    let arr = myQueue.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check queue correctly enqueues one element", ()=>{
    myQueue.enqueue(8)
    let arr = myQueue.toArray()

    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(8)
    testStatus = true
});

test("check queue correctly dequeues last element", ()=>{
    myQueue.enqueue(8)
    let val = myQueue.dequeue()
    let arr = myQueue.toArray()

    expect(arr.length).toBe(0)
    expect(val).toBe(8)
    testStatus = true
});

test("check queue enqueues and dequeues correctly ", ()=>{
    const MAX = 10
    for (let i = 0; i < MAX; i ++){
        myQueue.enqueue(i)
    }

    let arr = myQueue.toArray()
    expect(arr.length).toBe(MAX)

    let val;
    for (let i = 0; i < MAX; i++){
        val = myQueue.dequeue()
        expect(val).toBe(i)
    }
    testStatus = true
});

