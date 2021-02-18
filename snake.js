let canvas = document.querySelector('#board')
let start = document.querySelector('.snake__start')
let speed = document.querySelectorAll('.snake__speed-input')
let close = document.querySelector('.snake__close')
let menu = document.querySelector('.snake__menu')
let board = document.querySelector('.snake__board')
let scoreBoard = document.querySelector('.snake__score')

let ctx = canvas.getContext('2d')
let speedGame;
let checkActiveClass = () => {
   speed.forEach((el) => {
      if (el.checked) {
         el.nextElementSibling.classList.add('speed__checked')
      }
      else {
         el.nextElementSibling.classList.remove('speed__checked')
      }
   })
}
speed.forEach((el) => {
   el.addEventListener('click', () => {
      checkActiveClass()
   })
})
start.addEventListener('click', (e) => {
   speed.forEach((el) => {
      if (el.checked) {
         speedGame = el.value
      }
   })
   menu.style.display = 'none'
   board.style.display = 'block'
   startGame(speedGame)
})

let startGame = (speedGame) => {
   let score = 0
   let elSize = 20
   let elCount = canvas.width / elSize
   let velocity = { x: 0, y: 0 }
   let snake = []
   let food = { x: 15, y: 15 }
   let snakeHead = { x: 10, y: 10 }
   let lastDirection = ''
   let initialDirection = 'ArrowRight'
   let snakeLength = 3

   let drawField = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
   }
   let drawSnake = () => {
      snake.forEach(el => {
         ctx.fillStyle = '#93f52b';
         ctx.fillRect(el.x * elSize, el.y * elSize, elSize - 2, elSize - 2)
         if (snakeHead.x === el.x &&
            snakeHead.y === el.y) {
            scoreBoard.innerHTML = `Score:`
            score = 0
            snakeLength = 3
         }
      })
   }
   let drawFood = () => {
      ctx.fillStyle = 'red'
      ctx.fillRect(food.x * elSize, food.y * elSize, elSize - 2, elSize - 2)
   }
   let updateSnakeHead = () => {
      snakeHead.x += velocity.x
      snakeHead.y += velocity.y
      if (snakeHead.x < 0) {
         snakeHead.x = elCount - 1
      }
      if (snakeHead.x > elCount - 1) {
         snakeHead.x = 0
      }
      if (snakeHead.y > elCount - 1) {
         snakeHead.y = 0
      }
      if (snakeHead.y < 0) {
         snakeHead.y = elCount - 1
      }
   }
   let updateSnakeBody = () => {
      snake.push({
         x: snakeHead.x,
         y: snakeHead.y
      })
      while (snake.length > snakeLength) {
         snake.shift()
      }
   }
   let eatFood = () => {
      if (food.x === snakeHead.x && food.y === snakeHead.y) {
         snakeLength++
         score++
         scoreBoard.innerHTML = `Score: ${score}`
         food.x = Math.floor(Math.random() * elCount)
         food.y = Math.floor(Math.random() * elCount)
         snake.forEach((el) => {
            while (el.x === food.x && el.y === food.y) {
               food.x = Math.floor(Math.random() * elCount)
               food.y = Math.floor(Math.random() * elCount)
            }
         })
      }
   }
   const keyHandler = {
      'ArrowLeft': () => {
         velocity.x = -1
         velocity.y = 0
      },
      'ArrowRight': () => {
         velocity.x = +1
         velocity.y = 0
      },
      'ArrowDown': () => {
         velocity.x = 0
         velocity.y = +1
      },
      'ArrowUp': () => {
         velocity.x = 0
         velocity.y = -1
      }
   }
   let onKey = (e) => {
      if (!lastDirection) {
         keyHandler[initialDirection]()
         lastDirection = initialDirection
      }
      else {
         if (keyHandler.hasOwnProperty(e.key)) {
            if (e.key && e.key === 'ArrowLeft') {
               if (lastDirection !== 'ArrowRight') {
                  keyHandler[e.key]()
                  lastDirection = e.key
               }
            }
            if (e.key && e.key === 'ArrowRight') {
               if (lastDirection !== 'ArrowLeft') {
                  keyHandler[e.key]()
                  lastDirection = e.key
               }
            }
            if (e.key && e.key === 'ArrowUp') {
               if (lastDirection !== 'ArrowDown') {
                  keyHandler[e.key]()
                  lastDirection = e.key
               }
            }
            if (e.key && e.key === 'ArrowDown') {
               if (lastDirection !== 'ArrowUp') {
                  keyHandler[e.key]()
                  lastDirection = e.key
               }
            }
         }
      }
   }
   onKey()
   document.addEventListener('keydown', onKey)
   function updateGame() {
      updateSnakeHead()
      drawField()
      drawSnake()
      eatFood()
      drawFood()
      updateSnakeBody()
   }
   let interval = setInterval(updateGame, 1000 / speedGame)
   close.addEventListener('click', () => {
      clearInterval(interval)
      ctx.clearRect(0, 0, 400, 400)
      menu.style.display = 'block'
      board.style.display = 'none'
      speed[0].checked = true
      checkActiveClass()
      scoreBoard.innerHTML = `Score:`
   })
}



