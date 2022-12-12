const isValidIsbn = function (str) {
  /*
    var sum, weight, digit, check, i;

    str = str.replace(/[^0-9X]/gi, "");

    if (str.length != 10 && str.length != 13) {
      return false;
    }

    if (str.length == 13) {
      sum = 0;
      for (i = 0; i < 12; i++) {
        digit = parseInt(str[i]);
        if (i % 2 == 1) {
          sum += 3 * digit;
        } else {
          sum += digit;
        }
      }
      check = (10 - (sum % 10)) % 10;
      return check == str[str.length - 1];
    }

    if (str.length == 10) {
      weight = 10;
      sum = 0;
      for (i = 0; i < 9; i++) {
        digit = parseInt(str[i]);
        sum += weight * digit;
        weight--;
      }
      check = (11 - (sum % 11)) % 11;
      if (check == 10) {
        check = "X";
      }
      return check == str[str.length - 1].toUpperCase();
    }*/
};

const form = document.getElementById("formularz");
form.addEventListener("submit", async (e) => {
  let errors = [];
  e.preventDefault();
  const ValidateChecker = [
    {
      value: form.imie.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawne imie");
          return false;
        }
      },
    },
    {
      value: form.wiek.value,
      method: function () {
        const wiek = this.value;
        if (Number(wiek) < 2 || Number(wiek) > 99) {
          errors.push("wprowadz poprawny wiek");
          return false;
        }
      },
    },
    {
      value: form.nazwisko.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawne nazwisko");
          return false;
        }
      },
    },
    ,
    {
      value: form.email.value,
      method: function () {
        return String(this.value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
    },
    {
      value: form.pesel.value,
      method: function () {
        /*
          const pesel = this.value;

          const ValidatePesel = () => {
            let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;
            let controlNumber = Number(pesel.substring(10, 11));

            for (let i = 0; i < weight.length; i++) {
              sum += Number(pesel.substring(i, i + 1)) * weight[i];
            }
            sum = sum % 10;
            return (10 - sum) % 10 === controlNumber;
          };
          if (ValidatePesel() == false || pesel == "") {
            errors.push("wprowadz poprawny pesel");
            return false;
          }
          */
      },
    },
    {
      value: form.plec.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawna plec");
          return false;
        }
      },
    },
    {
      value: form.telefon.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawny telefon");
          return false;
        }
      },
    },
    {
      value: form.klasa.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawna klase");
          return false;
        }
      },
    },
    {
      value: form.wydawca.value,
      method: function () {
        if (this.value == "") {
          errors.push("wprowadz poprawnego wydawce");
          return false;
        }
      },
    },
    {
      value: form.ISBN.value,
      method: function () {
        return true;
      },
    },
  ];
  ValidateChecker.forEach((item) => {
    item.method();
  });

  if (errors.length > 0) {
    errors.forEach((item) => {
      document.querySelector(".errorDiv").innerHTML += `${item} </br>`;
      setTimeout(() => {
        document.querySelector(".errorDiv").innerHTML = "";
      }, 2500);
    });
  }

  const formData = new FormData(form);
  let formObject = {};
  for (const pair of formData.entries()) {
    formObject[pair[0]] = pair[1];
  }
  const url = "http://imiki.pl:2020/form";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((res) => res.json())
    .then((data) => {
      let h1 = document.querySelector("h1");
      h1.textContent = data.message;
      console.log(data.flag)
      data.flag == 1 ? (h1.style.color = "green") : (h1.style.color = "red");
    });
});
