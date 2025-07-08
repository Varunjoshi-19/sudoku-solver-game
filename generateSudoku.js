const SIZE = 9;
const BOX_SIZE = 3;


function createEmptyGrid() {

    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function isSafe(grid, row, col, num) {
    // horizontal and veritcal check
    for (let x = 0; x < SIZE; x++) {
        if (grid[row][x] == num || grid[x][col] == num) return false;
    }

    // check within grid
    const rowStart = row - row % BOX_SIZE;
    const colStart = col - col % BOX_SIZE;

    for (let i = 0; i < BOX_SIZE; i++) {
        for (let j = 0; j < BOX_SIZE; j++) {
            if (grid[rowStart + i][colStart + j] == num) return false;
        }
    }

    return true;

}


function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;

}


function fillGrid(grid) {

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {


            if (grid[row][col] == 0) {
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                for (let num of numbers) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) return true;
                        grid[row][col] = 0;
                    }
                }


                return false;
            }

        }
    }

    return true;

}




export function generateSudoku() {

    const grid = createEmptyGrid();
    fillGrid(grid);

    return grid;

}