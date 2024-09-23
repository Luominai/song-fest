export default class Score {
    low;
    mid;
    high;
    total;
    constructor(low, mid, high) {
        this.low = low ?? 0;
        this.mid = mid ?? 0;
        this.high = high ?? 0;
        this.total = this.low + this.mid + this.high;
    }
    add(score) {
        Object.entries(score).map(([key, value]) => {
            this[key] += value;
        });
    }
}
