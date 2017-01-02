## 權重計算 ##
- 先生成一個middle object，它包含每個keyword的timestamp
- 再透過midlle object，把每個keyword的score算出來
- 演算法是原本討論好的 sum(1/timeDiff)
- 測資timestamp從2007/1/1 到 2017/1/1隨機抓
- 共有10000筆測資，每筆測資有20個keywords，執行時間約5秒(AMD X4 965 3.4G)
