let mainDiv = document.getElementById("mainDiv")
let clickable = document.querySelector(".card")
let loadMoreBtn = document.getElementById("loadMore")
let countElements = document.getElementsByClassName("card");
let showModal = document.getElementById("modal")
let closeBtn = document.querySelector(".closeBtn")
let container = document.querySelector(".container")


let page = 1;
let postArr = [];
let modal = false


fetch("./Assets/JSON/data.json")
    .then(res => res.json())
    .then(data => {
        postArr = [...data],
        showPosts();
    })
// create card and show posts
showPosts = () => {
    let start = page * 4 - 4;
    let end = page * 4;
    
    for (let i = start; i < end; i++) {
        mainDiv.innerHTML +=
            `
            <div class="card" id=${i}  onclick="openModal(event)">

              <div class="image-Name-Logo">
                <div>
                  <img class="profile-img" src=${postArr[i].profile_image}/>
                </div>

                <div class="text-name-date">
                  <p>${postArr[i].name}</p>
                  <p>${postArr[i].date}</p>
                </div>

                <div class="logo-img">
                 <img  src="./Assets/icons/instagram-logo.svg"/>
                </div>
              </div>

              <div class="main-image-div">
                <img class="main-image" src="${postArr[i].image}"/>
              </div>

              <div class="text-caption">
                <p>${postArr[i].caption}</p>
              </div>

                <hr>

              <div class="text-likes">
                <img src="./Assets/icons/heart.svg"/>
                <p>${postArr[i].likes}</p>
              </div>

            </div>
        `
    }
}

// load more posts
loadMoreBtn.addEventListener("click", () => {
    page++;
    showPosts()

    if (countElements.length === postArr.length) {
        console.log("ff", countElements.length);
        loadMoreBtn.style.display = "none"
    }
    console.log("rr", countElements.length);

})
// modal opening
openModal = (event) => {
    let x = event.currentTarget.innerHTML
    modal = true
    if (modal === true) {
        showModal.style.display = "flex"
        showModal.innerHTML = x + `<button class="closeBtn" onclick="closeModal()">x</button>`
        container.classList.add("blurry")
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}
//closing modal
closeModal = () => {
    modal = false
    showModal.style.display = "none"
    container.classList.remove("blurry")
}

