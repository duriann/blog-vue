require ('./index.less')
const app = document.getElementById('app')
console.dir(app);
let {name} = {
    name: 'bl',
    age: 14
}
let arr1 = [1,2]
let arr2 = [3,4,...arr1]
class Test{
    static say(){
        console.log('haha class')
    }
}
Test.say()
app.innerText = 'hello webpack' + name+ ''+ arr2