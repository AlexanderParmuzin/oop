// ----- Avaliable dishes

const SMALL_HAMBURGER = {
  name: 'Small Hamburger',
  size: 'small',
  price: 50,
  cals: 20,
}

const BIG_HAMBURGER = {
  name: 'Big Hamburger',
  size: 'big',
  price: 100,
  cals: 40,
}

const CAESAR = {
  name: 'Caesar salad',
  price: 100,
  cals: 20,
}

const OLIVIE = {
  name: 'Olivie',
  price: 50,
  cals: 80,
}

const COLA = {
  name: 'Cola',
  price: 50,
  cals: 40,
}

const COFFEE = {
  name: 'Coffee',
  price: 80,
  cals: 20,
}

// ----- Avaliable stuffing for Hamburger

const CHEESE = {
  name: 'Cheese',
  price: 10,
  cals: 20,
}

const SALAD = {
  name: 'Salad',
  price: 20,
  cals: 5,
}

const POTATO = {
  name: 'Potato',
  price: 15,
  cals: 10,
}

// ----- Main class

class Meal {
  constructor(dish) {
    this.name = dish.name
    this.price = dish.price
    this.cals = dish.cals
  }
  get fullPrice() {
    return this.price
  }

  get fullCals() {
    return this.cals
  }
}

// ----- Hamburger

class Hamburger extends Meal {
  constructor(dish, stuffing) {
    super(dish)
    this.stuffing = stuffing
    if (this.stuffing === undefined) {
      return console.log('Please choose stuffing for your hamburger.')
    }
  }

  get stuffingPrice() {
    let total = 0
    this.stuffing.forEach((item) => (total += item.price))
    return total
  }

  get stuffingCals() {
    let total = 0
    this.stuffing.forEach((item) => (total += item.cals))
    return total
  }

  get stuffingList() {
    let list = []
    this.stuffing.forEach((item) => list.push(item.name))
    return list.join(', ')
  }

  get fullPrice() {
    return this.price + this.stuffingPrice
  }

  get fullCals() {
    return this.cals + this.stuffingCals
  }

  get mealCheck() {
    return `
    ${this.name}
    Stuffing: ${this.stuffingList}
    Calories: ${this.fullCals}cals
    Price: ${this.fullPrice}tug
    `
  }
}

// ----- Salad

class Salad extends Meal {
  constructor(dish, weight = 100) {
    super(dish)
    this.weight = weight
    this.weightCost = this.weight / 100
  }

  get fullPrice() {
    return this.price * this.weightCost
  }

  get fullCals() {
    return this.cals * this.weightCost
  }

  get mealCheck() {
    return `
    ${this.name}
    Weight: ${this.weight}g
    Calories: ${this.fullCals}cals
    Price: ${this.fullPrice}tug
    `
  }
}

// ----- Beverage

class Beverage extends Meal {
  constructor(dish) {
    super(dish)
  }
  get mealCheck() {
    return `
    ${this.name}
    Calories: ${this.fullCals}cals
    Price: ${this.fullPrice}tug
    `
  }
}

// ----- Order

class Order {
  isPayed = 'false'
  constructor(...chosen) {
    this.chosen = chosen
  }

  get sumPrice() {
    let total = 0
    this.chosen.forEach((item) => (total += item.fullPrice))
    return total
  }

  get sumCals() {
    let total = 0
    this.chosen.forEach((item) => (total += item.fullCals))
    return total
  }

  get orderCheck() {
    let check = this.chosen.map((item) => item.mealCheck).join('')
    return `Order Check:
    ${check}
    Total Calories: ${this.sumCals}
    Total Price: ${this.sumPrice}`
  }

  addMeal(dish) {
    if (this.isPayed === 'true') {
      return console.log(
        `Cannot add ${dish.name}, the order is closed. Please create a new order.`
      )
    }
    console.log(`${dish.name} was added to the order. `)
    this.chosen.push(dish)
  }

  removeMeal(dish) {
    if (this.isPayed === 'true') {
      return console.log(
        `Cannot remove ${dish.name}, the order is closed. Please create a new order.`
      )
    }
    if (this.chosen.length == 0) {
      return console.log(
        'Nothing to delete, the order list is empty. Feel free to add something.'
      )
    }
    let index = this.chosen.findIndex((item) => item === dish)
    if (index !== -1) {
      console.log(`${this.chosen[index].name} was removed from order.`)
      this.chosen.splice(index, 1)
    }
  }

  pay() {
    if (this.isPayed === 'true') {
      return console.log('The order is closed. Please create a new order.')
    }
    console.log('The payment was succesful.')
    this.isPayed = 'true'
  }
}

// ------------ Test ----------------

// ----- Create dishes
const bigHam = new Hamburger(BIG_HAMBURGER, [POTATO, CHEESE, SALAD])
const smallHam = new Hamburger(SMALL_HAMBURGER, [POTATO, CHEESE])
const caes150 = new Salad(CAESAR, 150)
const olie140 = new Salad(OLIVIE, 140)
const coffee = new Beverage(COFFEE)
const cola = new Beverage(COLA)

// ----- Create order with dishes
const order1 = new Order(bigHam, caes150, coffee)

// ----- 1. Check the order list, total calories and price
// console.log(order1.orderCheck)

// ----- 2. Add Small Hamburger to the order
// const order2 = new Order(bigHam, olie140, coffee)
// order2.addMeal(smallHam)
// console.log(order2.orderCheck)

// ----- 3. Remove Caesar Salad from order
// const order3 = new Order(bigHam, caes150, cola)
// order3.removeMeal(caes150)
// console.log(order3.orderCheck)

// ----- 4. Remove Caesar Salad from order but the order is empty
// const order4 = new Order()
// order4.removeMeal(caes150)
// console.log(order4.orderCheck)

// ----- 5. Closing order with payment and trying to add or remove meals
// const order5 = new Order(bigHam, caes150, coffee)
// order5.pay()
// order5.addMeal(smallHam)
// order5.removeMeal(bigHam)
// console.log(order5.orderCheck)

