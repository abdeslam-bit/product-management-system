let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let up = document.getElementById('up')
let mode = 'create'
let indexRandom;

function goToTheTop(){
    up.onclick = ()=>{
        scrollTo({
            top : 0,
            behavior : 'smooth'
        })
    }
}
goToTheTop()
window.onscroll=()=>{
    if(scrollY>490){
        up.style.display = 'block'
    }else{
        up.style.display = 'none'
    }
}

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result
        total.style.backgroundColor = 'green'
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = 'rgb(186, 13, 13)'
    }
}
let myData

if(localStorage.getItem('info') != null){
    myData = JSON.parse(localStorage.getItem('info'))
}else{
    myData = []
}

submit.addEventListener('click', (even) => {
    let infoProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (mode === 'create') {
        if (infoProduct.title === "" || total.innerHTML === "" || category.value === "" || count.value === "") {
            even.preventDefault();
        } else {
            if (infoProduct.count > 1) {
                for (let i = 0; i < infoProduct.count; i++) {
                    myData.push(infoProduct);
                }
            } else {
                myData.push(infoProduct);
            }
        }
    } else{
        myData[indexRandom] = infoProduct;
        mode = 'create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }

    localStorage.setItem('info', JSON.stringify(myData));
    clearInputValu();
    showData();
});

window.onkeydown = (even)=>{
    if(even.key === "Enter" && document.activeElement === category && category.value != ""){
        submit.click()
    }
}
function clearInputValu(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    submit.value = ''
    getTotal()
}

function showData(){
    let content = ''
    for(let i=0;i<myData.length;i++){
        content += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData[i].title}</td>
                    <td>${myData[i].price}</td>
                    <td>${myData[i].taxes}</td>
                    <td>${myData[i].ads}</td>
                    <td>${myData[i].discount}</td>
                    <td>${myData[i].total}</td>
                    <td>${myData[i].category}</td>
                    <td><button onclick ="update(${i})">Update</button></td>
                    <td><button onclick="delet(${i})">Delete</button></td>
                </tr>
        `
    }
    document.querySelector('tbody').innerHTML = content
    let div = document.getElementById('deleteAll')
    if(myData.length>0){
        div.innerHTML = `
        <button onclick="deleteAll()">Delete All(${myData.length})</button>
             `
    }else{
        div.innerHTML = ''
    }
}
showData()
function delet(index){
    myData.splice(index,1)
    localStorage.setItem('info', JSON.stringify(myData))
    showData()
}

function deleteAll(){
    myData.splice(0)
    localStorage.setItem('info', JSON.stringify(myData))
    showData()
}

function update(index){
    title.value = myData[index].title
    price.value = myData[index].price
    taxes.value = myData[index].taxes
    ads.value = myData[index].ads
    discount.value = myData[index].discount
    category.value = myData[index].category
    count.style.display = 'none'
    submit.innerHTML = 'Update'
    getTotal()
    mode = 'update'
    indexRandom = index
    scrollTo({
        top : 0,
        behavior : 'smooth'
    })
}

let search = document.getElementById('Search')
let searchMood = 'Title'
function searchState(id){
    if(id === 'searchCategorie'){
        searchMood = 'Categorie'
    }else{
        searchMood = 'Title'
    }
    search.placeholder  = 'Search By'+searchMood
    search.focus()
    search.value = ""
}

function searching(value){
    let content = ''
    for(let i=0;i<myData.length;i++){
        if(searchMood === 'Title'){ 
            if(myData[i].title.includes(value.toLowerCase())){
                content += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData[i].title}</td>
                    <td>${myData[i].price}</td>
                    <td>${myData[i].taxes}</td>
                    <td>${myData[i].ads}</td>
                    <td>${myData[i].discount}</td>
                    <td>${myData[i].total}</td>
                    <td>${myData[i].category}</td>
                    <td><button onclick ="update(${i})">Update</button></td>
                    <td><button onclick="delet(${i})">Delete</button></td>
                </tr>
               `
            }
        } else  {
            if(myData[i].category.includes(value.toLowerCase())){
                content += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData[i].title}</td>
                    <td>${myData[i].price}</td>
                    <td>${myData[i].taxes}</td>
                    <td>${myData[i].ads}</td>
                    <td>${myData[i].discount}</td>
                    <td>${myData[i].total}</td>
                    <td>${myData[i].category}</td>
                    <td><button onclick ="update(${i})">Update</button></td>
                    <td><button onclick="delet(${i})">Delete</button></td>
                </tr>
               `
            }
        }
    }
    document.querySelector('tbody').innerHTML = content

}
// toggle code

let toggleGrand = document.getElementById("toggle")
let toggleInside = document.querySelector(".toggleSwitch")

toggleGrand.addEventListener("click",()=>{
    toggleInside.classList.toggle("secondPosition")
    if(toggleInside.className.includes('secondPosition')){
        document.body.style.backgroundColor = 'bisque'
    }else{
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.816)'
    }
})

