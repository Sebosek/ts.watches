module Watches {
    abstract class Watch {
        protected second_treshold: number = 59;
        protected minute_treshold: number = 59;
        protected hour_treshold: number = 23;

        hour: number;
        minute: number;
        second: number;

        constructor(hour: number, minute: number, second: number) {
            if (hour < 0 || minute < 0 || second < 0) {
                throw new RangeError("Time value can not be negative number!");
            }

            this.second = second;
            this.minute = minute;
            this.hour = hour;
        }

        start() {
            // start clicking
        }

        abstract tick(): void

        toString() {
            let result = '';

            result += (this.hour < 10 ? `0${this.hour}` : `${this.hour}`) + ':';
            result += (this.minute < 10 ? `0${this.minute}` : `${this.minute}`) + ':';
            result += (this.second < 10 ? `0${this.second}` : `${this.second}`);

            return result;
        }
    };

    export class RegularWatch extends Watch {
        tick() {
            this.second++;
            if (this.second > this.second_treshold) {
                // increase minute and reset second
                this.minute++;
                this.second = 0;

                if (this.minute > this.minute_treshold) {
                    // increase hour and reset minute
                    this.hour++;
                    this.minute = 0;

                    if (this.hour > this.hour_treshold) {
                        this.hour = 0;
                    }
                }
            }
        }
    };

    export class BrokenWatch extends Watch {
        tick() {
            this.second--;
            if (this.second <= 0) {

                this.minute--;
                this.second = this.second_treshold;

                if (this.minute < 0) {

                    this.hour--;
                    this.minute = this.minute_treshold;

                    if (this.hour < 0) {
                        this.hour = this.hour_treshold;
                    }
                }
            }
        }
    };
}

export = Watches;