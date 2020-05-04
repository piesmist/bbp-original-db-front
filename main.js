$(function () {
    //自作曲データ
    let musicList = [];

    //CSVのデータを取得する
    $.ajax({
        url: "https://storage.googleapis.com/bbp-original-db-storage/dev/music.csv",
    }).done(function (data) {
        musicList = $.csv.toArrays(data);

        //ヘッダを表示する
        const head = musicList.splice(0, 1)[0];
        const thead = head.map(h => `<th>${h}</th>`);
        $("#music-list thead tr").append(thead.join());

        //曲を表示する
        setTable(musicList);
    }).fail(function (data) {
        console.log("error");
    });;

    //検索欄に文字を入力した
    $('input[name="title"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[4].indexOf(word) !== -1 || music[5].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });

    function setTable(list) {
        //tbodyを初期化する
        $("#music-list tbody").empty();
        if (list.length === 0) return false;
        const tbody = list.map(row => {
            const tr = row.map(d => `<td>${d}</td>`);
            return `<tr>${tr.join()}</tr>`;
        });
        $("#music-list tbody").append(tbody);
    }
});
