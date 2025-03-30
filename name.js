
// ESM module
// const name = 'huy'

// export const getName = () => {
//   console.log(name)
// }


// COMMON JS module
const name = 'huy'

module.exports.getName = (name)=>{
  console.log(name)
}

// module.exports = {name} // ghi đè toàn bộ lên những cái trước đó   exports: { name: 'huy' }

// console.log(module)
