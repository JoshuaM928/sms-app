const displayFelid = document.getElementById("field");
const renderMessage = (arr) => {
  let i = arr.length - 1;
  //   console.log(`this is the length ${i}`);
  const paragraph = document.createElement("p");
  //   console.log(`this is the value at i: ${arr[--i]}`)
  paragraph.textContent = arr[i]; // line wont work without a request first
  displayFelid.appendChild(paragraph);
};
setInterval(() => {
  fetch("http://127.0.0.1:3000/reply")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderMessage(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, 5000);
