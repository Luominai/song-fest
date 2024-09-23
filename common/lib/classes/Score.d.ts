export default class Score {
    low: number;
    mid: number;
    high: number;
    total: number;
    constructor(low?: number, mid?: number, high?: number);
    add(score: Score | Omit<Score, "total">): void;
}
