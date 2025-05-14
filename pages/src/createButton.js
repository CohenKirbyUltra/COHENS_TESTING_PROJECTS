var inputs = [
    document.getElementById("name"),
    document.getElementById("description"),
    document.getElementById("url"),
    document.getElementById("check"),
    document.getElementById("recommend")
]

var button = document.getElementById("createit");

button.addEventListener("click", () => {
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
        let item = new Element("DIV");
        item.className = "grid-item";

        // for inactivity
        let label = new Element("LABEL");
        label.innerHTML = "Unavailible";

        let br = new Element("BR");

        // contents
        let btn = new Element("BUTTON");
        btn.id="modslot";
        btn.disabled = inactive; 

        let a = new Element("A");

        let image = new Element("IMG");
        if (img !== null || img !== undefined || img !== "") {
            image.src = img;
        }
        image.className = "icon";
        image.width = "125px";
        image.height = "125px";

        let nam = new Element("SPAN");
        nam.innerHTML = span;

        // description
        let div = new Element("DIV");

        let rec = new Element("P");
        rec.style = "font-size: 20px";
        rec.innerHTML = "Recommended";

        let descript = new Element("H4");
        descript.innerHTML = description;

        this.imprint();
    }

    imprint() {
        item.appendChild(btn);

        if (inactive) {
            btn.before(label);
            label.after(br);
        }

        btn.appendChild(a);
        a.appendChild(image);
        a.after(nam);
        item.after(div);
        div.appendChild(descript);

        if (recommended) {
        descript.before(rec);
        }
    }
}