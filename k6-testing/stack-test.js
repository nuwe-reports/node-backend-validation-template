import http from 'k6/http'
import {sleep, check} from 'k6'
import {Rate} from 'k6/metrics'


export const errorRate = new Rate('errors')
export const MAX = 1000;

export const options = {
    duration: "5s",
    vus: 10,
}

export default function stack_test(){
    let res;
    let val = 1

    // 1. Push data 
    for (let i = 1; i <= MAX; i++){
        val = Math.floor(Math.random() * MAX)
        res = http.post('http://localhost:3000/stack', JSON.stringify(val), {
            headers: {'Content-Type': 'application/json'}
        })
        check(res, {
            'value is value': (res) => res.json().value == val,
            'message value is constant': (res) => res.json().message == 'Processed stack push action.'
        }) || errorRate.add(1)
    }

    // 2. Pop half data
    for (let i = 0; i < MAX / 2; i++){
        res = http.del('http://localhost:3000/stack')
        check(res, {
            'message value is constant': (res) => res.json().message == 'Processed stack pop action.'
        }) || errorRate.add(1)
    }

    // 3. Convert to array and check it is ordered and length is <= MAX
    res = http.get('http://localhost:3000/stack/array')
    let arr = res.json().array

    // Check is an array
    check(arr, {
        'is an Array': (arr) => Array.isArray(arr) == true
    }) || errorRate.add(1)
    
}

export function handleSummary(data){
    const checks = data.metrics.checks;
    return {
        'k6-stack-summary.json': JSON.stringify(checks),
    };
}
