// DOMが全て読み込まれた後に実行
document.addEventListener("DOMContentLoaded", function() {
    // types.jsonをフェッチしてデータを取得
    fetch("types.json")
    .then(response => response.json())
    .then(data => {
        // タイプ選択用のプルダウンを生成
        populateSelect(data);
        // プルダウンが変更された場合のイベントハンドラを設定
        document.getElementById("type-select").addEventListener("change", function() {
            showTypeInfo(data, this.value);
        });
    });
});

// プルダウンにタイプ情報をセット
function populateSelect(data) {
    const select = document.getElementById("type-select");
    for (const type in data) {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    }
}

// 選択されたタイプに応じた情報を表示
function showTypeInfo(data, selectedType) {
    const typeInfo = data[selectedType];
    if (!typeInfo) {
        // 万が一対応するデータがない場合は処理を終了
        return;
    }

    document.getElementById("super-effective-attack").textContent = typeInfo.attack.superEffective.join(", ");
    document.getElementById("not-effective-attack").textContent = typeInfo.attack.notEffective.join(", ");
    document.getElementById("ineffective-attack").textContent = typeInfo.attack.ineffective.join(", ");

    document.getElementById("super-effective-defense").textContent = typeInfo.defense.superEffective.join(", ");
    document.getElementById("not-effective-defense").textContent = typeInfo.defense.notEffective.join(", ");
    document.getElementById("ineffective-defense").textContent = typeInfo.defense.ineffective.join(", ");
}
