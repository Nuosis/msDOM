


window.loadSlider = function (json) {
    //console.log(json);
    const input = JSON.parse(json);
    //console.log(input);
    const data=input.data;
    //console.table(data);

    const div = document.getElementById("slider");

    const createSlider = function(question){
        //console.log(question);
        const text = question?.fieldData?.Question;
        //console.log(text);
        const id = question?.fieldData?.PrimaryKey;
        const min = question?.fieldData?.MinValue;
        const max = question?.fieldData?.MaxValue;
        const startValue = question?.fieldData?.Value;
        //create slider
        const slider = document.createElement("input");
            slider.type = "range";
            slider.className = "form-range pb-5";
            slider.min=min;
            slider.max=max;
            slider.value=startValue;
            slider.id=id;
        slider.oninput = function() {
            //console.log(this.value);
            const divUpdate = document.getElementById(`sliderValueDiv_${id}`);
            divUpdate.innerHTML = this.value;
        };
        slider.onchange = function() {
            //console.log(this.value);
            const sliderResult = this.value;
            const sliderID = this.id;
            const sliderParams = {value: sliderResult, id: sliderID};
            FileMaker.PerformScript("UpdateQuestionValue", JSON.stringify(sliderParams));
        };

        //create question
        const qDiv = document.createElement("p");
        qDiv.innerHTML =   `${text} 
            <span   id="sliderValueDiv_${id}" 
                    class="bg-primary text-white rounded p-1">
            </span>`;

        div.appendChild(qDiv)
        div.appendChild(slider)

};

    data.forEach(function(question){
        const slider = createSlider(question);
    })

    
  
};

