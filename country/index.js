const data = JSON.parse(localStorage.getItem("country"));
const backHistry = document.getElementById("back-histry")


class CountryBiName{
  constructor(data,div,img){
    this.data = data;
    this.div = document.querySelector(div)
    this.img = document.querySelector(img)
  }

  dataPrinthtml(){
    this.div.innerHtml = "";


      const div = document.createElement("div");
      this.img.src = this.data.flags.png;
      console.log(data.flags.png)
      div.innerHTML = `<div>
                      <h3>${this.data.name.common}</h3>
                      <p>Native Name: ${Object.values(this.data.name.nativeName)
                        .map(lang => lang.official).join(", ")}</p>
                      <p>Population: ${this.data.area}</p>
                      <p>Region: ${this.data.region}</p>
                      <p>Sub region: ${this.data.subregion}</p>
                      <p>Capital: ${this.data.capital}</p>
                      <p>Language: ${Object.values(this.data.languages).join(", ")}</p>
                      <p>Borders: ${this.data.borders ? this.data.borders.map(code => `<span id="${code}">${code}</span>`).join(", ") : 'No borders'}</p>
                      </p>
                      
                      </div>`
      this.div.appendChild(div);
      console.log(div)
  }
}

const country1 = new CountryBiName(data,".info","#img");
country1.dataPrinthtml()



const div = document.querySelector(".info");

if (div) { 
  div.addEventListener("click", async (e) => {
    let res = e.target.closest("span");

    if (res) {
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let countries = await response.json();

        let res2 = countries.find(country => country.cca3 === res.id);

        localStorage.setItem("country", JSON.stringify(res2));

        window.location.reload();

      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  });
}

document.addEventListener("keyup", function(event) {
  if(event.key === "Escape"){
    window.location.href = "../index.html"
  }
});


backHistry.addEventListener("click", function () {
  window.history.back();
})