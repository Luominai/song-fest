export default class Score {
    low: number
    mid: number
    high: number
    total: number
    
    constructor() {
        this.low = 0
        this.mid = 0
        this.high = 0
        this.total = 0
    }

    add(score: Score | Omit<Score, "total">) {
        Object.entries(score).map(([key, value]) => {
            this[key] += value
        })
    }
    
}