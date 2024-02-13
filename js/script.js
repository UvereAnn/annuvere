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

  ".submit-btn".click(function () {
    $(this).alert("Submission Successful!  We Have Sent You an Email.");
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

// Contact form
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");
  const messageText = document.querySelector("#message_text");

  // Validate name input
  if (nameInput.value.trim() === "") {
    messageText.innerHTML = "!!!!Please fill your name!!!!";
    nameInput.focus();
    return;
  }

  // Validate email input
  if (emailInput.value.trim() === "") {
    messageText.innerHTML = "!!!!Please fill your email!!!!";
    emailInput.focus();
    return;
  }

  // Validate message input
  if (messageInput.value.trim() === "") {
    messageText.innerHTML = "!!!!Please leave a message for me!!!!";
    messageInput.focus();
    return;
  }

  // Submit form
  form.submit();
  //messageText.innerHTML =
  //"Thank you for submitting the form! Please check your email";
});

/**document.getElementById("combined").onclick = function() {
  
    document.getElementById("box-container-one").style.display = "none";
    document.getElementById("box-container-two").style.display = "block";

}**/

/*****Skills tab */
/*function showContent(contentId) {
  // Hide all tab contents
  var tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(function (content) {
    content.classList.remove("active");
  });

  // Show the selected tab content
  document.getElementById(contentId).classList.add("active");
}
*/

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

/***********************Contact form**********************************/
/*function submitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = {
    name: name,
    email: email,
    message: message,
  };

  // Send data to the server using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      handleResponse(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

function handleResponse(response) {
  const successMessage = document.getElementById("successMessage");

  if (response === "success") {
    successMessage.innerHTML = "Message sent successfully!";
    successMessage.classList.add("success");
    setTimeout(function () {
      $(".success-message").slideUp();
    }, 2000);
    document.getElementById("myForm").reset();
  } else {
    successMessage.innerHTML = "Failed to send message. Please try again.";
    successMessage.classList.remove("success");
  }
}*/

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
    document.getElementById("myForm").reset();
  }
}
