// =======================================
// 設定
// =======================================

// 棒の本数
const BAR_COUNT = 50;

// 棒の最大高さ
const MAX_HEIGHT = 450;

// アニメーション速度(ms)
let animationSpeed = 50;


// 一時停止フラグ
let isPaused = false;

// ソート中フラグ
let isSorting = false;

// 配列
let array = [];

// =======================================
// HTML要素取得
// =======================================

const pauseButton = document.getElementById("pause-btn");

const visualizer = document.getElementById("visualizer");

const shuffleButton = document.getElementById("shuffle-btn");

const startButton = document.getElementById("start-btn");

// =======================================
// ランダム配列生成
// =======================================

function generateArray() {

    array = [];

    for (let i = 0; i < BAR_COUNT; i++) {

        array.push(Math.floor(Math.random() * MAX_HEIGHT) + 20);

    }

}

// =======================================
// 描画
// =======================================

function drawArray(
    compareA = -1,
    compareB = -1,
    sortedStart = BAR_COUNT,
    swapA = -1,
    swapB = -1
) {

    visualizer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = array[i] + "px";

        // 交換した要素
        if (i === swapA || i === swapB) {

            bar.style.backgroundColor = "gold";

        }

        // 比較中
        else if (i === compareA || i === compareB) {

            bar.style.backgroundColor = "red";

        }

        // ソート済み
        else if (i >= sortedStart) {

            bar.style.backgroundColor = "limegreen";

        }

        // 通常
        else {

            bar.style.backgroundColor = "#2c7be5";

        }

        visualizer.appendChild(bar);

    }

}

// =======================================
// 待機
// =======================================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


async function waitIfPaused() {

    while (isPaused) {

        await sleep(50);

    }

}

// =======================================
// バブルソート
// =======================================

async function bubbleSort() {

    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            // 一時停止中なら待機
            await waitIfPaused();

            // 比較中
            drawArray(
                j,
                j + 1,
                array.length - i
            );

            await sleep(animationSpeed);

            if (array[j] > array[j + 1]) {

                // 交換
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // 交換したことを黄色で表示
                drawArray(
                    -1,
                    -1,
                    array.length - i,
                    j,
                    j + 1
                );

                await sleep(animationSpeed);

            }

        }

    }

    // 完成
    drawArray(-1, -1, 0);

    isPaused = false;

    pauseButton.textContent = "一時停止";

}


// =======================================
// 初期化
// =======================================

function initialize() {

    generateArray();

    drawArray();

}

initialize();

// =======================================
// ボタン
// =======================================

shuffleButton.addEventListener("click", () => {

    generateArray();

    drawArray();

});

startButton.addEventListener("click", async () => {

    if (isSorting) return;

    isSorting = true;

    await bubbleSort();

    isSorting = false;

});

pauseButton.addEventListener("click", () => {

    if (!isSorting) return;

    isPaused = !isPaused;

    if (isPaused) {

        pauseButton.textContent = "再開";

    } else {

        pauseButton.textContent = "一時停止";

    }

});