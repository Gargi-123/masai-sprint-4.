    var current_array;
    window.onload = function () {

        summary()


        var btn = document.getElementById("submit")
        btn.addEventListener("click", search_all_country)
    }


    function summary() {

        var total = document.getElementById("totalCases")
        var active = document.getElementById("activeCases")
        var death = document.getElementById("totalDeaths")
        var recovery = document.getElementById("discharge")
        var country = document.getElementById("countries")

        var total_today = document.getElementById("total_case_today")
        var active_today = document.getElementById("active_case_today")
        var death_today = document.getElementById("total_deaths_today")
        var recovery_today = document.getElementById("total_recovered_today")
        var country_today = document.getElementById("total_country_today")

        var xhr = new XMLHttpRequest()

        xhr.open("GET", "https://api.covid19api.com/summary")

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

        xhr.send()

        xhr.onload = function () {
            var data = JSON.parse(this.response)
            console.log(data)
            console.log(data.Date)
            var p=document.getElementById("date")
            p.textContent=data.Date



            total_today.textContent = "New confirmed: "+data.Global.NewConfirmed
            total.textContent =data.Global.TotalConfirmed

            //active_today = 
            active.textContent = Number(data.Global.TotalConfirmed) - Number(data.Global.TotalRecovered)

            recovery_today.textContent = "New Recovered: "+data.Global.NewRecovered
            recovery.textContent = data.Global.TotalRecovered

            death.textContent =  "New Deaths:"+data.Global.NewDeaths
            death_today.textContent =data.Global.TotalDeaths


            country.textContent = data.Countries.length
        }

    }

    function renderDom(type) {
       
      

        var target = document.querySelector("#res")
        target.innerHTML = ""
        var table = document.createElement("table")
        table.setAttribute("class", "table")
        var thead = document.createElement("thead")
        thead.setAttribute("class", "table-success")
        var thead_tr = document.createElement("tr")
        var thead_th_text
        thead_th_text = ["No:", "Country", "Country Code", "Total Confirmed Cases", "Total Deaths", "Total Recovered"]
        
        for (var i = 0; i < thead_th_text.length; i++) {
            var th = document.createElement("th")
            th.setAttribute("scope", "col")
            th.textContent = thead_th_text[i]
            thead_tr.append(th)
        }
        thead.append(thead_tr)
        table.append(thead)
        target.append(table)

    }

    function createTBody() {
        var clear = document.getElementById("tableBody") || 0
        if (clear != 0) {
            clear.remove()
        }
        var target = document.querySelector(".table")
        var tbody = document.createElement("tbody")
        tbody.setAttribute("id", "tableBody")

        
      
        for (var i = 0; i < current_array.length; i++) {
            console.log(current_array[i])
            var tbody_tr = document.createElement("tr")
            var th1 = document.createElement("th")
            th1.textContent = current_array.indexOf(current_array[i]) + 1
            tbody_tr.append(th1)

            for (var key in current_array[i]) {
                    console.log(current_array[i])
                    if (key != "Slug" && key != "NewConfirmed" && key != "NewDeaths" && key != "NewRecovered" && key != "Date" && key != "Premium") {
                        var th = document.createElement("th")
                        th.textContent = current_array[i][key]
                        tbody_tr.append(th)
                    }
                }

            tbody.append(tbody_tr)
        }
        target.append(tbody)
    }






    function search_all_country() {

        event.preventDefault()

        var xhr = new XMLHttpRequest()

        xhr.open("GET", "https://api.covid19api.com/summary")


        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

        xhr.send()

        xhr.onload = function () {
            if (this.status == 200) {

                var data = JSON.parse(this.response)
                current_array=data.Countries
                renderDom()
                createTBody()

            }

            else { alert("Something Went wrong") }

        }
    }