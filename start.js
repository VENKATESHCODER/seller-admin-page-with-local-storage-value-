var submit = document.getElementById('addform');
submit.addEventListener('submit',saveToStorage);

async function saveToStorage(event) {   
    try {
        event.preventDefault();
        const sellingPrice = event.target.price.value
        const productName = event.target.Product.value

        const product = {
            sellingPrice,
            productName
        }
        let response  = await axios.post("https://crudcrud.com/api/097740daba73464194cb150139e38fcb/product", product);
        displayUser(response.data)
        tempTotal.innerHTML = parseInt(tempTotal.innerHTML) + parseInt(response.data.sellingPrice)
        console.log(response)
    } catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
        console.log(err);
    }
}

var tempTotal = document.getElementById('totalvalue')
window.addEventListener('DOMContentLoaded', async(event) => {
    try {
        let response2 = await axios.get("https://crudcrud.com/api/097740daba73464194cb150139e38fcb/product")
        for(var i = 0; i < response2.data.length; i++){
            displayUser(response2.data[i])
            tempTotal.innerHTML = parseInt(tempTotal.innerHTML) + parseInt(response2.data[i].sellingPrice)
        }
    } catch (error) {
        console.log(error)
    }
})

function displayUser(user) {
    const parentNode = document.getElementById('ul');
    const childHTML = `<li id = ${user._id}>${user.sellingPrice} - ${user.productName}
    <button onclick = deleteUser('${user._id}')>Delete product</button></li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

async function deleteUser(userId) {
    try {
        const response1 = await axios.get(`https://crudcrud.com/api/097740daba73464194cb150139e38fcb/product/${userId}`)
        tempTotal.innerHTML = parseInt(tempTotal.innerHTML) - parseInt(response1.data.sellingPrice)
    } catch (error) {
        console.log(error)
    }
    try {
        const response3 = await axios.delete(`https://crudcrud.com/api/097740daba73464194cb150139e38fcb/product/${userId}`)
    } catch (err) {
        console.log(err);
    }finally{
        removeItemFromUserScreen(userId);
    }
}

function removeItemFromUserScreen(userId){
    const parentNode = document.getElementById('ul');
    const elem = document.getElementById(userId)
    parentNode.removeChild(elem)
}
