var inputs = [
    document.getElementById("name"),
    document.getElementById("description"),
    document.getElementById("url"),
    document.getElementById("check"),
    document.getElementById("recommend")
]

var button = document.getElementById("createit");

button.addEventListener("click", function (){
    if (!inputs[0].value === "" || !inputs[1].value === "") {
        new Modification(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
    }
})

class Element {
    constructor(element) {
        document.createElement(element);
    }
}

var temp = {
    item: "",
    label: "",
    br: "",
    btn: "",
    a: "",
    image: "",
    nam: "",
    div: "",
    rec: "",
    descript: ""
};

class Modification {
    constructor(span, description, img, inactive, recommended) {
        // grid-item
        temp.item = new Element("DIV");
        temp.item.className = "grid-item";

        // for inactivity
        temp.label = new Element("LABEL");
        temp.label.innerHTML = "Unavailible";

        temp.br = new Element("BR");

        // contents
        temp.btn = new Element("BUTTON");
        temp.btn.id="modslot";
        temp.btn.disabled = inactive; 

        temp.a = new Element("A");

        temp.image = new Element("IMG");
        if (img !== null || img !== undefined || img !== "") {
            temp.image.src = img;
        }
        temp.image.className = "icon";
        temp.image.width = "125px";
        temp.image.height = "125px";

        temp.nam = new Element("SPAN");
        temp.nam.innerHTML = span;

        // description
        temp.div = new Element("DIV");

        temp.rec = new Element("P");
        temp.rec.style = "font-size: 20px;";
        temp.rec.innerHTML = "Recommended";

        temp.descript = new Element("H4");
        temp.descript.innerHTML = description;

        this.imprint();
    }

    imprint() {
        temp.item.appendChild(temp.btn);

        if (inactive) {
            temp.btn.before(temp.label);
            temp.label.after(temp.br);
        }

        temp.btn.appendChild(temp.a);
        temp.a.appendChild(temp.image);
        temp.a.after(temp.nam);
        temp.item.after(temp.div);
        temp.div.appendChild(temp.descript);

        if (recommended) {
        temp.descript.before(temp.rec);
        }
    }
}