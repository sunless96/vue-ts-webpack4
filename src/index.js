import printMe from './print'
console.log(1111)
printMe()

if (module.hot) {
  module.hot.accept('./print', () => {
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}
