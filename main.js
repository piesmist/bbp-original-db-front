$(function () {
    //自作曲データ
    let musicList = [];

    //CSVのデータを取得する
    $.ajax({
        url: "https://storage.googleapis.com/bbp-original-db-storage/prod/music.csv",
    }).done(function (data) {
        //tsvを二次元配列に変換する
        musicList = csvToArray(data, "\t");

        //ヘッダを表示する
        const head = musicList.splice(0, 1)[0];
        const thead = head.map(h => {
            return `<th>${h}</th>`
        });
        $("#music-list thead tr").append(thead.join());

        //曲を表示する
        setTable(musicList);



        // DateTable

        $('#music-list').DataTable({
            // 日本語表示
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
            },
            order: [[5, "desc"]],
        });

        $('#music-list').css('display', 'initial');


    }).fail(function (data) {
        console.log("error");
    });;

    function setTable(list) {
        //tbodyを初期化する
        $("#music-list tbody").empty();
        const tbody = list.map(row => {
            if (row[2] === "") {
                return ""
            }
            const tr = row.map((d, index) => {
                if (index === 1) {
                    if (d === "") {
                        return `<td></td>`
                    }
                    return `<td><a href="${d}" target="blank"><img src="./yt.png" /></a></td>`

                    // この辺が横幅のやつ

                } else if (index === 0) {
                    return `<td style="min-width:85px">${d}</td>`
                } else if (index === 2) {
                    return `<td style="min-width:150px">${d}</td>`
                } else if (index === 6) {
                    return `<td style="min-width:120px">${d}</td>`
                } else if (index === 7) {
                    return `<td style="min-width:300px">${d}</td>`


                } else {
                    return `<td>${d}</td>`
                }
            });
            return `<tr>${tr.join()}</tr>`;
        });
        $("#music-list tbody").append(tbody);
    }

    function csvToArray(csv, sepalator) {
        const rows = csv.split("\n");
        let arrays = new Array();
        rows.forEach((row) => {
            array = row.split(sepalator);
            if (array.length < 2) return;
            arrays.push(array);
        });
        return arrays;
    }
});