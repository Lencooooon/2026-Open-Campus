// ============================================================
//  Sort Visualizer
//  script.js
// ============================================================



// ============================================================
//  Config
//  アプリ全体の設定
// ============================================================

const Config = {

    // 初期要素数
    DEFAULT_BAR_COUNT: 50,

    // 最小要素数
    MIN_BAR_COUNT: 10,

    // 最大要素数
    MAX_BAR_COUNT: 200,

    // 棒の最大高さ
    MAX_HEIGHT: 450,

    // 初期アニメーション速度(ms)
    DEFAULT_SPEED: 50

};



// ============================================================
//  State
//  アプリの状態管理
// ============================================================

const state = {

    // 配列
    array: [],

    // 要素数
    barCount: Config.DEFAULT_BAR_COUNT,

    // アニメーション速度
    animationSpeed: Config.DEFAULT_SPEED,

    // 現在選択されているアルゴリズム
    algorithm: "bubble",

    // ソート状態
    isSorting: false,

    // 一時停止状態
    isPaused: false,

    // 比較回数
    compareCount: 0,

    // 交換回数
    swapCount: 0

};



// ============================================================
//  描画状態
//  drawArray()専用
// ============================================================

const renderState = {

    // 比較中
    compare: [-1, -1],

    // 交換中
    swap: [-1, -1],

    // この位置以降はソート済み（Bubble用）
    sortedFrom: Config.DEFAULT_BAR_COUNT,

    // 現在注目している要素
    active: -1,

    // 将来追加予定
    pivot: -1,

    current: -1

};



// ============================================================
//  DOM取得
// ============================================================

// 描画エリア
const visualizer =
    document.getElementById("visualizer");

// ボタン
const shuffleButton =
    document.getElementById("shuffle-btn");

const startButton =
    document.getElementById("start-btn");

const pauseButton =
    document.getElementById("pause-btn");

const resetButton =
    document.getElementById("reset-btn");

// アルゴリズム選択
const algorithmSelect =
    document.getElementById("algorithm-select");

// スライダー
const barSlider =
    document.getElementById("bar-slider");

const speedSlider =
    document.getElementById("speed-slider");

// ラベル
const barCountLabel =
    document.getElementById("bar-count-label");

const speedLabel =
    document.getElementById("speed-label");

// 情報表示
const compareCountLabel =
    document.getElementById("compare-count");

const swapCountLabel =
    document.getElementById("swap-count");

const statusLabel =
    document.getElementById("status");

// ============================================================
//  配列生成
// ============================================================

function generateArray() {

    state.array = [];

    for (let i = 0; i < state.barCount; i++) {

        state.array.push(
            Math.floor(Math.random() * Config.MAX_HEIGHT) + 20
        );

    }

    state.compareCount = 0;
    state.swapCount = 0;

    renderState.compare = [-1, -1];
    renderState.swap = [-1, -1];
    renderState.sortedFrom = state.barCount;

}



// ============================================================
//  情報表示更新
// ============================================================

function updateInfo() {

    compareCountLabel.textContent = state.compareCount;

    swapCountLabel.textContent = state.swapCount;

}



// ============================================================
//  ステータス更新
// ============================================================

function setStatus(text) {

    statusLabel.textContent = text;

}



// ============================================================
//  描画
// ============================================================

function drawArray() {

    visualizer.innerHTML = "";

    for (let i = 0; i < state.array.length; i++) {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = state.array[i] + "px";



        // ------------------------------
        // 色分け
        // ------------------------------

        if (i === renderState.swap[0] ||
            i === renderState.swap[1]) {

            bar.classList.add("swap");

        }

        else if (i === renderState.compare[0] ||
                i === renderState.compare[1]) {

            bar.classList.add("compare");

        }

        else if (i === renderState.active) {

            bar.classList.add("active");

        }

        else if (i === renderState.pivot) {

            bar.classList.add("pivot");

        }

        else if (i >= renderState.sortedFrom) {

        bar.classList.add("sorted");

        }
        visualizer.appendChild(bar);
       
    }
}


// ============================================================
//  待機
// ============================================================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}



// ============================================================
//  一時停止待機
// ============================================================

async function waitIfPaused() {

    while (state.isPaused) {

        await sleep(30);

    }

}



// ============================================================
//  比較演出
// ============================================================

async function compare(i, j) {

    state.compareCount++;

    // 前回の色を消す
    clearHighlights();

    // 比較中
    renderState.compare = [i, j];

    updateInfo();

    drawArray();

    await waitIfPaused();

    await sleep(state.animationSpeed);

}



// ============================================================
//  交換演出
// ============================================================

async function swap(i, j) {

    state.swapCount++;

    // 要素を交換
    [state.array[i], state.array[j]] =
        [state.array[j], state.array[i]];

    // 比較色を消す
    renderState.compare = [-1, -1];

    // 交換色
    renderState.swap = [i, j];

    updateInfo();

    drawArray();

    await waitIfPaused();

    await sleep(state.animationSpeed);

    // 黄色を消す
    clearHighlights();

    drawArray();

}



// ============================================================
//  色リセット
// ============================================================

function clearHighlights() {

    renderState.compare = [-1, -1];

    renderState.swap = [-1, -1];

}



// ============================================================
//  ソート終了
// ============================================================

function finishAnimation() {

    clearHighlights();

    renderState.sortedFrom = 0;

    drawArray();

    setStatus("ソート完了");

    state.isSorting = false;

    state.isPaused = false;

    pauseButton.textContent = "一時停止";

}

// ============================================================
//  ソート開始
// ============================================================

async function startSorting() {

    if (state.isSorting) {
        return;
    }

    state.isSorting = true;

    state.compareCount = 0;
    state.swapCount = 0;

    updateInfo();

    setStatus("ソート中");

   switch (state.algorithm) {

    case "bubble":

        await bubbleSort();
        break;

    case "selection":

        await selectionSort();
        break;


    case "insertion":

        await insertionSort();
        break;


    case "quick":

        await quickSort();

        break;


    default:

        alert("このアルゴリズムは未実装です。");
        state.isSorting = false;
        return;

    }

    finishAnimation();

}



// ============================================================
//  初期化
// ============================================================

function initialize() {

    barSlider.value = state.barCount;
    speedSlider.value = state.animationSpeed;

    barCountLabel.textContent = state.barCount;
    speedLabel.textContent = state.animationSpeed;

    generateArray();

    updateInfo();

    setStatus("待機中");

    drawArray();

}



// ============================================================
//  シャッフル
// ============================================================

shuffleButton.addEventListener("click", () => {

    if (state.isSorting) return;

    generateArray();

    updateInfo();

    drawArray();

});



// ============================================================
//  開始
// ============================================================

startButton.addEventListener("click", async () => {

    await startSorting();

});



// ============================================================
//  一時停止
// ============================================================

pauseButton.addEventListener("click", () => {

    if (!state.isSorting) return;

    state.isPaused = !state.isPaused;

    if (state.isPaused) {

        pauseButton.textContent = "再開";

        setStatus("一時停止");

    }

    else {

        pauseButton.textContent = "一時停止";

        setStatus("ソート中");

    }

});



// ============================================================
//  リセット
// ============================================================

resetButton.addEventListener("click", () => {

    if (state.isSorting) return;

    generateArray();

    updateInfo();

    setStatus("待機中");

    drawArray();

});



// ============================================================
//  要素数変更
// ============================================================

barSlider.addEventListener("input", () => {

    if (state.isSorting) return;

    state.barCount = Number(barSlider.value);

    barCountLabel.textContent = state.barCount;

    generateArray();

    drawArray();

    updateInfo();

});



// ============================================================
//  速度変更
// ============================================================

speedSlider.addEventListener("input", () => {

    state.animationSpeed = Number(speedSlider.value);

    speedLabel.textContent = state.animationSpeed;

});



// ============================================================
//  アルゴリズム変更
// ============================================================

algorithmSelect.addEventListener("change", () => {

    if (state.isSorting) return;

    state.algorithm = algorithmSelect.value;

});



// ============================================================
//  起動
// ============================================================

initialize();