//ここをいじるといい感じになる/////////////////////////////////////////////////////////////////////
// IDを設定
const id = "24B*****";
// パスワードを設定
const password = "***********";
//マトリクスコード
//          ABCDEFGHIJ  ABCDEFGHIJ  ABCDEFGHIJ  ABCDEFGHIJ  ABCDEFGHIJ  ABCDEFGHIJ  ABCDEFGHIJ
var code = "1111111111\n2222222222\n3333333333\n4444444444\n5555555555\n6666666666\n7777777777";
//いじるのはここまで///////////////////////////////////////////////////////////////////////////////


//ここからいじったらダメな部分が始まる~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const codes = code.split("\n");
// ページの読み込みが完了したら実行
window.addEventListener('load', async function() {
  // ID入力欄を取得
  const idInput = document.querySelector('input[type="text"][name="usr_name"]');
  if (idInput) {
    // ID入力
    idInput.value = id;
    // パスワード入力欄を取得
    const passwordInput = document.querySelector('input[type="password"][name="usr_password"]');
    if (passwordInput) {
      // パスワード入力
      passwordInput.value = password;
    }
	//自動でOKボタンを押す
	const okButton = document.querySelector('input[type="submit"][name="OK"][value="    OK    "]');
	if (okButton) {
		okButton.click();
	}
  }else{
    //新しいページにある3つのマトリクスコード入力欄を検出
    const newPasswordInput1 = document.querySelector('input[type="password"][name="message3"]');
    const newPasswordInput2 = document.querySelector('input[type="password"][name="message4"]');
    const newPasswordInput3 = document.querySelector('input[type="password"][name="message5"]');
    
    // 各コード入力欄に対して異なるコードを設定
    if (newPasswordInput1) {
      // ページのテキストを取得
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
	//自動でOKボタンを押す
	const okButton = document.querySelector('input[type="submit"][name="OK"][value="    OK    "]');
	if (okButton) {
		okButton.click();
	}
    }
  }
  //日本語ページに切り替え
  if (window.location.href === "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList")
    window.location.href = "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList?lang=ja";
});