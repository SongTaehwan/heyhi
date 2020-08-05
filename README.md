# Demo

<p align="center">
  <img src="./src/assets/demo1.gif" width="200" style="margin-right: 30px"/>
  <img src="./src/assets/demo2.gif" width="200" />
</p>

# heyhi-app

해당 프로젝트는 react-native를 기반으로 만들어졌습니다.

## Development Environment

- Typescript
- React Native
- React Navigation
- Apollo GraphQL
- i18n
- ESLint & Prettier
- Husky

## Branches

해당 repository의 개발은 fork 받은 후 진행해주세요.

또한 origin의 master 브랜치는 fork로부터 pull request 생성 후 CI의 테스트 코드 실행이 통과해야만 머지가 가능합니다.

## Before start for iOS

- [xcode](https://apps.apple.com/kr/app/xcode/id497799835?mt=12)를 설치해주세요.
- cocoapods을 설치해주세요.

```
// step 1
$ cd heyhi-app
$ npm i or yarn

// step 2
$ sudo gem install cocoapods
$ cd ios
$ pod install
```

## Playing locally

```
$ npm run ios // for ios
$ npm run android // for android
```

## Project Structure

```
src
├── api
│   ├── mutation
│   └── query
├── components
│   ├── button
│   ├── spacer
│   ├── input
│   └── layout
├── constants
├── context
├── hooks
├── navigation
├── screens
│   ├── chat
│   ├── join
│   ├── main
│   ├── mypage
│   ├── settings
│   ├── tutorial
├── type
└── util
```
