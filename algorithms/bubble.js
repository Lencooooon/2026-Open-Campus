// ============================================================
//  Bubble Sort
// ============================================================

async function bubbleSort() {

    const n = state.array.length;

    for (let i = 0; i < n - 1; i++) {

        let swapped = false;

        // この位置以降はソート済み
        renderState.sortedFrom = n - i;

        for (let j = 0; j < n - i - 1; j++) {

            // 比較
            await compare(j, j + 1);

            if (state.array[j] > state.array[j + 1]) {

                // 交換
                await swap(j, j + 1);

                swapped = true;

            }

        }

        // 1周して交換が無ければ終了
        if (!swapped) {

            break;

        }

    }

    // 全てソート済み
    renderState.sortedFrom = 0;

}