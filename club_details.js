let result = JSON.parse(localStorage.getItem("result"));
        console.log(result);

        //Club's Name will be displayed ----------------------------------------------------------------
        const head = document.querySelector('.h1');
        head.textContent = result.clubName;

        //Functions which makes a request and gets or updates the schedules box -------------------------
        //Function to make a get request to get clubSigs Name
        let array;
        async function getDetails(){
            let arr = result.clubSigs;
            array = arr[0].split(',');
            let result1;
            for(let i=0; i<array.length; i++){        
                try {
                const response = await fetch('http://localhost:8006/club/getDet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `clubName=${encodeURIComponent(result.clubName)}&clubSigs=${encodeURIComponent(array[i])}`,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                result1 = await response.json();
                console.log('result1:',result1);
                const body = document.querySelector('.clubBody');
                const poke = document.createElement('div');
                poke.classList.add('poke');
                poke.innerHTML = `<div class="row">
                                    <div class="sigName">${result1.clubSigName}</div>
                                    <div class="message"></div>
                                    <div class="date${i}" id="schedule"></div>
                                    <button class="set${i}" onclick="setDate('${result1.clubSigName}',${i});">Set</button>
                                  </div>`;
                body.appendChild(poke);
                
                } catch (error) {
                console.error('Error:', error);
                }
                addDate(result1.Dates,i);
                //onclick="setDate('${result1.clubSigName}');"${array[i]}
            }   
        }
        
        //Function to display dates already set
        function addDate(date,i){
                console.log(date);
                document.querySelectorAll('.message').innerHTML = ``;
                for(let j=0; j<date.length; j++){
                    let datesSec = document.querySelector(`.date${i}`);
                    console.log('dates:',datesSec);
                    const dateObj = new Date(date[j]);
                    const formattedDate = dateObj.toLocaleString();
                    let poke2 = document.createElement('div');
                    poke2.classList.add('pk1');
                    poke2.innerHTML = `<div>${formattedDate}</div>`;
                    datesSec.appendChild(poke2);
                }    
        }


        getDetails();

        //Function to update the schedules
        function setDate(signame,k){
            let dialogue = document.querySelector('.d');
            if(! dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d');
                body.appendChild(dialogue);
            }
            /*let change1 = [];
            change1 = change;
            console.log(change);
            if(change1){
                change1.forEach(element => {
                    const poke = document.createElement('div');
                    poke.classList.add('pk');
                    poke.innerHTML = `<div>${element}</div>`;
                    dialogue.appendChild(poke);
                });
            }else{*/
                dialogue.innerHTML = `<div style="margin:10px;">Update the Schedule</div>
                                      <div><input type="datetime-local" placeholder="ClubData" class="dateTime1"><br><br>
                                      <div><input type="datetime-local" placeholder="ClubData" class="dateTime2"><br><br>
                                      <button type="submit" class="button3">Submit</button>`; 
            //} 
            dialogue.showModal();
    
            const button3 = document.querySelector('.button3');
            button3.addEventListener('click',async (e) =>{
                e.preventDefault();
                const dateTime1 = document.querySelector('.dateTime1').value;
                const dateTime2 = document.querySelector('.dateTime2').value;
                console.log(dateTime1);
                const dateArr = [];
                dateArr[0] = dateTime1;
                dateArr[1] = dateTime2;
                try {
                const response = await fetch('http://localhost:8006/club/setdates', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clubName: result.clubName,
                        clubSigName: signame,   // Use the correct field name for the signature
                        Dates: dateArr          // Pass array as JSON
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                result2 = await response.json();
                console.log('result2:',result2);
                for(let i=0; i<result2.Dates.length; i++){
                    let changedDateSec = document.querySelector(`.date${k}`);
                    if(changedDateSec){
                        changedDateSec.innerHTML = ``;
                    }
                }    
                for(let i=0; i<result2.Dates.length; i++){
                    let changedDateSec = document.querySelector(`.date${k}`);
                    const dateObj = new Date(result2.Dates[i]);
                    const formattedDate = dateObj.toLocaleString();
                    let poke2 = document.createElement('div');
                    poke2.classList.add('pk1');
                    poke2.innerHTML = `<div>${formattedDate}</div>`;
                    changedDateSec.appendChild(poke2);
                }
                dialogue.close();
                } catch (error) {
                console.error('Error:', error);
                }
            });

        }

    //Functions for the Announcement Form ------------------------------------------------------------    
//Dialogue box to enter announcements
let dialogue;        
function announcementForm(){
    const body = document.body;
    dialogue = document.createElement('dialog');
    dialogue.classList.add('d1');
    body.appendChild(dialogue);
    dialogue.innerHTML = `<div>Sig Name</div>
                          <input type="text" id="Signame" placeholder="Sig Name"><br><br>
                          <div>Description</div>
                          <input type="text" id="description" name="description" placeholder="Enter description"><br><br>
                          <div>Links</div>
                          <input type="text" id="links" placeholder="Enter Link"><br><br>
                          <div>Recruitment Dates:</div>
                          <input type="date" id="date11" name="date1">
                          <button type="submit" class="button3" onclick="red();" style="margin-top: 10px;">Submit</button>
                          `;
    dialogue.showModal();                      
} 
//Function to store the announcements in the database
async function red(){
            const Signam = document.getElementById('Signame').value;
            const description = document.getElementById('description').value;
            const link = document.getElementById('links').value;
            const date = document.getElementById('date11').value;
            try {
            const response = await fetch('http://localhost:8006/club/setann', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `clubName=${encodeURIComponent(result.clubName)}&clubSigName=${encodeURIComponent(Signam)}&description=${encodeURIComponent(description)}&links=${encodeURIComponent(link)}&Dates=${encodeURIComponent(date)}`,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result3 = await response.json();
            console.log('result3:',result3);
            dialogue.close();
            window.location.href = 'index.html';
            } catch (error) {
            console.error('Error:', error);
            }
}


/*async function PutDetailsinReg(){

    let clubSigsarr = [];
    for(let i=0; i<array.length; i++){
        clubSigsarr.push({
            clubSigName: array[i]
        })
    }

    try {
        const response = await fetch('http://localhost:8006/club/getreg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clubName: result.clubName,
                clubSigs: clubSigsarr,   // Use the correct field name for the signature
            })    
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result11 = await response.json();
        console.log('result11:',result11);
    }catch (error) {
        console.error('Error:', error);
    }
}

PutDetailsinReg();*/

//Functions to upload the Registration Form ---------------------------------------------------------
//Dialogue Box for the registration Form
async function RegForm(){
    const body = document.body;
    dialogue = document.createElement('dialog');
    dialogue.classList.add('d1');
    body.appendChild(dialogue);
    dialogue.innerHTML = `<div>Description</div>
                          <input type="text" id="description1" name="description" placeholder="Enter description"><br><br>
                          <button type="submit" class="button5" onclick="red1();" style="margin-top: 10px;">Submit</button>
                          `;
    dialogue.showModal();    
}
//Function to patch the description of registration form in the database
async function red1(){
    /*const regSig = document.getElementById('Signame1').value;*/
    const regdes = document.getElementById('description1').value;
    //let clubSigsarr = [];
    /*for(let i=0; i<array.length; i++){
        clubSigsarr.push({
            clubSigName: array[i]
        })
    }*/

    try {
        const response = await fetch('http://localhost:8006/club/setreg', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clubName: result.clubName,
                //clubSigs: clubSigsarr,   // Use the correct field name for the signature
                description: regdes          // Pass array as JSON
            })    
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result5 = await response.json();
        console.log('result5:',result5);
        window.location.href = 'index.html';
        dialogue.close();
    }catch (error) {
        console.error('Error:', error);
    } 
}

//Functions to Get student details -----------------------------------------------------------------
//Function to get student details
let result8;
async function GetStudentDetails(){
    console.log('hi:',result.clubName);
    try {
        const response = await fetch('http://localhost:8006/club/studdet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `clubName=${encodeURIComponent(result.clubName)}`,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        result8 = await response.json();
        console.log('result8:',result8);
        result8.clubSigs.forEach((element3 , index) => {
            console.log(element3.studentList);
            const RegBody = document.querySelector('.RegBody');
            const poke8 = document.createElement('div');
            poke8.classList.add('poke8');
            poke8.innerHTML = `<div class="row1">
                               <div class="sigName">${element3.clubSigName}</div>
                               <button onclick="displayList(${index});">Applied Students</button>
                               <button onclick="addStud1(${index});">Selected Students</button>
                               <button onclick="addStud2(${index});">Selected Students</button>
                               </div>`;
            RegBody.appendChild(poke8);                   
        });
        } catch (error) {
            console.error('Error:', error);
        } 
}

GetStudentDetails();

//Function to Display the List of Students
function displayList(index){
    dialogue = document.querySelector('.d4');
    if(!dialogue){
        const body = document.body;
        dialogue = document.createElement('dialog');
        dialogue.classList.add('d4');
        body.appendChild(dialogue);
    }
    dialogue.innerHTML = ``;
    const head = document.createElement('div');
    head.classList.add('head');
    head.innerHTML = `<div>Name</div>
                      <div>Email</div>`;
    dialogue.appendChild(head);                  
    const ele = result8.clubSigs[index].studentList[0];
    console.log(ele[0]);
    ele.forEach(key => {
        const poke9 = document.createElement('div');
        poke9.classList.add('poke9');
        poke9.innerHTML = `<div class="list">
                            <div>${key.username}</div>
                            <div>${key.email}</div>  
                           </div>`;
        dialogue.appendChild(poke9); 
    });                  

    const poke10 = document.createElement('div');
    poke10.classList.add('poke10');
    poke10.innerHTML = `<button onclick="closestudDetails();">OK</button>`;
    dialogue.appendChild(poke10);

    dialogue.showModal();
}

function closestudDetails(){
    dialogue.close();
}

//Function to add students who are selected in the First Round --------------------------------------------
//Function to create a Dialogue Box to add selected Student details
let dialogue2;
async function addStud1(index){
    dialogue2 = document.querySelector('.d5');
    if(!dialogue2){
        const body = document.body;
        dialogue2 = document.createElement('dialog');
        dialogue2.classList.add('d5');
        body.appendChild(dialogue2);
    }
    dialogue2.innerHTML = ``;
    const poke11 = document.createElement('div');
    poke11.classList.add('poke11');
    poke11.innerHTML = `<input type="text" id="username" placeholder="User Name"><br><br>
                        <input type="text" id="email" placeholder="Email ID"><br><br>
                        <button onclick="selDet1(${index});">Add</button>
                        <button onclick="thatsIt1();">Close</button>`;
    dialogue2.appendChild(poke11);
    dialogue2.showModal();                   
}

//Function to send a Patch request to add the particular student details
async function selDet1(index){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const clubSigName = result8.clubSigs[index].clubSigName;
    const group1 = [{username: username, email: email}];

    const data = {
        clubName: result.clubName,
        clubSigName: clubSigName,
        group1: group1  // Send only group1
    };
    try {
        const response = await fetch('http://localhost:8006/club/selectstd1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result9 = await response.json();
        console.log(result9);
    }catch (error) {
        console.error('Error:', error);
    } 
}

function thatsIt1(){
    dialogue2.close();
} 

//Function to add students who are selected in the Second Round --------------------------------------------
//Function to create a Dialogue Box to add selected Student details
let dialogue3;
async function addStud2(index){
    dialogue3 = document.querySelector('.d6');
    if(!dialogue3){
        const body = document.body;
        dialogue3 = document.createElement('dialog');
        dialogue3.classList.add('d6');
        body.appendChild(dialogue3);
    }
    dialogue3.innerHTML = ``;
    const poke12 = document.createElement('div');
    poke12.classList.add('poke12');
    poke12.innerHTML = `<input type="text" id="username" placeholder="User Name"><br><br>
                        <input type="text" id="email" placeholder="Email ID"><br><br>
                        <button onclick="selDet2(${index});">Add</button>
                        <button onclick="thatsIt2();">Close</button>`;
    dialogue3.appendChild(poke12);
    dialogue3.showModal();                   
}

//Function to send a Patch request to add the particular student details
async function selDet2(index){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const clubSigName = result8.clubSigs[index].clubSigName;
    const group1 = [{username: username, email: email}];

    const data = {
        clubName: result.clubName,
        clubSigName: clubSigName,
        group1: group1  // Send only group1
    };
    try {
        const response = await fetch('http://localhost:8006/club/selectstd2', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result9 = await response.json();
        console.log(result9);
    }catch (error) {
        console.error('Error:', error);
    } 
}

function thatsIt2(){
    dialogue3.close();
} 

//Function to Download Final Results -----------------------------------------------------------------
async function ReleaseResult(){
    finalListele = result8.clubSigs[0].studentList[2];
    console.log(finalListele);
    finalListArr = [['Name','Email']];
    finalListele.forEach(key => {
        finalListArr.push([key.username,key.email]);
    });
    console.log(finalListArr);

    const worksheet = XLSX.utils.aoa_to_sheet(finalListArr);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Create an Excel file and download it
    XLSX.writeFile(workbook, 'output.xlsx');
}
