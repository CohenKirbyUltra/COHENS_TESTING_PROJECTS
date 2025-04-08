(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Error screen must be run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const ArgumentType = Scratch.ArgumentType;
  const BlockType = Scratch.BlockType;
  const formatMessage = Scratch.formatMessage;
  const log = Scratch.log;

  const menuIconURI =
    "data:image/png;base64,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";
  const blockIconURI =
    "data:image/png;base64,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";

  class errorScreen {
    getInfo() {
      return {
        id: "errorscreen",
        name: "Error Screen",
        color1: "#640000",
        color2: "#b40000",
        menuIconURI: menuIconURI,
        blockIconURI: blockIconURI,
        blocks: [
          {
            opcode: "clearAllElements",
            blockType: BlockType.COMMAND,
            text: "Clear all HTML elements (ONLY TEST IN COMPILATION)",
          },
          {
            opcode: "byTagName",
            blockType: BlockType.REPORTER,
            arguments: {
              tag: {
                type: ArgumentType.STRING,
              },
            },
            text: "get Elements by Tag Name: [tag]",
          },
          {
            opcode: "elementsByClassName",
            blockType: BlockType.REPORTER,
            arguments: {
              className: {
                type: ArgumentType.STRING,
              },
            },
            text: "get Elements by Class Name: [className]",
          },
          {
            opcode: "elementById",
            blockType: BlockType.REPORTER,
            arguments: {
              elementID: {
                type: ArgumentType.STRING,
              },
            },
            text: "get Elements by Id: [elementID]",
          },
          {
            opcode: "controlElement",
            blockType: BlockType.COMMAND,
            arguments: {
              element: {
                type: ArgumentType.STRING,
              },
              attribute: {
                type: ArgumentType.STRING,
              },
              value: {
                type: ArgumentType.STRING,
              },
            },
            text: "set element [element] attribute [attribute] to [value]",
          },
          {
            opcode: "errorScreen",
            blockType: BlockType.COMMAND,
            arguments: {
              audioUrl: {
                type: ArgumentType.STRING,
              },
              audioType: {
                type: ArgumentType.STRING,
              },
              imgUrl: {
                type: ArgumentType.STRING,
              },
            },
            text: "Trigger ERROR SCREEN, Audio URL: [audioUrl] Audio Type: [audioType] Image URL: [imgUrl].",
          },
        ],
      };
    }

    clearAllElements(args, util) {
      let a = document.querySelectorAll("*");
      a.forEach((element) => {
        document.removeChild(element);
      });
    }

    byTagName(args, util) {
      const tag = args.tag;

      return `document.getElementsByTagName("${tag}")`;
    }

    elementsByClassName(args, util) {
      const className = args.className;

      return `document.getElementsByClassName("${className}")`;
    }

    elementById(args, util) {
      const elementID = args.elementID;

      return `document.getElementById("${elementID}")`;
    }

    controlElement(args, util) {
      const element = args.element;
      const attribute = args.attribute;
      const value = args.value;

      document.element.attribute = Cast.toString(value);
    }

    errorScreen(args, util) {
      const audioUrl = args.audioUrl;
      const audioType = args.audioType;
      const imgUrl = args.imgUrl;

      let a = document.querySelectorAll("*");
      a.forEach((element) => {
        document.removeChild(element);
      });

      document.body.style.backgroundColor = "black";

      const _errorMP3 = document.createElement("audio");
      _errorMP3.autoplay = true;
      _errorMP3.loop = true;
      _errorMP3.id = "errorAudio";

      const _source = document.createElement("source");
      _source.src = Cast.toString(audioUrl);
      _source.type = Cast.toString(audioType);

      const center = document.createElement("center");
      center.id = "center_";

      const img = document.createElement("img");
      img.id = "error";
      img.src = Cast.toString(imgUrl);

      document.body.appendChild(center);
      center.appendChild(img);

      document.body.appendChild(_errorMP3);
      _errorMP3.appendChild(_source);
    }
  }

  Scratch.extensions.register(new errorScreen());
})(Scratch);
