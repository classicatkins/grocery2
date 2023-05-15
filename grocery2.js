let groceryList = [];
let list = document.getElementById("list");
let totalDisplay = document.getElementById("total");

function addItem() {
  let item = document.getElementById("item").value;
  let price = parseFloat(document.getElementById("price").value);

  groceryList.push({ item: item, price: price, checked: false });

  let newItem = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function() {
    toggleItem(item, checkbox.checked);
  });
  newItem.appendChild(checkbox);

  let itemText = document.createElement("span");
  itemText.innerHTML = item + " - $" + price.toFixed(2);
  newItem.appendChild(itemText);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", function() {
    deleteItem(item);
  });
  newItem.appendChild(deleteButton);

  list.appendChild(newItem);

  document.getElementById("item").value = "";
  document.getElementById("price").value = "";

  calculateTotal();
}

function deleteItem(item) {
  let index = -1;
  for (let i = 0; i < groceryList.length; i++) {
    if (groceryList[i].item === item) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    groceryList.splice(index, 1);
    list.removeChild(list.childNodes[index]);
    calculateTotal();
  }
}

function toggleItem(item, checked) {
  for (let i = 0; i < groceryList.length; i++) {
    if (groceryList[i].item === item) {
      groceryList[i].checked = checked;
      break;
    }
  }
  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  for (let i = 0; i < groceryList.length; i++) {
    if (!groceryList[i].checked) {
      total += groceryList[i].price;
    }
  }

  totalDisplay.innerHTML = "Total: $" + total.toFixed(2);
}

function sortItemsByName() {
  groceryList.sort(function(a, b) {
    let itemA = a.item.toLowerCase();
    let itemB = b.item.toLowerCase();
    return itemA.localeCompare(itemB);
  });

  refreshList();
}

function sortItemsByPrice() {
  groceryList.sort(function(a, b) {
    return a.price - b.price;
  });

  refreshList();
}

function refreshList() {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  
    for (let i = 0; i < groceryList.length; i++) {
      let newItem = document.createElement("li");
      newItem.classList.add("grocery-item");
  
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = groceryList[i].checked || false;
      checkbox.addEventListener("change", function() {
        toggleItem(groceryList[i].item, checkbox.checked);
      });
      newItem.appendChild(checkbox);
  
      let itemText = document.createElement("span");
      itemText.innerHTML = groceryList[i].item + " - $" + groceryList[i].price.toFixed(2);
      newItem.appendChild(itemText);
  
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function() {
        deleteItem(groceryList[i].item);
      });
      newItem.appendChild(deleteButton);
  
      list.appendChild(newItem); 
    }
  }