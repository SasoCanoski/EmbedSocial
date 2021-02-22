let mainDiv = document.getElementById("mainDiv")
let clickable = document.querySelector(".card")
let loadMoreBtn = document.getElementById("loadMore")
let countElements = document.getElementsByClassName("card");
let showModal = document.getElementById("modal")
let closeBtn = document.querySelector(".closeBtn")
let container = document.querySelector(".container")


let page = 1;
let postArr = [];
let newArr = []
let modal = false


fetch("./Assets/JSON/data.json")
  .then(res => res.json())
  .then(data => {
    postArr = [...data],
      showPosts();
    console.log("arr", postArr);
  })
// create card and show posts
showPosts = () => {
  let start = page * 4 - 4;
  let end = page * 4;
  postArr.forEach((el, i) => el.id = i)

  for (let i = start; i < end; i++) {
    mainDiv.innerHTML +=
      `
            <div class="card" id=${i}  onclick="openModal(this.id)">

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
openModal = (id) => {
  let x = postArr.filter(el => el.id == id)
  modal = true
  if (modal = true) {
    showModal.style.display = "block"
    container.classList.add("blurry")
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

    showModal.innerHTML =
      `
      <div class="modalContainer">
      <div class="modal-left-side">
        <img src="${x[0].image}" />
      </div>
      <div class="modal-right-side">
        <div class="right-top">
          <div class="modal-profile-img">
            <img src="${x[0].profile_image}" />
          </div>
          <div class="modal-name-date">
            <p>${x[0].name}</p>
            <p>${x[0].date}</p>
          </div>
          <div class="social-media-img">
            <img src="./Assets/icons/instagram-logo.svg" />
          </div>
        </div>
        <div class="modal-text-caption">
          <p>${x[0].caption}</p>
        </div>
        <div class="modal-likes">
          <img src="./Assets/icons/heart.svg" />
          <p>${x[0].likes}</p>
        </div>
        <button class="closeBtn" onclick="closeModal()">x</button>
      </div>
    </div>
    `

  }

}
//closing modal
closeModal = () => {
  modal = false
  showModal.style.display = "none"
  container.classList.remove("blurry")
}



