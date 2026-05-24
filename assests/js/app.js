const moviecontainer = document.getElementById('moviecontainer')
const movieform = document.getElementById('movieform')
const movieName = document.getElementById('movieName')
const movieImg = document.getElementById('movieImg')
const movieDesciption = document.getElementById('movieDesciption')
const movieRating = document.getElementById('movieRating')
const addmovie = document.getElementById('addmovie')
const updatemovie = document.getElementById('updatemovie')
const backdrop = document.getElementById('backdrop')
const movieModel = document.getElementById('movieModel')
const addbtn = document.getElementById('addbtn')

const closebtn = [...document.querySelectorAll('.closebtn')]

let moviesArr =[]
moviesArr = JSON.parse(localStorage.getItem('movieArr')) || []


function movierating(rating){
    if(rating > 4){
        return 'badge-success'
    }else if(rating <= 4 && rating > 2){
        return 'badge-warning'
    }else{
        return 'badge-danger'
    }
}

function templating(arr){
    let result =``
    arr.forEach(ele =>{
        result+=`<div class="col-md-3" id='${ele.movieId}'>
				<div class="card moviecard">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h2>${ele.movieName}</h2>
						<span class="badge ${movierating(ele.movieRating)}">${ele.movieRating}</span>
					</div>
					<div class="card-body">
						<figure>
							<img src="${ele.movieImg}"
							alt="${ele.movieName}"
							title="${ele.movieName}">

							<figcaption>
								<h3>${ele.movieName}</h3>
                                <p>${ele.movieDesciption}</p>
							</figcaption>
						</figure>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<button class="btn btn-sm ntflx-secondary-btn" onclick='onedit(this)'>Edit</button>
						<button class="btn btn-sm ntflx-primary-btn" onclick='onremove(this)'>Delete</button>

					</div>
				</div>
			</div>`
    })
    moviecontainer.innerHTML =result
}

function onshowhandl(){
    backdrop.classList.toggle('active')
    movieModel.classList.toggle('active')

    movieform.reset()
    addmovie.classList.remove('d-none')
    updatemovie.classList.add('d-none')

}

function onsubmit(ele){
    ele.preventDefault()
    let newmovie ={
        movieName : movieName.value,
        movieImg : movieImg.value,
        movieDesciption : movieDesciption.value,
        movieRating : movieRating.value,
        movieId : Date.now().toString()
    }

    moviesArr.unshift(newmovie)
    localStorage.setItem('movieArr',JSON.stringify(moviesArr))

    movieform.reset()

    onshowhandl()

    let div = document.createElement('div')
    div.className =`col-md-3`
    div.id = newmovie.movieId

    div.innerHTML =`<div class="card moviecard">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h2>${newmovie.movieName}</h2>
						<span class="badge ${movierating(newmovie.movieRating)}">${newmovie.movieRating}</span>
					</div>
					<div class="card-body">
						<figure>
							<img src="${newmovie.movieImg}"
							alt="${newmovie.movieName}"
							title="${newmovie.movieName}">

							<figcaption>
								<h3>${newmovie.movieName}</h3>
                                <p>${newmovie.movieDesciption}</p>
							</figcaption>
						</figure>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<button class="btn btn-sm ntflx-secondary-btn" onclick='onedit(this)'>Edit</button>
						<button class="btn btn-sm ntflx-primary-btn" onclick='onremove(this)'>Delete</button>

					</div>
				</div>`

    moviecontainer.prepend(div)
}

function onremove(ele){
    let removeId = ele.closest('.col-md-3').id
    
    let index = moviesArr.findIndex(ele => ele.movieId == removeId)

    let removeObj = moviesArr.splice(index,1)
    localStorage.setItem('movieArr',JSON.stringify(moviesArr))

    ele.closest('.col-md-3').remove()

}

function onedit(ele){
    let editId = ele.closest('.col-md-3').id

    localStorage.setItem('editId',editId)

    let editObj = moviesArr.find(ele => ele.movieId == editId)
    onshowhandl()
    movieName.value = editObj.movieName
    movieImg.value = editObj.movieImg
    movieDesciption.value = editObj.movieDesciption
    movieRating.value = editObj.movieRating

    addmovie.classList.add('d-none')
    updatemovie.classList.remove('d-none')

}

function onupdate(){
    let updateId = localStorage.getItem('editId')

    let updateObj ={
        movieName : movieName.value,
        movieImg : movieImg.value,
        movieDesciption : movieDesciption.value,
        movieRating : movieRating.value,
        movieId : updateId
    }

    let index = moviesArr.findIndex(ele => ele.movieId == updateId)

    moviesArr[index] = updateObj
    localStorage.setItem('movieArr',JSON.stringify(moviesArr))

    let div = document.getElementById(updateId)
    div.innerHTML = `<div class="card moviecard">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h2>${updateObj.movieName}</h2>
						<span class="badge ${movierating(updateObj.movieRating)}">${updateObj.movieRating}</span>
					</div>
					<div class="card-body">
						<figure>
							<img src="${updateObj.movieImg}"
							alt="${updateObj.movieName}"
							title="${updateObj.movieName}">

							<figcaption>
								<h3>${updateObj.movieName}</h3>
                                <p>${updateObj.movieDesciption}</p>
							</figcaption>
						</figure>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<button class="btn btn-sm ntflx-secondary-btn" onclick='onedit(this)'>Edit</button>
						<button class="btn btn-sm ntflx-primary-btn" onclick='onremove(this)'>Delete</button>

					</div>
				</div>`

    onshowhandl()


}






templating(moviesArr)
movieform.addEventListener('submit',onsubmit)
addbtn.addEventListener('click',onshowhandl)
closebtn.forEach(ele => ele.addEventListener('click',onshowhandl))
updatemovie.addEventListener('click',onupdate)







