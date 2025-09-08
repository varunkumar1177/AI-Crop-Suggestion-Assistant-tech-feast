async function getweather() {
  const city = document.getElementById("city").value;
  const apiKey = "b4dcafaef77330222efef31ccbfdd5b3"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    
    const data = await response.json();
    document.getElementById("result").innerHTML = `
      <div class="tips-section">
      <h3>${data.name}, ${data.sys.country}</h3>     <p><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon"></p> 
      <p>📅 Date: ${new Date().toLocaleDateString()}</p>
      <p>⏰ Time: ${new Date().toLocaleTimeString()}</p>
      <hr>
      <p>🌡 Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      <p>⛅ Weather: ${data.weather[0].description}</p>
      </div>
      `;
  } catch (error) {
    document.getElementById("result").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function cropsuggestion() {
  const soil = document.getElementById("soil").value;
  const season = document.getElementById("season").value;
  
  const cropSuggestions = {
    loamy: {
      summer: [
        {name:"Maize",duration:"120 days",water:"High"},
        {name:"Groundnut",duration:"100 days",water:"Medium"},
        { name:"Cotton",duration:"150 days",water:"High"}],
      monsoon: [
        {name:"Paddy",duration:"130 days",water:"very High"},
        {name:"Soybean",duration:"90 days",water:"Medium"},
        {name:"Sugarcane",duration:"300 days",water:"High"}
      ],
      winter: [
        {name:"Wheat",duration:"120 days",water:"Medium"},
        {name:"Barley",duration:"100 days",water:"Low"}, 
        {name:"Mustard",duration:"90 days",water:"Low"}
      ]
    },
    clay: {
      summer: [
        {name:"Pulses",duration:"100 days",water:"Low",demand: "⭐⭐⭐⭐" }, 
        {name:"Millets",duration:"90 days",water:"Low",demand: "⭐⭐⭐" }, 
        {name:"Cotton",duration:"150 days",water:"High",demand: "⭐⭐⭐⭐⭐" }
      ],
      monsoon: [
        {name:"Rice",duration:"130 days",water:"very High",demand: "⭐⭐⭐⭐"}, 
        {name:"Jute",duration:"120 days",water:"High",demand: "⭐⭐⭐⭐" }, 
        {name:"Sugarcane",duration:"300 days",water:"High",demand: "⭐⭐⭐⭐⭐" }
      ],
      winter: [
        {name:"Wheat",duration:"120 days",water:"Medium",demand: "⭐⭐⭐⭐"}, 
        {name:"Gram",duration:"100 days",water:"Low",demand: "⭐⭐"}, 
        {name:"Mustard",duration:"90 days",water:"Low",demand: "⭐⭐⭐" }
      ]
    },
    sandy: {
      summer: [
        {name:"Watermelon",duration:"80 days",water:"Low",demand: "⭐⭐"}, 
        {name:"Groundnut",duration:"100 days",water:"Medium",demand: "⭐⭐⭐"}, 
        {name:"Bajra",duration:"90 days",water:"Low",demand: "⭐⭐⭐⭐" }
      ],
      monsoon: [
        {name:"Maize",duration:"120 days",water:"High",demand: "⭐⭐⭐⭐"}, 
        {name:"Pulses",duration:"100 days",Water:"Low",demand: "⭐⭐⭐"}, 
        {name:"Castor",duration:"150 days",water:"Low",demand: "⭐⭐⭐⭐" }
      ],
      winter: [
        {name:"Wheat",duration:"120 days",water:"Medium",demand: "⭐⭐⭐⭐"}, 
        {name:"Barley",duration:"100 days",water:"Low",demand: "⭐⭐"}, 
        {name:"Mustard",duration:"90 days",water:"Low",demand: "⭐⭐⭐" }
      ]
    }
  };
  if (!soil || !season){
    document.getElementById("crop").innerHTML = `<p style="color:red;">Please select both soil type and season.</p>`;
    return;
  }

  const crops = cropSuggestions[soil][season];

  let output = `<h3>Based on ${soil} soil and ${season} season, we suggest:</h3>`;
  output += `<div class="crop-suggestions">`;

  crops.forEach(crop => {
    output += `
      <div class="crop-card">
        <h4>${crop.name}</h4>
        <p><b>Duration:</b> ${crop.duration}</p>
        <p><b>Water Requirement:</b> ${crop.water}</p>
        <p><b>Market Demand:</b> ${crop.demand}</p>
      </div>
    `;
  });

  output += `</div>`;

  output += `
    <div class="tips-section">
      <h3> Farming Tips</h3>
      <ul>
        <li>Use organic fertilizers to improve soil fertility.</li>
        <li>Rotate crops every season to maintain soil health.</li>
        <li>Ensure proper irrigation to avoid waterlogging.</li>
        <li>Protect young plants from pests using natural remedies.</li>
        <li>Harvest at the right time for better market prices.</li>
      </ul>
    </div>
  `;

  document.getElementById("crop").innerHTML = output;
}

const result=document.getElementById("result");

  
const crop=document.getElementById("crop");
function resetbutton(){
    result.innerHTML="";
    crop.innerHTML="";
}