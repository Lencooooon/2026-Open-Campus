// ===============================
// 設定
// ===============================

// ソートスタート
const startButton = document.getElementById("start-btn");

// 棒の本数
const BAR_COUNT = 50;

// 棒の高さの最大値
const MAX_HEIGHT = 450;

// 配列
let array = [];

// visualizer取得
const visualizer = document.getElementById("visualizer");

// シャッフルボタン
const shuffleButton = document.getElementById("shuffle-btn");

// ===============================
// ランダム配列生成
// ===============================

function generateArray() {

    array = [];

    for (let i = 0; i < BAR_COUNT; i++) {

        const value = Math.floor(Math.random() * MAX_HEIGHT) + 20;

        array.push(value);

    }

}


// ===============================
// 棒を描画
// ===============================

function drawArray() {

    // 一度全部消す
    visualizer.innerHTML = "";

    for (const value of array) {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value + "px";

        visualizer.appendChild(bar);

    }

}


// ===============================
// 待つ関数
// ===============================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ===============================
// バブルソートを定義
// ===============================

async function bubbleSort() {

    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            if (array[j] > array[j + 1]) {

                // 入れ替え
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                drawArray();

                await sleep(50);

            }

        }

    }

}


// ===============================
// 初期化
// ===============================

generateArray();

drawArray();


shuffleButton.addEventListener("click", () => {

    generateArray();

    drawArray();

});



startButton.addEventListener("click", async () => {

    await bubbleSort();

});