document.addEventListener('DOMContentLoaded', () => {
    const ol = document.createElement('ol');
    let page = 1;

    document.querySelector('div#monster-container').append(ol);
    // Fetch Requests
    function getResources(url) {
        return fetch(url).then(r => r.json())
    }

    function createResources(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(r => r.json())
    }
    // Rendering Functions
    function renderMonsterList(monsterData){
        const li = document.createElement('li');

        const pName = document.createElement('h4');
        const pAge = document.createElement('p');
        const pDesc = document.createElement('p');

        pName.textContent = `${monsterData.id}. ${monsterData.name}`;
        pAge.textContent = `Age: ${monsterData.age}`;
        pDesc.textContent = `Description: ${monsterData.description}`;

        
        li.append(pName, pAge, pDesc);
        ol.append(li)
        
    }

    // Event Handlers

    function handleForm(e) {
        e.preventDefault();

        const monster = {
            name:e.target.monName.value,
            age:parseInt(e.target.monAge.value),
            description:e.target.monDesc.value
        }

        createResources('http://localhost:3000/monsters', monster);
        e.target.reset();
    }

    // Invoking Functions
    getResources(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(monsters => monsters.forEach(renderMonsterList))
        .catch(e => console.error(e))

    document.querySelector('button#forward').addEventListener('click', () => {
        page += 1;
        const lis = ol.querySelectorAll('li');
        lis.forEach(li => li.remove())
        
        getResources(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(monsters => monsters.forEach(renderMonsterList))
        .catch(e => console.error(e))
    })

    document.querySelector('button#back').addEventListener('click', () => {
        page -= 1;
        const lis = ol.querySelectorAll('li');
        lis.forEach(li => li.remove())
        
        getResources(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(monsters => monsters.forEach(renderMonsterList))
        .catch(e => console.error(e))
    })

    document.querySelector('form').addEventListener('submit', handleForm);

})