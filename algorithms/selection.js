// ============================================================
//  Selection Sort
// ============================================================

async function selectionSort() {

    const n = state.array.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

            renderState.active = minIndex;

            drawArray();

        for (let j = i + 1; j < n; j++) {

            await compare(minIndex, j);

            if (state.array[j] < state.array[minIndex]) {

                minIndex = j;

                renderState.active = minIndex;

                drawArray();

                await waitIfPaused();

                await sleep(state.animationSpeed);
            }

        }

        if (minIndex !== i) {

            await swap(i, minIndex);

        }

        renderState.active = -1;

        // i番目までソート済み
        renderState.sortedFrom = i + 1;

        drawArray();

    }

    renderState.active = -1;

    renderState.sortedFrom = 0;

}