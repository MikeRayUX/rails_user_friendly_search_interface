const resultsContainer = document.querySelector("#resultsContainer"); // show/hide results element
const results = document.querySelector("#results"); // render search results
const userCount = document.querySelector("#userCount"); // update/render users.length

const createUserElement = (user) => {
  let user_element = document.createElement("a");
  user_element.setAttribute("href", `/users/${user.id}`);
  user_element.setAttribute("target", "_blank");
  user_element.setAttribute("rel", "norefferer");
  user_element.className =
    "text-gray-900 leading-none hover:bg-violet-600 hover:text-white w-full font-normal py-5 pl-6 text-base";
  user_element.innerHTML = user.name;

  return user_element;
};

document.querySelector("#search_field").addEventListener("input", (e) => {
  if (resultsContainer.classList.contains("hidden")) {
    resultsContainer.classList.remove("hidden");
  }

  if (!e.target.value.length) {
    resultsContainer.classList.add("hidden");
  }

  fetch("/api/v1/autocompletes?" + new URLSearchParams({ q: e.target.value }))
    .then((response) => response.json())
    .then((data) => {
      //console.log("data.users:", data.users);
      userCount.innerHTML = `(${data.users.length})`;
      results.innerHTML = null;
      if (data.users.length) {
        for (user of data.users) {
          //console.log("user:", user);
          results.appendChild(createUserElement(user));
        }
      } else {
        no_results_element = document.createElement("p");
        no_results_element.className =
          "text-left my-2 text-slate-600 font-normal text-base";
        no_results_element.innerHTML = "No Users to show.";
        results.appendChild(no_results_element);
      }
    });
});
