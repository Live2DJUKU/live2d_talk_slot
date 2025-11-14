// Live2D限定トークテーマリスト（カテゴリ付き）
const themeList = [
    // --- 技術・制作系テーマ ⚙️ ---
    { category: "技術・制作 ⚙️", theme: "作っていて1番楽しいパラメータ" },
    { category: "技術・制作 ⚙️", theme: "苦手意識があるパラメータとその克服法" },
    { category: "技術・制作 ⚙️", theme: "よく使うLive2Dのツール（変形ブラシ・投げ縄など）" },
    { category: "技術・制作 ⚙️", theme: "Live2Dに入れてほしいこんな機能" },
    { category: "技術・制作 ⚙️", theme: "メッシュ割り、得意？苦手？" },
    { category: "技術・制作 ⚙️", theme: "最近気になってるモデリングテクニック" },
    { category: "技術・制作 ⚙️", theme: "いつか挑戦したいモデル・作り方（ケモ耳・高可動など）" },
    { category: "技術・制作 ⚙️", theme: "素材分けのとき考えてること" },
    { category: "技術・制作 ⚙️", theme: "モーション制作でこだわってるところ" },
    { category: "技術・制作 ⚙️", theme: "作っていて1番楽しい表情" },

    // --- デザイン・コンセプト系テーマ 🎨 ---
    { category: "デザイン・コンセプト 🎨", theme: "自分のモデルで1番こだわってるところ" },
    { category: "デザイン・コンセプト 🎨", theme: "モデル制作をするときに意識してること" },
    { category: "デザイン・コンセプト 🎨", theme: "思わず『かわいい！』と思った他作品のLive2Dモデルの特徴" },
    { category: "デザイン・コンセプト 🎨", theme: "思わず『カッコいい！』と思った他作品のLive2Dモデルの特徴" },
    { category: "デザイン・コンセプト 🎨", theme: "Live2Dアニメーションが印象的だった作品（アニメ・ゲームなど）" },
    { category: "デザイン・コンセプト 🎨", theme: "次は衣装替えに挑戦！さて、どんな衣装にしようかな？" },
    { category: "デザイン・コンセプト 🎨", theme: "自分のLive2Dモデルに声をつけるならどんな声？" },
    { category: "デザイン・コンセプト 🎨", theme: "好みのキャラクターデザイン" },

    // --- 自己紹介 💬 ---
    { category: "自己紹介 💬", theme: "Live2Dはじめてどれくらい？" },
    { category: "自己紹介 💬", theme: "JUKUメン歴はどれくらい？" },
    { category: "自己紹介 💬", theme: "Live2D JUKUに入ったきっかけ" },
    { category: "自己紹介 💬", theme: "Live2Dに興味を持った、やってみたいと思ったきっかけ" },
    { category: "自己紹介 💬", theme: "将来どんなモデラーになりたい？" },
    { category: "自己紹介 💬", theme: "Live2Dの好きなところ" },
    { category: "自己紹介 💬", theme: "Live2Dの最新情報・流行、なにで収集してる？" },
    { category: "自己紹介 💬", theme: "Live2D作るとき、マウス？ペンタブ？液タブ？" },
];

let isSpinning = false;
let spinInterval;
const slotReel = document.getElementById('slot-reel');
const slotContainer = document.getElementById('slot-container'); 
const currentThemeElement = document.getElementById('current-theme');
const resultArea = document.getElementById('result-area');
const spinButton = document.getElementById('spin-button');

const themeListContainer = document.getElementById('theme-list-container');
const toggleListButton = document.getElementById('toggle-list-button');

/**
 * ランダムに日本語のテーマを選んで表示する（回転中の動作）
 */
function spin() {
    if (!isSpinning) return;

    // トークテーマリストからランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * themeList.length);
    const themeText = themeList[randomIndex].theme;
    
    // textContent を使用し、HTMLタグや改行コードによる誤作動を防ぐ
    currentThemeElement.textContent = themeText; 
}

/**
 * スロットの開始と停止を切り替える
 */
function toggleSpin() {
    if (!isSpinning) {
        // --- START ---
        isSpinning = true;
        
        slotReel.classList.add('spinning');
        slotReel.classList.remove('stopped'); 
        
        // バーストクラスをコンテナから削除
        slotContainer.classList.remove('burst-effect'); 
        
        resultArea.style.display = 'none';

        // 0.05秒ごとにテーマを切り替える
        spinInterval = setInterval(spin, 50);

        spinButton.textContent = "STOP!!";

    } else {
        // --- STOP ---
        isSpinning = false;
        
        clearInterval(spinInterval);
        slotReel.classList.remove('spinning');
        slotReel.classList.add('stopped'); 
        
        // エフェクト追加：停止時にバーストクラスをコンテナに追加
        slotContainer.classList.add('burst-effect');
        // アニメーション終了後にクラスを削除して、元の状態に戻す
        setTimeout(() => {
            slotContainer.classList.remove('burst-effect');
        }, 400); 

        // 最終テーマを確定
        const finalIndex = Math.floor(Math.random() * themeList.length);
        const finalThemeData = themeList[finalIndex];

        // 停止後のリールに確定テーマを表示
        currentThemeElement.textContent = finalThemeData.theme;
        
        // ★修正点: 詳細情報に関するロジックを削除しました。
        let detailsHtml = ''; 
        
        // 結果エリアにカテゴリとテーマを強調して表示
        resultArea.innerHTML = `
            <div style="font-size: 0.9em; color: #00ffff;">カテゴリー：【${finalThemeData.category}】</div>
            <strong>テーマ決定！</strong><br>
            <span style="color: #ff00ff; font-size: 1.3em;">${finalThemeData.theme}</span>
            ${detailsHtml} 
        `;
        resultArea.style.display = 'block';

        spinButton.textContent = "もう一度回す";
    }
}

/**
 * トークテーマリストのHTMLを生成し、コンテナに挿入する関数
 */
function renderThemeList() {
    let html = '';
    let currentCategory = '';

    themeList.forEach(item => {
        // カテゴリが変わったら新しい見出しを追加
        if (item.category !== currentCategory) {
            if (currentCategory !== '') {
                html += '</div>'; // 前のカテゴリのコンテナを閉じる
            }
            html += `<div class="list-category-title">${item.category}</div><div class="category-items">`;
            currentCategory = item.category;
        }

        // テーマのアイテムを追加
        html += `<div class="list-item">・ ${item.theme}</div>`;
    });

    if (currentCategory !== '') {
        html += '</div>'; // 最後のカテゴリのコンテナを閉じる
    }

    themeListContainer.innerHTML = html;
}

/**
 * テーマリストの表示/非表示を切り替える関数
 */
function toggleThemeList() {
    const isHidden = themeListContainer.classList.toggle('hidden');
    
    if (isHidden) {
        // ボタンのテキストを「▼全テーマリストを表示 ▼」に変更
        toggleListButton.innerHTML = '▼全テーマリストを表示 ▼';
    } else {
        // 初回表示時にリストを生成 (テーマリストが更新された場合も対応可能)
        if (themeListContainer.innerHTML === '') {
            renderThemeList();
        }
        // ボタンのテキストを「▲テーマリストを非表示 ▲」に変更
        toggleListButton.innerHTML = '▲テーマリストを非表示 ▲';
    }
}

// ページ読み込み完了後にリストの初期描画準備
document.addEventListener('DOMContentLoaded', renderThemeList);