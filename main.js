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

        // 曲名検索
    $('input[name="title"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[4].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });



        // 製作者検索
    $('input[name="contributor"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[1].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });



        // アニメタイトル検索
    $('input[name="anime"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[9].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });



        // アーティスト検索
    $('input[name="artist"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[5].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });



          // 備考欄検索
    $('input[name="other"]').keyup(function (e) {
        const word = this.value;
        let searchedMusicList = [];
        if (word !== "") {
            searchedMusicList = musicList.filter(music => {
                return music[7].indexOf(word) !== -1
            }
            );
        } else {
            searchedMusicList = musicList;
        }
        console.log(searchedMusicList)
        setTable(searchedMusicList);
    });



    // ジャンル検索
$('input[name="genre"]').keyup(function (e) {
  const word = this.value;
  let searchedMusicList = [];
  if (word !== "") {
      searchedMusicList = musicList.filter(music => {
          return music[8].indexOf(word) !== -1
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
