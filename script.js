// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// 重複なしBrandリスト
const noOverLappingBrand = () => {
    let brand = new Set();
    for(let i=0; i < camera.length; i++){
        brand.add(camera[i].brand);
    };
    brand.forEach((e)=>{
        let selectBrand = document.createElement("option");
        selectBrand.value = e;
        selectBrand.id = e
        selectBrand.innerHTML = e;
        st1.append(selectBrand);
    });
    return brand;
}

// modelリスト
const getModel = (e) => {
    st2.innerHTML = "";
    let model = new Set();
    for(let i=0; i<camera.length; i++){
        if(camera[i].brand === e) model.add(camera[i].model)
    }
    model.forEach((e)=>{
        let selectModel = document.createElement("option");
        selectModel.value = e;
        selectModel.innerHTML = e;
        st2.append(selectModel);
    })
    return model;
}

// バッテリー
const getChooseBattery = (model, accessoryPower) => {
    let calcModelPower = camera.filter(ele => ele.model === model)[0].powerConsumptionWh + accessoryPower;
    let estimateHours = battery.map(x =>
        (x.voltage * x.capacityAh / calcModelPower).toFixed(1)
    );

    // 表示するbatteryのindex
    let sortIndex = estimateHours.map((e, index)=>{
        if(e > 1) return index
    }).filter(Boolean);

    // 表示するbatteryの名前
    let chooseBattery = battery.map((x, index)=>{
        for(let i of sortIndex){
            if(index === i)return x.batteryName
        }
    }).filter(Boolean);

    // batteryリスト
    let batteryDict = new Map();
    for(let i=0; i<sortIndex.length; i++){
        batteryDict.set(chooseBattery[i], estimateHours[sortIndex[i]]);
    }
    let sortedBatteryDict = new Map([...batteryDict].sort());

    // HTML反映
    let batteryData = document.getElementById("battery-data")
    batteryData.innerHTML = "";
    //for(let i=0; i<sortedBatteryDict.size(); i++){
    for(let item of sortedBatteryDict){
        let batteryItem = document.createElement("div");
        batteryItem.classList.add("d-flex", "justify-content-between")
        batteryItem.innerHTML = `
        <p class="battery-name">${item[0]}</p>
        <p>Estimate ${item[1]} hours</p>
        `;
        batteryData.append(batteryItem);
    };
    st4.append(batteryData)
}

// target
const st1 = document.getElementById("step-1");
const st2 = document.getElementById("step-2");
const st3 = document.getElementById("step-3");
const st4 = document.getElementById("step-4");

// 初期値
const initial = () => {
    // brand
    let brand = noOverLappingBrand()
    let initBrand = [...brand][2]
    document.getElementById(initBrand).selected = true

    // model
    let model = [...getModel(initBrand)]
    let initModel = model[0];

    // accessory
    let initAccessory = 50;
    document.getElementById("step-3").value = initAccessory

    // バッテリー選定
    getChooseBattery(initModel, initAccessory)

    let current = [initBrand, initModel, initAccessory]
    return current
}

const current = initial()
let currentBrand = current[0];
let currentModel = current[1];
let currentAccessoryPower = current[2];

// Step1
st1.addEventListener('change', (e) => {
    currentBrand = e.target.value;
    currentModel = [...getModel(currentBrand)][0]
    getModel(currentBrand)
});

// Step2
st2.addEventListener('change', (e)=>{
    currentModel = e.target.value;
    getChooseBattery(currentModel, currentAccessoryPower)
});

// step3
st3.addEventListener('change', (e)=>{
    currentAccessoryPower = e.target.value;
    getChooseBattery(currentModel, currentAccessoryPower)
});