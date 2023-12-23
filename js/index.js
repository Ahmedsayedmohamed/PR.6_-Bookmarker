var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var exampleModal = document.getElementById("exampleModal");

var bookmarkList = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayData();
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function displayData() {
  var data = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    data += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarkList[i].name}</td>
            <td>
                <a href="${
                  bookmarkList[i].url
                }" target="_blank" class="btn visit">
                    <i class="fa-solid fa-eye"></i> Visit
                </a>
            </td>
            <td>
                <div class="btn btn-danger" onclick="deleteLink(${i})"">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </div>
            </td>
      </tr>
        
        `;
  }
  document.getElementById("tbody").innerHTML = data;
}

function addUrl() {
  if (validationName() && validationUrl()) {
    bookmark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookmarkList.push(bookmark);
    clearForm();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayData();
  } else {
    exampleModal.classList.add("show","d-block","bgModal")
  }
}

function deleteLink(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayData();
}

function closeModal() {
    exampleModal.classList.remove("show","d-block","bgModal")
}

// validation cycles

function validationName() {
  var regaxSiteName = /^[a-zA-Z][\w\s]{2,}\w$/;
  if (regaxSiteName.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validationUrl() {
  var regaxSiteUrl = /^(https:\/\/www.){0,1}[a-zA-Z]{3,}\.{1}[a-z]{3,}$/;
  if (regaxSiteUrl.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    return false;
  }
}
