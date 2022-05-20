let heroes = {
    washingMachine: {
        name: 'Washing Machine',
        health: 100,
        damage: 2,
        img: "https://www.lg.com/us/images/washers/md06098736/gallery/desktop-03.jpg"
    },
    bleach: {
        name: 'Bleach',
        health: 100,
        damage: 5,
        img: "https://images.heb.com/is/image/HEBGrocery/003569033"
    },
    water: {
        name: 'Captain Water',
        health: 100,
        damage: 10,
        img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1555607770%2FGettyImages-128374731.jpg%3Fitok%3DhUQxD_Rl"
    }
}

let boss = {
    name: 'Dr. Milk Shoes',
    health: 100,
    damage: Math.floor(Math.random() * 25)
}

function drawHeroes() {
    let template = ''
    for (const key in heroes) {
        let hero = heroes[key]
        console.log(hero, 'heroes')
        template += ` <div class="col-md-3 p-3">
                <div class="hero-card p-3">
                    <div class="d-flex justify-content-between">
                        <p class="fs-2">${hero.name}</p>
                        <img class="hero-img" src="${hero.img}" alt="">
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${hero.health}%;" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100" id="health-${hero.name}"></div>
                    </div>
                    <div class="text-center"><button class="btn btn-success" onclick="healHero('${key}')">Heal</button></div>
                </div>
            </div>`
    }
    document.getElementById('heroes').innerHTML = template
}

function attackBoss() {
    for (const key in heroes) {
        let hero = heroes[key]
        if (boss.health > 0) {
            boss.health -= hero.damage
        }
        console.log(boss.health, 'boss health')
    }
    drawBossHealth()
}

function drawBossHealth() {
    let elem = document.getElementById('boss-health')
    // console.log(elem)
    document.getElementById('boss-health').style = `width: ${boss.health}%`
    boss.health <= 0 ? document.getElementById('boss').classList.add('bg-danger') : ''
}

function attackHeroes() {
    setInterval(() => {
        if (boss.health > 0) {
            let randomIndex = Math.floor(Math.random() * Object.keys(heroes).length)
            let keys = Object.values(heroes)
            let randomHero = keys[randomIndex]
            randomHero.health -= boss.damage
            console.log(randomHero.health, 'attacking')
            updateHeroHealth(randomHero)
        }
    }, 1000)
}

function updateHeroHealth(hero) {
    document.getElementById(`health-${hero.name}`).style = `width: ${hero.health}%`
}

function healHero(key) {
    console.log(key)
    let hero = heroes[key]
    if (hero.health < 100) {
        hero.health += 15
        updateHeroHealth(hero)
    }
}

function healBoss() {
    setInterval(() => {
        if (boss.health > 0) {
            boss.health += Math.floor(Math.random() * 15)
            drawBossHealth()
        }
    }, 1000)
}

drawHeroes()
attackHeroes()
healBoss()

