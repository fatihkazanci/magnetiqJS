/*
*	MagnetiqJS
*	Updated On: 08/11/2021
*	By Fatih KAZANCI
*   Licenced By GNU General Public License v3.0
*   https://github.com/fatihkazanci/magnetiqJS/blob/main/LICENSE
*/

var magnetiq = function () {
  // Attributes
  var eventAttributes = {
    forEach: "mq-for",
    forEachSort: "mq-sort",
    if: "mq-if",
    root: "",
  };

  // Variables
  var regex = /{{(.*?)}}/;
  var vRegex = /{{(.*?)}}/g;

  let obj = {
    $var: {}
  };

  let listForEach = [];
  let listVariables = [];
  let listIf = [];
  var baseHtmlString = String(stripScripts(document.body.innerHTML));
  var searchDoc = document.createElement("div");
  // Variable Event
  // MQ Listen Object
  var validator = {
    get(target, key) {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], validator);
      } else {
        return target[key];
      }
    },
    set(target, key, value) {
      target[key] = value;
      detectForEach(key);
      detectVaribles(key, value);
      return true;
    },
  };
  var mq = new Proxy(obj, validator);

  // Extensions
  var newGuid = function () {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  };
  var dynamicSort = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
  }

  // Load Functions
  var getForEachElements = function () {
    document
      .querySelectorAll(
        eventAttributes.root + "[" + eventAttributes.forEach + "]"
      )
      .forEach(function (value, key, parent) {
        var foreachString = value.getAttribute(eventAttributes.forEach);
        var foreachListObj = {
          name: foreachString,
          listName: foreachString.split(" in ")[1].trim(),
        };
        var checkForEach = listForEach.find(function (
          currentValue,
          currentKey,
          currentParent
        ) {
          if (currentValue.name == foreachString) {
            return true;
          }
        });

        if (checkForEach == null) {
          listForEach.push(foreachListObj);
        }
      });
  };
  var getVariableElements = function () {
    var htmlString = document.querySelector("body").innerText;
    var regexArray = htmlString.match(vRegex);
    if (regexArray != null && regexArray != undefined) {
      regexArray.forEach(function (value, key, parent) {
        listVariables.push({
          name: value,
          guid: "mq-" + newGuid(),
        });
      });
    }
  };
  var getIfElements = function () {
    var mqIfs = document.querySelectorAll("[" + eventAttributes.if + "]");
    mqIfs.forEach(function (v, i, p) {
      var currentOperator = v.getAttribute(eventAttributes.if);
      var operatorValue = Boolean(eval("" + currentOperator + ";"));
      if (!operatorValue) {
        v.remove();
      }
      listIf.push({
        element: v,
        operator: currentOperator
      })

    })
  }

  // Functions
  var loop = function (doc, foreachString, currentListObj) {
    var foreachArray = foreachString.split(" in ");
    var foreachVariableName = foreachArray[0].trim();

    var currentVariableObj = doc.innerHTML;
    var checkSortAttribute = doc.getAttribute(eventAttributes.forEachSort);
    if (checkSortAttribute != undefined && checkSortAttribute != "") {
      var sortAttributeArray = checkSortAttribute.split(":");
      var sortVariableNameArray = sortAttributeArray[0].split(".");
      var sortVariableName = "";
      for (var index = 1; index < sortVariableNameArray.length; index++) {
        sortVariableName =
          sortVariableName + sortVariableNameArray[index] + ".";
      }
      sortVariableName = sortVariableName.substring(
        0,
        sortVariableName.length - 1
      );
      var sortType = sortAttributeArray[1];

      switch (sortType) {
        case "desc":
          if (sortVariableName == "" && sortVariableName != undefined) {
            currentListObj.sort().reverse();
          } else {
            currentListObj.sort(dynamicSort("-" + sortVariableName));
          }
          break;
        default:
          if (sortVariableName == "" && sortVariableName != undefined) {
            currentListObj.sort();
          } else {
            currentListObj.sort(dynamicSort(sortVariableName));
          }
          break;
      }
    }
    var currentListObjCounter = 0;
    var cloneDoc = doc.cloneNode(true);
    var returnDoc = doc.cloneNode(true);
    returnDoc.innerHTML = "";
    doc.innerHTML = "";
    if (currentListObj != null) {
      currentListObj.forEach(function (currentValue, key, parent) {
        if (currentValue != undefined) {
          searchDoc.innerHTML = "";
          searchDoc.innerHTML = baseHtmlString;
          var subForeach = searchDoc.querySelectorAll(
            "[" + eventAttributes.forEach + "*='in " + foreachVariableName + ".']"
          );
          if (subForeach.length > 0) {
            for (var index = 0; index < subForeach.length; index++) {
              var subForSearchString = subForeach[index].getAttribute(
                eventAttributes.forEach
              );
              var subForSearchListArray =
                String(subForSearchString).split(" in ")[1];
              var subForSearchListNameArray = subForSearchListArray.split(".");
              var subForSearchListName = "";
              for (
                var subindex = 1;
                subindex < subForSearchListNameArray.length;
                subindex++
              ) {
                subForSearchListName =
                  subForSearchListName +
                  "['" +
                  subForSearchListNameArray[subindex] +
                  "']";
              }
              var fixedCurrentValue = eval("currentValue" + subForSearchListName);
              if (fixedCurrentValue != null) {
                var returnedDoc = loop(
                  subForeach[index],
                  subForSearchString,
                  fixedCurrentValue
                );
                var tempCloneDoc = cloneDoc.querySelector(
                  "[" + eventAttributes.forEach + "='" + subForSearchString + "']"
                );
                tempCloneDoc.innerHTML = returnedDoc.innerHTML;
                currentVariableObj = cloneDoc.innerHTML;
              }

            }
          }
          var matches = currentVariableObj.matchAll(vRegex);
          var matchList = [];
          var matchValues = [];
          for (const match of matches) {
            var currentMatchValue = match[1].trim();
            if (currentMatchValue.indexOf(foreachVariableName) != -1) {
              matchList.push(currentMatchValue);
            }
          }
          matchList.forEach(function (v, i, p) {
            var newCurrentVariableArray = v.split(".");
            var variablaName = "";
            var tempNewValue = null;
            if (newCurrentVariableArray.length > 1) {
              for (var i = 1; i < newCurrentVariableArray.length; i++) {
                variablaName =
                  variablaName + newCurrentVariableArray[i].trim() + ".";
              }
              variablaName = variablaName.substring(0, variablaName.length - 1);
              tempNewValue = eval("currentValue." + variablaName);
            } else {
              variablaName = newCurrentVariableArray[0];
              tempNewValue = currentValue;
            }
            matchValues.push(tempNewValue);
          });

          var newValue = currentVariableObj;
          matchValues.forEach(function (v, i, p) {
            newValue = newValue.replace(regex, v);
          });
          newValue = newValue.replace(
            /{{(.*?)\$index(.*?)}}/,
            currentListObjCounter
          );
          doc.insertAdjacentHTML("beforeend", newValue);
          returnDoc.insertAdjacentHTML("beforeend", newValue);
          currentListObjCounter = currentListObjCounter + 1;
        }
      });
    }
    return returnDoc;
  };
  var detectForEach = function (key) {
    var forEachKey = listForEach.find(function (
      currentFindValue,
      currentFindKey,
      currentFindParent
    ) {
      if (currentFindValue.listName == key) {
        return true;
      }
    });
    if (forEachKey != undefined) {
      var doc = document.querySelector(
        "[" + eventAttributes.forEach + "='" + forEachKey.name + "']"
      );
      var docVariableObj = eval("obj.$var." + forEachKey.listName);
      loop(doc, forEachKey.name, docVariableObj);
    }
  };
  var detectVaribles = function (key, value) {

    var bb = listVariables.filter(function (v, i, p) {
      if (String(v.name).indexOf(key) != -1) {
        value = eval("mq.$var." + v.name.replace("{{", "").replace("}}", ""));
        var queryString = "." + v.guid;
        var listClass = document.querySelectorAll(queryString);
        if (listClass.length > 0) {
          listClass.forEach(function (v, i, p) {
            v.innerHTML = value;
          });
        }
        document.body.innerHTML = document.body.innerHTML.replace(
          new RegExp("" + v.name + "", "g"),
          '<span class="' + v.guid + '">' + value + "</span>"
        );
        return true;
      }
    });
  };

  // Transactions
  getForEachElements();
  getVariableElements();
  getIfElements();
  return mq;
};
