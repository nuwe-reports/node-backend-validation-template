const fs = require('fs')
const MyStack = require('../data-structures/stack.js')
let myStack;

let passedTests = 0;
let failedTests = 0;
let testStatus = false

beforeEach(()=>{
    myStack = new MyStack()
    testStatus = false
});

afterEach(() =>{
    myStack = null
    passedTests += testStatus;
    failedTests += !testStatus;
    testStatus = false
});

afterAll( () =>{
    let testResults = {};
    testResults["pass"] = passedTests
    testResults["fail"] = failedTests
    fs.writeFileSync("./stack-tests.json", JSON.stringify(testResults, null, 2), 'utf-8');
});

test("check stack does not have any value at start", ()=>{
    let arr = myStack.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check stack pop works when nothing is passed to", ()=>{
    let val = myStack.pop()
    expect(val).toBe(null)
    testStatus = true
});

test("check stack does not push non-digit values", ()=>{
    myStack.push("This is a test value")
    let arr = myStack.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check stack push does not do anything when no value is passed", ()=>{
    myStack.push()
    let arr = myStack.toArray()
    expect(arr.length).toBe(0)
    testStatus = true
});

test("check stack correctly push one element", ()=>{
    myStack.push(8)
    let arr = myStack.toArray()

    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(8)
    testStatus = true
});

test("check stack correctly pops last element", ()=>{
    myStack.push(8)
    let val = myStack.pop()
    let arr = myStack.toArray()

    expect(arr.length).toBe(0)
    expect(val).toBe(8)
    testStatus = true
});

test("check stack pushs and pops correctly ", ()=>{
    const MAX = 10
    for (let i = 0; i < MAX; i ++){
        myStack.push(i)
    }

    let arr = myStack.toArray()
    expect(arr.length).toBe(MAX)

    let val;
    for (let i = 0; i < MAX; i++){
        val = myStack.pop()
        expect(val).toBe(MAX - 1 - i)
    }
    testStatus = true
});

