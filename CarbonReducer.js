//reciever user input on button click

let input1 = document.getElementById("btn1");
input1.onclick = previewFile;

//reset displayed values on reset button click

let input2 = document.getElementById("btn2");
input2.onclick = reset;

function reset(){
    document.getElementById("username").innerHTML = "";
    document.getElementById("address").innerHTML = "";
    document.getElementById("redMeat").innerHTML = "";
    document.getElementById("grains").innerHTML = "";
    document.getElementById("dairy").innerHTML = "";
    document.getElementById("cellPhone").innerHTML="";
    document.getElementById("tV").innerHTML = "";
    document.getElementById("computer").innerHTML = "";
    document.getElementById("car").innerHTML = "";
    document.getElementById("walking").innerHTML = "";
    document.getElementById("publicTransport").innerHTML = "";
    document.getElementById("res").innerHTML = ""
    document.getElementById("total").innerHTML = "";

    document.getElementById("redMeat2").innerHTML = "";
    document.getElementById("grains2").innerHTML = "";
    document.getElementById("dairy2").innerHTML = "";
    document.getElementById("cellPhone2").innerHTML = "";
    document.getElementById("tV2").innerHTML = "";
    document.getElementById("computer2").innerHTML = "";
    document.getElementById("car2").innerHTML = "";
    document.getElementById("walking2").innerHTML ="";
    document.getElementById("publicTransport2").innerHTML = "";
}

//called on button click
//opens file and begins filescraping and calculations

function previewFile() {

    //uses FileReader Web API to open a submited file from user
   
    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
       
        //collects file and username data

        const data = reader.result;
        let username = document.getElementById("user").value;

        //calls filescraping function
        carbonReducer(data,username);

      }, false);
    
      if (file) {
        reader.readAsText(file);
      }
    
    }
    
      
function carbonReducer(data,username){

    //split the text file into the different profiles
    
    let profiles = data.split("\n\n");
    
    let index1,index2 = 0

    //for loop to search through to find the profile with the mtching username

    for(p1 of profiles){
        
        let lines1 = p1.split("\n");

        if(lines1[1].includes(username)){

            //get index of response, find the controler value to then match with other profile
            
            index1 = profiles.indexOf(p1)

            let temp = lines1[2].split(" ")
            let controller = temp[temp.length-1];

            //second for loop to search through the file and find the match
            for(p2 of profiles){
                
                let lines2 = p2.split("\n");

                if(lines2[3].includes(controller)){

                    //store the value of the matching profile's index
                    index2 = profiles.indexOf(p2)
                }
            }
        }
    }
    
     //calculate carbon footprint by passsing the array of profiles and the index of the matching pair
     calculator(profiles[index1],profiles[index2]);
    
    }

function calculator(response,request){

    //collecting the instructed variables from the file and displaying accordingly

    let temp = response.split("\n")[1].split(" ");
    let username = temp[temp.length-1];
    document.getElementById("username").innerHTML = username;

    temp = request.split("\n")[1].split(" ");
    let address = temp[temp.length-1];
    document.getElementById("address").innerHTML = address;

    temp = request.split("\n")[2].split(" ");
    let redMeat = temp[temp.length-2]
        
    temp = request.split("\n")[4].split(" ");
    let grains = temp[temp.length-2];

    temp = request.split("\n")[7].split(" ");
    let dairy = temp[temp.length-2];

    temp = request.split("\n")[8].split(" ");
    let cellPhone = temp[temp.length-2];

    temp = request.split("\n")[9].split(" ");
    let tV = temp[temp.length-2];

    temp = request.split("\n")[10].split(" ");
    let computer = temp[temp.length-2];

    temp = response.split("\n")[3].split(" ");
    let car = temp[temp.length-2];

    temp = response.split("\n")[6].split(" ");
    let publicTransport = temp[temp.length-2];

    temp = request.split("\n")[11].split(" ");
    let res = temp[temp.length-1];
    document.getElementById("res").innerHTML = res + " decrease";

    //calculating the carbon emmisons 

    let redMeatCarbon = redMeat * 8 * 0.453592;
    document.getElementById("redMeat").innerHTML = Math.round(redMeatCarbon) + " kg CO2";

    let grainsCarbon = grains * 3.7 * 0.453592;
    document.getElementById("grains").innerHTML = Math.round(grainsCarbon)+ " kg CO2";

    let dairyCarbon = dairy * 6.3 * 0.453592;
    document.getElementById("dairy").innerHTML = Math.round(dairyCarbon)+ " kg CO2";

    let cellPhoneCarbon = cellPhone * 3.6 ;
    document.getElementById("cellPhone").innerHTML = Math.round(cellPhoneCarbon)+ " kg CO2";

    let tVCarbon = tV * 6.8;
    document.getElementById("tV").innerHTML = Math.round(tVCarbon)+ " kg CO2";

    let computerCarbon = computer * 4.2;
    document.getElementById("computer").innerHTML = Math.round(computerCarbon)+ " kg CO2";

    let carCarbon = car * 6.5;
    document.getElementById("car").innerHTML = Math.round(carCarbon)+ " kg CO2";

    let walkingCarbon = 0;
    document.getElementById("walking").innerHTML = Math.round(walkingCarbon);

    let publicTransportCarbon = publicTransport * 4.3;
    document.getElementById("publicTransport").innerHTML = Math.round(publicTransportCarbon)+ " kg CO2";

    let totalCarbon = redMeatCarbon + grainsCarbon + dairyCarbon+cellPhoneCarbon+tVCarbon+computerCarbon+carCarbon+walkingCarbon+publicTransportCarbon;
    document.getElementById("total").innerHTML = Math.round(totalCarbon) + " kg CO2";

    //calculate values needed to reach new years goal

    let resNum = res.split("%")[0];

    document.getElementById("redMeat2").innerHTML = Math.round(redMeatCarbon * (1-resNum/100)) + " kg CO2";
    
    document.getElementById("grains2").innerHTML = Math.round(grainsCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("dairy2").innerHTML = Math.round(dairyCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("cellPhone2").innerHTML = Math.round(cellPhoneCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("tV2").innerHTML = Math.round(tVCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("computer2").innerHTML = Math.round(computerCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("car2").innerHTML = Math.round(carCarbon*(1-resNum/100))+ " kg CO2";

    document.getElementById("walking2").innerHTML = Math.round(walkingCarbon*(1-resNum/100));

    document.getElementById("publicTransport2").innerHTML = Math.round(publicTransportCarbon*(1-resNum/100))+ " kg CO2";

   
}




