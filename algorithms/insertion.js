// ============================================================
//  Insertion Sort
// ============================================================

async function insertionSort() {

    const n = state.array.length;

    for (let i = 1; i < n; i++) {

        let j = i;

        while (j > 0) {

            await compare(j - 1, j);

            if (state.array[j - 1] > state.array[j]) {

                await swap(j - 1, j);

            } else {

                break;

            }

            j--;

        }

        renderState.sortedFrom = j;

        drawArray();

    }

    renderState.sortedFrom = 0;

}