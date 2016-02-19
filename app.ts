import Watches = require('./watches');

var regular = new Watches.RegularWatch(0, 0, 0);
regular.tick();

var broken = new Watches.BrokenWatch(0, 0, 0);
broken.tick();

console.log(regular.toString());
console.log(broken.toString());