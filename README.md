### React x Mobx - 폴더 참조

## 1. 리덕스 x 리액트 응용 방법

- 리덕스의 기본원리:

  - 1. state -> dispatch: 적절한 dispatch 명령을 Action 함수에 받아 들인다.
  - 2. Reducer에서 해당 액션을 수용 -> state 변경 (prevState -> changedState로 바뀌는 것)

- 생성 흐름:
- 1.  createStroe
- 2.  reducer 생성
- 3.  초기 state 설정
- 4.  state 생성 (reducer, initState)
- 5.  액션 생성자 생성 (필수 x)
- 6.  dispatch
- 7.  리듀서가 인식 -> state 변경

### 2. 리덕스 편의성 제공 - 1 (immer)

- 기본 골격: nextState = produce(prevState, (draft) => {[기본 리듀서 위치]})
- 4 장 참고

### 3. 리덕스 편의성 제공 - 2 (redux-toolkit)

- (\*) 중요 매서드
  - store step: configureStore, getDefaultMiddleware, immutabilty Middleware, Serialzability Middleware
  - Reducer and Actions: CreateSlice, CreateAsyncThunk

## 2. Mobx의 기본원리

- state -> action (direct 변경 가능 - 리덕스와 큰차이!!)
- ex. state.id = 'goodsosbva' 라고 바꾼 다음 obserbable이라고 객체를 감싸면 리듀서 감지하듯이 모벡스가 옵저버가 state를 관리한다.
- 중요 매서드: Observable, reaction, action, autorun, reaction...

### 2-1. Mobx vs redux 차이점

- 리덕스 - 불변성을 지키는 것이 리덕스의 원칙 (...prevState -> 얕은 복사 후 -> 새로운 변화 된 값을 치환하는게 기본적인 원리)
- 모벡스 - 리덕스처럼 깐깐하게 지키지 않음. 그렇기에 리듀서처럼 어떤 액션을 만들 필요가 없이 옵셔벼블로 감싼 객체를 바꿔주기만 하기 때문 전역 상태 관리 하는데 있어서 코드짜기가 간편함.

### 3. Mobx & React

```javaScript
const { observable, action } = require("mobx");

const userStore = observable({
  isLoggingIn: false,
  data: null,
  logIn(data) {
    this.isLoggingIn = true;
    setTimeout(
      action(() => {
        this.data = data;
        this.isLoggingIn = false;
        postStore.data.push(1); // redux 비해 편함
      }),
      2000
    );
  },
  logOut() {
    this.data = null;
  },
});

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
  // computed
  get postLength() {
    return this.data.length;
  },
});

export { userStore, postStore };
```

- observable로 store형태로 정의한 함수들은 액션함수가 된다. action을 따로 붙이지 않아도 모벡스에서 액션함수 취급해준다.
- 이것을 사용하려는 컴포넌트에서 import 해서 이용하면된다.

```javaScript
   const onLogIn = useCallback(() => {
    userStore.logIn({
      nickName: "goodsosbva",
      password: "qwer1234!",
    });
  }, []);
```

- Context API를 이용해서 스토어들을 모을 수도 있다.

```javaScript
import React from "react";
import { userStore, postStore } from "./store";

export const storeContext = React.createContext({
  userStore,
  postStore,
});

export const storeProvider = ({ child }) => {
  return <storeContext.Provider>{child}</storeContext.Provider>;
};

export default storeProvider;

```

- 모벡스는 이게 근본적인 맥락이다.. 리덕스와 다르게 사용하기 편함

### 3-1. 모벡스6으로 오면서 모벡스5와 달라진 점.

- 데코레이터 문법 삭제
- configure를 이용해 최신 문법을 사용하지 않으면 인터넥익스플로러 서비스 가능
- useLocalStore -> useLocalStoreObservalbe로 이름이 바뀜
- useObserver이라고 리턴문안에 굳이 감쌀 필요 없음. 익스포트 해주는 부분에 observer 감싸 주기만 하면된다.
