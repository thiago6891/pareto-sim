export default () => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const iterations = 1000000000;
    const arr = Array(1000).fill(100);

    var simulationStarted = false;

    postMessage({ data: arr, iteration: 0 });

    onmessage = e => {
        if (simulationStarted || !e || e.data !== 'start') return;

        simulationStarted = true;

        for (let i = 1; i <= iterations; i++) {
            let r1, r2;
            
            do {
                r1 = getRandomInt(arr.length);
            } while (arr[r1] === 0);
            
            do {
                r2 = getRandomInt(arr.length);
            } while (r1 === r2);
    
            arr[r1] -= 1;
            arr[r2] += 1;
    
            if (i % 100000 === 0) {
                let data = arr.slice();
                data.sort((a, b) => {
                    return b - a;
                });
                postMessage({ data: data, iteration: i });
            }
        }
    };
};