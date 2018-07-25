export default class Model {

    size = 10;

    isRunning = false;
    drawing = false;
    seed = [];
    state = [];

    _listeners = [];
    _interval;

    constructor(size) {

        if (size !== undefined) {
            this.size = size;
        }
        // start out empty 10x10
        let square = this.size * this.size;
        console.log(square);
        for (let i = 0; i < square; i++) {
            this.seed.push(0);
            this.state.push(0);
        }
    }


    run() {
        this.isRunning = true;
        this.applyState(this.seed);
        this._interval = setInterval(this.tick.bind(this), 500);
    }


    stop() {
        if (this._interval !== undefined) {
            clearInterval(this._interval);
        }
        this.isRunning = false;
        this.applyState(this.seed);

    }

    applyState(arr) {
        this.state.splice(0, this.state.length, ...arr);
        this.dispatchChange();
    }

    compareState(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    tick() {
        let queuedState = [];
        this.state.forEach((value, index, arr) => {
            // get the state of all eight neighbors
            //arr[index] = (value === 0) ? 1 : 0;
            let neighbors = this.getNeighborStates(index);
            let liveNeighbors = neighbors.filter(value => {
                return value===1
            });
            let numLiveNeighbors = liveNeighbors.length;

            let newState = value;
            if (value === 0 && numLiveNeighbors === 3) {
                newState = 1;
            } else if (value === 1) {
                if (numLiveNeighbors < 2 ||
                    numLiveNeighbors > 3) {
                    newState = 0;
                }
            }
            queuedState.push(newState);
        });
        if (this.compareState(this.state, queuedState) === true) {
            // no change
            // TODO: alert user the set is complete
        } else {
            this.applyState(queuedState);
        }
    }


    getNeighborStates(index) {

        let tl = (index - 1) - this.size;
        let l = index - 1;
        let bl = (index - 1) + this.size;

        let t = index - this.size;
        let b = index + this.size;

        let tr = (index + 1) - this.size;
        let r = index + 1;
        let br = (index + 1) + this.size;

        let modulo = index % this.size;
        if (modulo === 0) {
            // index is on the left
            tl = l = bl = undefined;
        } else if (modulo === this.size - 1) {
            // index is on the right
            tr = r = br = undefined;
        }
        if (index < this.size) {
            // index is on the top
            tl = t = tr = undefined;
        } else if (index >= (((this.state.length / this.size) * this.size) - this.size) - 1) {
            // index is on the bottom
            bl = b = br = undefined;
        }

        let indicies = [tl, t, tr, l, r, bl, b, br];
        let states = indicies.map(index => {
            return (index === undefined) ? 0 : this.state[index];
        });
        return states;
    }


    addChangeListener(fn) {
        this._listeners.push(fn);
    }

    dispatchChange() {
        this._listeners.forEach(fn => {
            fn.call();
        });
    }
}
