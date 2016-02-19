import assert = require('assert');
import Watches = require('./watches');

describe("Regular watch", function () {
    it("Should show initial time", function () {
        var c = new Watches.RegularWatch(0, 0, 0);
        assert.equal("00:00:00", c.toString());
    });

    it("Should increase second after tick", function () {
        var c = new Watches.RegularWatch(0, 0, 0);
        c.tick();
        assert.equal("00:00:01", c.toString());
    });

    it("Should increase minute after 59 seconds", function () {
        var c = new Watches.RegularWatch(0, 0, 59);
        c.tick();
        assert.equal("00:01:00", c.toString());
    });

    it("Should increase hour after 59 minutes and 59 seconds", function () {
        var c = new Watches.RegularWatch(0, 59, 59);
        c.tick();
        assert.equal("01:00:00", c.toString());
    });

    it("Should reset watch after end of day", function () {
        var c = new Watches.RegularWatch(23, 59, 59);
        c.tick();
        assert.equal("00:00:00", c.toString());
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
});

describe("Broken watch", function () {
    it("Should show initial time", function () {
        var c = new Watches.BrokenWatch(0, 0, 0);
        assert.equal("00:00:00", c.toString());
    });

    it("Should decrease second after tick", function () {
        var c = new Watches.BrokenWatch(0, 0, 0);
        c.tick();
        assert.equal("23:59:59", c.toString());
    });

    it("Should show 59 seconds after tick from 1 minute", function () {
        var c = new Watches.BrokenWatch(0, 1, 0);
        c.tick();
        assert.equal("00:00:59", c.toString());
    });

    it("Should show 59 minutes and 59 seconds after tick from 1 hour", function () {
        var c = new Watches.BrokenWatch(1, 0, 0);
        c.tick();
        assert.equal("00:59:59", c.toString());
    });

    it("Should reset watch after end of day", function () {
        var c = new Watches.BrokenWatch(0, 0, 0);
        c.tick();
        assert.equal("23:59:59", c.toString());
    });
});
