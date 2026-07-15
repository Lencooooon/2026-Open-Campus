// ============================================================
// Quick Sort
// ============================================================

async function quickSort(left = 0, right = state.array.length - 1) {

    if (left >= right) {

        return;

    }

    const pivotIndex = await partition(left, right);

    await quickSort(left, pivotIndex - 1);

    await quickSort(pivotIndex + 1, right);

}

async function partition(left, right) {

    const pivot = state.array[right];

    renderState.pivot = right;

    drawArray();

    await waitIfPaused();
    await sleep(state.animationSpeed);

    let i = left;

    for (let j = left; j < right; j++) {

        await compare(j, right);

        if (state.array[j] < pivot) {

            await swap(i, j);

            i++;

        }

    }

    await swap(i, right);

    renderState.pivot = -1;

    drawArray();

    return i;

}
