class DomCountry {
  constructor(ul, data, inp) {
    this.ul = document.querySelector(ul);
    this.data = data;
    this.inp = document.querySelector(inp);

    this.inp.addEventListener("input", () => {
      let searchText = this.inp.value.toLowerCase();

      let filtered = this.data.filter(country =>
        country.name.common.toLowerCase().includes(searchText)
      );

      this.createCountries(filtered);
    });
  }

  createCountries(data = this.data) {
    this.ul.innerHTML = "";

    data.forEach(country => {
      let li = document.createElement("li");

      li.setAttribute('id',`${country.name.common}`);
      li.innerHTML = `<img src="${country.flags.png}" alt="Flag"> 
                      <div>
                      <h3>${country.name.common}</h3>
                      <p>Population: ${country.area}</p>
                      <p>Region: ${country.region}</p>
                      <p>Region: ${country.capital}</p>
                      </div>`;
      this.ul.appendChild(li);
    });
  }
}

const xhr = new XMLHttpRequest();
xhr.open("GET", `https://restcountries.com/v3.1/all`);
xhr.send();

xhr.onload = function () {
  if (xhr.status === 200) {
    let countries = JSON.parse(xhr.responseText);


    const domObj = new DomCountry(".ul", countries, "#inp");
    domObj.createCountries();
  } else {
    console.error("Error:", xhr.statusText);
  }
};


const ul = document.querySelector('.ul');

ul.addEventListener('click', async (e) => {
  const li = e.target.closest("li");
  
  if (li) {
    try {
      let response = await fetch('https://restcountries.com/v3.1/all');
      let countries = await response.json();
      
      let res = countries.find(country => country.name.common === li.id); 

      localStorage.setItem("country", JSON.stringify(res))

      window.location.href = "./country/index.html";

    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
});

