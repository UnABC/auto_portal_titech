document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.needs-validation');

	// 保存済み情報の読み込み
	chrome.storage.local.get(['TitechID', 'TitechPW', 'Matrix', 'SciKyoID'], (data) => {
		if (!data) return;
		//復号
		data.TitechID = atob(data.TitechID);
		data.TitechPW = atob(data.TitechPW);
		data.Matrix = atob(data.Matrix);
		data.SciKyoID = atob(data.SciKyoID);
		document.getElementById('TitechID').value = data.TitechID || '';
		document.getElementById('TitechPW').value = data.TitechPW || '';
		document.getElementById('Matrix').value = data.Matrix || '';
		document.getElementById('SciKyoID').value = data.SciKyoID || '';
	});

	form.addEventListener('submit', event => {
		const TitechID = document.getElementById('TitechID').value;
		const TitechPW = document.getElementById('TitechPW').value;
		const Matrix = document.getElementById('Matrix').value;
		const SciKyoID = document.getElementById('SciKyoID').value;
		const matrixInput = document.getElementById('Matrix');
		const matrixErrorMessage = document.getElementById('matrixErrorMessage');
		// 入力値の検証
		event.preventDefault();
		event.stopPropagation();

		if (matrixInput.validity.valueMissing) {
			matrixInput.setCustomValidity('Please enter your Matrix code.');
			// 字数制限
		} else if (Matrix.length !== 70) {
			matrixInput.setCustomValidity('Matrix code must be exactly 70 characters.');
			// 文字種制限(英字以外は弾く)
		} else if (Matrix.match(/^[a-zA-Z]+$/) === null) {
			matrixInput.setCustomValidity('Matrix code must contain only letters.');
		} else {
			matrixInput.setCustomValidity('');
		}
		matrixErrorMessage.textContent = matrixInput.validationMessage;
		if (!form.checkValidity()) {
			document.getElementById('failed').style.display = 'block';
			form.classList.add('was-validated');
			return;
		}
		//簡易暗号化処理
		const CodedTitechID = btoa(TitechID);
		const CodedTitechPW = btoa(TitechPW);
		const CodedMatrix = btoa(Matrix);
		const CodedSciKyoID = btoa(SciKyoID);

		// 保存処理
		chrome.storage.local.set({ 'TitechID': CodedTitechID, 'TitechPW': CodedTitechPW, 'Matrix': CodedMatrix, 'SciKyoID': CodedSciKyoID }, () => {
			console.log('保存しました');
			//status.textContent = '保存しました';
			form.classList.remove('was-validated');
			document.getElementById('failed').style.display = 'none';
			document.getElementById('succeed').style.display = 'block';
			//setTimeout(() => { status.textContent = ''; }, 2000);
		});
	});
});
