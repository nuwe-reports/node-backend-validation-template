const fs = require('fs')

const jsonString = fs.readFileSync('./coverage/coverage-summary.json')
const output = JSON.parse(jsonString)

const queueCoverage = [];
const stackCoverage= [];

// Get Unit test coverage for Queue & Stack
for (t in output){
    if (!t.includes("stack") && !t.includes("queue")) {
        continue
    }
    for (el in output[t]){
        if (t.includes("stack")){
            // Stack
            stackCoverage.push(output[t][el]["pct"]) 
        }else {
            // Queue 
            queueCoverage.push(output[t][el]["pct"]) 
        }
    }
}

// Unit test coverage is bigger than 80%
const queueCoverageFails= queueCoverage.reduce( (res, curr) => res + (curr < 80), 0) > 0
const stackCoverageFails= stackCoverage.reduce( (res, curr) => res + (curr < 80), 0) > 0

// All unit tests must pass --> Stack
const stackString = fs.readFileSync('./stack-tests.json')
const stackOutput = JSON.parse(stackString)
let stackUnitTestFailed = stackOutput["fail"] > 0

// All unit tests must pass --> Stack
const queueString = fs.readFileSync('./queue-tests.json')
const queueOutput = JSON.parse(queueString)
let queueUnitTestFailed = queueOutput["fail"] > 0

// Results
const queueUnitTest = !(queueUnitTestFailed + queueCoverageFails) // Array Index 0
const stackUnitTest = !(stackUnitTestFailed + stackCoverageFails) // Array Index 1

// K6 run --> Queue
const queuek6 = fs.readFileSync('./k6-queue-summary.json')
const queuek6Json = JSON.parse(queuek6)
const queueK6Test= queuek6Json["values"]["fails"] == 0

// K6 run --> Stack
const stackk6 = fs.readFileSync('./k6-stack-summary.json')
const stackk6Json = JSON.parse(stackk6)
const stackK6Test= stackk6Json["values"]["fails"]  == 0


// Array results : [0,1,2,3] 
// 0 -> Unit testing Queue --> queueUnitTest
// 1 -> Unit testing Stack --> stackUnitTest
// 2 -> K6 testing Queue   --> queueK6Test
// 3 -> K6 testing Stack   --> stackK6Test

let arrayResults = []
if (queueUnitTest) arrayResults.push(0)
if (stackUnitTest) arrayResults.push(1)
if (queueK6Test) arrayResults.push(2)
if (stackK6Test) arrayResults.push(3)

console.log(arrayResults)









