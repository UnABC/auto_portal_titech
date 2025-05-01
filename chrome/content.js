let codes, TitechID, TitechPW, Matrix, SciKyoID;

function loadData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['TitechID', 'TitechPW', 'Matrix', 'SciKyoID'], (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        TitechID = atob(data.TitechID);
        TitechPW = atob(data.TitechPW);
        Matrix = atob(data.Matrix);
        SciKyoID = atob(data.SciKyoID);
        // マトリクスコードを10文字ごとに分割
        codes = Matrix.match(/.{10}/g);
        resolve();
      }
    });
  });
}

if (TitechID === undefined || TitechPW === undefined || Matrix === undefined || SciKyoID === undefined) {
  if (document.readyState === 'loading') {
    // DOMがまだ読み込まれていない場合、DOMContentLoadedイベントを待つ
    document.addEventListener('DOMContentLoaded', () => {
      loadData();
    });
  } else {
    // DOMがすでに読み込まれている場合、即座に実行
    loadData();
  }
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.TitechID) {
      TitechID = atob(changes.TitechID.newValue);
    }
    if (changes.TitechPW) {
      TitechPW = atob(changes.TitechPW.newValue);
    }
    if (changes.Matrix) {
      Matrix = atob(changes.Matrix.newValue);
      // マトリクスコードを10文字ごとに分割
      codes = Matrix.match(/.{10}/g);
    }
    if (changes.SciKyoID) {
      SciKyoID = atob(changes.SciKyoID.newValue);
    }
  }
});

// ページの読み込みが完了したら実行
window.addEventListener('load', async function () {
  // Science Tokyo用
  if (window.location.href.startsWith("https://isct.ex-tic.com/auth/session")) {
    if (!SciKyoID) {
      console.log('Science TokyoのIDが設定されていません。');
      return;
    }
    // Science TokyoのID入力欄を取得
    const ScikyoIDInput = document.querySelector('input[type="text"][name="identifier"]');
    //Science Tokyo
    if (ScikyoIDInput) {
      // ID入力欄に値を設定
      ScikyoIDInput.value = SciKyoID;
      const nextButton = document.querySelector('button.btn.btn-info[type="submit"]');
      if (nextButton) {
        nextButton.click();
        const passwordlessButton = document.querySelector('button.btn.btn-info.mb-3[type="submit"]');
        if (passwordlessButton) {
          passwordlessButton.click();
        } else {
          this.alert('「パスワードレス認証」ボタンが見つかりませんでした。');
        }
      } else {
        this.alert('「次へ」ボタンが見つかりませんでした。');
      }
    }
    return;
  }
  //LMS用
  if (window.location.href.startsWith("https://lms.s.isct.ac.jp/")) {
    const url = window.location.href;
    const pattern = /^https:\/\/lms\.s\.isct\.ac\.jp\/[^\/]+\/mod\/url\/view\.php/;
    //シラバスのページを検出
    if (pattern.test(url)) {
      const link = document.querySelector('a[href^="https://syllabus.s.isct.ac.jp/"]');
      if (link) {
        const syllabusUrl = link.href;
        //シラバスのページにリダイレクト
        window.location.href = syllabusUrl;
      }
    }
    return;
  }

  // Tokyo TechのID入力欄を取得
  const idInput = document.querySelector('input[type="text"][name="usr_name"]');
  //Tokyo Tech
  if (idInput) {
    if (!TitechID || !TitechPW) {
      console.log('Tokyo TechのIDまたはパスワードが設定されていません。');
      return;
    }
    // ID入力欄に値を設定
    idInput.value = TitechID;
    // パスワード入力欄を取得
    const passwordInput = document.querySelector('input[type="password"][name="usr_password"]');
    if (passwordInput) {
      // パスワード入力欄に値を設定
      passwordInput.value = TitechPW;
    }
    //自動でOKボタンを押す
    const okButton = document.querySelector('input[type="submit"][name="OK"][value="    OK    "]');
    if (okButton) {
      okButton.click();
    } else {
      this.alert('OKボタンが見つかりませんでした。');
    }
  } else {
    //新しいページにある3つのパスワード入力欄を検出
    const newPasswordInput1 = document.querySelector('input[type="password"][name="message3"]');
    const newPasswordInput2 = document.querySelector('input[type="password"][name="message4"]');
    const newPasswordInput3 = document.querySelector('input[type="password"][name="message5"]');

    // 各パスワード入力欄に対して異なるパスワードを設定
    if (newPasswordInput1) {
      if (!codes) {
        console.log('マトリクスコードが設定されていません。');
        return;
      }
      // ページのテキストコンテンツを取得
      const pageContent = document.body.innerText;
      // 正規表現を使用して指定された形式の文字列を抽出するパターンを定義
      const pattern = /\[(\w+),(\d+)\]/g;

      // 正規表現のパターンに一致するすべての部分を取得
      let match;
      let newPasswords = [];
      for (let i = 0; (match = pattern.exec(pageContent)) !== null; i++) {
        // マッチした部分を配列に追加
        newPasswords[i] = codes[Number(match[2]) - 1].charAt(match[1].charCodeAt(0) - 65);
      }
      newPasswordInput1.value = newPasswords[0];
      newPasswordInput2.value = newPasswords[1];
      newPasswordInput3.value = newPasswords[2];
      //自動でOKボタンを押す
      const okButton = document.querySelector('input[type="submit"][name="OK"][value="    OK    "]');
      if (okButton) {
        okButton.click();
      } else {
        console.log('OKボタンが見つかりませんでした。');
      }
    }
  }
  if (window.location.href === "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList")
    window.location.href = "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList?lang=ja";
});