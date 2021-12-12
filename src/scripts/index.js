import i18n from '@data/i18n'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

//Sends the mail to the owner
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#contactForm').addEventListener('submit', (e) => {
        e.preventDefault()
        const formEl = document.forms.contactForm
        const formData = new FoairmData(formEl)
        const name = formData.get('fname')
        const email = formData.get('email')
        const destination = formData.get('currentOptions')
        const text = formData.get('requirements')
        fetch(`https://sendgrid-serverless-email.vercel.app/api/sendEmail?name=${name}&destination=${destination}&email=${email}&text=${text}`)
        .then(response => response.json())
        .then(data => {if (data.error == "") {
            Toastify({
                text: "Uspešno poslano! Odgovorili vam bomo čim prej!",
                duration: 7000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#34D399",
                stopOnFocus: true, 
              }).showToast()
    
        }
        else {
            Toastify({
                text: "Ojoj, prišlo je do napake! Poskusite še enkrat!",
                duration: 7000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#EF4444",
                stopOnFocus: true, 
              }).showToast()
        }
    })
    
    })
    
    const checkbox = document.querySelector("#pogoji")
    checkbox.addEventListener('change', () => {
        const btn = document.querySelector('#potrdi')
        if (checkbox.checked){
            
            btn.disabled = false
        } else {
            btn.disabled = true
         }
    })

    //Selects what items will be in the dropdown
    const optionsListTransportation = document.querySelector('#areaTransportation')
    optionsListTransportation.addEventListener('change', (e) => {
        const lang = document.documentElement.lang;
        const select = document.getElementById("currentOptions")
        const length = select.options.length;
        select.classList.remove("pointer-events-none")
        
        for (let i = length-1; i >= 0; i--) {
          select.options[i] = null;
        }

        if (e.target.value === 'internal') {
            const selector = document.querySelector("#currentOptions");
            selector.disabled = false;
            const options = [
                "Ljubljana - Maribor 150€",
                "Ljubljana - Celje 90€",
                "Ljubljana - Novo mesto 80€",
                "Ljubljana - Postojna 80€",
                "Ljubljana - Portorož 130€",
                "Ljubljana - Kobarid 140€",
                "Ljubljana - Bled 80€",
                "Ljubljana - Kranj 50€",
                "Ljubljana - Ptuj 150€",
                "Ljubljana - Velenje 90€",
                "Ljubljana - Ivančna Gorica 40€",
                "Ljubljana - Koper 110€",
                "Ljubljana - Lipica 110€",
                "Ljubljana - Kranjska Gora 110€",
                "Ljubljana - Bohinj 100€",
                "Ljubljana - Goriška Brda 140€"
            ]
            for (let i = 0; i < options.length; i++) {
                const opt = options[i]
                const el = document.createElement("option")
                el.textContent = opt
                el.value = opt;
                select.appendChild(el);
            }
        }
        if (e.target.value === 'international'){
            const selector = document.querySelector("#currentOptions")
            selector.disabled = false;
            const options = [
                i18n[lang].sectionPrices.travelListInternationalZagreb + " 175€",
                i18n[lang].sectionPrices.travelListInternationalTrst + " 130€",
                i18n[lang].sectionPrices.travelListInternationalVenice + " 300€",
                i18n[lang].sectionPrices.travelListInternationalViena + " 450€",
                i18n[lang].sectionPrices.travelListInternationalMunchen + " 475€",
                i18n[lang].sectionPrices.travelListInternationalCelovec + " 120€",
                i18n[lang].sectionPrices.travelListInternationalBeljak + " 140€",
                i18n[lang].sectionPrices.travelListInternationalBudapest + " 550€",
                i18n[lang].sectionPrices.travelListInternationalMilan + " 600€",
                i18n[lang].sectionPrices.travelListInternationalDubrovnik + " 700€",
                i18n[lang].sectionPrices.travelListInternationalSarajevo + " 600€",
                i18n[lang].sectionPrices.travelListInternationalBeograd + " 550€",
                i18n[lang].sectionPrices.travelListInternationalSplit + " 500€",
                i18n[lang].sectionPrices.travelListInternationalRijeka + " 160€",
                i18n[lang].sectionPrices.travelListInternationalPula + " 250€",
                i18n[lang].sectionPrices.travelListInternationalGraz + " 250€",
                i18n[lang].sectionPrices.travelListInternationalSalzburg + " 350€"
            ]
            for (let i = 0; i < options.length; i++) {
                const opt = options[i]
                const el = document.createElement("option")
                el.textContent = opt
                el.value = opt;
                select.appendChild(el);
            }

        }
        if (e.target.value === 'airport'){
            const selector = document.querySelector("#currentOptions")
            selector.disabled = false;
            const options = [
                i18n[lang].sectionPrices.travelListAirportBrnik + " 45€",
                i18n[lang].sectionPrices.travelListAirportZagreb + " 180€",
                i18n[lang].sectionPrices.travelListAirportTrst + " 150€",
                i18n[lang].sectionPrices.travelListAirportBenetke + " 300€",
                i18n[lang].sectionPrices.travelListAirportDunaj + " 450€",
                i18n[lang].sectionPrices.travelListAirportMunchen + " 500€",
                i18n[lang].sectionPrices.travelListAirportCelovec + " 150€",
                i18n[lang].sectionPrices.travelListAirportBudapest + " 575€",
                i18n[lang].sectionPrices.travelListAirportMilano + " 650€",
                i18n[lang].sectionPrices.travelListAirportRijeka + " 190€"
            ]
            for (let i = 0; i < options.length; i++) {
                const opt = options[i]
                const el = document.createElement("option")
                el.textContent = opt
                el.value = opt;
                select.appendChild(el);
            }

        }
    })
})