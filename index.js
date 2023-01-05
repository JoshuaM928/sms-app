const displayFelid = document.getElementById("field");
const renderMessage = () => {
  const paragraph = document.createElement("p");
  paragraph.textContent = req.body.Body; // line wont work without a request first
  displayFelid.appendChild(paragraph);
};
setInterval(() => {
  fetch("http://127.0.0.1:3000/reply")
    .then((response) => {
      return response.json();
    }).then((data)=>{
        console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, 5000);
