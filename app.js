const module1 = require('./module1');
require('./files');

const user = module1.createUser('Viktor', 26);

user.sayHello();
