# account

主要紀錄自己生活的所花費的事物，希望可以客製化自己的內容，有時間會陸續增加新的UI與介面。
### 主要使用 ReactJS + FireBase 實作

### Login 方式 
  - (1) 使用自己方便的emial(帳號)與密碼登入
快速登入 使用Firebase 所提供的登入機制:
  - (2)  Facebook (圖形 API v4.0 已於 Nov 02, 2021 will be deprecated on)
  - (3)  Google

### Firebase 資料庫(Realtime DataBase)
- 有關FireBase的登入SDK，可至以下網址操作:
  - refer: https://firebase.google.com/
 
### 資料格式(JSON):
- 目前分為兩種表格account與expense:
```javascripts=

  "account" : {
    "Ag4NXYQr6S43zVLLsRyjpex4oIzy" : {
      "accountCategory" : [ "帳戶名稱1", "帳戶名稱2", "帳戶名稱3" ],
      "budget" : "預算金額",
      "email" : "註冊郵件",
      "signup" : 註冊PassWord
    }
 },
 ```
 ```json=
"expense" : {
    "Ag4NXYQr6S43zVLLsRyjpex4oIzy" : {
      "1591027500" : {
        "accountClass" : "帳戶名稱1",
        "date" : "2020-06-01",
        "itemClass" : "早餐",
        "itemContent" : "",
        "itemValue" : "35",
        "timestamp" : 1591027500
      },
     } 
   }
 ```
### Pages
- 0. 登入頁面
    - 登入
    - 註冊
    - 忘記密碼 
- 1. 記錄頁面
    - 記錄每筆花費
    - 花費來源帳戶
    - 每月預算
    - 簡易資訊顯示(花費百分比、過去每天支出、剩下每天可支出、該日花費、該月花費、剩餘天數)
- 2. 月花費顯示
    - 點擊月份(進入月花費細節)
      - 日顯示花費(可點擊刪除)
- 3. 圖表頁面 (WEB板可截圖)
    - 支出類別比-圓餅圖(類別)
    - 支出帳戶比-圓餅圖(帳戶)
    - 每日支出顯示-長條圖(每日花費)
      - 日花費250以上顯示橘色，以下則顯示藍色
      - 花費1000以上顯示紅色
#### 部屬至GitHub gh-pages

