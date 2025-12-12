## 编译步骤
### Expo 云部署编译流程
#### 创建 EXPO 云服务账号以及安装软件
```shell
# 访问Expo服务网站创建账号
https://expo.dev/
  
# 安卓或苹果请在应用商城下载《Expo Go》 官方软件
# 注意大陆用户，安卓需要完成谷歌服务安装和使用
# 注意大陆用户，苹果需要切换至海外ID才能搜索下载
```

#### 项目配置
##### 1.安装 eas cli 集成环境
```shell
# 1.检查是否已经安装
npm list -g eas-cli

# 2.若显示empty字样，则表示未安装，需要进行全局安装（安装过慢，请耐心等待）
npm install -g eas-cli

# 3.若显示安装过，请查看版本
eas --version

# 4.查看eas用户绑定关系,会展示用户账号绑定关系
eas whoami 

# 5.若未绑定用户，则需要进行用户绑定,这里就需要第一步访问官网创建云服务账号的邮箱和密码
eas login 
```

##### 2.安装expo开发客户端
```shell
# 1.打开CMD或命令终端，进入到项目的根目录
cd ${baseDir}/

# 2.安装RN项目需要的依赖插件
npx expo install expo-dev-client
```
##### 3.配置app.json
请确保你的app.json 以下配置均要存在，具体字段含义，请自行查看RN官网对app.json的字段解读
```json
{
  "expo": {
    "name": "my-secure-app",
    "slug": "my-secure-app",
    "plugins": ["expo-dev-client"],
    "android": {
      "package": "com.yourcompany.mysecureapp"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.mysecureapp"
    }
  }
}
```
##### 3.配置构建
```shell
# 1.打开CMD或命令终端，进入到项目的根目录
cd ${baseDir}/

# 配置构建,该条命令执行完（需要科学上网），会在项目根据生成一个eas.json文件
eas build:configure
```
eas.json 示例
上述过程生成的app.json 可能会缺少对 android.buildType 配置，可以执行编辑补充
```json
{
  "cli": {
    "version": ">= 16.28.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

##### 3.构建 Android 开发版（APK）（免费计划版本每月15次打包编译与发布，真机联调是属于热重载不会消耗次数）
```shell
# 1.打开CMD或命令终端，进入到项目的根目录
cd ${baseDir}/

# 构建 Android 开发版（APK），过程会很慢，请耐心等待
eas build -p android --profile development
```
该步骤执行完成后,日志输出
```text
Resolved "development" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
No environment variables with visibility "Plain text" and "Sensitive" found for the "development" environment on EAS.

No remote versions are configured for this project, versionCode will be initialized based on the value from the local project.
√ Initialized versionCode with 1.


√ Using remote Android credentials (Expo server)
√ Generate a new Android Keystore? ... yes
√ Created keystore

Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
√ Compressed project files 1s (3.5 MB)
√ Uploaded to EAS 4s
√ Computed project fingerprint

See logs: https://expo.dev/accounts/xxxxx/projects/xxxxxxx/builds/fde4325fwe-721e-49ee-a9642-332s2cvfs3df4

Waiting for build to complete. You can press Ctrl+C to exit.
  Build queued...

Start builds sooner in the priority queue.
Sign up for a paid plan at https://expo.dev/accounts/veergalario/settings/billing

Waiting in Free tier queue
|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■| 

√ Build finished
```
如果需要模拟登录下载测试找到 ```See logs: https://expo.dev/accounts/xxxxx/projects/xxxxxxx/builds/fde4325fwe-721e-49ee-a9642-332s2cvfs3df4```
这个连接进入后完成expo手机版安装登录操作，就可以看到APK在编译的进度和流程以及需要下载App安装包

#### 启动真机联调（以安卓为例）
```shell
npx expo start --dev-client
```
启动成功会输出：
```text
Starting project at E:\xx\xxx\xxxxxx
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▄▄ ▀   █ █▀▄█▄██ ▀█▀█ ▄▄▄▄▄ █
█ █   █ ██▄▀ █▄ ▀█▀ ▄█ ▄▀█ █▀▀█ █   █ █
█ █▄▄▄█ ██▀▄ ▄ ▀▄█▀▀▄▄▄▄▀ ▄ █ █ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀▄█ █ █▄█ █▄█▄█▄▀▄█ █▄▄▄▄▄▄▄█
█▄ ▀ ▄█▄▀▀ ▀█▄▄ ▄▄  ▀▀██ ▄█ ▀▄▀▄█▀▀██▄█
█▄▄▄█▄█▄▀█ ██▄█ ▀█▀▀▀▄▄ ▄ █▀▄▄ █▀▄▀▀▄ █
█ ▄▄▀▄▄▄▀▀ ▄█▀▄▄█▄█▄▄▀█▀ ██▀  ▄▄█▀█████
█▀▄█ ▄▄▄  ▄▄█▀▀ ▄▀█ ▄ ▄ ███  ▄ █▀▀▀▀ ▄█
█ ▄██▀█▄▀▄██ ▄██  █  ██▀▄█▄▀ ▄ ▄▀█▄  ██
█▄▀ █ █▄█▄██▀▄ ▄▄▄█▀ ▀▄▀ █ ▀▄▀▀█▄▄▀█▄ █
██▀▄█ ▀▄ █  ▄▀ █▀▀▄▄  █▄ ▀▀▀ ▄▄▄  ▄▀▀▄█
█  ▀▄ █▄█ █  ▀ █▄▀ ▄▀ ██▄██▀▄██ ▀ ▀▀▀ █
█▀ ▄ ▄▀▄▄▀▀▀▄▄ ▀ ██▄ ▄▄█▀ ▀▀  ▀▄▄▀██ ██
█ ▄▄▀▀█▄▄ ▄  ▄▄█▄ ▄█ ▀▄▄█▄██▄██▀█▀▀▀  █
█▄███▄▄▄█ █▀▀▀▀ ▀ ▀▄▀██▀▄█ ██ ▄▄▄ ▄▄▀▄█
█ ▄▄▄▄▄ ██▀▄▄▀█▀▄██▄ █▄▀ ▄ ▀█ █▄█ ▄▄▀▄█
█ █   █ █   █▄▄ ▄▄▄  ▀█▄ ▄▀  ▄  ▄▄ █▀ █
█ █▄▄▄█ █▀▄ █▄█    █▀ █▀ ██ █▄▀▀  ▀▀▀ █
█▄▄▄▄▄▄▄█▄▄███▄▄▄██▄▄▄▄█▄▄███▄▄▄█▄███▄█
› Metro waiting on exp+m-xxx-xxx://expo-development-client/?url=http%3A%2F%2F192.168.0.173%3A8081
› Scan the QR code above to open the project in a development build. Learn more: https://expo.fyi/start

› Web is waiting on http://localhost:8081

› Using development build
› Press s │ switch to Expo Go

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands
```
