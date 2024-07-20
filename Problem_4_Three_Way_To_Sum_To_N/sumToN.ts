/*
1. Iterative
Time Complexity: O(n) - The function iterates from 1 to n, making n iterations.
Space Complexity: O(1) - Only a few variables are used regardless of the input size.
*/
function sumToNIterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/*
2. Recursive
Time Complexity: O(n) - The function makes n recursive calls.
Space Complexity: O(n) - The function uses the call stack for n recursive calls.
*/
function sumToNRecursive(n: number): number {
    if (n <= 1) {
        return n;
    } else {
        return n + sumToNRecursive(n - 1);
    }
}

/*
3. Mathematical Formula
Time Complexity: O(1) - The function calculates the result in constant time.
Space Complexity: O(1) - Only a few variables are used regardless of the input size.
*/
function sumToNFormula(n: number): number {
    return n * (n + 1) / 2;
}

// Test the functions
const testValues = [3, 9, 18];

for (let value of testValues) {
    console.log(`sum_to_n_a(${value}) = ${sumToNIterative(value)}`);
    console.log(`sum_to_n_b(${value}) = ${sumToNRecursive(value)}`);
    console.log(`sum_to_n_c(${value}) = ${sumToNFormula(value)}`);
}