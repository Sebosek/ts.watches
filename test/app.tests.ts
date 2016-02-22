import assert = require('assert');
import Watches = require('../watches');

describe("Watches", function () {
    describe("Regular watch", function () {
        it("Should show initial time", function () {
            var c = new Watches.RegularWatch(0, 0, 0);

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 0);
        });

        it("Should increase second after tick", function () {
            var c = new Watches.RegularWatch(0, 0, 0);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 1);
        });

        it("Should increase minute after 59 seconds", function () {
            var c = new Watches.RegularWatch(0, 0, 59);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 1);
            assert.equal(c.second, 0);
        });

        it("Should increase hour after 59 minutes and 59 seconds", function () {
            var c = new Watches.RegularWatch(0, 59, 59);
            c.tick();

            assert.equal(c.hour, 1);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 0);
        });

        it("Should reset watch after end of day", function () {
            var c = new Watches.RegularWatch(23, 59, 59);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 0);
        });

        it("Should throw RangeError on negative second inicialization", function () {
            var isExpectedError = false;

            try {
                var c = new Watches.RegularWatch(0, 0, -1);
            } catch (e) {
                if (e instanceof RangeError) {
                    isExpectedError = true;
                }
            }

            assert.equal(isExpectedError, true);
        });

        it("Should throw RangeError on negative minute inicialization", function () {
            var isExpectedError = false;

            try {
                var c = new Watches.RegularWatch(0, -1, 0);
            } catch (e) {
                if (e instanceof RangeError) {
                    isExpectedError = true;
                }
            }

            assert.equal(isExpectedError, true);
        });

        it("Should throw RangeError on negative hour inicialization", function () {
            var isExpectedError = false;

            try {
                var c = new Watches.RegularWatch(-1, 0, 0);
            } catch (e) {
                if (e instanceof RangeError) {
                    isExpectedError = true;
                }
            }

            assert.equal(isExpectedError, true);
        });
    });

    describe("Broken watch", function () {
        it("Should show initial time", function () {
            var c = new Watches.BrokenWatch(0, 0, 0);

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 0);
        });

        it("Should decrease second after tick", function () {
            var c = new Watches.BrokenWatch(0, 0, 1);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 0);
        });

        it("Should show 59 seconds after tick from 1 minute", function () {
            var c = new Watches.BrokenWatch(0, 1, 0);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 0);
            assert.equal(c.second, 59);
        });

        it("Should show 59 minutes and 59 seconds after tick from 1 hour", function () {
            var c = new Watches.BrokenWatch(1, 0, 0);
            c.tick();

            assert.equal(c.hour, 0);
            assert.equal(c.minute, 59);
            assert.equal(c.second, 59);
        });

        it("Should reset watch after end of day", function () {
            var c = new Watches.BrokenWatch(0, 0, 0);
            c.tick();

            assert.equal(c.hour, 23);
            assert.equal(c.minute, 59);
            assert.equal(c.second, 59);
        });
    });

    describe("Functional tests", function () {
        it("Run all day started at midnight", function () {
            var broken = new Watches.BrokenWatch(0, 0, 0);
            var regular = new Watches.RegularWatch(0, 0, 0);
            var countOfSameTime = 0;
        
            // 60 seconds * 60 minutes * 24 hours
            for (var i = 0; i < 60 * 60 * 24; i++) {
                if (broken.hour === regular.hour &&
                    broken.minute === regular.minute &&
                    broken.second === regular.second) {
                    countOfSameTime++;
                }

                broken.tick();
                regular.tick();
            }

            assert.equal(2, countOfSameTime);
        });

        it("Run all day started after lunch", function () {
            var broken = new Watches.BrokenWatch(12, 34, 48);
            var regular = new Watches.RegularWatch(12, 34, 48);
            var countOfSameTime = 0;
        
            // 60 seconds * 60 minutes * 24 hours
            for (var i = 0; i < 60 * 60 * 24; i++) {
                if (broken.hour === regular.hour &&
                    broken.minute === regular.minute &&
                    broken.second === regular.second) {
                    countOfSameTime++;
                }

                broken.tick();
                regular.tick();
            }

            assert.equal(2, countOfSameTime);
        });
    });
});