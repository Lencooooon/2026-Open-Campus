// =======================================
// 設定
// =======================================

// 棒の本数
const BAR_COUNT = 50;

// 棒の最大高さ
const MAX_HEIGHT = 450;

// アニメーション速度(ms)
let animationSpeed = 50;

// 配列
let array = [];

// =======================================
// HTML要素取得
// =======================================

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

function drawArray(compareA = -1, compareB = -1, sortedStart = BAR_COUNT) {

    visualizer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = array[i] + "px";

        // 色分け

        if (i === compareA || i === compareB) {

            // 比較中
            bar.style.backgroundColor = "red";

        }

        else if (i >= sortedStart) {

            // ソート済み
            bar.style.backgroundColor = "limegreen";

        }

        else {

            // 通常
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

// =======================================
// バブルソート
// =======================================

async function bubbleSort() {

    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            // 比較中を表示
            drawArray(j, j + 1, array.length - i);

            await sleep(animationSpeed);

            if (array[j] > array[j + 1]) {

                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // 交換後を表示
                drawArray(j, j + 1, array.length - i);

                await sleep(animationSpeed);

            }

        }

    }

    // 完成
    drawArray(-1, -1, 0);

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

    await bubbleSort();

});