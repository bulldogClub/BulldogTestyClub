## 部署合约
1. 执行部署脚本
2. 设置起止时间
3. 添加白名单
4. 设置BaseURI, 需要图片资源上传完毕后

## 图片资源生成
1. 将Common 图片复制到photo目录中
2. 另外将所有图片添加到source_photo目录中
3. 运行ipfs_add.sh脚本，生成ipfs文件的name
4. 清空json目录，并执行java文件的genJson 方法，生成图片资源的json
5. 上传图片到ipfs, 上传json 到ipfs
6. 将json 目录的URL 添加到合约的BASE_URI 中

