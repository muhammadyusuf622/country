class DomCountry {
  constructor(ul, data, inp, section,darkMode) {
    this.ul = document.querySelector(ul);
    this.data = data;
    this.inp = document.querySelector(inp);
    this.sec = document.querySelector(section)
    this.darkMode = document.querySelector(darkMode)

    this.inp.addEventListener("input", () => {
      let searchText = this.inp.value.toLowerCase();

      let filtered = this.data.filter(country =>
        country.name.common.toLowerCase().includes(searchText)
      );

      this.createCountries(filtered);
    });
    
    this.sec.addEventListener("change", () => {

      if(this.sec.value == ""){
        this.createCountries(this.data)
      }else{

        let res = this.data.filter(country => country.region?.toLowerCase() ==  this.sec.value)
      
        this.createCountries(res)
      }
    });
  }

  darkModeFn(){
    this.darkMode.addEventListener("click", () => {
       
      const root = document.documentElement;
      let currentBg = getComputedStyle(root).getPropertyValue('--body-bacground-color').trim();
  
      if (currentBg === "rgb(28, 39, 61)") {
        root.style.setProperty('--body-bacground-color', 'white');
        root.style.setProperty('--background-color', 'rgb(209, 208, 205)');
        root.style.setProperty('--text-color', 'black');
      } else {
        root.style.setProperty('--body-bacground-color', 'rgb(28, 39, 61)');
        root.style.setProperty('--background-color', 'rgb(48, 54, 66)');
        root.style.setProperty('--text-color', 'white');
      }
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


    const domObj = new DomCountry(".ul", countries, "#inp", "#regionSelect","#darkMode");
    domObj.createCountries();
    domObj.darkModeFn()
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

