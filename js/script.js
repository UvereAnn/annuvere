$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $("header").toggleClass("toggle");
  });

  $(window).on("scroll load", function () {
    $(this).removeClass("fa-times");
    $("header").removeClass("toggle");

    if ($(window).scrollTop() > 0) {
      $(".top").show();
    } else {
      $(".top").hide();
    }
  });

  //smooth scrolling
  $('a[href*="#]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });
});

/*****Typewriter effect********/
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function showTab(tabId) {
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  document.getElementById(tabId).classList.add("active");
}

/*************************Pagination*********************************/
const cardsPerPage = 5; // Number of cards to show per page
const dataContainer = document.getElementById("data-container");
const pagination = document.getElementById("pagination");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageNumbers = document.getElementById("page-numbers");
const pageLinks = document.querySelectorAll(".page-link");

const cards = Array.from(dataContainer.getElementsByClassName("card"));

// Calculate the total number of pages
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 1;

// Function to display cards for a specific page
function displayPage(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  cards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Function to update pagination buttons and page numbers
function updatePagination() {
  pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageLinks.forEach((link) => {
    const page = parseInt(link.getAttribute("data-page"));
    link.classList.toggle("active", page === currentPage);
  });
}

// Event listener for "Previous" button
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePagination();
  }
});

// Event listener for "Next" button
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
    updatePagination();
  }
});

// Event listener for page number buttons
pageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = parseInt(link.getAttribute("data-page"));
    if (page !== currentPage) {
      currentPage = page;
      displayPage(currentPage);
      updatePagination();
    }
  });
});

// Initial page load
displayPage(currentPage);
updatePagination();

/************************************Header***************************/
// Get the header element
var header = document.getElementById("header");

// Function to add or remove the 'sticky' class based on the scroll position
function toggleSticky() {
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Attach the function to the scroll event
window.addEventListener("scroll", toggleSticky);
/************************************Header ends***************************/

/***********************Contact form**********************************/

function submitForm() {
  var formData = {
    name: document.getElementById("name").value.toLowerCase().trim(),
    email: document.getElementById("email").value.toLowerCase().trim(),
    message: document.getElementById("message").value.toLowerCase().trim(),
  };

  // Use AJAX to send the data to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      displayResult(response);
    } else {
      displayResult({
        error: "Error submitting the form. Incorrect input!!",
      });
    }
  };

  xhr.send(JSON.stringify(formData));
}

function displayResult(response) {
  var successMessage = document.getElementById("successMessage");
  var errorMessage = document.getElementById("errorMessage");

  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  if (response.success) {
    successMessage.innerHTML = response.message;
    successMessage.style.display = "block";
    // Automatically hide the success message after 2 seconds
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 3000);
    document.getElementById("myForm").reset();
  } else {
    errorMessage.innerHTML = response.error;
    errorMessage.style.display = "block";
    // Automatically hide the error message after 2 seconds
    setTimeout(function () {
      errorMessage.style.display = "none";
    }, 3000);
    //document.getElementById("myForm").reset();
  }
}
