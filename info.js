var url_name = document.URL;
var url = new URL(url_name);
var fname = url.searchParams.get("fname");

   
fetch("https://restcountries.eu/rest/v2/name/" + fname + "?fullText=true").then((res) =>{
  res.json().then((data)=>{

   
  
    var container = document.querySelector(".container");

        h1 = document.createElement("h1"); //Country Name
        h1.append(data[0].name); 
        container.append(h1);
        

       flag = document.createElement("img");//Country flag
   	   flag.className = "flagimg";
       flag.setAttribute("src" , data[0].flag);
       flag.style.width = "20rem";
       container.append(flag);
         

         p3 = document.createElement("p"); //Native Name of the country
         p3.append("Native Name : " + data[0].nativeName);
         container.append(p3);

         p4 = document.createElement('p');  //Region
         p4.append("Region : " + data[0].region);
         container.append(p4);

          p6 = document.createElement('p');  //SubRegion
        p6.append("Sub Region : " + data[0].subregion);
         container.append(p6);

        p7 = document.createElement('p');  //callingCode
        p7.append( "Calling Code : " + data[0].callingCodes);
        container.append(p7);

         p2 = document.createElement("p");  //Country Area
         p2.append("Area : " + data[0].area);
         container.append(p2);
        
         p5 = document.createElement('p');  //Population
         p5.append("Population : "+ data[0].population) ;
         container.append(p5);

         p8 = document.createElement('p');  //timezone
        p8.append("Time Zone : " + data[0].timezones);
        container.append(p8);

		 p9 = document.createElement('p');  //currency
        p9.append("Currency name and symbol : " + data[0].currencies[0].name +"("+data[0].currencies[0].symbol+")");
        container.append(p9);

        p10 = document.createElement('p');  //language
        p10.append("Language : " + data[0].languages[0].name);
        container.append(p10);


  })
})


function revert() {
  window.history.back();
}