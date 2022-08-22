fetch('http://localhost:3000/pups')
.then (resp => resp.json())
.then (pupData => {
    pupData.forEach(pup => {
        renderDogBar(pup.name,pup.image,pup.isGoodDog,pup)      
    })
})

const renderDogBar = function(name, img, dogStatus,pup){
let span = document.createElement('span');
span.innerText = name;
document.getElementById('dog-bar').appendChild(span);
span.addEventListener('click', () => {
    document.getElementById('dog-info').innerHTML = "";
    displayDog(name,img,dogStatus,pup);
})}

const displayDog = function(name, img, dogStatus, pup) {
    const imgTag = document.createElement('img')
    const nameTag = document.createElement('h2')
    const statusTag = document.createElement('button')
    statusTag.setAttribute('id','dog-button')
    imgTag.src = img;
    nameTag.innerHTML = name;
    statusTag.innerHTML = (dogStatus ? 'is Good Dog': 'is Bad Dog');
    document.getElementById('dog-info').append(imgTag,nameTag,statusTag);
    document.getElementById('dog-button').addEventListener('click', () => {
        changeButtonValue(dogStatus,statusTag,pup);    
        patchChange(pup)    
    });
}


const changeButtonValue = function(dogStatus,statusTag,pup) {
    if (dogStatus) {
        statusTag.innerHTML = 'is Bad Dog'
        pup.isGoodDog = 'false'
    } else {
        statusTag.innerHTML = 'is Good Dog'
        pup.isGoodDog = 'true'
    }
}

const patchChange = function (pup){
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pup)
    })
}