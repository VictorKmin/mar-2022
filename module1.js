function createUser(name, age) {
  return {
    name,
    age,
    sayHello: () => {
      console.log(`Hello my name is ${name} and I am ${age} years old`);
    }
  }
}

console.log('MODULE 1 WAS INIT');

module.exports = {
  createUser
}
