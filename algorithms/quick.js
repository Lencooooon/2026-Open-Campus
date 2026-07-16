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

        if (i !== j) {

        await swap(i, j);

        }

        i++;
    }

}
    if (i !== right) {

    await swap(i, right);

    }

    // Pivotの位置を確定（緑）
    renderState.sortedQuick.push(i);

    // Pivot表示を消す
    renderState.pivot = -1;

    drawArray();

    await waitIfPaused();
    await sleep(state.animationSpeed);

    return i;

}
