const button = document.getElementById('btn')

initBattery() 

// script for batttery
  
function initBattery(){
    const BatteryLiquid = document.querySelector('.battery-liquid')
    const BatteryStatus = document.querySelector('.battery-status')
    const BatteryPercentage = document.querySelector('.battery-percentage')

     navigator.getBattery().then( (batt) =>{
        updateBattery = () =>{
            let level = Math.floor(batt.level * 100)
            BatteryPercentage.innerHTML = level + '%'


            BatteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            if(level == 100){
                BatteryStatus.innerHTML =`Full Battery <i class="ri-battery-2-fill green-color"><i>`
                BatteryLiquid.style.height ='103%'
                button.addEventListener('click',() =>{
                    Notification.requestPermission().then(perm =>  {
                        if (perm === "granted"){
                            new Notification('battery is full ' ,{
                                body: "plug out the charger .",
                                icon: "letter-a (1).png"
                            })
                        }
                    })
                })
            }
            else if (level <= 20 &! batt.charging){
                BatteryStatus.innerHTML = `Battery Low <i class="ri-plug-line animated-red"></i>`
                
            }
            else if( batt.charging ){
                BatteryStatus.innerHTML =`Battery Charging ... <i class="ri-flashlight-line animated-green"></i>`
                
            }
            else{
                BatteryStatus.innerHTML = ''
            }

            if(level <= 20){
                 BatteryLiquid.classList.add('gradient-color-red')
                 BatteryLiquid.classList.remove('gradient-color-orange' , 'gradient-color-green' , 'gradinet-color-yellow')
                 
                 button.addEventListener('click',() =>{
                    Notification.requestPermission().then(perm =>  {
                        if (perm === "granted"){
                            new Notification('battery is low ' ,{
                                body: "plug the charger .",
                                icon: "letter-a (1).png"
                            })
                        }
                    })
                })


            }
            else if (level <= 40){
                BatteryLiquid.classList.add('gradient-color-orange')
                BatteryLiquid.classList.remove('gradient-color-red' , 'gradient-color-green' , 'gradinet-color-yellow')
                 
             
               
            }
            else if(level<= 80){
                BatteryLiquid.classList.add('gradient-color-yellow')
                BatteryLiquid.classList.remove('gradient-color-red' , 'gradient-color-orange' , 'gradinet-color-green')
            }
            else{
                BatteryLiquid.classList.add('gradient-color-green')
                BatteryLiquid.classList.remove('gradient-color-orange' , 'gradient-color-red' , 'gradinet-color-yellow')
     
            }
        }
        updateBattery()

        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
     } )     
}


// battery health notify 
// notify button script
//  button.addEventListener('click',() =>{
//     Notification.requestPermission().then(perm =>  {
//         if (perm === "granted"){
//             new Notification('battery is low ' ,{
//                 body: "plug the charger .",
//                 icon: "letter-a (1).png"
//             })
//         }
//     })
// })