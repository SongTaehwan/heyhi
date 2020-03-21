# heyhi-app

해당 프로젝트는 react-native를 기반으로 만들어졌습니다.

## Main modules
> apollo, react-native, react-hooks

## Branches

해당 repository의 개발은 fork 받은 후 진행해주세요.

또한 origin의 master 브랜치는 fork로부터 pull request 생성 후 CI의 테스트 코드 실행이 통과해야만 머지가 가능합니다.

## Before start

- [xcode](https://apps.apple.com/kr/app/xcode/id497799835?mt=12)를 설치해주세요.
- cocoapods을 설치해주세요.

```
$ sudo gem install cocoapods
$ cd heyhi-app/ios
$ pod install
```

## Playing locally

### ios

```
$ npm run ios
```

### android

```
$ npm run andriod
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
├── constant
├── context
├── hooks
├── screens
├── type
└── util
```
