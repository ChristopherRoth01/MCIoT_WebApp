/**
 * Implements a counter which is responsible for Gamification.
 * The corresponding HTML Element needs to be labeled with the id = "gameCounter".
 */
export class GameCounter {

    constructor() {
        this.count = 0;
        this.setScore(this.count);
    }

    setScore(count) {
        document.getElementById("gameCounter").content = count;
    }

    increment() {
        this.count++;
        this.setScore(this.count);
    }

    decrement() {
        if(this.count < 0) this.count--;
        this.setScore(this.count);
    }

}
