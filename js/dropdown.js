// Array of options
const options = ["Recommended", "Popularity", "Best Deals", "Amenities", "Guest Reviews"];
const defaultOption = "Recommended";

// Initialize dropdown options
function initDropdown(options) {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const button = document.getElementById("dropdownButton");
  const selectedOption = button.querySelector(".selected-option");
  const icon = button.querySelector("i");

  // Set the default option as selected
  selectedOption.textContent = defaultOption;
  button.classList.add("active");

  options.forEach(option => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.textContent = option;
    item.addEventListener("click", function() {
      selectOption(option);
    });
    dropdownMenu.appendChild(item);
  });
}

// Toggle the dropdown menu
document.getElementById("dropdownButton").addEventListener("click", function() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const button = this;
  const icon = button.querySelector("i");

  // Toggle dropdown menu visibility
  dropdownMenu.classList.toggle("show");
  icon.classList.toggle("rotate");
});

// Select an option and animate button text
function selectOption(optionText) {
  const button = document.getElementById("dropdownButton");
  const selectedOption = button.querySelector(".selected-option");
  const icon = button.querySelector("i");

  selectedOption.textContent = optionText;
  button.classList.add("active");
  document.getElementById("dropdownMenu").classList.remove("show");

  // Reset icon rotation
  icon.classList.remove("rotate");
}

// Close the dropdown if clicked outside
window.addEventListener("click", function(event) {
  if (!event.target.closest(".dropdown")) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.remove("show");
    const icon = document.getElementById("dropdownButton").querySelector("i");

    // Reset icon rotation
    icon.classList.remove("rotate");
  }
});

// Initialize dropdown with options
initDropdown(options);
