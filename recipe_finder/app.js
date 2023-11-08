const input = document.querySelector('input');
const button = document.querySelector('button');
const protein = document.querySelector('.protein');
const cals = document.querySelector('.cals');
const container = document.querySelector('.recipe-container');
const box = document.querySelector('.recipe-box');
const toast = document.querySelector('#toast');
const salad = document.querySelector('#salad');

const APIKey = 'c47e4056d2ff4a41fb786c57cb913ff1';
const ID = '7a4036c8';
const map = new Map();
const tt = 0;
button.addEventListener('click', (e) =>{
    e.preventDefault();
    toast.style.display = "none";
    salad.style.display = "none";
    window.addEventListener('load', function() {
        // Reset the entire page by redirecting to the same page after it loads
        location.reload();
    });
    
    // Add an event listener to the window's beforeunload event
    window.addEventListener('beforeunload', function() {
        // Save the current input value to the session cookie
        setCookie('inputValue', document.getElementById('inputField').value);
    });
    getInfo();
});

input.addEventListener('submit', () => {
    toast.style.display = "none";
    salad.style.display = "none";
    window.addEventListener('load', function() {
        // Reset the entire page by redirecting to the same page after it loads
        location.reload();
    });
    
    // Add an event listener to the window's beforeunload event
    window.addEventListener('beforeunload', function() {
        // Save the current input value to the session cookie
        setCookie('inputValue', document.getElementById('inputField').value);
    });
    getInfo();
})

async function getInfo() {
    const search = input.value;
    const link = `https://api.edamam.com/search?app_id=${ID}&app_key=${APIKey}&q=${search}`;

    let result = await fetch(link);
    let data = await result.json();
    const results = data.hits;
    
    results.map((res) => {
        const image = document.createElement('img');
        image.src = res.recipe.image;
        const a = document.createElement('a');
        a.href = res.recipe.url;
        a.textContent = res.recipe.label;
        const prot = document.createElement('span');
        prot.textContent = "Proteins: " + Math.round(res.recipe.totalNutrients.PROCNT.quantity) + "g"
        prot.classList.add('protein');
        const calories = document.createElement('span');
        calories.textContent = "Energy: " + Math.round(res.recipe.calories) + "kcal"
        calories.classList.add('cals');
        const wrapper = document.createElement('div');
        wrapper.classList.add('recipe-box');
        wrapper.appendChild(image);
        wrapper.appendChild(a);
        wrapper.appendChild(prot);
        wrapper.appendChild(calories);
        container.appendChild(wrapper);
    });
}


