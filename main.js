window.addEventListener("DOMContentLoaded", (e) => {
  axios
    .get(
      "https://crudcrud.com/api/3e53fa19a521474484e8731ca3335dc2/restorentProject"
    )
    .then((res) => {
      res.data.forEach((order) => {
        showOrdersOnScreen(order);
      });
    })
    .catch((err) => console.log(err.message));
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("chooseDish");
  const priceInput = document.getElementById("chooseDishPrice");
  const tableInput = document.getElementById("chooseTable");

  // Creating object from inputs
  const orderObj = {
    dishName: nameInput.value,
    dishPrice: priceInput.value,
    tableNumber: tableInput.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/3e53fa19a521474484e8731ca3335dc2/restorentProject",
      orderObj
    )
    .then((response) => {
      showOrdersOnScreen(response.data);
    })
    .catch((err) => console.log(err.message));

  nameInput.value = "";
  priceInput.value = "";
  tableInput.value = "";
});

function showOrdersOnScreen(orderObj) {
  const order = document.createElement("li");
  order.className =
    "d-flex list-group-item list-group-item-warning justify-content-between align-items-center";

  order.innerHTML = `${orderObj.dishName} - INR ${orderObj.dishPrice} - ${orderObj.tableNumber}`;

  // Creating delete button
  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-success ms-auto me-2";
  editBtn.innerHTML = "EDIT";

  // Creating delete button
  const delBtn = document.createElement("button");
  delBtn.className = "btn btn-sm btn-danger";
  delBtn.innerHTML = "DELETE";

  order.appendChild(editBtn);
  order.appendChild(delBtn);

  //adding edit btn function
  editBtn.addEventListener("click", (e) => {
    let updateDishName = document.getElementById("chooseDish");
    let updateDishPrice = document.getElementById("chooseDishPrice");
    let updateTableNumber = document.getElementById("chooseTable");

    updateDishName.value = orderObj.dishName;
    updateDishPrice.value = orderObj.dishPrice;
    updateTableNumber.value = orderObj.tableNumber;
    updateDishName.focus();

    deleteOrder(orderObj, order);
  });

  // adding delete btn function
  delBtn.addEventListener("click", () => {
    deleteOrder(orderObj, order);
  });

  // checking tables are epmty or not
  if (orderObj.tableNumber == "Table 1") {
    const orders = document.getElementById("tableOne");
    orders.firstElementChild.className = "d-none";
    // console.log(orders.firstElementChild);
    orders.appendChild(order);
  }
  if (orderObj.tableNumber == "Table 2") {
    const orders = document.getElementById("tableTwo");
    orders.firstElementChild.className = "d-none";
    orders.appendChild(order);
  }
  if (orderObj.tableNumber == "Table 3") {
    const orders = document.getElementById("tableThree");
    orders.firstElementChild.className = "d-none";
    orders.appendChild(order);
  }
}

function deleteOrder(orderObj, order) {
  axios
    .delete(
      `https://crudcrud.com/api/3e53fa19a521474484e8731ca3335dc2/restorentProject/${orderObj._id}`
    )
    .then((res) => {
      if (orderObj.tableNumber == "Table 1") {
        const orders = document.getElementById("tableOne");
        orders.removeChild(order);
        if (orders.childElementCount < 2)
          orders.firstElementChild.className = "text-center p-2";
      }
      if (orderObj.tableNumber == "Table 2") {
        const orders = document.getElementById("tableTwo");
        orders.removeChild(order);
        if (orders.childElementCount < 2)
          orders.firstElementChild.className = "text-center p-2";
      }
      if (orderObj.tableNumber == "Table 3") {
        const orders = document.getElementById("tableThree");
        orders.removeChild(order);
        if (orders.childElementCount < 2)
          orders.firstElementChild.className = "text-center p-2";
      }
      // console.log(res.data);
    })
    .catch((err) => console.log(err.message));
}
