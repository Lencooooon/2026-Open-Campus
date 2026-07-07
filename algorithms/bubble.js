// ============================================================
//  Bubble Sort
// ============================================================

async function bubbleSort() {

    const n = state.array.length;

    for (let i = 0; i < n - 1; i++) {

        let swapped = false;

        // ソート済み範囲
        renderState.sortedFrom = n - i;

        for (let j = 0; j < n - i - 1; j++) {

            await compare(j, j + 1);

            if (state.array[j] > state.array[j + 1]) {

                await swap(j, j + 1);

                swapped = true;

            }

        }

        if (!swapped) {

            break;

        }

    }

    renderState.sortedFrom = 0;

}