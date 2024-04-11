//ここをいじるといい感じになる/////////////////////////////////////////////////////////////////////
// IDを設定
const id = "24B*****";
// パスワードを設定
const password = "***********";
//マトリクスコード
var code = "AAAAAAAAAA\nBBBBBBBBBB\nCCCCCCCCCC\nDDDDDDDDDD\nEEEEEEEEEE\nFFFFFFFFFF\nGGGGGGGGGG";
///////////////////////////////////////////////////////////////////////////////////////////////////
const codes = code.split("\n");
// ページの読み込みが完了したら実行
window.addEventListener('load', async function() {
  // ID入力欄を取得
  const idInput = document.querySelector('input[type="text"][name="usr_name"]');
  if (idInput) {
    // ID入力欄に値を設定
    idInput.value = id;
    // パスワード入力欄を取得
    const passwordInput = document.querySelector('input[type="password"][name="usr_password"]');
    if (passwordInput) {
      // パスワード入力欄に値を設定
      passwordInput.value = password;
    }
  }else{
    //新しいページにある3つのパスワード入力欄を検出
    const newPasswordInput1 = document.querySelector('input[type="password"][name="message3"]');
    const newPasswordInput2 = document.querySelector('input[type="password"][name="message4"]');
    const newPasswordInput3 = document.querySelector('input[type="password"][name="message5"]');
    
    // 各パスワード入力欄に対して異なるパスワードを設定
    if (newPasswordInput1) {
      // ページのテキストコンテンツを取得
      const pageContent = document.body.innerText;
      // 正規表現を使用して指定された形式の文字列を抽出するパターンを定義
      const pattern = /\[(\w+),(\d+)\]/g;

      // 正規表現のパターンに一致するすべての部分を取得
      let match;
      let newPasswords = [];
      for (let i = 0;(match = pattern.exec(pageContent)) !== null;i++) {
        // マッチした部分を配列に追加
        newPasswords[i] = codes[Number(match[2])-1].charAt(match[1].charCodeAt(0)-65);
      }
      newPasswordInput1.value = newPasswords[0];
      newPasswordInput2.value = newPasswords[1];
      newPasswordInput3.value = newPasswords[2];
    }
  }
  if (window.location.href === "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList")
    window.location.href = "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList?lang=ja";
});