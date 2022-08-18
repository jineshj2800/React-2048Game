function getMoveLeftOrder() {
  let traverseOrder = [];
  for (let row = 0; row < 4; row++) {
    let temp = [];
    for (let col = 0; col < 4; col++) {
      temp.push(row * 4 + col);
    }
    traverseOrder.push(temp);
  }
  return traverseOrder;
}

function getMoveRightOrder() {
  let traverseOrder = [];
  for (let row = 0; row < 4; row++) {
    let temp = [];
    for (let col = 3; col >= 0; col--) {
      temp.push(row * 4 + col);
    }
    traverseOrder.push(temp);
  }
  return traverseOrder;
}

function getMoveUpOrder() {
  let traverseOrder = [];
  for (let col = 0; col < 4; col++) {
    let temp = [];

    for (let row = 0; row < 4; row++) {
      temp.push(row * 4 + col);
    }
    traverseOrder.push(temp);
  }
  return traverseOrder;
}

function getMoveDownOrder() {
  let traverseOrder = [];
  for (let col = 0; col < 4; col++) {
    let temp = [];
    for (let row = 3; row >= 0; row--) {
      temp.push(row * 4 + col);
    }
    traverseOrder.push(temp);
  }
  return traverseOrder;
}

export function getTraversalOrder(key) {
  switch (key) {
    case "ArrowLeft":
      return getMoveLeftOrder();
    case "ArrowRight":
      return getMoveRightOrder();
    case "ArrowUp":
      return getMoveUpOrder();
    case "ArrowDown":
      return getMoveDownOrder();
    default:
      return null;
  }
}
