# 애니타임(Anytime) FE(FrontEnd)



**패키지 관리 도구** 

- npm

  

**패키지 최초 설치시**

```shell
npm install 
```



**기본 사용 라이브러리**

- React Native CLI
- nativebase
- Typescript
- Redux tool kit 사용
- React Query 



**디렉터리 구조** 

```
-- components
-- app
-- common
-- features
```

- /features 디렉터리 : pages, containers 포함

  

**안드로이드 스튜디어 실행없이 에뮬레이터 직접 실행 명령어**

```shell
C:\[설치경로]]AppData\Local\Android\Sdk\emulator\emulator.exe -avd Pixel_5_API_30
```



**안드로이드 ndk 버전에 따른 개인 로컬 버전 설정**

C:\[개인프로젝트 경로]\ApplePrice\android 로 이동

local.properties 수정

```shell
sdk.dir=C://Users//ji//AppData//Local//Android//Sdk
ndk.dir=C://Users//ji//AppData//Local//Android//Sdk//ndk//23.0.7599858
```

해당 경로에 build.gradle 파일 수정

```properties
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 16
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = "21.0.6113669" -> 각자 로컬 경로에 맞게 버전 수정
    }

```

