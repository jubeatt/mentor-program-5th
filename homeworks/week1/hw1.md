## 交作業流程

1. 開一個新的分支 `git branch week-`（一個分支代表一週）
2. 切換到新開的分支 `git checkout week-`
3. 在這個分支上寫作業內容
4. 寫完之後，`git commit -am 'week-'` 先在本地端做 commit
5. 推到遠端的 repository `git push origin week-`
6. 在 GitHub 上建立一個新的 pull request
7. 如果要修改作業，就重複 3 ~ 5 的步驟（補充：如果遠端的 `week-` 分支已經被合併了，那就得重新開一個新的 pull request）
8. 助教做 code review，做完後助教會同意 pull request，接著就完成合併到 `master` 的動作
9. 把本地的分支 `week-` 刪掉
10. 遠端的合併完成後，用 `git pull origin master` 與本地的 `master` 同步（記得確認自己是在 master 分支上，因為要同步的是這個分支）
11. 把完成的 pull request 頁面上傳到學習系統。

（這裡只是模擬如果我是程式導師計畫的學生的話，該跑的流程）

pull request 的部分不太懂的話，可以參考 [這篇](https://jubeatt.github.io/2021/12/13/how-to-send-a-pull-request/)
