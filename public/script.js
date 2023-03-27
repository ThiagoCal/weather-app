const sendData = async(e) =>{
  e.preventDefault()
  console.log(e.target)
  let first_name = e.target.first_name.value;
  let last_name = e.target.last_name.value;
  let email = e.target.email.value;
  let username = e.target.username.value;
  let password = e.target.password.value;
  console.log({first_name, last_name, email, username, password})
  let config = {
    method:"POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({first_name, last_name, username, email, password})
  }
  console.log(config)
  try {
    let response = await fetch('/api/formData', config);
    console.log('res', response);
    let data = await response.json();
    console.log(data);
    getData();
  } catch (error) {
    console.error(error);
  }
}


const login = async(e) =>{
  e.preventDefault()
  let email = e.target.email.value;
  let password = e.target.password.value;
  let config = {
    method:"POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({email, password})
  }
  console.log(config)
  try {
    let response = await fetch('/api/login', config);
    // console.log('res', response);
    let success = await response.json();
    if (success) {
      console.log('message', 'logged in')
      // window.location.href = '/page1.html'; // redirect to dashboard page
    } else {
      alert('Invalid email or password'); // show error message
    }
  } catch (error) {
    console.error(error);
  }
}

const getData = async () => {
  let response = await fetch("/api/form");
  let data = await response.json();
  // console.log(data);
  let container = document.querySelector("#data");
  let html = "";
  data.forEach((user) => {
    html += `
    <div>
      <p>First Name: ${user.first_name}</p>
      <p>Last Name: ${user.last_name}</p>
      <p>Email: ${user.email}</p>
      <p>Username: ${user.username}</p>
      <p>Password: ${user.password}</p>
    </div>
    `;
  });
  container.innerHTML = html;
};
// getData();