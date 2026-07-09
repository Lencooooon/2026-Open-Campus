// ============================================================
//  Selection Sort
// ============================================================

async function selectionSort() {

    const n = state.array.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            await compare(minIndex, j);

            if (state.array[j] < state.array[minIndex]) {

                minIndex = j;

            }

        }

        if (minIndex !== i) {

            await swap(i, minIndex);

        }

        // i番目までソート済み
        renderState.sortedFrom = i + 1;

        drawArray();

    }

    renderState.sortedFrom = 0;

}