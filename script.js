const grid = document.querySelector('.grid');
const sizeButtons = document.querySelector('.sizeButtons');
const penColorPicker = document.querySelector('.penColorPicker');
const backColorPicker = document.querySelector('.backColorPicker');
const clearBtn = document.querySelector('.clearBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const gridLines = document.querySelector('.gridLines');
const rainbowBtn = document.querySelector('.rainbowBtn');

let size = 32;
let eraserOn = false;
let rainbowOn = false;

const createGrid = (size) => {
    for (let i = 0; i < size ** 2; i++) {
        const square = document.createElement('div');
        square.classList.add('square', `number${i}`);
        square.style.width = `${512/size}px`;
        grid.append(square);
    }
}

const changeSize = (e) => {
    const chosenBtn = e.target.closest('button');
    if (chosenBtn.classList.contains('active')) return;
    else {
        const previousBtn = document.querySelector('.active');
        previousBtn.classList.remove('active');
        chosenBtn.classList.add('active');
        grid.innerHTML = '';
        size = chosenBtn.dataset.size;
        createGrid(size);
    }
    
}

const changeColor = (e) => {
    penColorPicker.value = e.target.value;
}

const changeBackColor = (e) => {
    backColorPicker.value = e.target.value;
    grid.style.background = backColorPicker.value;
}

const toggleLines = () => {
    grid.classList.toggle('lined');
    gridLines.classList.toggle('active');
}

const paint = (e) => {
    const currentSquare = e.target.closest('.square');
    if (eraserOn) currentSquare.style.background = 'none';
    else if (rainbowOn) currentSquare.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    else currentSquare.style.background = penColorPicker.value;
}

const turnOn = () => {
    grid.addEventListener('mousemove', paint);
}

const turnOff = () => {
    grid.removeEventListener('mousemove', paint);
}

const erase = () => {
    eraserOn = !eraserOn;
    eraserBtn.classList.toggle('active');
}

const clear = () => {
    squares = grid.childNodes;
    squares.forEach(square => square.style.background = 'none');
    grid.style.background = backColorPicker.value;
}

const startRaindow = () => {
    rainbowOn = !rainbowOn;
    rainbowBtn.classList.toggle('active');
}
 
createGrid(size);
sizeButtons.addEventListener('click', changeSize); 
penColorPicker.addEventListener("input", changeColor, false);
backColorPicker.addEventListener("input", changeBackColor, false);
gridLines.addEventListener('click', toggleLines);
grid.addEventListener('mousedown', turnOn);
grid.addEventListener('mouseup', turnOff);
eraserBtn.addEventListener('click', erase);
clearBtn.addEventListener('click', clear);
rainbowBtn.addEventListener('click', startRaindow);
